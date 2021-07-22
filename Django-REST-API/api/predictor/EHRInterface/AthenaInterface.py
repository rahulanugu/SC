# Scripts to request resources from Athena FHIR server should be written here.
#  Code updated by Tejvir Singh 07/19
#

import requests
from futures3.thread import ThreadPoolExecutor
from futures3 import as_completed
import jwt
import datetime
from urllib.parse import quote_plus, urlencode
from cryptography import x509
import time
from pprint import pprint
import json
import os
import subprocess
import uuid
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography import x509


# Token
TOKEN = ''
DEFAULT_TIMEOUT = 5


# --- EHR Integrations ---
'''
 * Inputs:
 * url:         URL endpoint  - resource endpoint
 * patientID:   URL param     - patient id
 * resourceID:  URL param     - FHIR resource id
 * subject:     URL param     - subject of event/document
 * type_:       URL param     - Resource type (type is reserved keyword)
 * token:       Header        - JWT auth token
 * secret:
 * Output: request.py response object
'''

# <- Request helpers ->

# copied epic interface format for consistency

def get_headers(token):
  return {'Authorization': f'Bearer {token}', 'Accept': 'application/json'}

def get_error_code(message):
    return {'status_code': 404, 'message': message}

def fetch_FHIR_resource(url, resourceID, token):
    full_url = url + resourceID
    headers = get_headers(token)

    res = requests.get(url=full_url, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

def fetch_patient_resource(url, patientID, token):
    #  Needs to be updated further 
    # payload = {'patient': patientID}
    # headers = get_headers(token)

    # res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# Method to generate JWT token which will be provided to server for authorization with the athena app
def generateAthenaJWT():
    curr_time = int(datetime.datetime.utcnow().timestamp())
    headers = {
        'alg': 'RS384',
        'typ': 'JWT'
    }
    payload = {
        'iss': '0oa946l55dFaXnUUB297',
        'sub': '0oa946l55dFaXnUUB297',
        'aud': 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
        'exp': curr_time + 300
    }
    token = jwt.encode(payload=payload, headers=headers, key=private_key, algorithm='RS384')
    return token


def fetch_access_token(jwtToken):
    url = 'https://athena.okta.com/oauth2/aus2hfei6ookPyyCA297/v1/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    payload = {
        'grant_type': 'client_credentials',
        'scope' : 'athena/service/Athenanet.MDP.*'
    }

    res = requests.post(url=url, headers=headers, data=payload, timeout=DEFAULT_TIMEOUT)
    return res



# <- Integrations ->

def fetch_sex(url, practiceID, token):
    return fetch_patient_resource(url, practiceID, token)

def fetch_racecode(url, practiceID, token):
    return fetch_patient_resource(url, practiceID, token)    

def fetch_maritalstatus(url, practiceID, token):
    return fetch_patient_resource(url, practiceID, token)    


def fetch_medication(url, practiceID, departmentID, medicationID, token):
    return fetch_FHIR_resource(url, practiceID, departmentID, medicationID, token)    

def fetch_diagnosis(url, practiceID, departmentID, labresultID, token):
    return fetch_FHIR_resource(url, practiceID, departmentID, labresultID, token)    

def fetch_procedure(url, practiceID, brandID, chartsharinggroupID, token):
    return fetch_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, token)    

def fetch_encounter(url, practiceID, departmentID, token):
    return fetch_FHIR_resource(url, practiceID, departmentID, token)    

def fetch_document_reference(url, practiceID, departmentID, token):
    return fetch_FHIR_resource(url, practiceID, departmentID, token)    

def fetch_racecode(url, practiceID, token):
    return fetch_FHIR_resource(url, practiceID, token)    



#source
#https://docs.athenahealth.com/api/guides/authentication-and-url-locations


#Tests

