import requests
from pprint import pprint
import json
import os
import subprocess
from predictor.EHRInterface import mmlrestclient as mml
from predictor.EHRInterface import Distron as distron

token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOlVTQ0RJLW9uLUZISVIiLCJlcGljLm1ldGFkYXRhIjoibE91eEk5bXlvZVhXWVFIdEhmNk1nYjRuUmQ3Nm54clg5bkhBZ1ZsLWxQMEJoXzFQXzhLeUVOd0RVM1FpNUdkNm94clhJdmdsVC04dG0yNEUxQS1HZ2htQ3M3ZENNRzhnNnRaSjJVdTlrTHBZVkx3S19EdmlET2wyaVExQ0VlcWEiLCJlcGljLnRva2VudHlwZSI6ImFjY2VzcyIsImV4cCI6MTU5NzA4MjI0OCwiaWF0IjoxNTk3MDc4NjQ4LCJpc3MiOiJ1cm46b2lkOmZoaXIiLCJqdGkiOiJjNWE3YjBlMi1hODA0LTRkYTAtYTcxOC01Zjg3NTM3YWZkODAiLCJuYmYiOjE1OTcwNzg2NDgsInN1YiI6ImV4Zm82RTRFWGpXc25oQTFPR1ZFbGd3MyJ9.TvYRTcXpd3J_VbKpgAClRHKkAw7GCGUMEA9pKC6B4cpj5PBlOmmnJxxgAr4-m7qKQ8UFH4osLGxyCdmCkMN6VIo2qtfcXeHSW8UcC3F5vpsDDU86XuE9aifKTJ-Hk-Nr1OoT7btW8jjV5wfqh0yaR6w47a7Z7JOFd9ndj3AHfQDGE7wgoPeoCaQxtjRBIIO3uO-DMhB9RZv8R092pBfWb1zpMZZeLS9vqbHEhDygXhvis7yqcuHGW4n34Y_hdj_nSLkA04SDXbqpXOLDFT0lbKSmMjBXjH8a3uvIi1N0a0cY4O8U7X3kOnTkq8vdPhRjZAn0CPDFh5Okim4LNcJ8CQ"  # Needs to come from FE


def fetch_document(url, id, token, type):

    payload = {"patient": id, "type": type}
    headers = {"Authorization": f"Bearer {token}",
               "Accept": "application/json"}
    response = requests.get(url, params=payload, headers=headers)

    with open("notes.json", "w") as outfile:
        outfile.write(json.dumps(response.json()))

    return (response.status_code)


document_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/STU3/DocumentReference"
print(fetch_document(document_url, "enh2Q1c0oNRtWzXArnG4tKw3", token, "11506-3"))


def fetch_procedure(url, id, token):
    payload = {'patient': id}
    headers = {"Authorization": f"Bearer {token}",
               "Accept": "application/json"}

    response = requests.get(url, params=payload, headers=headers)
    with open("procedures.json", "w") as outfile:
        outfile.write(json.dumps(response.json()))

    return (response.status_code)


procedure_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Procedure"
print(fetch_procedure(procedure_url, "e63wRTbPfr1p8UW81d8Seiw3", token))


def fetch_lab_events(url, id, token, category):
    payload = {'patient': id, 'category': category}
    headers = {"Authorization": f"Bearer {token}",
               "Accept": "application/json"}

    response = requests.get(url, params=payload, headers=headers)
    with open("lab_events.json", "w") as outfile:
        outfile.write(json.dumps(response.json()))

    return (response.status_code)


lab_events_url = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation"

print(fetch_lab_events(lab_events_url,
                       "e63wRTbPfr1p8UW81d8Seiw3", token, "laboratory"))

def parseText(text):
    f = open("./predictor/test/test.txt", "w")
    f.write(text)
    f.close()
    output = mml.main()
    distron.generate_analytics()
    return output
