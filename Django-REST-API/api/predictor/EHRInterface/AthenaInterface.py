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
 * client
 * practiceID = For our testing purposes we will be using a test practice ID provided by Athena health
 * Output: request.py response object
'''


# Authorization section

def get_patient(url, patientID, token):
    payload = {'patient': patientID}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

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
    return get_patient(url, practiceID, token)

def get_racecode(url, practiceID, token):
    return get_patient(url, practiceID, token)    

def get_maritalstatus(url, practiceID, token):
    return get_patient(url, practiceID, token)    

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

def get_headers(token):
  return {'Authorization': f'Bearer {token}', 'Accept': 'application/json'}

def get_error_code(message):
    return {'status_code': 404, 'message': message}



result = get_access_token()
content = result.content.decode("UTF-8")
data = ast.literal_eval(content)
print(" Token from the authorization ", data['access_token'])



