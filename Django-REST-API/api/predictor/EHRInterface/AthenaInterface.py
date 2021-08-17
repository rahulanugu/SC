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

from requests.models import DecodeError



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

# def get_patient(url, patientID, token):
#     payload = {'patient': patientID}
#     headers = get_headers(token)

#     res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
#     return res

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

# https://docs.athenahealth.com/api/sandbox#/Patient/getPracticeidPatients
def get_sex(url, practiceID, token):
    url = url + '/' + str(practiceID) + '/patients'
    payload = {'practiceID' : practiceID}
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# Following functions might not be required, since the previous one 
def get_racecode(url, practiceID, token):
    return get_patient(url, practiceID, token)    

def get_maritalstatus(url, practiceID, token):
    return get_patient(url, practiceID, token)    

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidDepartmentidFhirDstu2MedicationMedicationid
def get_medication(url, practiceID, departmentID, medicationID, token):
    url = url + '/' + practiceID + '/' + departmentID + '/fhir/dstu2/Medication/' + medicationID
    payload = {'practiceid': practiceID, 'departmentid': departmentID, 'medicationid': medicationID}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidBrandidChartsharinggroupidFhirDstu2DiagnosticReport
def get_diagnosis(url, practiceID, brandID, chartsharinggroupID, token):
    url = url + '/' + practiceID + brandID + chartsharinggroupID + '/fhir/dstu2/DiagnosticReport'
    payload = {'practiceid': practiceID, 'brandid' : brandID, 'chartsharinggroupid' :chartsharinggroupID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res    

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidDepartmentidFhirDstu2Procedure
def get_procedure(url, practiceID, departmentID, token):
    url = url + '/' + practiceID + departmentID + 'fhir/dstu2/Procedure'
    payload = {'practiceid': practiceID, 'departmentid' : departmentID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res
    
# https://docs.athenahealth.com/api/sandbox#/Encounter/getPracticeidDepartmentidFhirDstu2Encounter
def get_encounter(url, practiceID, departmentID, token):
    url = url + '/' + practiceID + departmentID + '/fhir/dstu2/Encounter'
    payload = {'practiceid': practiceID, 'departmentid' : departmentID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res    

# https://docs.athenahealth.com/api/sandbox#/Documents%20and%20Forms/getPracticeidDepartmentidFhirDstu2DocumentReference
def get_document_reference(url, practiceID, departmentID, token):
    url = url + '/' + practiceID + departmentID + 'fhir/dstu2/DocumentReference'
    payload = {'practiceid': practiceID, 'departmentid' : departmentID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res    

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidDepartmentidFhirDstu2MedicationStatement
def get_medication_statement(url, practiceID, departmentID, token):
    url = url + '/' + practiceID + departmentID + 'fhir/dstu2/MedicationStatement'
    payload = {'practiceid': practiceID, 'departmentid' : departmentID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res    

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidDepartmentidFhirDstu2Condition
def get_condition(url, practiceID, departmentID, token):
    url = url + '/' + practiceID + departmentID + 'fhir/dstu2/Condition'
    payload = {'practiceid': practiceID, 'departmentid' : departmentID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res    

# https://docs.athenahealth.com/api/sandbox#/Patient/getPracticeidPatients
def get_patient(url, practiceID, token):
    url = url + '/' + str(practiceID) + '/patients'
    payload = {'practiceID' : practiceID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res    

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidDepartmentidFhirDstu2AllergyIntolerance
def get_allergy_intolerance(url, practiceID, departmentID, token):
    url = url + '/' + practiceID + departmentID + '/fhir/dstu2/AllergyIntolerance'
    payload = {'practiceID' : practiceID, 'departmentid' : departmentID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res    

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidDepartmentidFhirDstu2Immunization
def get_immunization(url, practiceID, departmentID, token):
    url = url + '/' + practiceID + '/' + departmentID + '/fhir/dstu2/Immunization'
    payload = {'practiceid': practiceID, 'departmentid' : departmentID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res   

# https://docs.athenahealth.com/api/sandbox#/Chart/getPracticeidDepartmentidFhirDstu2ObservationVital-vitalid
def get_vital_signs(url, practiceID, patientID, departmentID, vitalID, token):
    url = url + '/' + practiceID + '/' + departmentID + '/fhir/dstu2/Observation/Vital-' + vitalID
    payload = {'practiceid': practiceID, 'patientid' : patientID, 'departmentid' : departmentID, 'vitalid' : vitalID}
    token = get_access_token()
    content = token.content.decode("UTF-8")
    data = ast.literal_eval(content)
    print(" Access token ", token)
    headers = get_headers(token)
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res 

def get_headers(token):
  return {'Authorization': 'Bearer ' + token, 'Accept': 'application/json'}

def get_error_code(message):
    return {'status_code': 404, 'message': message}



print(" Testing get patient sex api ")
url = 'https://api.preview.platform.athenahealth.com/v1'
token = get_access_token()
content = token.content.decode("UTF-8")
data = ast.literal_eval(content)
print(" Access token ", token)
result = get_sex(str(url), 1128700, data['access_token'])
print(" Result from the api call is ", result)
# result = get_access_token()
# content = result.content.decode("UTF-8")
# data = ast.literal_eval(content)
# print(" Token from the authorization ", data['access_token'])



