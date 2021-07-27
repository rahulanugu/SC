# Scripts to request resources from Athena FHIR server should be written here.
#  Code updated by Tejvir Singh 07/19
#  https://docs.athenahealth.com/api/guides/authentication-and-url-locations
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
from requests.api import head
import ast



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

def get_FHIR_resource(url, resourceID, token):
    full_url = url + resourceID
    headers = get_headers(token)

    res = requests.get(url=full_url, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

def get_patient_resource(url, patientID, token):
    #  Needs to be updated further 
    # payload = {'patient': patientID}
    # headers = get_headers(token)

    # res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# Method to generate JWT token which will be provided to server for authorization with the athena app
# def generateAthenaJWT():
#     curr_time = int(datetime.datetime.utcnow().timestamp())
#     priv_key = b"-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAs2VW52Z14AjirBRpMhIlhS3Advzwlk97JpN/uj6IN9foEibe\nyC6yYeVGxUY3h98VWIgCUFDdeUJn9NXxMRJeMH2AAwgn40uioZ9Lh3gpQt3i0kYi\nc4+Yv3oX+W4JN6JVDuss90vVT4kGEMs/+4fjGHSJHZJHz76a2L099lk5zls8N38h\nVtE3LRlKF7dQTqI5uh+UkXCElsWtVtiUVmC2tlC9G/PKqxYeiZ9Kr6/wUWJEySkL\nSdIAKOV7diS7CIwplkTgQhAPTKWHvvLBCAes7121T1lp+5EW0BYRafwqUSdB0PqP\nBcf2DjWJN5PRwzxQxZ7Pqi8Rfo/xRhtnCn7+YQIDAQABAoIBAG528VtN0Tmh3wn9\nC4WkfOwT7xaVzAOSb4+idZ0WUkSosyMyQi5b6sWzK6/f++Ozb25zWZFhKe83/9FY\nR8titxL+xGuZgw5IDZ2d/CEv0aB2BuxZ+W7VNkZ5hPe3VP+n+t5T2/1u+aufAVgn\n/37//suZPrEx2PxILwtVBCmEab7xkJkelEn3Imc/sZI1nbsiPkN4lV5CdjQRNEIR\n7MGTfTMfE7l/Hd+qgXQbv8F+swR8QlOY/d9B4xryTKYBvRs+bOlvnzH1dK1tmfej\ni1tV8ny+2Z7/SOVs3oVs4F8zr96qmd5DMHw6k1rKX6MLUgGQG55DMoOxmGLNWSE8\ned76pM0CgYEA5LRHmtHHbUOvLWCK5fzrVxl66hI0jY3rZA1MQVLWfvTos1xkKEZf\nitcXbdZke1wUWthAHByEr2WB/8UIpKD9ORg3A5T3CzFyMKNRzi15ned5v3np9Y0c\nufMQJJjUfTajSjYehWZTeRjuFg9bMf3UI38J3u/6x89W+IPD79N6xZ8CgYEAyM6D\n9ua1oX/+iW842W5BPsPlaSurdXrtyOU6S4TMLlZrC8Sucx8dMr4jbhr0m74PyOqq\nagVoc5dZG4G4RmhMFQoRo4wmmAeFR4Haq4UDuQf/BSrcN90Ys/XjTwx33C8sh1KC\nXvmFwiCj19XXmM51a93cdeudWGfZ7KuyeMKHu/8CgYEA4zUG/hPyn+ZiHh6PXzUJ\nSJqTtf8oHokjlV5wp2T4m2AL3kSnbCudt31AVWpsoPE1d5rm9gaO+wFJSSQiFguq\nBhK8dN6FH6Wb4B4go0giTnEsTsF7YOsz4rhLDVCXqV2ik5N4dubVfrT5swjGfL/D\nBRCsacLXzbF6oaGmApiCm9kCgYEAxzj8e+yQrtXJtph+ElnsqVS5Ogp1ZWy8lN+3\nYk0yNZbPRTGw0c5AraMui4J6xDlgd7k5sU4EPwodAclFBbVcJlODBHt7nsF3XWZb\niGfDNcPVI09OhK36YDDHgBmioPS8fNVDOu7b4al4ZB5oc9YBcS8AFo3X4WnHL6N4\nwY5eFAkCgYAJQTQsDFmUDeksWtAk7gZ2Y8IbhzCDEqt1ULtEyf+IY93ljfmIxyrA\npUQdbyhcIoxC55hnezwLLv98BFC/byzAP7OunahozGbObs58YN6+Dftdg6xgOY6w\nRLKybv4//fu+J0FxsR9fxrNK5HLCadMpRRV2gCQ0f0a98nPkPGsQjw==-----END RSA PRIVATE KEY-----"
#     headers = {
#         'alg': 'RS384',
#         'typ': 'JWT'
#     }
#     payload = {
#         'iss': '0oa946l55dFaXnUUB297',
#         'sub': '0oa946l55dFaXnUUB297',
#         'aud': 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
#         'exp': curr_time + 300
#     }
#     token = jwt.encode(payload=payload, key=priv_key, algorithm='RS384', headers=headers)
#     jwt.encode()
#     return token


def get_access_token():
    url = 'https://athena.okta.com/oauth2/aus2hfei6ookPyyCA297/v1/token'
    client_id = '0oa946l55dFaXnUUB297'
    client_secret = 'FWpXu4vWCr3qRdQwCV4sznm4lBHEM9DOYfQd4lDO'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    payload = {
        'client_id' : client_id,
        'client_secret' : client_secret,
        'grant_type': 'client_credentials',
        'scope' : 'athena/service/Athenanet.MDP.*'
    }

    res = requests.post(url=url, headers=headers, data=payload, timeout=DEFAULT_TIMEOUT)
    return res



# <- Integrations ->

# https://docs.athenahealth.com/api/sandbox#/Patient/getPracticeidPatientsSearch
def get_sex(url, practiceID, token):
    return get_patient_resource(url, practiceID, token)

def get_racecode(url, practiceID, token):
    return get_patient_resource(url, practiceID, token)    

def get_maritalstatus(url, practiceID, token):
    return get_patient_resource(url, practiceID, token)    

def get_medication(url, practiceID, departmentID, medicationID, token):
    url = url + '/' + practiceID + '/' + departmentID + '/fhir/dstu2/Medication/' + medicationID
    payload = {'practiceid': practiceID, 'departmentid': departmentID, 'medicationid': medicationID}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

def get_diagnosis(url, practiceID, departmentID, labresultID, token):
    return get_FHIR_resource(url, practiceID, departmentID, labresultID, token)    

def get_procedure(url, practiceID, brandID, chartsharinggroupID, token):
    return get_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, token)    

