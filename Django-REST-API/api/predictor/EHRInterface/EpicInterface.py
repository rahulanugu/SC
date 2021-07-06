'''
John Whiteside - branch jdw
'''


import requests
from futures3.thread import ThreadPoolExecutor
from futures3 import as_completed
import jwt
import datetime
from cryptography import x509
import time
from pprint import pprint
import json
import os
import subprocess
import uuid
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography import x509
# from predictor.EHRInterface import mmlrestclient as mml

# Token needs to come from FE ?? <- why if we are using server-to-server OAuth2?
TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoibE91eEk5bXlvZVhXWVFIdEhmNk1nYjRuUmQ3Nm54clg5bkhBZ1ZsLWxQMEJoXzFQXzhLeUVOd0RVM1FpNUdkNm94clhJdmdsVC04dG0yNEUxQS1HZ2htQ3M3ZENNRzhnNnRaSjJVdTlrTHBZVkx3S19EdmlET2wyaVExQ0VlcWEiLCJlcGljLnRva2VudHlwZSI6ImFjY2VzcyIsImV4cCI6MTU5NzA4MjI0OCwiaWF0IjoxNTk3MDc4NjQ4LCJpc3MiOiJ1cm46b2lkOmZoaXIiLCJqdGkiOiJjNWE3YjBlMi1hODA0LTRkYTAtYTcxOC01Zjg3NTM3YWZkODAiLCJuYmYiOjE1OTcwNzg2NDgsInN1YiI6ImV4Zm82RTRFWGpXc25oQTFPR1ZFbGd3MyJ9.TvYRTcXpd3J_VbKpgAClRHKkAw7GCGUMEA9pKC6B4cpj5PBlOmmnJxxgAr4-m7qKQ8UFH4osLGxyCdmCkMN6VIo2qtfcXeHSW8UcC3F5vpsDDU86XuE9aifKTJ-Hk-Nr1OoT7btW8jjV5wfqh0yaR6w47a7Z7JOFd9ndj3AHfQDGE7wgoPeoCaQxtjRBIIO3uO-DMhB9RZv8R092pBfWb1zpMZZeLS9vqbHEhDygXhvis7yqcuHGW4n34Y_hdj_nSLkA04SDXbqpXOLDFT0lbKSmMjBXjH8a3uvIi1N0a0cY4O8U7X3kOnTkq8vdPhRjZAn0CPDFh5Okim4LNcJ8CQ'
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
 *
 * Output: request.py response object
