'''
John Whiteside - branch jdw
'''


import requests
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
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography.hazmat.backends import default_backend
from cryptography import x509
# from concurr import fetch_all_patient_data as _fetch
# from predictor.EHRInterface import mmlrestclient as mml

# Token needs to come from FE ?? <- why if we are using server-to-server OAuth2?
# FE auth flow: request code from node service: GET https://localhost:3000/cache_service/getFromCache?code=<AUTH_CODE>
TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoibE91eEk5bXlvZVhXWVFIdEhmNk1nYjRuUmQ3Nm54clg5bkhBZ1ZsLWxQMEJoXzFQXzhLeUVOd0RVM1FpNUdkNm94clhJdmdsVC04dG0yNEUxQS1HZ2htQ3M3ZENNRzhnNnRaSjJVdTlrTHBZVkx3S19EdmlET2wyaVExQ0VlcWEiLCJlcGljLnRva2VudHlwZSI6ImFjY2VzcyIsImV4cCI6MTU5NzA4MjI0OCwiaWF0IjoxNTk3MDc4NjQ4LCJpc3MiOiJ1cm46b2lkOmZoaXIiLCJqdGkiOiJjNWE3YjBlMi1hODA0LTRkYTAtYTcxOC01Zjg3NTM3YWZkODAiLCJuYmYiOjE1OTcwNzg2NDgsInN1YiI6ImV4Zm82RTRFWGpXc25oQTFPR1ZFbGd3MyJ9.TvYRTcXpd3J_VbKpgAClRHKkAw7GCGUMEA9pKC6B4cpj5PBlOmmnJxxgAr4-m7qKQ8UFH4osLGxyCdmCkMN6VIo2qtfcXeHSW8UcC3F5vpsDDU86XuE9aifKTJ-Hk-Nr1OoT7btW8jjV5wfqh0yaR6w47a7Z7JOFd9ndj3AHfQDGE7wgoPeoCaQxtjRBIIO3uO-DMhB9RZv8R092pBfWb1zpMZZeLS9vqbHEhDygXhvis7yqcuHGW4n34Y_hdj_nSLkA04SDXbqpXOLDFT0lbKSmMjBXjH8a3uvIi1N0a0cY4O8U7X3kOnTkq8vdPhRjZAn0CPDFh5Okim4LNcJ8CQ'
DEFAULT_TIMEOUT = 5


# --- EHR Integrations ---
'''
 Inputs:
 url:         URL endpoint  - resource endpoint
 patientID:   URL param     - patient id
 resourceID:  URL param     - FHIR resource id
 subject:     URL param     - subject of event/document
 type_:       URL param     - Resource type (type is reserved keyword)
 token:       Header        - JWT auth token

 Output: request.py response object
'''

# <- Request helpers ->


def get_headers(token):
    return {'Authorization': f'Bearer {token}', 'Accept': '*/*'}


def get_error_code(message):
    return {'status_code': 404, 'message': message}