def get_encounter(url, practiceID, departmentID, token):
    return get_FHIR_resource(url, practiceID, departmentID, token)    

def get_document_reference(url, practiceID, departmentID, token):
    return get_FHIR_resource(url, practiceID, departmentID, token)    

def get_medication_statement(url, practiceID, brandID, chartsharinggroupID, token):
    return get_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, token)    

def get_condition(url, practiceID, brandID, chartsharinggroupID, token):
    return get_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, token)    

def get_patient(url, practiceID, brandID, chartsharinggroupID, token):
    return get_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, token)    

def get_allergy_intolerance(url, practiceID, brandID, chartsharinggroupID, allergyintoleranceID, token):
    return get_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, allergyintoleranceID, token)    

def get_immunization(url, practiceID, brandID, chartsharinggroupID, patientID, token):
    url = url + '/' + practiceID + '/' + brandID + '/' + chartsharinggroupID + '/fhir/dstu2/Immunization'
    payload = {'practiceid': practiceID, 'brandid': brandID, 'chartsharinggroupid': chartsharinggroupID, 'patientid': patientID}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    if res.status_code == '':
        return 
    return res  

def get_procedure(url, practiceID, brandID, chartsharinggroupID, token):
    return get_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, token)  

def get_vital_signs(url, practiceID, brandID, chartsharinggroupID, vitalID, token):
    return get_FHIR_resource(url, practiceID, brandID, chartsharinggroupID, vitalID, token)  



# <- Function mapping ->
# Dictionary that maps keys (strings) to lambda functions
key_func_mapping = {
    'Sex':
        lambda data: get_sex(data['url'], data['practiceID'], data['token']),
    'Racecode.race':
        lambda data: get_racecode(data['url'], data['practiceID'], data['token']),
    'Marital.status':
        lambda data: get_medication(data['url'], data['practiceID'], data['token']),
    'medication':
        lambda data: get_medication(data['url'], data['practiceID'], data['departmentID'], data['medicationID'], data['token']),
    'Diagnosis':
        lambda data: get_diagnosis(data['url'], data['practiceID'], data['departmentID'], data['labresultID'], data['token']),
    'Procedure':
        lambda data: get_procedure(data['url'], data['practiceID'], data['brandID'], data['chartsharinggroupID'], data['token']),
    'Encounter':
        lambda data: get_encounter(data['url'], data['practiceID'], data['departmentID'], data['token']),
    'Document.reference':
        lambda data: get_document_reference(data['url'], data['practiceID'], data['departmentID'], data['token']),
    'Medication.statement':
        lambda data: get_medication_statement(data['url'], data['practiceID'], data['brandID'], data['chartsharinggroupID'], data['token']),
    'Condition':
        lambda data: get_condition(data['url'], data['practiceID'], data['brandID'], data['chartsharinggroupID'], data['token']),
    'Patient':
        lambda data: get_diagnosis(data['url'], data['practiceID'], data['departmentID'], data['labresultID'], data['token']),
    'Immunization':
        lambda data: get_immunization(data['url'], data['practiceID'], data['departmentID'], data['token']),
    'Procedure':
        lambda data: get_procedure(data['url'], data['practiceID'], data['brandID'], data['chartsharinggroupID'], data['token']),
    'Vital.signs':
        lambda data: get_vital_signs(data['url'], data['practiceID'], data['brandID'], data['chartsharinggroupID'], data['vitalID'], data['token']),
    'AllergyIntolerance':
        lambda data: get_allergy_intolerance(data['url'], data['practiceID'], data['token']),
    
}

# Handler to utilize the function mapping
def get_handler(key, data):
    func = key_func_mapping.get(key, None)

    if func is None:
        return get_error_code('Resource key not found')
    return func(data)



result = get_access_token()
content = result.content.decode("UTF-8")
data = ast.literal_eval(content)
print(" Token from the authorization ", result.status_code, data['access_token'])

