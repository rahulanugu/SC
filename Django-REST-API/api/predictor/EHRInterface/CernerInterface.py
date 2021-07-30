# Scripts to request resources from Cerner FHIR server should be written here.
'''
John Whiteside - branch jdw
'''

import requests
from predictor.EHRInterface.concurr import fetch_all_patient_data as _fetch
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
import base64


# --- EHR Integrations ---

DEFAULT_TIMEOUT = 5

# <- Request helpers ->

def get_headers(token):
  return {'Authorization': f'Basic {token}', 'Accept': 'application/json+fhir'}

def get_error_code(message):
    return {'status_code': 404, 'message': message}

def fetch_FHIR_resource(url, resourceID, token):
    full_url = url + resourceID
    headers = get_headers(token)

    res = requests.get(url=full_url, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

def fetch_patient_resource(url, patientID, token):
    payload = {'patient': patientID}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

def dict_to_query(dictn, sep='=', line=''):
    line = '\n' if line == 'new' else '&'
    res = ''

    if dictn is not None:
        for item in dictn.items():
            res += f'{item[0]}{sep}{item[1]}{line}'
        res = res[:-1] + '\n'
    return res

def http_req_to_str(req_type, url, headers=None, params=None, body=None):
    return f'{req_type} {url} HTTP/1.1\n{dict_to_query(headers, ": ", line="new")}\n{dict_to_query(params)}{dict_to_query(body)}'

def b64_encode_str(s):
    message_bytes = s.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes)
    base64_s = base64_bytes.decode('ascii')
    return base64_s

# <- Authorization ->
# Generate auth token, for requesting bearer token for Basic auth
def generateToken():
    client_id = ''
    secret = ''
    concat = f"{client_id}:{secret}"
    return b64_encode_str(concat)

# Use system-level auth offered by Cerner

# <- Integrations ->
'''
 Inputs:
 url:         URL endpoint  - resource endpoint
 patientID:   URL param     - patient id
 token:       Header        - JWT auth token

 Output: request.py response object
'''

# https://fhir.cerner.com/millennium/dstu2/general-clinical/allergy-intolerance/
def fetch_allergy_intolerance(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/r4/clinical/care-provision/care-plan/
def fetch_care_plan(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/dstu2/general-clinical/condition/
def fetch_condition(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/dstu2/diagnostic/diagnostic-report/
def fetch_diagnostic_report(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/r4/foundation/documents/document-reference/
def fetch_document_reference(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/dstu2/encounters/encounter/
def fetch_encounter(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/dstu2/medications/immunization/
def fetch_immunization(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/r4/clinical/medications/medication-request/
def fetch_medication_request(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/r4/clinical/diagnostics/observation/
def fetch_observation(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/r4/base/individuals/patient/
def fetch_patient(url, patientID, token):
    return fetch_FHIR_resource(url, patientID, token)

# https://fhir.cerner.com/millennium/r4/clinical/summary/procedure/
def fetch_procedure(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# --- Concurrency Features ---

'''
 Use: Function mapping
 Input: key indicating resource type, object containing requests data
 Output: List of available patient data as requests.py responses
   Available keys: (* TO DO)
      AllergyIntolerance
      Condition
      CarePlan
      DiagnosticReport 
      DocumentReference
      Encounter.type
      Encounter.priority
      Immunization
      MedicationRequest
      Observation
      Patient
      Procedure
'''
# <- Function mapping ->
# Dictionary that maps keys (strings) to lambda functions
key_func_mapping = {
    'AllergyIntolerance':
        lambda data: fetch_allergy_intolerance(data['url'], data['patientID'], data['token']),
    'Condition':
        lambda data: fetch_condition(data['url'], data['patientID'], data['token']),
    'CarePlan':
        lambda data: fetch_care_plan(data['url'], data['patientID'], data['token']),
    'DiagnosticReport':
        lambda data: fetch_diagnostic_report(data['url'], data['patientID'], data['token']),
    'DocumentReference':
        lambda data: fetch_document_reference(data['url'], data['patientID'], data['token']),
    'Encounter':
        lambda data: fetch_encounter(data['url'], data['patientID'], data['token']),
    'Immunization':
        lambda data: fetch_immunization(data['url'], data['patientID'], data['token']),
    'MedicationRequest':
        lambda data: fetch_medication_request(data['url'], data['patientID'], data['token']),
    'Observation':
        lambda data: fetch_observation(data['url'], data['patientID'], data['token']),
    'Patient':
        lambda data: fetch_patient(data['url'], data['patientID'], data['token']),
    'Procedure':
        lambda data: fetch_procedure(data['url'], data['patientID'], data['token'])
}

'''
 Use: Handle data fetching by mapping input to proper endpoint
 Input: key indicating resource type, object containing requests data
 Output: List of available patient data as requests.py responses
'''
def fetch_handler(key, data):
    func = key_func_mapping.get(key, None)

    if func is None:
        return get_error_code('Resource key not found')
    return func(data)


# --- Tests ---

TOKEN = generateToken()

pairs = [
  ['AllergyIntolerance', { 
      'url': 'https://fhir-open.cerner.com/r4/${rootURL}/AllergyIntolerance', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['Condition', { 
      'url': 'https://fhir-open.cerner.com/dstu2/${rootURL}/Condition', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['CarePlan', { 
      'url': 'https://fhir-open.cerner.com/r4/${rootURL}/CarePlan', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['DiagnosticReport', { 
      'url': 'https://fhir-open.cerner.com/r4/${rootURL}/DiagnosticReport', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['DocumentReference', { 
      'url': 'https://fhir-open.cerner.com/dstu2/${rootURL}/DocumentReference', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['Encounter', { 
      'url': 'https://fhir-open.cerner.com/r4/${rootURL}/Encounter', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['Immunization', { 
      'url': 'https://fhir-open.cerner.com/dstu2/${rootURL}/Immunization', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['MedicationRequest', { 
      'url': 'https://fhir-open.cerner.com/r4/${rootURL}/MedicationRequest', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['Observation', { 
      'url': 'https://fhir-open.cerner.com/dstu2/${rootURL}/Observation', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['Patient', { 
      'url': 'https://fhir-open.cerner.com/r4/${rootURL}/Patient', 
      'patientID': '12724066',
      'token': TOKEN }
  ],
  ['Procedure', { 
      'url': 'https://fhir-open.cerner.com/dstu2/${rootURL}/Procedure', 
      'patientID': '12724066',
      'token': TOKEN }
  ]
]

data = _fetch(pairs, fetch_handler)
print(data)