def fetch_FHIR_resource(url, resourceID, token):
    optSlash = '/' if url[-1] != '/' else ''

    full_url = url + optSlash + resourceID
    headers = get_headers(token)

    res = requests.get(url=full_url, headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_patient_resource(url, patientID, token):
    payload = {'patient': patientID}
    headers = get_headers(token)
    # url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient?identifier=e63wRTbPfr1p8UW81d8Seiw3"
    # print(http_req_to_str('GET', url, headers=headers))
    res = requests.get(url=url, headers=headers,
                       params=payload, timeout=DEFAULT_TIMEOUT)
    # print(res.content)
    return res


def fetch_allergy_resource(url, patientID, token):
    payload = {'patient': patientID}
    headers = get_headers(token)
    # url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient?identifier=e63wRTbPfr1p8UW81d8Seiw3"
    # print(http_req_to_str('GET', url, headers=headers))
    res = requests.get(url=url, headers=headers,
                       params=payload, timeout=DEFAULT_TIMEOUT)
    # print(res.content)
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


# <- Authorization ->

# Fetch OAuth 2.0 Backend bearer token for system-level authorization
# https://fhir.epic.com/Documentation?docId=oauth2&section=BackendOAuth2Guide
def fetch_access_token(jwtToken):
    url = 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    payload = {
        'grant_type': 'client_credentials',
        'client_assertion_type': 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        'client_assertion': str(jwtToken)
    }

    res = requests.post(url=url, headers=headers,
                        data=payload, timeout=DEFAULT_TIMEOUT)
    # print(http_req_to_str('POST', url, headers, params=payload))
    return res

# Generate JWT to present to server for authorization
# https://fhir.epic.com/Documentation?docId=oauth2&section=Backend-Oauth2_Getting-Access-Token


def generateEpicJWT():
    curr_time = int(time.time())
    secret = "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAuyOlc/AMwAoCunJOWfl2KZBz1LsyhV+hoa8P+ASJJoPqOJeDLTvxv2v5bFAMIRYJHF5+FzLocCMhDBDjjxqoMc899k1TJdZ7FC4gnZ+gnBCJRXeVsGPyhaWaoN9O+N78/0MfvxiQ/RUTAMzJm5pUTFwq5Tq7tA999qDyop1DTr+3o1GkPp3V9s7Sa23/RoXzys9bnXbLA1giuqFYIHIYKvJxSPdLgcADP1wEGeABhyzFhOx4JbEwwp5IXeAZs8q7Icdj5w+eMelzsresMweSKfqYJkElvKzWkzPElu1vjWF6wCbhPcvwPdtr0g9dsAvQ1c75wJEM0rRsTo/1T8iAJQIDAQABAoIBAQCvN7cIkLA/dqALVk9KKyqZzCjH++ZXvqylqDX5cLXBnC3HgwVNaxz0r/I/mcthhzJMn6TLr9y2cg3VMFMAgGMPEA3h+ZBqkyF2SaI8M2O7/DerFUbQeyRuQho/mhZlKtQTZRPqZuQKMpsyWoxB5wQa4wk+y/lHpGG6dAP6geitZ3U9kHzci8J/CofM3KM/hUBnDPSR6SgrMe3EUTD7OuJt9PGXaZ88je2ZyXIPHBUZbZVXrFh1GQAy8+XzNZP8bj3/UVyyW9nBB0EVC2bVLJwbXE7iI7X9aRXwn354WFNsuEj/J01FptNNt5Nc2GJbuFOXxdsA85KHFjoQ6E8Mlz8BAoGBAOx6nTw5aKUNjXNY76EdTJwF1cDopnRPw1XgAjw7pZkUycD6MJ59rWAyStmiyxfTVvqxhfQISK/ez/il5t8+DBljgQP5M9XoGnLxrLGBjZ/0n2iWKvOUzdi8zgCnTeKQl5O+NtaPsm2TztAEvtw+3FK86doSih3FhM0cPPgLRWvFAoGBAMqWXJn2eEWZyrect5+VyORfJf7fHD44DIxYmBg6n//r7tV0EYBgCwStGWTFLAINVmtGNLGmZqu2CgAFbIDIUtOVV58ebR3NMjp8BRjpndpg189FpecfWxOod3EMUrIfNWX6vFDhw8wwTKKosayJv0cpEV5MLw22cqCLJuzcFijhAoGATa4ZaGcTUOSayoE0diBBwh7IkI3b3+kzqUnkchTF2PtTKukEf4uZIDhlDgjD3he2QrN95SOzfNIcTvlwVXT0VIKzJrL9rA6KYaexqr174Edi9eAeS9VdqQycPuq2Uu5cXFPnf6PEYOpkzUBB0ed0SFl2GARvCkiPzzCvdmt9amECgYAdS5MGfJq1zeB/nrz66ckMJSo0agUGhkpiPSl5T3j1pCN8YHVrb/gH7BQg+1Y60bzudE+IZPyx1fgqOp6PHOjFSfJKwzaaOaMKzAZcrOOzwY9TnMm521HrTNBA27xVn6e0IIb81zjeHRnn56cRwTWUz76AOVoQjJKU3qp5U/YsYQKBgQCrE/FpWcnkN4Nj4sFkuvrTpiRCHokobSvO8Ik42TanfrOnCHHlheBrPyOeejC0IhvbcwYZTQEQZ0hbZgyAwmr4aazXxqbjAqhx5+AMV6oUPK3C94/1CPOkCp8Kp425Uh5o1mDbVWUa8RygEVzkxtwru/9HUhr5cJXn5T9qMwe0VA==\n-----END RSA PRIVATE KEY-----"
    # Find a solution to read a file and try that in the key. This should work probably..

    # filename = './scriptchain.pem'
    # with open(filename, 'rb') as pem_in:
    # secret = pem_in.read()
    private_key = load_pem_private_key(secret.encode(
        'utf8'), password=None, backend=default_backend())

    headers = {
        'alg': 'RS384',
        'typ': 'JWT'
    }
    jti = str(uuid.uuid1())
    # print(jti)
    payload = {
        'iss': 'ad9d9ed9-133c-468c-b7bd-9c0f7286544b',
        'sub': 'ad9d9ed9-133c-468c-b7bd-9c0f7286544b',
        'aud': 'https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token',
        'jti': jti,
        'exp': curr_time + 300,
        'nbf': curr_time,
        'iat': curr_time
    }
    token = jwt.encode(headers=headers, payload=payload,
                       key=private_key, algorithm='RS384')
    return token


# <- Integrations ->

# https://fhir.epic.com/Sandbox?api=1, https://fhir.epic.com/Sandbox?api=946, https://fhir.epic.com/Sandbox?api=464
def fetch_allergy_intolerance(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=2, https://fhir.epic.com/Sandbox?api=947, https://fhir.epic.com/Sandbox?api=465


def fetch_allergy_intolerance_search(url, patientID, token):
    return fetch_allergy_resource(url, patientID, token)

# https://fhir.epic.com/Sandbox?api=10016, https://fhir.epic.com/Sandbox?api=1066, https://fhir.epic.com/Sandbox?api=4, https://fhir.epic.com/Sandbox?api=10101, https://fhir.epic.com/Sandbox?api=10043, https://fhir.epic.com/Sandbox?api=1064, https://fhir.epic.com/Sandbox?api=10073, https://fhir.epic.com/Sandbox?api=10045, https://fhir.epic.com/Sandbox?api=10022


def fetch_care_plan(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


def fetch_care_plan_search(url, patientID, token, category=None):
    if category is None:
        return fetch_patient_resource(url, patientID, token)

    payload = {'patient': patientID, 'category': category}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
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
    payload = {'patient': patientID, 'category': category}

    if encounter is not None:
        payload['encounter'] = encounter

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
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

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


def fetch_encounter(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)


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

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=997, https://fhir.epic.com/Sandbox?api=491


def fetch_medication_request_search(url, patientID, token, status=None):
    return fetch_medication_order_search(url, patientID, token, status)

# https://fhir.epic.com/Sandbox?api=339, https://fhir.epic.com/Sandbox?api=493


def fetch_medication_statement_search(url, patientID, token, status=None):
    return fetch_medication_order_search(url, patientID, token, status)

# https://fhir.epic.com/Specifications?api=964, https://fhir.epic.com/Specifications?api=998, https://fhir.epic.com/Specifications?api=965, https://fhir.epic.com/Specifications?api=967, https://fhir.epic.com/Specifications?api=10070, https://fhir.epic.com/Specifications?api=968,


def fetch_observation(url, resourceID, token):
    return fetch_FHIR_resource(url, resourceID, token)

# https://fhir.epic.com/Sandbox?api=969, https://fhir.epic.com/Sandbox?api=854, https://fhir.epic.com/Sandbox?api=28, https://fhir.epic.com/Sandbox?api=999, https://fhir.epic.com/Sandbox?api=495, https://fhir.epic.com/Sandbox?api=970, https://fhir.epic.com/Sandbox?api=899, https://fhir.epic.com/Sandbox?api=971, https://fhir.epic.com/Sandbox?api=882, https://fhir.epic.com/Sandbox?api=448, https://fhir.epic.com/Sandbox?api=972, https://fhir.epic.com/Sandbox?api=856, https://fhir.epic.com/Sandbox?api=450, https://fhir.epic.com/Sandbox?api=973, https://fhir.epic.com/Sandbox?api=498


def fetch_observation_search(url, patientID, token, category):
    payload = {'patient': patientID, 'category': category}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=29, https://fhir.epic.com/Sandbox?api=931, https://fhir.epic.com/Sandbox?api=825


def fetch_patient(url, patientID, token):
    payload = {'identifier': patientID}
    headers = get_headers(token)
    # url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient?identifier=e63wRTbPfr1p8UW81d8Seiw3"
    # print(http_req_to_str('GET', url, headers=headers))
    res = requests.get(url=url, headers=headers,
                       params=payload, timeout=DEFAULT_TIMEOUT)
    # print(res.content)
    return res

# https://fhir.epic.com/Sandbox?api=34, https://fhir.epic.com/Sandbox?api=940, https://fhir.epic.com/Specifications?api=976, https://fhir.epic.com/Sandbox?api=10042, https://fhir.epic.com/Sandbox?api=10030


def fetch_procedure_search(url, patientID, token, category=None):
    if category is None:
        return fetch_patient_resource(url, patientID, token)

    payload = {'patient': patientID, 'category': category}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
    return res

# https://fhir.epic.com/Sandbox?api=887


def fetch_procedure_request_search(url, patientID, token, status):
    return fetch_medication_order_search(url, patientID, token, status)

# --- Concurrency Features ---


'''
 Use: Handle data fetching by mapping input to proper endpoint
 Input: key indicating resource type, object containing requests data
 Output: List of available patient data as requests.py responses
   Available keys: (* TO DO)
      AllergyIntolerance.Read
      AllergyIntolerance.Search
      CarePlan.Read
      CarePlan.Search
      Condition.Read 
      Condition.Search
      DiagnosticReport.Read 
      DiagnosticReport.Search
      DocumentReference.Search 
      Encounter.Read
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
        lambda data: fetch_allergy_intolerance(
            data['url'], data['resourceID'], data['token']),
    'AllergyIntolerance.Search':
        lambda data: fetch_allergy_intolerance_search(
            data['url'], data['patientID'], data['token']),
    'CarePlan.Read':
        lambda data: fetch_care_plan(
            data['url'], data['resourceID'], data['token']),
    'CarePlan.Search':
        lambda data: fetch_care_plan_search(
            data['url'], data['patientID'], data['token'], data['category']),
    'Condition.Read':
        lambda data: fetch_condition(
            data['url'], data['resourceID'], data['token']),
    'Condition.Search':
        lambda data: fetch_condition_search(
            data['url'], data['patientID'], data['token'], data['category']),
    'DiagnosticReport.Read':
        lambda data: fetch_diagnostic_report(
            data['url'], data['resourceID'], data['token']),
    'DiagnosticReport.Search':
        lambda data: fetch_diagnostic_report_search(
            data['url'], data['patientID'], data['token']),
    'DocumentReference.Search':
        lambda data: fetch_document_reference_search(
            data['url'], data['patientID'], data['type'], data['token']),
    'Encounter.Read':
        lambda data: fetch_encounter(
            data['url'], data['resourceID'], data['token']),
    'Encounter.Search':
        lambda data: fetch_encounter_search(
            data['url'], data['patientID'], data['token']),
    'Immunization.Read':
        lambda data: fetch_immunization(
            data['url'], data['resourceID'], data['token']),
    'MedicationOrder.Search':
        lambda data: fetch_medication_order_search(
            data['url'], data['patientID'], data['token'], data.get('status', None)),
    'MedicationRequest.Search':
        lambda data: fetch_medication_request_search(
            data['url'], data['patientID'], data['token'], data.get('status', None)),
    'MedicationStatement.Search':
        lambda data: fetch_medication_statement_search(
            data['url'], data['patientID'], data['token'], data.get('status', None)),
    'Observation.Search':
        lambda data: fetch_observation_search(
            data['url'], data['patientID'], data['token'], data['category']),
    'Patient.Read':
        lambda data: fetch_patient(
            data['url'], data['patientID'], data['token']),
    'Procedure.Search':
        lambda data: fetch_procedure_search(
            data['url'], data['patientID'], data['token'], data.get('date', None)),
    'ProcedureRequest.Search':
        lambda data: fetch_procedure_request_search(
            data['url'], data['patientID'], data['token'], data.get('status', None))
}

# Handler to utilize the function mapping


def fetch_handler(key, data):
    func = key_func_mapping.get(key, None)

    if func is None:
        return get_error_code('Resource key not found')
    return func(data)


# --- Tests ---

# jwtToken = generateEpicJWT()
# # jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJpc3MiOiJhZDlkOWVkOS0xMzNjLTQ2OGMtYjdiZC05YzBmNzI4NjU0NGIiLCJzdWIiOiJhZDlkOWVkOS0xMzNjLTQ2OGMtYjdiZC05YzBmNzI4NjU0NGIiLCJhdWQiOiJodHRwczovL2ZoaXIuZXBpYy5jb20vaW50ZXJjb25uZWN0LWZoaXItb2F1dGgvb2F1dGgyL3Rva2VuIiwianRpIjoiZjAwNDE0YWEtMTc1YS0xMWVkLWI2MDQtZjIxODk4NzdmM2U4IiwiZXhwIjoxNjU5OTkxNzg1LCJuYmYiOjE2NTk5OTE0ODUsImlhdCI6MTY1OTk5MTQ4NX0.ddZW_XB0rXxwg44Cd4YNZDqVXvseXcoPSZrLZRTBVBAuuMP6woc343Ay9Zc2PJ0X3n5-IfKfCAahnJeS27TstHGQTO8PmpEbKAgHZstlaE9Dr70m_H8_g5rlkzrjOo1hwzaCP-6V9kbPoznghgJgkGo40u4X5aKO0Wi5qrea4pqnNo3IfflNfEhpAfj547bBDEOV5VrLQnqjl8wld9KtEzPLIMqWsHWoHIdvx9RijvapCDamJCepGOsDmxVn00v107qfrHy3smo3NX77U5S9rbXwCGHA8k3CdPRBK2Oi2zYbc0E21-gOKZ943Lx2cDBuBOfUH-ZE5DKMfLK2D3il_A"
# # print(jwtToken)
# tokenRes = fetch_access_token(jwtToken)

# # print(tokenRes)
# # print(tokenRes.json())
# TOKEN = tokenRes.json()['access_token'];
# print(TOKEN);

pairs = [
    #   ['AdverseEvent.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AdverseEvent/',
    #       'resourceID': 'eBrj0mrZZ9-WmgLrAXW.ZQmF3xBGWbDn1vkbtSszAQnY3',
    #       'token': TOKEN }
    #     ],
    #   ['AdverseEvent.Search', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AdverseEvent/',
    #       'subject': 'eea8Msv-9WjX-ffbBcv-4rw3',
    #       'token': TOKEN,
    #       'study': 'eAO.XWJpIicOp3xl5CLneUQ3' }
    #     ],
    #   ['AllergyIntolerance.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance/',
    #       'resourceID': 'eeJxm9Vi8-QmUQuWDhBMklw3',
    #       'token': TOKEN }
    #     ],
    #   ['AllergyIntolerance.Search', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance/',
    #       'patientID': 'e06xbT0QqabCKCMIqZo98DA3',
    #       'token': TOKEN }
    #     ],
    #   ['Appointment.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Appointment/',
    #       'resourceID': 'e3snc6SrCHi1PVOB5rkVvVqvlJgecR4RzazTZuc2UMqA3',
    #       'token': TOKEN }
    #   ],
    #   ['Binary.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Binary/',
    #       'resourceID': 'eibaYRQF6yVTF.5R2n92hhMhIzS.lJx9doPV5HgjIawc3',
    #       'token': TOKEN }
    #   ],
    #   ['BodyStructure.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/BodyStructure/',
    #       'resourceID': 'eU1gdcwFZyKjNGyBZhKh989YxW3fhmjvviCKYH.RTCBw3',
    #       'token': TOKEN }
    #   ],
    #   ['BodyStructure.Search', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/BodyStructure/',
    #       'patientID': 'erOOucv8EeF9xNKxjL..kSQ3',
    #       'token': TOKEN }
    #   ],
    #   ['CarePlan.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CarePlan/',
    #       'resourceID': 'ezv8muakDf.OWIZFA0VeHykcwagO7gUw-Qo7tjhIjW7qyR.Sb9PDuVIqsXy8702ujMTksxNKECrRrtU361qN4fg3',
    #       'token': TOKEN }
    #   ],
    #   ['CarePlan.Search', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CarePlan/',
    #       'patientID': 'e-NoAZ0ctgfeTYD.aaecWQQ3',
    #       'token': TOKEN }
    #   ],
    #   ['CareTeam.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CareTeam/',
    #       'resourceID': 'eKDCE-jKkMA4JxZ3pJbu.ww3',
    #       'token': TOKEN }
    #   ],
    #   ['CareTeam.Search', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CareTeam/',
    #       'patientID': 'ee7NTBargpnWU-MaI95A5fA3',
    #       'token': TOKEN }
    #   ],
    #   ['Communication.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Communication/',
    #       'resourceID': 'eQtjP5dExSGL8QY3jIixZo0TrO52tQfNEGkoWTOJdWCU3',
    #       'token': TOKEN }
    #   ],
    #   ['Communication.Search', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Communication/',
    #       'part_of': 'e-NoAZ0ctgfeTYD.aaecWQQ3',
    #       'token': TOKEN }
    #   ],
    #   ['Condition.Read', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition/',
    #       'resourceID': 'eG0hRQR7MUQBcS.AfHqMYXQ3',
    #       'token': TOKEN }
    #   ],
    #   ['Condition.Search', {
    #       'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition/',
    #       'patientID': 'ezHbeFCm6Ih8kgxuHUAdvJQ3',
    #       'category': 'problem-list-item',
    #       'token': TOKEN }
    #   ],
    ['Patient.Read', {
        'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient',
        'patientID': 'e63wRTbPfr1p8UW81d8Seiw3',
        'token': TOKEN}
     ],
]


# Fetch data
# data = _fetch(pairs, fetch_handler)
# print(data)

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

# <- Unneeded integrations ->

# https://fhir.epic.com/Sandbox?api=981


def fetch_adverse_event(url, resourceID, token):
    print(f"fetch_adverse_event({url}, {resourceID}, {token})")
    return fetch_FHIR_resource(url, resourceID, token)

#  https://fhir.epic.com/Sandbox?api=982


def fetch_adverse_event_search(url, subject, token, study):
    payload = {'subject': subject, 'study': study}
    headers = get_headers(token)

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
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

    payload = {'patient': patientID, 'category': category,
               'activity-date': activity_date}

    if encounter is not None:
        payload = {'patient': patientID,
                   'category': category, 'encounter': encounter}
    if activity_date is None:
        payload = {'patient': patientID, 'category': category}
    if category is None:
        payload = {'patient': patientID, 'activity-date': activity_date}

    headers = get_headers(token)

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
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

    res = requests.get(url=url, params=payload,
                       headers=headers, timeout=DEFAULT_TIMEOUT)
    return res


old_key_func_mapping = {
    'AdverseEvent.Read':
        lambda data: fetch_adverse_event(
            data['url'], data['resourceID'], data['token']),
    'AdverseEvent.Search':
        lambda data: fetch_adverse_event_search(
            data['url'], data['patientID'], data['token'], data['study']),
    'Appointment.Read':
        lambda data: fetch_appointment(
            data['url'], data['resourceID'], data['token']),
    'Binary.Read':
        lambda data: fetch_binary_document(
            data['url'], data['resourceID'], data['token']),
    'BodyStructure.Read':
        lambda data: fetch_body_structure(
            data['url'], data['resourceID'], data['token']),
    'BodyStructure.Search':
        lambda data: fetch_body_structure_search(
            data['url'], data['patientID'], data['token']),
    'CarePlan.Search':
        lambda data: fetch_care_plan_search(data['url'], data['patientID'], data['token'], data.get(
            'category', None), data.get('activity_date', None), data.get('encounter', None)),
    'CareTeam.Read':
        lambda data: fetch_care_team(
            data['url'], data['resourceID'], data['token']),
    'CareTeam.Search':
        lambda data: fetch_care_team_search(
            data['url'], data['patientID'], data['token']),
    'Communication.Read':
        lambda data: fetch_communication(
            data['url'], data['resourceID'], data['token']),
    'Communication.Search':
        lambda data: fetch_communication_search(data['url'], data['token'], data.get(
            'part_of', None), data.get('subject', None)),
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
