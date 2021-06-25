import requests
from pprint import pprint
import json
import os
import subprocess
from predictor.EHRInterface import mmlrestclient as mml


token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoibE91eEk5bXlvZVhXWVFIdEhmNk1nYjRuUmQ3Nm54clg5bkhBZ1ZsLWxQMEJoXzFQXzhLeUVOd0RVM1FpNUdkNm94clhJdmdsVC04dG0yNEUxQS1HZ2htQ3M3ZENNRzhnNnRaSjJVdTlrTHBZVkx3S19EdmlET2wyaVExQ0VlcWEiLCJlcGljLnRva2VudHlwZSI6ImFjY2VzcyIsImV4cCI6MTU5NzA4MjI0OCwiaWF0IjoxNTk3MDc4NjQ4LCJpc3MiOiJ1cm46b2lkOmZoaXIiLCJqdGkiOiJjNWE3YjBlMi1hODA0LTRkYTAtYTcxOC01Zjg3NTM3YWZkODAiLCJuYmYiOjE1OTcwNzg2NDgsInN1YiI6ImV4Zm82RTRFWGpXc25oQTFPR1ZFbGd3MyJ9.TvYRTcXpd3J_VbKpgAClRHKkAw7GCGUMEA9pKC6B4cpj5PBlOmmnJxxgAr4-m7qKQ8UFH4osLGxyCdmCkMN6VIo2qtfcXeHSW8UcC3F5vpsDDU86XuE9aifKTJ-Hk-Nr1OoT7btW8jjV5wfqh0yaR6w47a7Z7JOFd9ndj3AHfQDGE7wgoPeoCaQxtjRBIIO3uO-DMhB9RZv8R092pBfWb1zpMZZeLS9vqbHEhDygXhvis7yqcuHGW4n34Y_hdj_nSLkA04SDXbqpXOLDFT0lbKSmMjBXjH8a3uvIi1N0a0cY4O8U7X3kOnTkq8vdPhRjZAn0CPDFh5Okim4LNcJ8CQ'  # Needs to come from FE
def get_headers(token):
  headers = {'Authorization': f'Bearer {token}', 'Accept': 'application/json'}
  return headers

DEFAULT_TIMEOUT = 5

# --- EHR Integrations ---
'''
 * Inputs:
 * url:         URL endpoint  - resource endpoint
 * patientID:   URL param     - patient id
 * resourceID:  URL param     - FHIR resource id
 * type_:       URL param     - Resource type (type is reserved keyword)
 * token:       Header        - JWT auth token
 *
 * Output: request.py response object
'''

# Helpers

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

def get_error_code(message):
    return {'status_code': 404, 'message': message}

# Integrations