'''

# <- Authorization ->

# Fetch OAuth 2.0 Backend bearer token for system-level authorization
# https://fhir.epic.com/Documentation?docId=oauth2&section=BackendOAuth2Guide
def fetch_access_token(jwtToken):
    url = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token'
    payload = {
        'grant_type': 'client_credentials',
        'client_assertion_type': 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        'client_assertion': jwtToken
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    res = requests.post(url=url, data=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# Generate JWT to present to server for authorization
# https://fhir.epic.com/Documentation?docId=oauth2&section=Backend-Oauth2_Getting-Access-Token
def generateEpicJWT():
    curr_time = int(datetime.datetime.utcnow().timestamp())
    private_key = b"-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
    headers = {
        'alg': 'RS384',
        'typ': 'JWT'
    }
    payload = {
        'iss': 'CLIENT_ID',
        'sub': 'CLIENT_ID',
        'aud': 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
        'jti': str(uuid.uuid1()),
        'exp': curr_time + 300,
        'nbf': curr_time,
        'iat': curr_time
    }
    token = jwt.encode(payload=payload, headers=headers, key=private_key, algorithm='RS384')
    return token
  

# <- Request helpers ->

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


# <- Integrations ->

# https://fhir.epic.com/Sandbox?api=1, https://fhir.epic.com/Sandbox?api=946, https://fhir.epic.com/Sandbox?api=464
def fetch_allergy_intolerance(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=2, https://fhir.epic.com/Sandbox?api=947, https://fhir.epic.com/Sandbox?api=465
def fetch_allergy_intolerance_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.epic.com/Sandbox?api=10016, https://fhir.epic.com/Sandbox?api=1066, https://fhir.epic.com/Sandbox?api=4, https://fhir.epic.com/Sandbox?api=10101, https://fhir.epic.com/Sandbox?api=10043, https://fhir.epic.com/Sandbox?api=1064, https://fhir.epic.com/Sandbox?api=10073, https://fhir.epic.com/Sandbox?api=10045, https://fhir.epic.com/Sandbox?api=10022
def fetch_care_plan(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=468, https://fhir.epic.com/Sandbox?api=951, https://fhir.epic.com/Sandbox?api=6, https://fhir.epic.com/Sandbox?api=984, https://fhir.epic.com/Sandbox?api=1074, https://fhir.epic.com/Sandbox?api=950, https://fhir.epic.com/Sandbox?api=10066, https://fhir.epic.com/Sandbox?api=10047
def fetch_condition(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=10048, https://fhir.epic.com/Sandbox?api=10067, https://fhir.epic.com/Sandbox?api=952, https://fhir.epic.com/Sandbox?api=469, https://fhir.epic.com/Sandbox?api=1075, https://fhir.epic.com/Sandbox?api=985, https://fhir.epic.com/Sandbox?api=7, https://fhir.epic.com/Sandbox?api=953
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

# https://fhir.epic.com/Sandbox?api=988
def fetch_diagnostic_report(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=11, https://fhir.epic.com/Sandbox?api=989, https://fhir.epic.com/Sandbox?api=843
def fetch_diagnostic_report_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.epic.com/Sandbox?api=1048, https://fhir.epic.com/Sandbox?api=865
def fetch_document_reference_search(url, patientID, type_, token):
    payload = {'patient': patientID, 'type': type_}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=909, https://fhir.epic.com/Sandbox?api=472
def fetch_encounter_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

# https://fhir.epic.com/Sandbox?api=1070
def fetch_immunization(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=26
def fetch_medication_order_search(url, patientID, token, status=None):
    payload = {'patient': patientID}
    headers = get_headers(token)

    if status is not None:
        payload['status'] = status

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=997, https://fhir.epic.com/Sandbox?api=491
def fetch_medication_request_search(url, patientID, token, status=None):
    return fetch_medication_order_search(url, patientID, token, status)

# https://fhir.epic.com/Sandbox?api=339, https://fhir.epic.com/Sandbox?api=493
def fetch_medication_statement_search(url, patientID, token, status=None):
    return fetch_medication_order_search(url, patientID, token, status)

# https://fhir.epic.com/Sandbox?api=969, https://fhir.epic.com/Sandbox?api=854, https://fhir.epic.com/Sandbox?api=28, https://fhir.epic.com/Sandbox?api=999, https://fhir.epic.com/Sandbox?api=495, https://fhir.epic.com/Sandbox?api=970, https://fhir.epic.com/Sandbox?api=899, https://fhir.epic.com/Sandbox?api=971, https://fhir.epic.com/Sandbox?api=882, https://fhir.epic.com/Sandbox?api=448, https://fhir.epic.com/Sandbox?api=972, https://fhir.epic.com/Sandbox?api=856, https://fhir.epic.com/Sandbox?api=450, https://fhir.epic.com/Sandbox?api=973, https://fhir.epic.com/Sandbox?api=498
def fetch_observation_search(url, patientID, token, category):
    payload = {'patient': patientID, 'category': category}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=29, https://fhir.epic.com/Sandbox?api=931, https://fhir.epic.com/Sandbox?api=825
def fetch_patient(url, patientID, token):
    return fetch_FHIR_resource(url, patientID, token)

# https://fhir.epic.com/Sandbox?api=34, https://fhir.epic.com/Sandbox?api=940, https://fhir.epic.com/Sandbox?api=10042, https://fhir.epic.com/Sandbox?api=10030
def fetch_procedure_search(url, patientID, token, date=None):
    if date is None:
        return fetch_patient_resource(url, patientID, token)

    payload = {'patient': patientID, 'date': date}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=887
def fetch_procedure_request_search(url, patientID, token, status):
    return fetch_medication_order_search(url, patientID, token, status)

# --- Concurrency Features ---

'''
 * Use: Handle data fetching by mapping input to proper endpoint
 * Input: key indicating resource type, object containing requests data
 * Output: List of available patient data as requests.py responses
 *   Available keys: (* TO DO)
        AllergyIntolerance.Read
        AllergyIntolerance.Search
        CarePlan.Read
        Condition.Read 
        Condition.Search
        DiagnosticReport.Read 
        DiagnosticReport.Search
        DocumentReference.Search 
        Encounter.Search
        Immunization.Read 
        MedicationOrder.Search
        MedicationRequest.Search
        MedicationStatement.Search
        Observation.Search
        Patient.Read
        Procedure.Search
        ProcedureRequest.Search
