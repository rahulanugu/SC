from django.shortcuts import render

from .apps import PredictorConfig
from django.http import JsonResponse
from django.http import HttpResponse
from django.utils.decorators import classonlymethod
from rest_framework.response import Response
from rest_framework.parsers import BaseParser
from rest_framework.views import APIView
import json
import pandas as pd
import numpy as np
import xgboost as xgb
import pickle
import json
import asyncio
from sklearn.preprocessing import LabelEncoder
from rest_framework.settings import api_settings
import logging
from pprint import pprint
from django.conf import settings
from predictor.EHRInterface import EpicInterface as epic
from predictor.EHRInterface import Distron as distron
import os
import subprocess

# Logger Configuration
logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '%(name)-12s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': '/tmp/debug.log'
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        }
    }
})

# This retrieves a Python logging instance (or creates it)
logger = logging.getLogger(__name__)


def hello_world(request):
    #text = "Txt001|Written informed consent.\nTxt002|Age 18 years or older.\nTxt003|informed consent.\nTxt004|Male or female."
    #text = "Txt001|Kidney problem is there"
    distron.generate_analytics()
    return HttpResponse("Hello World!") 



class CustomeJSONParser(BaseParser):
    """
    Custom JSON Parser. The default parser provided by the django rest framework strictly parses JSON. 
    But, since we expect the request data to have NaN values, a custom parser is suitable. This parser can be removed when we start to use 
    Epic's EHR as the FHIR resource. 
    """

    media_type = 'application/json'

    def parse(self, stream, media_type=None, parser_context=None):
        """
        Simply return a string representing the body of the request.
        """

        try:
            return json.loads(stream.read().decode('utf-8'))

        except Exception as e:
            logger.exception('Error Occured')


class call_model(APIView):

    parser_classes = [CustomeJSONParser]

    def get(self, request):
        """ ECHO METHOD """

        try:
            if request.method == "GET":
                print('In generate analytics, post request method')

                data = request.data
                logger.info(f'Request Data- {data}')
                return Response(json.dumps({'received data': data}))
        except Exception as e:
            logger.exception('Error ocurred')

    def post(self, request, format=None):
        """ Interfaces with the ML models to generate analytics."""

        try:

            if request.method == "POST":
                print('In generate analytics, post request method')
                data = request.data

                logger.info(f'Request Data- {data}')

                result = self.generate_analytics(data)

                logger.info(f'Generate Analytics- {result}')
                return Response(json.dumps(result))

        except Exception as e:
            logger.exception("Error occured")

    """ def get(self, request):
        try:

            if request.method == "GET":
                print('In generate analytics, get request method')
                data = request.data

                logger.info(f'Request Data- {data}')

                result = self.generate_analytics(data)

                logger.info(f'Generate Analytics- {result}')
                return Response(json.dumps(result))

        except Exception as e:
            logger.exception("Error occured") """

    def preprocess_2(self, X_features):
        """ Preprocessing method for MIMIC-III dataset. Needs to be removed when we start working with EHR data"""

        reqColumns = ['AGE', 'ETHNICITY', 'GENDER',
                      '50802', '50804', '50808', '50809', '50810',
                      '50811', '50813', '50818', '50820', '50821',
                      '50822', '50824', '50861', '50862', '50863', '50868',
                      '50878', '50882', '50885', '50893', '50902', '50910',
                      '50912', '50931', '50954', '50960', '50970', '50971',
                      '50983', '51006', '51144', '51146', '51200', '51221',
                      '51222', '51237', '51244', '51248', '51249', '51250',
                      '51254', '51256', '51265', '51274', '51275', '51277',
                      '51279', '51301', '51491', '51498', 'ICD9_CODE_y']

        data_dict = {key: X_features[key] for key in reqColumns}

        return pd.DataFrame.from_dict(data_dict)

    def preprocess(self):
        """Preprocessing code for EPIC FHIR data"""

        with open('./EpicPatientData.json') as f:
            data = json.load(f)

        X_features = pd.DataFrame([data['Demography']['age']], columns=['AGE'])

        X_features['ETHNICITY'] = data['Demography']['race'].upper()
        le_eth_loaded = pickle.load(open('le_ethnicity.obj', 'rb'))
        # will crash if procedure code not in saved label encoder fit codes. other solution is to retrain model.
        X_features['ETHNICITY'] = le_eth_loaded.transform(
            X_features['ETHNICITY'])

        gender = data['Demography']['gender'].lower()
        if gender.startswith('m'):
            X_features['GENDER'] = 'M'
        else:
            X_features['GENDER'] = 'F'

        le_g_loaded = pickle.load(open('le_gender.obj', 'rb'))
        X_features['GENDER'] = le_g_loaded.transform(X_features['GENDER'])

        top50lab_cpt = ['50802', '50804', '50808', '50809',
                        '50810', '50811', '50813', '50818', '50820', '50821', '50822', '50824',
                        '50861', '50862', '50863', '50868', '50878', '50882', '50885', '50893',
                        '50902', '50910', '50912', '50931', '50954', '50960', '50970', '50971',
                        '50983', '51006', '51144', '51146', '51200', '51221', '51222', '51237',
                        '51244', '51248', '51249', '51250', '51254', '51256', '51265', '51274',
                        '51275', '51277', '51279', '51301', '51491', '51498']
        labs = pd.DataFrame([], columns=top50lab_cpt)
        X_features = X_features.join(labs)
        for l in data['Lab Events']:
            # get cpt of l['code'] using mapping
            # if cpt in cols
            X_features[l] = l['value']

        procedures = data['Procedures']
        # assuming first procedure is primary procedure. no hierarchy in epic data.
        primary_proc = pd.DataFrame(procedures).sort_values(
            by='date', ascending=False).iloc[:1]['code'][0]
        X_features['ICD9_CODE_y'] = primary_proc
        le_loaded = pickle.load(open('le.obj', 'rb'))
        # will crash if procedure code not in saved label encoder fit codes. other solution is to retrain model.
        X_features['ICD9_CODE_y'] = le_loaded.transform(
            X_features['ICD9_CODE_y'])

        return X_features

    def generate_analytics(self, X_features):
        """Generates the risk analytics of a patient"""

        X_features = self.preprocess_2(X_features)

        model_4280 = PredictorConfig.model_4280
        model_4019 = PredictorConfig.model_4019
        model_41401 = PredictorConfig.model_41401
        model_42731 = PredictorConfig.model_42731

        predictions = {}
        predictions["Congestive Heart Failure"] = model_4280.predict_proba(X_features)[
            :, 1] * 100
        predictions["Hypertension"] = model_4019.predict_proba(X_features)[
            :, 1] * 100

        predictions["ASHD coronary artery"] = model_41401.predict_proba(X_features)[
            :, 1] * 100
        predictions["Atrial Fibrilliation"] = model_42731.predict_proba(X_features)[
            :, 1] * 100

        predictions = {
            f"{key}": predictions[key].tolist() for key in predictions}

        return predictions

'''
 --- JDW --- 
'''

class EpicView(APIView):
    # Async view declare
    @classonlymethod
    def as_view(cls, **initkwargs):
        view = super().as_view(**initkwargs)
        view._is_coroutine = asyncio.coroutines._is_coroutine
        return view

    # Call data fetching function from 
    async def getPatientData(self, request):
        data = await epic.fetch_all_patient_data(request.payload)
        return data