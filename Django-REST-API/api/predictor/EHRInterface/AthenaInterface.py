# Scripts to request resources from Athena FHIR server should be written here.

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
import http.client
import urllib.request
import urllib.parse
import urllib.error
import base64


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




eq_to_str('POST', url, headers, params=payload))
    return res

# Generate JWT to present to server for authorization
def generateAthenaJWT():
    curr_time = int(datetime.datetime.utcnow().timestamp())
    private_key = ""
    }
    token = jwt.encode(payload=payload, headers=headers, key=private_key, algorithm='RS384')
    return token


# <- Integrations ->

def fetch_allergy_intolerance(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

def fetch_allergy_intolerance_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)


def fetch_care_plan(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_condition(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_condition_search(url, patientID, token, category=None, encounter=None):
    if category is None and encounter is None:
        return fetch_patient_resource(url, patientID, token)
    if category is None:
        return get_error_code('To search patient conditions, a `category` parameter is required.')

    headers = get_headers(token)
    payload = {'category': category}

    if encounter is not None:
        payload['encounter'] = encounter
    
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_diagnostic_report(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_diagnostic_report_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)


def fetch_document_reference_search(url, patientID, type_, token):
    payload = {'patient': patientID, 'type': type_}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_encounter_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)


def fetch_immunization(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)



def fetch_medication_order_search(url, patientID, token, status=None):
    payload = {'patient': patientID}
    headers = get_headers(token)

    if status is not None:
        payload['status'] = status

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_medication_request_search(url, patientID, token, status=None):
    return fetch_medication_order_search(url, patientID, token, status)


def fetch_medication_statement_search(url, patientID, token, status=None):
    return fetch_medication_order_search(url, patientID, token, status)


def fetch_observation_search(url, patientID, token, category):
    payload = {'patient': patientID, 'category': category}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_patient(url, patientID, token):
    return fetch_FHIR_resource(url, patientID, token)

def fetch_procedure_search(url, patientID, token, date=None):
    if date is None:
        return fetch_patient_resource(url, patientID, token)

    payload = {'patient': patientID, 'date': date}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_procedure_request_search(url, patientID, token, status):
    return fetch_medication_order_search(url, patientID, token, status)



# Handler to utilize the function mapping
def fetch_handler(key, data):
    func = key_func_mapping.get(key, None)

    if func is None:
        return get_error_code('Resource key not found')
    return func(data)

'''
 * Use: Fetch multiple patient data using multithreading
 * Input: Array of (key, object) pairs reflecting (resource type, request data)
 * Output: List of available patient data as requests.py responses
'''
# array of ('event' , {url, id, token, category}) tuples
def fetch_all_patient_data(pairs):
    threads = []
    results = []

    with ThreadPoolExecutor(max_workers=20) as executor:
        for (key, params) in pairs:
            threads.append(executor.submit(fetch_handler, key, params))

        for task in as_completed(threads):
            try:
                results.append(task.result())
                print(task.result())
            except requests.ConnectTimeout:
                results.append(get_error_code('Resource timed out'))
                print('Resource timed out')

    return results


def fetch_adverse_event(url, resourceID, token):
    print(f"fetch_adverse_event({url}, {resourceID}, {token})")
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_adverse_event_search(url, subject, token, study):
    payload = {'subject': subject, 'study': study}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_appointment(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_binary_document(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_body_structure(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_body_structure_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)


def fetch_care_plan_search(url, patientID, token, category=None, activity_date=None, encounter=None):
    if category is None and activity_date is None:
        return fetch_patient_resource(url, patientID, token)

    payload = {'patient': patientID, 'category': category, 'activity-date': activity_date}

    if encounter is not None:
        payload = {'patient': patientID, 'category': category, 'encounter': encounter}
    if activity_date is None:
        payload = {'patient': patientID, 'category': category}
    if category is None:
        payload = {'patient': patientID, 'activity-date': activity_date}

    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_care_team(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_care_team_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)


def fetch_communication(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_communication_search(url, token, part_of=None, subject=None):
    if part_of is None and subject is None:
        return get_error_code('At least one query parameter is required.')

    headers = get_headers(token)
    payload = {'subject': subject}
    if subject is not None and part_of is not None:
        payload = {'part-of': part_of, 'subject': subject}
    elif part_of is not None:
        payload = {'part-of': part_of}

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

#source
#https://docs.athenahealth.com/api/guides/authentication-and-url-locations

class AthenaAPIConnection(object):
    
    
    def __init__(self, version, key, secret, practiceid):
        """
        Connect to API
        """
        auth_str = {
            'v1': '/oauth',
            'preview': '/oauthpreview',
            'openpreview': '/oauthopenpreview',
        }
    
        self.version = version.strip('/') 
        self.connection = http.client.HTTPSConnection('api.athenahealth.com')
        self.secret = secret
        self.key = key
        self.practiceid = practiceid
        

    # <- Authorization ->

    def validate(self):
        path = self.auth_url + '/token'
        self.token = valid['access_token']


    def get_token(self):
        """
        Get access token.
        """ 
        return self._token