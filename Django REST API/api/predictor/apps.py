from django.apps import AppConfig
from django.conf import settings
import os
import pickle


class PredictorConfig(AppConfig):
    name = 'predictor'

    model_4280 = pickle.load(
        open(settings.MODELS+"4280model.pickle.dat", "rb"))
    model_4019 = pickle.load(
        open(settings.MODELS+"4019model.pickle.dat", "rb"))
    model_41401 = pickle.load(
        open(settings.MODELS+"41401model.pickle.dat", "rb"))
    model_42731 = pickle.load(
        open(settings.MODELS+"42731model.pickle.dat", "rb"))