# https://fhir.epic.com/Sandbox?api=981
def fetch_adverse_event(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

#  https://fhir.epic.com/Sandbox?api=982
def fetch_adverse_event_search(url, patientID, token, study):
    payload = {'subject': patientID, 'study': study}
    headers = get_headers(token)
    
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=1, https://fhir.epic.com/Sandbox?api=946, https://fhir.epic.com/Sandbox?api=464
def fetch_allergy_intolerance(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=2, https://fhir.epic.com/Sandbox?api=947, https://fhir.epic.com/Sandbox?api=465
def fetch_allergy_intolerance_search(url, patientID, token):
    return fetch_patient_resource(url, patientID, token)

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

# https://fhir.epic.com/Sandbox?api=10016, https://fhir.epic.com/Sandbox?api=1066, https://fhir.epic.com/Sandbox?api=4, https://fhir.epic.com/Sandbox?api=10101, https://fhir.epic.com/Sandbox?api=10043, https://fhir.epic.com/Sandbox?api=1064, https://fhir.epic.com/Sandbox?api=10073, https://fhir.epic.com/Sandbox?api=10045, https://fhir.epic.com/Sandbox?api=10022
def fetch_care_plan(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=10017, https://fhir.epic.com/Sandbox?api=1067, https://fhir.epic.com/Sandbox?api=5, https://fhir.epic.com/Sandbox?api=10102, https://fhir.epic.com/Sandbox?api=10044, https://fhir.epic.com/Sandbox?api=1065, https://fhir.epic.com/Sandbox?api=10074, https://fhir.epic.com/Sandbox?api=10046, https://fhir.epic.com/Sandbox?api=10028
def fetch_care_plan_search(url, patientID, token, category=None, activity_date=None, encounter=None):
    if category is None and activity_date is None:
        return fetch_patient_resource(url, patientID, token)

    payload = {'patient': patientID, 'category': category, 'activity-date': activity_date}

    if encounter is not None:
        payload = {'patient': patientID, 'category': category, 'encounter', encounter}
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
def fetch_communication_search(url, part_of=None, subject=None, token):
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
        payload['encounter'] = part_of
    
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# EX

def fetch_document(url, patientID, token, type_):
    payload = {'patient': patientID, 'type': type_}
    headers = get_headers(token)
    
    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

def fetch_procedure(url, patientID, token):
    payload = {'patient': patientID}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

def fetch_observation(url, patientID, token, category):
    payload = {'patient': patientID, 'category': category}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


# --- Concurrency Features ---

'''
 * Use: Handle data fetching by mapping input to proper endpoint
 * Input: key indicating resource type, object containing requests data
 * Output: List of available patient data as requests.py responses
'''
def fetch_handler(key, data):
    res = get_error_code('Resource key not found')
    if key is 'event':
        res = fetch_lab_events(data.url, data.id, data.token, data.category)
    elif key is 'procedure':
        res = fetch_procedure(data.url, data.id, data.token)
    elif key is 'document':
        res = fetch_document(data.url, data.id, data.token, data.type)
    return res

'''
 * Use: Fetch multiple patient data using multithreading
 * Input: (key, object) pairs reflecting (resource type, request data)
 * Output: List of available patient data as requests.py responses
'''
# 'event' , {url, id, token, category}
def fetch_all_patient_data(pairs):
    threads = []
    results = []

    with ThreadPoolExecutor(max_workers=20) as executor:
        for key, params in pairs.__dict__.items():
          threads.append(executor.submit(fetch_handler, key, params))

        for task in as_completed(threads):
          try:
              results.append(task.result())
          except requests.ConnectTimeout:
              print('Resource timed out')

    return results


# --- Tests ---

document_url = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/STU3/DocumentReference'
print(fetch_document(document_url, 'enh2Q1c0oNRtWzXArnG4tKw3', token, '11506-3'))

procedure_url = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Procedure'
print(fetch_procedure(procedure_url, 'e63wRTbPfr1p8UW81d8Seiw3', token))

observation_url = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation'
print(fetch_lab_events(observation_url, 'e63wRTbPfr1p8UW81d8Seiw3', token, 'laboratory'))






# ---  Prev dev (deprecated) ---





def fetch_document_w(url, id, token, type):

    payload = {'patient': id, 'type': type}
    headers = {'Authorization': f'Bearer {token}',
               'Accept': 'application/json'}
    response = requests.get(url=url, params=payload, headers=headers)

    with open('notes.json', 'w') as outfile:
        outfile.write(json.dumps(response.json()))

    return (response.status_code)


document_url = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/STU3/DocumentReference'
print(fetch_document_w(document_url, 'enh2Q1c0oNRtWzXArnG4tKw3', token, '11506-3'))


def fetch_procedure_w(url, id, token):
    payload = {'patient': id}
    headers = {'Authorization': f'Bearer {token}',
               'Accept': 'application/json'}

    response = requests.get(url=url, params=payload, headers=headers)
    with open('procedures.json', 'w') as outfile:
        outfile.write(json.dumps(response.json()))

    return (response.status_code)

procedure_url = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Procedure'
print(fetch_procedure_w(procedure_url, 'e63wRTbPfr1p8UW81d8Seiw3', token))

def fetch_lab_events_w(url, id, token, category):
    payload = {'patient': id, 'category': category}
    headers = {'Authorization': f'Bearer {token}',
               'Accept': 'application/json'}

    response = requests.get(url=url, params=payload, headers=headers)
    with open('lab_events.json', 'w') as outfile:
        outfile.write(json.dumps(response.json()))

    return (response.status_code)


lab_events_url = 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation'

print(fetch_lab_events_w(lab_events_url,
                       'e63wRTbPfr1p8UW81d8Seiw3', token, 'laboratory'))

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