'''
# <- Function mapping ->
# Dictionary that maps keys (strings) to lambda functions
key_func_mapping = {
    'AllergyIntolerance.Read':
        lambda data: fetch_allergy_intolerance(data['url'], data['resourceID'], data['token']),
    'AllergyIntolerance.Search':
        lambda data: fetch_allergy_intolerance_search(data['url'], data['patientID'], data['token']),
    'CarePlan.Read':
        lambda data: fetch_care_plan(data['url'], data['resourceID'], data['token']),
    'Condition.Read':
        lambda data: fetch_condition(data['url'], data['resourceID'], data['token']),
    'Condition.Search':
        lambda data: fetch_condition_search(data['url'], data['patientID'], data['token'], data.get('category', None), data.get('encounter', None)),
    'DiagnosticReport.Read':
        lambda data: fetch_diagnostic_report(data['url'], data['resourceID'], data['token']),
    'DiagnosticReport.Search':
        lambda data: fetch_diagnostic_report_search(data['url'], data['patientID'], data['token']),
    'DocumentReference.Search':
        lambda data: fetch_document_reference_search(data['url'], data['patientID'], data['type'], data['token']),
    'Encounter.Search':
        lambda data: fetch_encounter_search(data['url'], data['patientID'], data['token']),
    'Immunization.Read':
        lambda data: fetch_immunization(data['url'], data['resourceID'], data['token']),
    'MedicationOrder.Search':
        lambda data: fetch_medication_order_search(data['url'], data['patientID'], data['token'], data.get('status', None)),
    'MedicationRequest.Search':
        lambda data: fetch_medication_request_search(data['url'], data['patientID'], data['token'], data.get('status', None)),
    'MedicationStatement.Search':
        lambda data: fetch_medication_statement_search(data['url'], data['patientID'], data['token'], data.get('status', None)),
    'Observation.Search':
        lambda data: fetch_observation_search(data['url'], data['patientID'], data['token'], data['category']),
    'Patient.Read':
        lambda data: fetch_patient(data['url'], data['patientID'], data['token']),
    'Procedure.Search':
        lambda data: fetch_procedure_search(data['url'], data['patientID'], data['token'], data.get('date', None)),
    'ProcedureRequest.Search':
        lambda data: fetch_procedure_request_search(data['url'], data['patientID'], data['token'], data.get('status', None))
}

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


# --- Tests ---

pairs = [
  ['AdverseEvent.Read', {
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AdverseEvent/', 
      'resourceID': 'eBrj0mrZZ9-WmgLrAXW.ZQmF3xBGWbDn1vkbtSszAQnY3',
      'token': TOKEN }
    ],
  ['AdverseEvent.Search', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AdverseEvent/', 
      'subject': 'eea8Msv-9WjX-ffbBcv-4rw3',
      'token': TOKEN,
      'study': 'eAO.XWJpIicOp3xl5CLneUQ3' }
    ],
  ['AllergyIntolerance.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance/', 
      'resourceID': 'eeJxm9Vi8-QmUQuWDhBMklw3',
      'token': TOKEN }
    ],
  ['AllergyIntolerance.Search', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance/', 
      'patientID': 'e06xbT0QqabCKCMIqZo98DA3',
      'token': TOKEN }
    ],
  ['Appointment.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Appointment/', 
      'resourceID': 'e3snc6SrCHi1PVOB5rkVvVqvlJgecR4RzazTZuc2UMqA3',
      'token': TOKEN }
  ],
  ['Binary.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Binary/', 
      'resourceID': 'eibaYRQF6yVTF.5R2n92hhMhIzS.lJx9doPV5HgjIawc3',
      'token': TOKEN }
  ],
  ['BodyStructure.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/BodyStructure/', 
      'resourceID': 'eU1gdcwFZyKjNGyBZhKh989YxW3fhmjvviCKYH.RTCBw3',
      'token': TOKEN }
  ],
  ['BodyStructure.Search', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/BodyStructure/', 
      'patientID': 'erOOucv8EeF9xNKxjL..kSQ3',
      'token': TOKEN }
  ],
  ['CarePlan.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CarePlan/', 
      'resourceID': 'ezv8muakDf.OWIZFA0VeHykcwagO7gUw-Qo7tjhIjW7qyR.Sb9PDuVIqsXy8702ujMTksxNKECrRrtU361qN4fg3',
      'token': TOKEN }
  ],
  ['CarePlan.Search', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CarePlan/', 
      'patientID': 'e-NoAZ0ctgfeTYD.aaecWQQ3',
      'token': TOKEN }
  ],
  ['CareTeam.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CareTeam/', 
      'resourceID': 'eKDCE-jKkMA4JxZ3pJbu.ww3',
      'token': TOKEN }
  ],
  ['CareTeam.Search', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CareTeam/', 
      'patientID': 'ee7NTBargpnWU-MaI95A5fA3',
      'token': TOKEN }
  ],
  ['Communication.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Communication/', 
      'resourceID': 'eQtjP5dExSGL8QY3jIixZo0TrO52tQfNEGkoWTOJdWCU3',
      'token': TOKEN }
  ],
  ['Communication.Search', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Communication/', 
      'part_of': 'e-NoAZ0ctgfeTYD.aaecWQQ3',
      'token': TOKEN }
  ],
  ['Condition.Read', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition/', 
      'resourceID': 'eG0hRQR7MUQBcS.AfHqMYXQ3',
      'token': TOKEN }
  ],
  ['Condition.Search', { 
      'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition/', 
      'patientID': 'ezHbeFCm6Ih8kgxuHUAdvJQ3',
      'category': 'problem-list-item',
      'token': TOKEN }
  ]
]

# Simple authorization flow -> not what we want, just for testing
def basic_auth_test():
    url = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize'
    payload = {
      'response_type': 'code',
      'redirect_uri': 'http://localhost:8080',
      'client_id': '33e2328e-a640-41b3-85b6-369e2106adca',
      'state': 'first-test'
    }

    res = requests.post(url=url,  data=payload, timeout=DEFAULT_TIMEOUT)
    return res


jwtToken = generateEpicJWT()
tokenRes = fetch_access_token(jwtToken)

print(jwtToken)
print(tokenRes)
print(tokenRes.json())

# <- Unneeded integrations ->

# https://fhir.epic.com/Sandbox?api=981
def fetch_adverse_event(url, resourceID, token):
    print(f"fetch_adverse_event({url}, {resourceID}, {token})")
    return fetch_FHIR_resource(url, resourceID, token)

#  https://fhir.epic.com/Sandbox?api=982
def fetch_adverse_event_search(url, subject, token, study):
    payload = {'subject': subject, 'study': study}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=466
def fetch_appointment(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=1044, https://fhir.epic.com/Sandbox?api=3, https://fhir.epic.com/Sandbox?api=841, https://fhir.epic.com/Sandbox?api=983
def fetch_binary_document(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=10068
def fetch_body_structure(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=10069
def fetch_body_structure_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)


# https://fhir.epic.com/Sandbox?api=10017, https://fhir.epic.com/Sandbox?api=1067, https://fhir.epic.com/Sandbox?api=5, https://fhir.epic.com/Sandbox?api=10102, https://fhir.epic.com/Sandbox?api=10044, https://fhir.epic.com/Sandbox?api=1065, https://fhir.epic.com/Sandbox?api=10074, https://fhir.epic.com/Sandbox?api=10046, https://fhir.epic.com/Sandbox?api=10028
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


# https://fhir.epic.com/Sandbox?api=1068
def fetch_care_team(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


# https://fhir.epic.com/Sandbox?api=1069
def fetch_care_team_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)


# https://fhir.epic.com/Sandbox?api=10088
def fetch_communication(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


# https://fhir.epic.com/Sandbox?api=10089
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

old_key_func_mapping = {
    'AdverseEvent.Read':
        lambda data: fetch_adverse_event(data['url'], data['resourceID'], data['token']),
    'AdverseEvent.Search':
        lambda data: fetch_adverse_event_search(data['url'], data['patientID'], data['token'], data['study']),
    'Appointment.Read':
        lambda data: fetch_appointment(data['url'], data['resourceID'], data['token']),
    'Binary.Read':
        lambda data: fetch_binary_document(data['url'], data['resourceID'], data['token']),
    'BodyStructure.Read':
        lambda data: fetch_body_structure(data['url'], data['resourceID'], data['token']),
    'BodyStructure.Search':
        lambda data: fetch_body_structure_search(data['url'], data['patientID'], data['token']),
    'CarePlan.Search':
        lambda data: fetch_care_plan_search(data['url'], data['patientID'], data['token'], data.get('category', None), data.get('activity_date', None), data.get('encounter', None)),
    'CareTeam.Read':
        lambda data: fetch_care_team(data['url'], data['resourceID'], data['token']),
    'CareTeam.Search':
        lambda data: fetch_care_team_search(data['url'], data['patientID'], data['token']),
    'Communication.Read':
        lambda data: fetch_communication(data['url'], data['resourceID'], data['token']),
    'Communication.Search':
        lambda data: fetch_communication_search(data['url'], data['token'], data.get('part_of', None), data.get('subject', None)),
}

# ---  Prev dev (deprecated) ---

'''
# Parse medications from file into application interpretable format
def parseMedications(text):
    f = open('./predictor/test/test.txt', 'w')
    f.write(text)
    f.close()
    output = mml.main()
    content_arr = output.splitlines()
    matchingmedic=[]
    medications = ['phsu', 'antb', 'orch', 'inch', 'imft', 'topp', 'clnd']
    for medic in medications:
        matchingmedic = [s for s in content_arr if medic in s]
    return matchingmedic

# Parse notes from file into application interpretable format
def parseNotes(text):
    f = open('./predictor/test/test.txt', 'w')
    f.write(text)
    f.close()
    output = mml.main()
    content_arr = output.splitlines()
    matching=[]
    doc_notes = ['acab','anab','comd','cgab','dsyn','inpo','mobd','neop','sosy']
    for note in doc_notes:
        matching = [e for e in content_arr if note in e]
    return matching
  '''