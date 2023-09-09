# Response parsing scripts should be written here.
# build file -- kefan

from unicodedata import category
from winreg import REG_WHOLE_HIVE_VOLATILE

from requests import delete
from EpicInterface import *
from concurr import fetch_all_patient_data as _fetch
from datetime import date
import numpy as np
import pandas as pd
import xmltodict


def patient_parse(data):
    patient_details = {}
    for lis in data['Bundle']['entry']['resource']['Patient']['identifier']:
        if 'type' in lis and lis['type']['text']['@value'] == 'EPI':
            patient_details['mrn'] = lis['value']['@value']

    patient_details['id'] = data['Bundle']['entry']['resource']['Patient']['id']['@value']
    patient_details['name'] = data['Bundle']['entry']['resource']['Patient']['name'][0]['given']['@value'] + ' ' +\
        data['Bundle']['entry']['resource']['Patient']['name'][0]['family']['@value']

    patient_details['sex'] = data['Bundle']['entry']['resource']['Patient']['gender']['@value']
    dob = data['Bundle']['entry']['resource']['Patient']['birthDate']['@value']
    dob = dob.split('-')
    today = date.today()
    age = today.year - int(dob[0]) - ((today.month, today.day) < (int(dob[1]), int(dob[2])))
    patient_details['age'] = age
    patient_details['dob'] = dob[1] + '/' + dob[2] + '/' + dob[0]
    return patient_details


def vital_parse(data):
    vital = {}
    weight_date_list = []
    height_date_list = []
    Systolic_date_list = []
    Diastolic_date_list = []
    for lis in data['Bundle']['entry']:
        if 'valueQuantity' not in lis['resource']['Observation']:
            blood_pressure_date = lis['resource']['Observation']['issued']['@value']
            Systolic_blood_pressure = lis['resource']['Observation']['component'][0]['valueQuantity']['value']['@value']
            Diastolic_blood_pressure = lis['resource']['Observation']['component'][1]['valueQuantity']['value']['@value']
            Systolic_date_list.append((blood_pressure_date, Systolic_blood_pressure))
            Diastolic_date_list.append((blood_pressure_date, Diastolic_blood_pressure))
        elif  lis['resource']['Observation']['valueQuantity']['unit']['@value'] == 'kg':
            weight_date = lis['resource']['Observation']['issued']['@value']
            weight_date_list.append((weight_date, lis['resource']['Observation']['valueQuantity']['value']['@value']))
        elif lis['resource']['Observation']['valueQuantity']['unit']['@value'] == 'cm':
            height_date = lis['resource']['Observation']['issued']['@value']
            height_date_list.append((height_date, lis['resource']['Observation']['valueQuantity']['value']['@value']))
    weight_date_list.sort()
    vital['weight_lis'] = []
    vital['weight_dates'] = []
    for (wdate, weight) in weight_date_list:
        vital['weight_lis'].append(weight)
        # parse the date into mm/dd/yyyy format (daniel)
        wdate = wdate[:4] + '/' + wdate[5:7] + '/' + wdate[8:10]
        vital['weight_dates'].append(wdate)
    height_date_list.sort()
    vital['height_lis'] = []
    vital['height_dates'] = []
    for (hdate, height) in height_date_list:
        vital['height_lis'].append(height)
        hdate = hdate[:4] + '/' + hdate[5:7] + '/' + hdate[8:10]
        vital['height_dates'].append(hdate)
    Diastolic_date_list.sort()
    vital['Diastolic_lis'] = []
    vital['Diastolic_dates'] = []
    for (DiastolicDate, pressure) in Diastolic_date_list:
        DiastolicDate = DiastolicDate[:4] + '/' + DiastolicDate[5:7] + '/' + DiastolicDate[8:10]
        vital['Diastolic_lis'].append(DiastolicDate)
        vital['Diastolic_dates'].append(pressure)
    Systolic_date_list.sort()
    vital['Systolic_lis'] = []
    vital['Systolic_dates'] = []
    for (SystolicDate, pressure) in Systolic_date_list:
        SystolicDate = SystolicDate[:4] + '/' + SystolicDate[5:7] + '/' + SystolicDate[8:10]
        vital['Systolic_lis'].append(SystolicDate)
        vital['Systolic_dates'].append(pressure)
    return vital


def allergy_parse(data):
    lis1 = []
    lis2 = []
    for lis in data['Bundle']['entry']:
        dict1 = {'name': lis['resource']['AllergyIntolerance']['code']['text']['@value']}
        lis1.append(dict1)
        dict2 = {'class': lis['resource']['AllergyIntolerance']['category']['@value'],
                 'meds': lis['resource']['AllergyIntolerance']['code']['text']['@value']}
        if dict2['class'] == 'medication':
            lis2.append(dict2)
    return lis1, lis2


def care_plan_parse(data):
    # This resource requires a category for searching. Use 38717003 for longitudinal, 734163000 for encounter, 736271009 for outpatient, 736353004 for inpatient, 738906000 for dental, 736378000 for oncology, 719091000000102 for questionnaires due, 959871000000107 for anticoagulation, inpatient-pathway for inpatient pathway, 409073007 for education, or care-path for Care Path.
    next_appt_date = ""
    next_appt_time = ""
    for dict in data['Bundle']['entry']['resource']['CarePlan']['activity']:
        if(dict['detail']['kind']['@value'] == 'Appointment' and dict['detail']['status']['@value'] == 'scheduled' and dict['detail']['doNotPerform']['@value'] == 'false'):
            appt = dict['detail']['scheduledPeriod']['start']['@value']
            appt = appt.split('T')
            appt[1] = appt[1].replace('Z', '')
            if next_appt_date == "" or appt[0] < next_appt_date or (appt[0] == next_appt_date and appt[1] < next_appt_time):
                next_appt_date = appt[0]
                next_appt_time = appt[1]
    next_appt_date = next_appt_date.split('-')
    next_appt_date = next_appt_date[1] + '/' + next_appt_date[2] + '/' + next_appt_date[0]
    return next_appt_date, next_appt_time


def prior_procedure_parse(data):
    priorProcedures_lis = []
    for lis in data['Bundle']['entry']:
        tmp = {'name' : '', 'date': '', 'details': ''}
        if 'performedDateTime' in lis['resource']['Procedure']:
            tmp['date'] = lis['resource']['Procedure']['performedDateTime']['@value']
        tmp['name'] = lis['resource']['Procedure']['code']['coding']['display']['@value']
        tmp['details'] = lis['resource']['Procedure']['code']['text']['@value']
        priorProcedures_lis.append(tmp)
    return priorProcedures_lis;


def labs_parse(data):
    abnormalLis = []
    for lis in data['Bundle']['entry']:
        if 'Observation' not in lis['resource']:
            continue
        tmp_res = {'test':'', 'result':'', 'status':''}
        tmp_res['test'] = lis['resource']['Observation']['code']['text']['@value']
        tmp_res['result'] = lis['resource']['Observation']['valueQuantity']['value']['@value']
        if 'unit' in lis['resource']['Observation']['valueQuantity']:
                    tmp_res['result'] += ' ' + lis['resource']['Observation']['valueQuantity']['unit']['@value']
        if 'referenceRange' in lis['resource']['Observation']:
            low_metric = lis['resource']['Observation']['referenceRange']['low']['value']['@value']
            high_metric = lis['resource']['Observation']['referenceRange']['high']['value']['@value']
            if float(lis['resource']['Observation']['valueQuantity']['value']['@value']) < float(low_metric):
                tmp_res['status'] = 'low'
            elif float(lis['resource']['Observation']['valueQuantity']['value']['@value']) > float(high_metric):
                tmp_res['status'] = 'high'
            else:
                tmp_res['status'] = 'medium'
        else:
            tmp_res['status'] = 'unknown (no referenceRange given)'
        if tmp_res['status'] != 'medium':
            abnormalLis.append(tmp_res)
    return abnormalLis


def medication_parse(data):
    prescribedMedicationsLis = []
    for lis in data['Bundle']['entry']:
        tmp = {'name' : '', 'dosage':'', 'date_prescribed':''}
        tmp['name'] = lis['resource']['MedicationRequest']['medicationReference']['display']['@value']
        tmp['dosage'] = lis['resource']['MedicationRequest']['dosageInstruction']['text']['@value']
        tmp['date_prescribed'] = lis['resource']['MedicationRequest']['dispenseRequest']['validityPeriod']['start']['@value']
        prescribedMedicationsLis.append(tmp)
    return prescribedMedicationsLis


def smoking_parse(data):
    #smoking history (daniel)
    #https://fhir.epic.com/Specifications?api=967
    #Smoking history supported values:

    #449868002-Smokes tobacco daily (finding)
    #428041000124106-Current some day smoker
    #230059006-Occasional cigarette smoker (available in Netherlands environments only)
    #77176002-Smoker, current status unknown
    #8517006-Former smoker
    #266919005-Never smoker
    #43381005-Passive smoker (available in Netherlands environments only)
    #266927001-Unknown if ever smoker
    #428071000124103-Heavy tobacco smoker
    #428061000124105-Light tobacco smoker
    smokes = ['449868002', '428041000124106', '230059006', '77176002', '8517006', '43381005', '428071000124103', '428061000124105']
    does_not_smoke = ['266919005']
    smoking_status = 'Unknown'
    for lis in data['Bundle']['entry']:
        if 'Observation' not in lis['resource']:
            continue
        if 'Smoking History' in lis['resource']['Observation']['code']['text']['@value']:
            smoking_code = lis['resource']['Observation']['valueCodeableConcept']['coding']['code']['@value']
            if smoking_code in smokes:
                smoking_status = 'Yes'
            elif smoking_code in does_not_smoke:
                smoking_code = 'No'
            else:
                smoking_status = 'Unknown: ' + lis['resource']['Observation']['valueCodeableConcept']['coding']['display']['@value']
    return smoking_status


def diagnosed_conditions_parse(data, myToken):
    diagnosed_conditions = []
    pairs = []
    for lis in data['Bundle']['entry']:
        if '(disorder)' in lis['resource']['Condition']['code']['coding'][0]['display']['@value']:
            diagnosis_date = ''
            diagnosis_details = ''
            #get encounter correlating to diagnosis (if it exists)
            if 'reference' in lis['resource']['Condition']['encounter']:
                encounter_id = lis['resource']['Condition']['encounter']['reference']['@value'].split('/')[1]
                pairs.append(['Encounter.Read', {
                    'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Encounter/',
                    'resourceID': encounter_id,
                    'token': myToken
                }])
                #the encounter id will be a placeholder for the date
                diagnosis_date = encounter_id
            #get details from diagnosis notes (if it exists)
            if 'note' in lis['resource']['Condition']:
                diagnosis_details = lis['resource']['Condition']['note']['text']['@value']
            diagnosed_condition = {'name': lis['resource']['Condition']['code']['coding'][0]['display']['@value'], 'date': diagnosis_date, 'details': diagnosis_details}
            diagnosed_conditions.append(diagnosed_condition)

    #fetch encounters related to diagnoses to get dates from them
    fetched_data = _fetch(pairs, fetch_handler)
    data = []
    for fetched in fetched_data:
        if isinstance(fetched, requests.models.Response):
            data.append(xmltodict.parse(fetched.content))

    #extract date (if it exists)
    dates = {}
    for encounter in data:
        date = ''
        if 'period' in encounter['Encounter']:
            if 'start' in encounter['Encounter']['period']:
                date = encounter['Encounter']['period']['start']['@value']
        dates[encounter['Encounter']['id']['@value']] = date
                
    #replace placeholder dates (currently id) with dates (empty string if no date)
    for diagnosed in diagnosed_conditions:
        diagnosis_date = ''
        #if there is a placeholder
        if diagnosed['date'] != '':
            #if there is a start period, format the date
            if dates[diagnosed['date']] != '':
                diagnosis_date = dates[diagnosed['date']]
                diagnosis_date = diagnosis_date[5:7] + '/' + diagnosis_date[8:10] + '/' + diagnosis_date[0:4]
        diagnosed['date'] = diagnosis_date
                
    return diagnosed_conditions


def symptoms_complaints_parse(data):
    symptoms_complaints = []
    for lis in data['Bundle']['entry']:
        symptoms_complaint_details = ''
        symptoms_complaint_date = ''
        if 'note' in lis['resource']['Condition']:
            symptoms_complaint_details = lis['resource']['Condition']['note']['text']['@value']
        if 'recordedDate' in lis['resource']['Condition']:
            symptoms_complaint_date = lis['resource']['Condition']['recordedDate']['@value']
            symptoms_complaint_date = symptoms_complaint_date[5:7] + '/' + symptoms_complaint_date[8:10] + '/' + symptoms_complaint_date[0:4]
        symptoms_complaint = {'name': lis['resource']['Condition']['code']['coding']['display']['@value'], 'date': symptoms_complaint_date, 'details': symptoms_complaint_details}
        symptoms_complaints.append(symptoms_complaint)
    return symptoms_complaints


def admission_history_parse(data):
    admission_history = []
    for lis in data['Bundle']['entry']:
        if 'hospitalization' in lis['resource']['Encounter']:
            admission_history_discharge = ''
            admission_history_date = ''
            admission_history_details = 'Reason for admission: '
            if 'period' in lis['resource']['Encounter']:
                if 'start' in lis['resource']['Encounter']['period']:
                    admission_history_date = lis['resource']['Encounter']['period']['start']['@value']
                    admission_history_date = admission_history_date[5:7] + '/' + admission_history_date[8:10] + '/' + admission_history_date[0:4]
                if 'end' in lis['resource']['Encounter']['period']:
                    admission_history_discharge = lis['resource']['Encounter']['period']['end']['@value']
                    admission_history_discharge = admission_history_discharge[5:7] + '/' + admission_history_discharge[8:10] + '/' + admission_history_discharge[0:4]
            if 'reasonCode' in lis['resource']['Encounter']:
                if isinstance(lis['resource']['Encounter']['reasonCode'], list):
                    for entry in lis['resource']['Encounter']['reasonCode']:
                        admission_history_details += entry['text']['@value'] + ', '
                else:
                    admission_history_details += lis['resource']['Encounter']['reasonCode']['text']['@value']
            admission_history_entry = {'discharge': admission_history_discharge, 'details': admission_history_details, 'date': admission_history_date}
            admission_history.append(admission_history_entry)
    return admission_history


def generateToken():
    jwtToken = generateEpicJWT()
    tokenRes = fetch_access_token(jwtToken)
    return tokenRes.json()['access_token']


def sort_threads_by_name(data):
    return data['Bundle']['link']['url']['@value'].split('/').pop()


def fetch_data(pairs):
    fetched_data = _fetch(pairs, fetch_handler)
    data = []
    for fetched in fetched_data:
        if isinstance(fetched, requests.models.Response):
            data.append(xmltodict.parse(fetched.content))
    #Data is returned in different order each time, so it should be sorted by endpoint url (which holds the name - ex. AllergyIntolerance)
    
    #Check if any error responses returned
    # for d in data:
    #     if 'Bundle' in d:
    #         print(d['Bundle']['link']['url']['@value'])
    #     else:
    #         print(d)
    data.sort(key=sort_threads_by_name)
    return data



def parse(patientID):  #should have id as param, testing for now
#ini data structure to return, all the field need to be replaced
    result = {
        "patientDetails": {
            'name': 'Theodore Grey',
            'sex': 'Male',
            'age': 68,
            'height': 70,
            'weight': 200,
            'bmi': (703 * 200 / (70 * 70)),
            'id': '1234',
            'mrn':'YTK89123456',
            'dob': '03/12/1951',
            'next_appt': {'date': '11/25/2020', 'time': '10:30 am'},
            'readmissionRisks': [{'name': 'Coronary Heart Disease', 'symptoms': 'Angina, dizziness, nausea', 'value': ''}],
            'allergies': [],
            'lifestyle': {'smokes': True, },
            'prescribedMedications': [{'name': 'Crestor', 'dosage': '20mg', 'date_prescribed': '09/17/2008'}]},
        "readimissionRisk": 52,
        "symptomsComplaints": [{'name': 'Tiredness', 'date': '11/25/2020', 'details': ''}],
        "diagnosedConditions": [{'name': 'Coronary Artery Disease', 'date': '1/20/2015', 'details': ''}],
        "conditionRisks": [{'name': 'Coronary Artery Disease', 'value': '100', 'link': '/healthcare-profile/patient/1234/93', 'show': 'select', 'diagnosed': True}],
        "recommendedMedications": {
            'not_prescribed': [{'class': 'ACE Inhibitors', 'meds': 'CO2A'}],
            'allergic': []},
        "abnormalLabs": [{'test': 'Cholesterol', 'result': '243 mg/dL', 'status': 'high'}],
        "priorProcedures": [{'name': 'Angioplasty', 'date': '11/05/2015', 'details': ''}],
        "vitalData": {"weight": {"dates": ["2022/04/24", "2022/05/26", "2022/06/25", "2022/07/24", "2022/08/25", "2022/09/25", "2022/10/25"], "weights": [174.8, 175.2, 174.8, 175.4, 175.8, 176.1, 175]}, },
        "admissionHistory": [{'discharge': '11/05/2020', 'date': '11/12/2020', 'details': 'Patient admitted for heart failure'}]
    }
    myToken = generateToken()
    # print(myToken)

    #Implenting multithreading for fetching data with fetch_all_patient_data from concurr.py (daniel)
    pairs = [
        #Patient details
        ['Patient.Read', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/',
            'patientID': patientID,
            'token': myToken
        }],
        #Vitals - weight, height, blood pressure
        ['Observation.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation/',
            'patientID': patientID,
            'token': myToken,
            'category' : 'vital-signs'
        }],
        #Allergies - patient details: allergies, recommended medications: allergic medications
        ['AllergyIntolerance.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance/',
            'patientID': patientID,
            'token': myToken
        }],
        #Next Appointment
        ['CarePlan.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/CarePlan/',
            'patientID': patientID,
            'token': myToken,
            'category': '38717003'
        }],
        #Prior Procedures
        ['Procedure.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Procedure/',
            'patientID': patientID,
            'token': myToken,
            'category': '387713003'
        }],
        #Abnormal Labs
        ['Observation.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation/',
            'patientID': patientID,
            'token': myToken,
            'category' : 'laboratory'
        }],
        #Prescribed Medications
        ['MedicationOrder.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/MedicationRequest/',
            'patientID': patientID,
            'token': myToken,
            'status': 'active'
        }],
        #Smoking Status
        ['Observation.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation/',
            'patientID': patientID,
            'token': myToken,
            'category' : 'social-history'
        }],
        #Diagnosed Conditions
        ['Condition.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition/',
            'patientID': patientID,
            'token': myToken,
            'category': 'encounter-diagnosis'
        }],
        #Symptoms Complaints
        ['Condition.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition/',
            'patientID': patientID,
            'token': myToken,
            'category': 'reason-for-visit'
        }],
        #Admission History
        ['Encounter.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Encounter/',
            'patientID': patientID,
            'token': myToken,
        }]
    ]
    data = fetch_data(pairs)
    

    patient_data = patient_parse(data[9])
    result['patientDetails']['name'] = patient_data['name']
    result['patientDetails']['sex'] = patient_data['sex']
    result['patientDetails']['age'] = patient_data['age']
    result['patientDetails']['id'] = patient_data['id']
    result['patientDetails']['mrn'] = patient_data['mrn']
    result['patientDetails']['dob'] = patient_data['dob']
    
    vital_data = vital_parse(data[8])
    result['vitalData']['weight'] = {}
    result['vitalData']['weight']['dates'] = vital_data['weight_dates']
    result['vitalData']['weight']['weights'] = vital_data['weight_lis']
    result['vitalData']['height'] = {}
    result['vitalData']['height']['dates'] = vital_data['height_dates']
    result['vitalData']['height']['heights'] = vital_data['height_lis']
    result['vitalData']['Diastolic'] = {}
    result['vitalData']['Diastolic']['dates'] = vital_data['Diastolic_dates']
    result['vitalData']['Diastolic']['Diastolics'] = vital_data['Diastolic_lis']
    result['vitalData']['Systolic'] = {}
    result['vitalData']['Systolic']['dates'] = vital_data['Systolic_dates']
    result['vitalData']['Systolic']['Systolics'] = vital_data['Systolic_lis']
    result['patientDetails']['height'] = vital_data['height_lis'][-1]
    result['patientDetails']['weight'] = vital_data['weight_lis'][-1]
    result['patientDetails']['bmi'] = float(result['patientDetails']['weight']) * 10000 / (float(result['patientDetails']['height']) * float(result['patientDetails']['height']))

    allergy_data = allergy_parse(data[0])
    result['patientDetails']['allergies'] = allergy_data[0]
    result['recommendedMedications']['allergic'] = allergy_data[1]

    care_plan_data = care_plan_parse(data[1])  
    result['patientDetails']['next_appt']['date'] = care_plan_data[0]
    result['patientDetails']['next_appt']['time'] = care_plan_data[1]

    prior_procedure_data = prior_procedure_parse(data[10])
    result['priorProcedures'] = prior_procedure_data
    
    labs_data = labs_parse(data[6])
    result['abnormalLabs'] = labs_data
    
    medication_data = medication_parse(data[5])
    result['patientDetails']['prescribedMedications'] = medication_data

    smoking_status = smoking_parse(data[7])
    result['patientDetails']['lifestyle'] = {'smokes': smoking_status}
    
    diagnosed_conditions_data = diagnosed_conditions_parse(data[2], myToken)
    result['diagnosedConditions'] = diagnosed_conditions_data
    
    symptoms_complaints_data = symptoms_complaints_parse(data[3])
    result['symptomsComplaints'] = symptoms_complaints_data

    admission_history_data = admission_history_parse(data[4])
    result['admissionHistory'] = admission_history_data

    return result





def allergy_intolerance_csv(data):
    arr = np.array(['Allergy Intolerance', 'Category', 'Clinical Status', 'Criticality', 'id', 'Note', 'Onset Period', 'Patient', 'Reaction', 'Recorded Date', 'Recorder', 'Verification Status'])
    for lis in data['Bundle']['entry']:
        allergyIntolerance = lis['resource']['AllergyIntolerance']['code']['text']['@value']
        category = lis['resource']['AllergyIntolerance']['category']['@value']
        clinical_status = lis['resource']['AllergyIntolerance']['clinicalStatus']['coding']['code']['@value']
        criticality = ''
        if 'criticality' in lis['resource']['AllergyIntolerance']:
            criticality = lis['resource']['AllergyIntolerance']['criticality']['@value']
        _id = lis['resource']['AllergyIntolerance']['id']['@value']
        note = ''
        if 'note' in lis['resource']['AllergyIntolerance']:
            note = lis['resource']['AllergyIntolerance']['note']['text']['@value']
        onsetPeriod = ''
        if onsetPeriod in lis['resource']['AllergyIntolerance']:
            if 'start' in lis['resource']['AllergyIntolerance']['onsetPeriod']:
                onsetPeriod += 'start: '
                onsetPeriod += lis['resource']['AllergyIntolerance']['onsetPeriod']['start']['@value']
                if 'end' in lis['resource']['AllergyIntolerance']['onsetPeriod']:
                    onsetPeriod += '; '
            if 'end' in lis['resource']['AllergyIntolerance']['onsetPeriod']:
                onsetPeriod += 'end: '
                onsetPeriod += lis['resource']['AllergyIntolerance']['onsetPeriod']['end']['@value']
        patient = lis['resource']['AllergyIntolerance']['patient']['display']['@value']
        reaction = ''
        if 'reaction' in lis['resource']['AllergyIntolerance']:
            if 'description' in lis['resource']['AllergyIntolerance']['reaction']:
                reaction = lis['resource']['AllergyIntolerance']['reaction']['description']['@value']
        recordedDate = ''
        if 'recordedDate' in lis['resource']['AllergyIntolerance']:
            recordedDate = lis['resource']['AllergyIntolerance']['recordedDate']['@value']
        recorder = ''
        if 'recorder' in lis['resource']['AllergyIntolerance']:
            recorder = lis['resource']['AllergyIntolerance']['recorder']['display']['@value']
        verificationStatus = lis['resource']['AllergyIntolerance']['verificationStatus']['coding']['display']['@value']
        arr = np.vstack((arr, np.array([allergyIntolerance, category, clinical_status, criticality, _id, note, onsetPeriod, patient, reaction, recordedDate, recorder, verificationStatus])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Allergy Intolerance', 'Category', 'Clinical Status', 'Criticality', 'id', 'Note', 'Onset Period', 'Patient', 'Reaction', 'Recorded Date', 'Recorder', 'Verification Status'])
    df.to_csv('AllergyIntolerance.csv', index = False)


def condition_csv(data):
    arr = np.array(['Abatement Period', 'Asserted Date', 'Category', 'Clinical Status', 'Condition', 'id', 'Note', 'Onset Period', 'Severity', 'Subject', 'Verification Status'])
    for lis in data['Bundle']['entry']:
        abatementPeriod = ''
        if 'abatementPeriod' in lis['resource']['Condition']:
            if 'start' in lis['resource']['Condition']['abatementPeriod']:
                abatementPeriod += 'start: '
                abatementPeriod += lis['resource']['Condition']['abatementPeriod']['start']['@value']
                if 'end' in lis['resource']['Condition']['abatementPeriod']:
                    abatementPeriod += '; '
            if 'end' in lis['resource']['Condition']['abatementPeriod']:
                abatementPeriod += 'end: '
                abatementPeriod += lis['resource']['Condition']['abatementPeriod']['end']['@value']
        assertedDate = ''
        if 'assertedDate' in lis['resource']['Condition']:
            assertedDate = lis['resource']['Condition']['assertedDate']['@value']
        category = ''
        if 'category' in lis['resource']['Condition']:
            category = lis['resource']['Condition']['category'][0]['text']['@value']
        clinicalStatus = ''
        if 'clinicalStatus' in lis['resource']['Condition']:
            clinicalStatus = lis['resource']['Condition']['clinicalStatus']['@value']
        condition = lis['resource']['Condition']['code']['text']['@value']
        _id = lis['resource']['Condition']['id']['@value']
        note = ''
        if 'note' in lis['resource']['Condition']:
            note = lis['resource']['Condition']['note']['text']['@value']
        onsetPeriod = ''
        if onsetPeriod in lis['resource']['Condition']:
            if 'start' in lis['resource']['Condition']['onsetPeriod']:
                onsetPeriod += 'start: '
                onsetPeriod += lis['resource']['Condition']['onsetPeriod']['start']['@value']
                if 'end' in lis['resource']['Condition']['onsetPeriod']:
                    onsetPeriod += '; '
            if 'end' in lis['resource']['Condition']['onsetPeriod']:
                onsetPeriod += 'end: '
                onsetPeriod += lis['resource']['Condition']['onsetPeriod']['end']['@value']
        severity = ''
        if 'severity' in lis['resource']['Condition']:
            severity = lis['resource']['Condition']['severity']['text']['@value']
        subject = lis['resource']['Condition']['subject']['display']['@value']
        verificationStatus = ''
        if 'verificationStatus' in lis['resource']['Condition']:
            verificationStatus = lis['resource']['Condition']['verificationStatus']['coding']['display']['@value']
        arr = np.vstack((arr, np.array([abatementPeriod, assertedDate, category, clinicalStatus, condition, _id, note, onsetPeriod, severity, subject, verificationStatus])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Abatement Period', 'Asserted Date', 'Category', 'Clinical Status', 'Condition', 'id', 'Note', 'Onset Period', 'Severity', 'Subject', 'Verification Status'])
    df.to_csv('Condition_EncounterDiagnosis.csv', index = False)


def diagnostic_report_csv(data):
    arr = np.array(['Based On', 'Category', 'Diagnostic Report', 'Effective Date Time', 'Encounter', 'Identifier', 'Issued', 'Performer', 'Result', 'Status', 'Subject'])
    for lis in data['Bundle']['entry']:
        basedOn = ''
        if 'basedOn' in lis['resource']['DiagnosticReport']:
            basedOn = lis['resource']['DiagnosticReport']['basedOn']['reference']['@value']
        category = ''
        if isinstance(lis['resource']['DiagnosticReport']['category'], list):
            for entry in lis['resource']['DiagnosticReport']['category']:
                category += entry['text']['@value']
                category += '; '
            category = category[:-2]
        else:
            category = lis['resource']['DiagnosticReport']['category']['text']['@value']
        diagnosticReport = lis['resource']['DiagnosticReport']['code']['text']['@value']
        effectiveDateTime = ''
        if 'effectiveDateTime' in lis['resource']['DiagnosticReport']:
            effectiveDateTime = lis['resource']['DiagnosticReport']['effectiveDateTime']['@value']
        if 'encounter' in lis['resource']['DiagnosticReport']:
            encounter = lis['resource']['DiagnosticReport']['encounter']['reference']['@value']
        identifier = ''
        if 'identifier' in lis['resource']['DiagnosticReport']:
            identifier = lis['resource']['DiagnosticReport']['identifier']['value']['@value']
        issued = lis['resource']['DiagnosticReport']['issued']['@value']
        performer = ''
        if 'performer' in lis['resource']['DiagnosticReport']:
            performer = lis['resource']['DiagnosticReport']['performer']['display']['@value']
        result = ''
        if 'result' in lis['resource']['DiagnosticReport']:
            for entry in lis['resource']['DiagnosticReport']['result']:
                if 'display' in entry:
                    if '@value' in 'display':
                        result += entry['display']['@value']
                        result += '; '
            result = result[:-2]
        status = lis['resource']['DiagnosticReport']['status']['@value']
        subject = lis['resource']['DiagnosticReport']['subject']['display']['@value']
        arr = np.vstack((arr, np.array([basedOn, category, diagnosticReport, effectiveDateTime, encounter, identifier, issued, performer, result, status, subject])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Based On', 'Category', 'Diagnostic Report', 'Effective Date Time', 'Encounter', 'Identifier', 'Issued', 'Performer', 'Result', 'Status', 'Subject'])
    df.to_csv('DiagnosticReport.csv', index = False)


def document_reference_csv(data):
    arr = np.array(['Authenticator', 'Author', 'Category', 'Context (Encounter)', 'Context (Period)', 'Custodian', 'Date', 'Doc Status', 'id', 'Status', 'Subject', 'Type'])
    for lis in data['Bundle']['entry']:
        if 'DocumentReference' not in lis['resource']:
            continue
        authenticator = ''
        if 'authenticator' in lis['resource']['DocumentReference']:
            authenticator = lis['resource']['DocumentReference']['authenticator']['display']['@value']
        author = ''
        if 'author' in lis['resource']['DocumentReference']:
            for entry in lis['resource']['DocumentReference']['author']:
                if 'display' in entry:
                    if isinstance(entry, dict):
                        author += entry['display']['@value']
                        author += '; '
            author = author[:-2]
        category = ''
        for entry in lis['resource']['DocumentReference']['category']:
            if isinstance(entry, dict):
                category += entry['coding']['display']['@value']
                category += '; '
        category = category[:-2]
        context_encounter = ''
        if 'context' in lis['resource']['DocumentReference']:
            if 'reference' in lis['resource']['DocumentReference']['context']:
                context_encounter = lis['resource']['DocumentReference']['context']['encounter']['reference']['@value']
        context_period = ''
        if 'context' in lis['resource']['DocumentReference']:
            if 'period' in lis['resource']['DocumentReference']['context']['encounter']:
                if 'start' in lis['resource']['DocumentReference']['context']['encounter']['period']:
                    context_period += 'start: '
                    context_period += lis['resource']['DocumentReference']['context']['encounter']['period']['start']['@value']
                    if 'end' in lis['resource']['DocumentReference']['context']['encounter']['period']:
                        context_period += '; '
                if 'end' in lis['resource']['DocumentReference']['context']['encounter']['period']:
                    context_period += 'end: '
                    context_period += lis['resource']['DocumentReference']['context']['encounter']['period']['end']['@value']
        custodian = ''
        if 'custodian' in lis['resource']['DocumentReference']:
            if 'display' in lis['resource']['DocumentReference']['custodian']:
                custodian = lis['resource']['DocumentReference']['custodian']['display']['@value']
        date = ''
        if 'date' in lis['resource']['DocumentReference']:
            date = lis['resource']['DocumentReference']['date']['@value']
        docStatus = ''
        if 'docStatus' in lis['resource']['DocumentReference']:
            docStatus = lis['resource']['DocumentReference']['docStatus']['@value']
        _id = lis['resource']['DocumentReference']['id']['@value']
        status = lis['resource']['DocumentReference']['status']['@value']
        subject = lis['resource']['DocumentReference']['subject']['display']['@value']
        _type = lis['resource']['DocumentReference']['type']['text']['@value']
        arr = np.vstack((arr, np.array([authenticator, author, category, context_encounter, context_period, custodian, date, docStatus, _id, status, subject, _type])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Authenticator', 'Author', 'Category', 'Context (Encounter)', 'Context (Period)', 'Custodian', 'Date', 'Doc Status', 'id', 'Status', 'Subject', 'Type'])
    df.to_csv('DocumentReference_ClinicalNotes.csv', index = False)


def encounter_search_csv(data):
    arr = np.array(['Account', 'Class', 'Diagnosis', 'id', 'Identifier', 'Location', 'Participant', 'Period', 'Priority', 'Reason Code', 'Service Type', 'Status', 'Type'])
    for lis in data['Bundle']['entry']:
        account = ''
        if 'account' in lis['resource']['Encounter']:
            if 'display' in lis['resource']['Encounter']['account']['identifier']:
                account = lis['resource']['Encounter']['account']['identifier']['display']['@value']
        _class = lis['resource']['Encounter']['class']['display']['@value']
        diagnosis = ''
        if 'diagnosis' in lis['resource']['Encounter']:
            for entry in lis['resource']['Encounter']['diagnosis']:
                diagnosis += entry['condition']['display value']['@value']
                diagnosis += '; '
            diagnosis = diagnosis[:-2]
        _id = lis['resource']['Encounter']['id']['@value']
        identifier = lis['resource']['Encounter']['identifier']['value']['@value']
        location = ''
        if 'location' in lis['resource']['Encounter']:
            for entry in lis['resource']['Encounter']['location']:
                if isinstance(entry, dict):
                    location += entry['location']['display']['@value']
                    location += '; '
            location = location[:-2]
        participant = ''
        if 'participant' in lis['resource']['Encounter']:
            for entry in lis['resource']['Encounter']['participant']:
                if isinstance(entry, dict):
                    participant += entry['individual']['display']['@value']
                    participant += '; '
            participant = participant[:-2]
        period = ''
        if 'period' in lis['resource']['Encounter']:
            if 'start' in lis['resource']['Encounter']['period']:
                period += 'start: '
                period += lis['resource']['Encounter']['period']['start']['@value']
                if 'end' in lis['resource']['Encounter']['period']:
                    period += '; '
            if 'end' in lis['resource']['Encounter']['period']:
                period += 'end: '
                period += lis['resource']['Encounter']['period']['end']['@value']
        priority = ''
        if 'priority' in lis['resource']['Encounter']:
            priority = lis['resource']['Encounter']['priority']['text']['@value']
        reasonCode = ''
        if 'reasonCode' in lis['resource']['Encounter']:
            if isinstance(lis['resource']['Encounter']['reasonCode'], list):
                for entry in lis['resource']['Encounter']['reasonCode']:
                    reasonCode += entry['text']['@value']
                    reasonCode += '; '
                reasonCode = reasonCode[:-2]
            else:    
                reasonCode = lis['resource']['Encounter']['reasonCode']['text']['@value']
        serviceType = ''
        if 'serviceType' in lis['resource']['Encounter']:
            if 'text' in lis['resource']['Encounter']['serviceType']:
                serviceType = lis['resource']['Encounter']['serviceType']['text']['@value']
        status = lis['resource']['Encounter']['status']['@value']
        _type = ''
        if 'type' in lis['resource']['Encounter']:
            for entry in lis['resource']['Encounter']['type']:
                if isinstance(entry, dict):
                    _type += entry['text']['@value']
                    _type += '; '
            _type = _type[:-2]
        arr = np.vstack((arr, np.array([account, _class, diagnosis, _id, identifier, location, participant, period, priority, reasonCode, serviceType, status, _type])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Account', 'Class', 'Diagnosis', 'id', 'Identifier', 'Location', 'Participant', 'Period', 'Priority', 'Reason Code', 'Service Type', 'Status', 'Type'])
    df.to_csv('Encounter.csv', index = False)


def medication_order_csv(data):
    #only DSTU2 option available - does not work
    return


def medication_request_csv(data):
    arr = np.array(['Authored On', 'Based On', 'Category', 'Dosage Instruction', 'Encounter', 'Identifier', 'Intent', 'Medication', 'Note', 'Prior Prescription', 'Reason Code', 'Recorder', 'Status', 'Subject'])
    for lis in data['Bundle']['entry']:
        authoredOn = lis['resource']['MedicationRequest']['authoredOn']['@value']
        basedOn = ''
        if 'basedOn' in lis['resource']['MedicationRequest']:
            for entry in lis['resource']['MedicationRequest']['basedOn']:
                basedOn += entry['reference']['@value']
                basedOn += '; '
            basedOn = basedOn[:-2]
        category = ''
        for entry in lis['resource']['MedicationRequest']['category']:
            if isinstance(entry, dict):
                category += entry['text']['@value']
                category += '; '
        category = category[:-2]
        dosageInstruction = ''
        if 'dosageInstruction' in lis['resource']['MedicationRequest']:
            dosageIntruction = lis['resource']['MedicationRequest']['dosageInstruction']['text']['@value']
        encounter = lis['resource']['MedicationRequest']['encounter']['reference']['@value']
        identifier = ''
        if 'identifier' in lis['resource']['MedicationRequest']:
            identifier = lis['resource']['MedicationRequest']['identifier']['value']['@value']
        intent = lis['resource']['MedicationRequest']['intent']['@value']
        medication = lis['resource']['MedicationRequest']['medicationReference']['display']['@value']
        note = ''
        if 'note' in lis['resource']['MedicationRequest']:
            note = lis['resource']['MedicationRequest']['note']['text']['@value']
        priorPrescription = ''
        if 'priorPrescription' in lis['resource']['MedicationRequest']:
            priorPrescription = lis['resource']['MedicationRequest']['priorPrescription']['display']['@value']
        reasonCode = ''
        if 'reasonCode' in lis['resource']['MedicationRequest']:
            if isinstance(lis['resource']['MedicationRequest']['reasonCode'], list):
                for entry in lis['resource']['MedicationRequest']['reasonCode']:
                    reasonCode += entry['text']['@value']
                    reasonCode += '; '
                reasonCode = reasonCode[:-2]
            else:    
                reasonCode = lis['resource']['MedicationRequest']['reasonCode']['text']['@value']
        recorder = lis['resource']['MedicationRequest']['recorder']['display']['@value']
        if 'display' in lis['resource']['MedicationRequest']['requester']:
            requester = lis['resource']['MedicationRequest']['requester']['display']['@value']
        status = lis['resource']['MedicationRequest']['status']['@value']
        subject = lis['resource']['MedicationRequest']['subject']['display']['@value']
        arr = np.vstack((arr, np.array([authoredOn, basedOn, category, dosageInstruction, encounter, identifier, intent, medication, note, priorPrescription, reasonCode, recorder, status, subject])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Authored On', 'Based On', 'Category', 'Dosage Instruction', 'Encounter', 'Identifier', 'Intent', 'Medication', 'Note', 'Prior Prescription', 'Reason Code', 'Recorder', 'Status', 'Subject'])
    df.to_csv('MedicationRequest_Orders.csv', index = False)


def medication_statement_csv(data):
    #only DSTU2 option available - does not work
    return


def observation_labs_csv(data):
    arr = np.array(['Based On', 'Category', 'Effective Date Time', 'Encounter', 'id', 'Interpretation', 'Issued', 'Note', 'Observation', 'Performer', 'Reference Range', 'Specimen', 'Status', 'Subject', 'Value Quantity'])
    for lis in data['Bundle']['entry']:
        if 'Observation' not in lis['resource']:
            continue
        basedOn = ''
        if 'basedOn' in lis['resource']['Observation']:
            for entry in lis['resource']['Observation']['basedOn']:
                if isinstance(entry, dict):
                    basedOn += entry['reference']['@value']
                    basedOn += '; '
            basedOn = basedOn[:-2]
        category = ''
        for entry in lis['resource']['Observation']['category']:
            category += entry['text']['@value']
            category += '; '
        category = category[:-2]
        effectiveDateTime = lis['resource']['Observation']['effectiveDateTime']['@value']
        encounter = ''
        if 'encounter' in lis['resource']['Observation']:
            encounter = lis['resource']['Observation']['encounter']['reference']['@value']
        _id = lis['resource']['Observation']['id']['@value']
        interpretation = ''
        if 'interpretation' in lis['resource']['Observation']:
            interpretation = lis['resource']['Observation']['interpretation']['text']['@value']
        issued = ''
        if 'issued' in lis['resource']['Observation']:
            issued = lis['resource']['Observation']['issued']['@value']
        note = ''
        if 'note' in lis['resource']['Observation']:
            note = lis['resource']['Observation']['note']['text']['@value']
        observation = lis['resource']['Observation']['code']['text']['@value']
        performer = ''
        if 'performer' in lis['resource']['Observation']:
            performer = lis['resource']['Observation']['performer']['display']['@value']
        referenceRange = ''
        if 'referenceRange' in lis['resource']['Observation']:
            referenceRange = lis['resource']['Observation']['referenceRange']['text']['@value']
        specimen = ''
        if 'specimen' in lis['resource']['Observation']:
            specimen = lis['resource']['Observation']['specimen']['reference']['@value']
        status = lis['resource']['Observation']['status']['@value']
        subject = lis['resource']['Observation']['subject']['display']['@value']
        valueQuantity = ''
        if 'valueQuantity' in lis['resource']['Observation']:
            valueQuantity += lis['resource']['Observation']['valueQuantity']['value']['@value']
            if 'unit' in lis['resource']['Observation']['valueQuantity']:
                valueQuantity += ' '
                valueQuantity += lis['resource']['Observation']['valueQuantity']['unit']['@value']
        arr = np.vstack((arr, np.array([basedOn, category, effectiveDateTime, encounter, _id, interpretation, issued, note, observation, performer, referenceRange, specimen, status, subject, valueQuantity])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Based On', 'Category', 'Effective Date Time', 'Encounter', 'id', 'Interpretation', 'Issued', 'Note', 'Observation', 'Performer', 'Reference Range', 'Specimen', 'Status', 'Subject', 'Value Quantity'])
    df.to_csv('Observation_Labs.csv')


def observation_vitals_csv(data):
    arr = np.array(['Category', 'Diastolic Blood Pressure', 'Effective Date Time', 'Encounter', 'Height', 'Interpretation', 'Issued', 'Note', 'Observation', 'Performer', 'Reference Range', 'Status', 'Subject', 'Systolic Blood Pressure', 'Weight'])
    for lis in data['Bundle']['entry']:
        if 'Observation' not in lis['resource']:
            continue
        category = ''
        for entry in lis['resource']['Observation']['category']:
            if isinstance(entry, dict):
                category += entry['text']['@value']
                category += '; '
            category = category[:-2]
        diastolicBloodPressure = ''
        effectiveDateTime = lis['resource']['Observation']['effectiveDateTime']['@value']
        encounter = ''
        if 'encounter' in lis['resource']['Observation']:
            if 'reference' in lis['resource']['Observation']['encounter']:
                encounter = lis['resource']['Observation']['encounter']['reference']['@value']
        height = ''
        interpretation = ''
        if 'interpretation' in lis['resource']['Observation']:
            interpretation = lis['resource']['Observation']['interpretation']['coding']['display']['@value']
        issued = ''
        if 'issued' in lis['resource']['Observation']:
            issued = lis['resource']['Observation']['issued']['@value']
        note = ''
        if 'note' in lis['resource']['Observation']:
            note = lis['resource']['Observation']['note']['text']['@value']
        observation = lis['resource']['Observation']['code']['text']['@value']
        performer = ''
        if 'performer' in lis['resource']['Observation']:
            performer = lis['resource']['Observation']['performer']['display']['@value']
        referenceRange = ''
        if 'referenceRange' in lis['resource']['Observation']:
            referenceRange = lis['resource']['Observation']['referenceRange']['text']['@value']
        status = lis['resource']['Observation']['status']['@value']
        subject = lis['resource']['Observation']['subject']['display']['@value']
        systolicBloodPressure = ''
        weight = ''
        if 'valueQuantity' not in lis['resource']['Observation']:
            systolicBloodPressure = lis['resource']['Observation']['component'][0]['valueQuantity']['value']['@value']
            systolicBloodPressure += ' mm[Hg]'
            diastolicBloodPressure = lis['resource']['Observation']['component'][1]['valueQuantity']['value']['@value']
            diastolicBloodPressure += ' mm[Hg]'
        elif  lis['resource']['Observation']['valueQuantity']['unit']['@value'] == 'kg':
            weight =  lis['resource']['Observation']['valueQuantity']['value']['@value']
            weight += ' kg'
        elif lis['resource']['Observation']['valueQuantity']['unit']['@value'] == 'cm':
            height = lis['resource']['Observation']['valueQuantity']['value']['@value']
            height += ' cm'
        arr = np.vstack((arr, np.array([category, diastolicBloodPressure, effectiveDateTime, encounter, height, interpretation, issued, note, observation, performer, referenceRange, status, subject, systolicBloodPressure, weight])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Category', 'Diastolic Blood Pressure', 'Effective Date Time', 'Encounter', 'Height', 'Interpretation', 'Issued', 'Note', 'Observation', 'Performer', 'Reference Range', 'Status', 'Subject', 'Systolic Blood Pressure', 'Weight'])
    df.to_csv('Observation_Vitals.csv', index = False)


def patient_csv(data):
    arr = np.array(['Address', 'Contact', 'Deceased Boolean', 'Ethnicity', 'Gender', 'General Practitioner', 'Managing Organization', 'Marital Status', 'Name', 'Race', 'Sex', 'Telecom'])
    patient_data = data['Bundle']['entry']['resource']['Patient']
    address_data = patient_data['address'].pop()
    address = address_data['line']['@value'] + '; ' + address_data['city']['@value'] + '; ' +  address_data['state']['@value'] + '; ' + address_data['postalCode']['@value'] + '; ' + address_data['country']['@value']
    if 'birthDate' in patient_data:
        birthDate = patient_data['birthDate']['@value']
    contact = ''
    if 'contact' in patient_data:
        contact = str(patient_data['contact'])
    deceasedBoolean = ''
    if 'deceasedBoolean' in patient_data:
        deceasedBoolean = patient_data['deceasedBoolean']['@value']
    ethnicity = ''
    for entry in patient_data['extension']:
        if 'ethnicity' in entry['@url']:
            ethnicity = entry['extension']['valueString']['@value']
    gender = patient_data['gender']['@value']
    generalPractitioner = ''
    if generalPractitioner in patient_data:
        generalPractitioner = patient_data['generalPractitioner']['display']['@value']
    _id = patient_data['id']['@value']
    managingOrganization = ''
    if 'managingOrganization' in patient_data:
        managingOrganization = patient_data['managingOrganization']['display']['@value']
    maritalStatus = ''
    if 'maritalStatus' in patient_data:
        maritalStatus = patient_data['maritalStatus']['text']['@value']
    name = patient_data['name'][0]['text']['@value']
    race= ''
    for entry in patient_data['extension']:
        if 'race' in entry['@url']:
            for ent in entry['extension']:
                if 'valueString' in ent:
                    race = ent['valueString']['@value']
    sex = ''
    for entry in patient_data['extension']:
        if 'sex-for-clinical-use' in entry['@url']:
            sex = entry['valueCodeableConcept']['coding']['display']['@value']
    telecom = ''
    for entry in patient_data['telecom']:
        telecom += entry['use']['@value']
        telecom += ': '
        telecom += entry['value']['@value']
        telecom += '; '
    telecom = telecom[:-2]
    arr = np.vstack((arr, np.array([address, contact, deceasedBoolean, ethnicity, gender, generalPractitioner, managingOrganization, maritalStatus, name, race, sex, telecom])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Address', 'Contact', 'Deceased Boolean', 'Ethnicity', 'Gender', 'General Practitioner', 'Managing Organization', 'Marital Status', 'Name', 'Race', 'Sex', 'Telecom'])
    df.to_csv('Patient.csv', index = False)


def procedure_csv(data):
    arr = np.array(['Asserter', 'Based On', 'Category', 'Encounter', 'Identifier', 'Performed Date Time', 'Procedure', 'Reason Code', 'Recorder', 'Status', 'Subject'])
    for lis in data['Bundle']['entry']:
        asserter = ''
        if 'asserter' in lis['resource']['Procedure']:
            asserter = lis['resource']['Procedure']['asserter']['display']['@value']
        basedOn = ''
        if 'basedOn' in lis['resource']['Procedure']:
            for entry in lis['resource']['Procedure']['basedOn']:
                if isinstance(entry, dict):
                    basedOn += entry['reference']['@value']
                    basedOn += '; '
            basedOn = basedOn[:-2]
        category = ''
        if 'category' in lis['resource']['Procedure']:
            category = lis['resource']['Procedure']['category']['text']['@value']
        encounter = ''
        if 'encounter' in lis['resource']['Procedure']:
            encounter = lis['resource']['Procedure']['encounter']['reference']['@value']
        identifier = ''
        if 'identifier' in lis['resource']['Procedure']:
            for entry in lis['resource']['Procedure']['identifier']:
                identifier += entry['type']['text']['@value']
                identifier += '; '
            identifier = identifier[:-2]
        performedDateTime = ''
        if 'performedDateTime' in lis['resource']['Procedure']:
            performedDateTime = lis['resource']['Procedure']['performedDateTime']['@value']
        procedure = lis['resource']['Procedure']['code']['text']['@value']
        reasonCode = ''
        if 'reasonCode' in lis['resource']['Procedure']:
            for entry in lis['resource']['Procedure']['reasonCode']:
                if isinstance(entry, dict):
                    reasonCode += entry['text']['@value']
                    reasonCode += '; '
            reasonCode = reasonCode[:-2]
        recorder = ''
        if 'recorder' in lis['resource']['Procedure']:
            recorder = lis['resource']['Procedure']['recorder']['display']['@value']
        status = lis['resource']['Procedure']['status']['@value']
        subject = lis['resource']['Procedure']['subject']['display']['@value']
        arr = np.vstack((arr, np.array([asserter, basedOn, category, encounter, identifier, performedDateTime, procedure, reasonCode, recorder, status, subject])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Asserter', 'Based On', 'Category', 'Encounter', 'Identifier', 'Performed Date Time', 'Procedure', 'Reason Code', 'Recorder', 'Status', 'Subject'])
    df.to_csv('Procedure.csv', index = False)


def procedure_request_csv(data):
    arr = np.array(['Authored On', 'Based On', 'Context', 'id', 'Identifier', 'Intent', 'Note', 'Occurence Timing', 'Priority', 'Procedure Request', 'Reason Code', 'Requester', 'Status', 'Subject'])
    for lis in data['Bundle']['entry']:
        authoredOn = lis['resource']['ProcedureRequest']['authoredOn']['@value']
        basedOn = ''
        if 'basedOn' in lis['resource']['ProcedureRequest']:
            for entry in lis['resource']['ProcedureRequest']['basedOn']:
                if isinstance(entry, dict):
                    basedOn += entry['reference']['@value']
                    basedOn += '; '
            basedOn = basedOn[:-2]
        context = lis['resource']['ProcedureRequest']['context']['display']['@value']
        _id = lis['resource']['ProcedureRequest']['id']['@value']
        identifier = lis['resource']['ProcedureRequest']['identifier']['type']['text']['@value']
        intent = lis['resource']['ProcedureRequest']['intent']['@value']
        note = ''
        if 'note' in lis['resource']['ProcedureRequest']:
            note = lis['resource']['Observation']['note']['text']['@value']
        occurrenceTiming = 'start: ' + lis['resource']['ProcedureRequest']['occurrenceTiming']['repeat']['boundsPeriod']['start']['@value']
        if 'end' in lis['resource']['ProcedureRequest']['occurrenceTiming']['repeat']['boundsPeriod']:
             occurrenceTiming += '; end: '
             occurrenceTiming += lis['resource']['ProcedureRequest']['occurrenceTiming']['repeat']['boundsPeriod']['end']['@value']
        priority = ''
        if 'priority' in lis['resource']['ProcedureRequest']:
            priority = lis['resource']['ProcedureRequest']['priority']['@value']
        procedureRequest = lis['resource']['ProcedureRequest']['code']['text']['@value']
        reasoncode = lis['resource']['ProcedureRequest']['reasonCode']['text']['@value']
        requester = lis['resource']['ProcedureRequest']['requester']['agent']['display']['@value']
        status = lis['resource']['ProcedureRequest']['status']
        subject = lis['resource']['ProcedureRequest']['subject']['display']['@value']
        arr = np.vstack((arr, np.array([authoredOn, basedOn, context, _id, identifier, intent, note, occurrenceTiming, priority, procedureRequest, reasoncode, requester, status, subject])))
    df = pd.DataFrame(np.delete(arr, 0, 0), columns = ['Authored On', 'Based On', 'Context', 'id', 'Identifier', 'Intent', 'Note', 'Occurence Timing', 'Priority', 'Procedure Request', 'Reason Code', 'Requester', 'Status', 'Subject'])
    df.to_csv('ProcedureRequest.csv', index = False)

        
def get_epic_data(patientID):
    # Written by Daniel
    myToken = generateToken()
    #Implenting multithreading for fetching data with fetch_all_patient_data from concurr.py (daniel)
    pairs = [
        # Information on allergies to substances, including medications
        # Fields: 'Allergy Intolerance', 'Category', 'Clinical Status', 'Criticality', 'id', 'Note', 'Onset Period', 'Patient', 'Reaction', 'Recorded Date', 'Recorder', 'Verification Status'
        # See https://fhir.epic.com/Sandbox?api=947 for more info
        ['AllergyIntolerance.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/AllergyIntolerance/',
            'patientID': patientID,
            'token': myToken
        }],

        # Diagnosis data from all encounters (hospitalizations, check-ups, etc.)
        # Fields: 'Abatement Period', 'Asserted Date', 'Category', 'Clinical Status', 'Condition', 'id', 'Note', 'Onset Period', 'Severity', 'Subject', 'Verification Status'
        # See https://fhir.epic.com/Sandbox?api=952 for more info
        ['Condition.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Condition/',
            'patientID': patientID,
            'token': myToken,
            'category': 'encounter-diagnosis'
        }],

        # All diagnostic report data (laboratory tests, immunizations, etc.)
        # Fields: 'Based On', 'Category', 'Diagnostic Report', 'Effective Date Time', 'Encounter', 'Identifier', 'Issued', 'Performer', 'Result', 'Status', 'Subject'
        # See https://fhir.epic.com/Sandbox?api=989 for more info
        ['DiagnosticReport.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/DiagnosticReport/',
            'patientID': patientID,
            'token': myToken
        }],

        # All clinical notes written by a healthcare professional
        # Fields: 'Authenticator', 'Author', 'Category', 'Context (Encounter)', 'Context (Period)', 'Custodian', 'Date', 'Doc Status', 'id', 'Status', 'Subject', 'Type'
        # See https://fhir.epic.com/Specifications?api=1048 for more info
        ['DocumentReference.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/DocumentReference/',
            'patientID': patientID,
            'type': '18842-5',
            'token': myToken
        }],

        # All encounter information (ambulatory, inpatient, emergency, home health, and virtual encounters)
        # Fields: 'Account', 'Class', 'Diagnosis', 'id', 'Identifier', 'Location', 'Participant', 'Period', 'Priority', 'Reason Code', 'Service Type', 'Status', 'Type'
        # See https://fhir.epic.com/Specifications?api=909 for more info
        ['Encounter.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Encounter/',
            'patientID': patientID,
            'token': myToken
        }],

        # Currently unavailable resource due to endpoint version
        ['MedicationOrder.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2/MedicationOrder/',
            'patientID': patientID,
            'token': myToken
        }],

        # All medication orders for a patient (inpatient-ordered medications, clinic-administered medications (CAMS), patient-reported medications, reconciled medications)
        # Fields: 'Authored On', 'Based On', 'Category', 'Dosage Instruction', 'Encounter', 'Identifier', 'Intent', 'Medication', 'Note', 'Prior Prescription', 'Reason Code', 'Recorder', 'Status', 'Subject'
        # See https://fhir.epic.com/Specifications?api=997 for more info
        ['MedicationRequest.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/MedicationRequest/',
            'patientID': patientID,
            'token': myToken
        }],

        # Currently unavailable resource due to endpoint version
        ['MedicationStatement.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2/MedicationStatement/',
            'patientID': patientID,
            'token': myToken
        }],

        # Returns lab results, with category (high, low, etc.)
        # Fields: 'Based On', 'Category', 'Effective Date Time', 'Encounter', 'id', 'Interpretation', 'Issued', 'Note', 'Observation', 'Performer', 'Reference Range', 'Specimen', 'Status', 'Subject', 'Value Quantity'
        # See https://fhir.epic.com/Specifications?api=999 for more info
        ['Observation.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation/',
            'patientID': patientID,
            'token': myToken,
            'category' : 'laboratory'
        }],

        # Returns vitals information (weight, height, blood pressures, etc.)
        # Fields: 'Category', 'Diastolic Blood Pressure', 'Effective Date Time', 'Encounter', 'Height', 'Interpretation', 'Issued', 'Note', 'Observation', 'Performer', 'Reference Range', 'Status', 'Subject', 'Systolic Blood Pressure', 'Weight'
        # See https://fhir.epic.com/Specifications?api=973 for more info
        ['Observation.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation/',
            'patientID': patientID,
            'token': myToken,
            'category' : 'vital-signs'
        }],

        # ALl procedures that are planned to be performed (diagnostic investigations, counseling, therapies, surgeries or procedures, exercises, and other clinical interventions)
        # Fields: 'Authored On', 'Based On', 'Context', 'id', 'Identifier', 'Intent', 'Note', 'Occurence Timing', 'Priority', 'Procedure Request', 'Reason Code', 'Requester', 'Status', 'Subject'
        # See https://fhir.epic.com/Specifications?api=887 for more info
        ['ProcedureRequest.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/STU3/ProcedureRequest/',
            'patientID': patientID,
            'token': myToken
        }],

        # All procedures that have been performed
        # Fields: 'Asserter', 'Based On', 'Category', 'Encounter', 'Identifier', 'Performed Date Time', 'Procedure', 'Reason Code', 'Recorder', 'Status', 'Subject'
        # See https://fhir.epic.com/Specifications?api=976 for more info
        ['Procedure.Search', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Procedure/',
            'patientID': patientID,
            'token': myToken
        }],

        # Details about the patient (demographics, emergency contact, care providers, etc.)
        # Fields: 'Address', 'Contact', 'Deceased Boolean', 'Ethnicity', 'Gender', 'General Practitioner', 'Managing Organization', 'Marital Status', 'Name', 'Race', 'Sex', 'Telecom'
        # See https://fhir.epic.com/Specifications?api=931 for more info
        ['Patient.Read', {
            'url': 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/',
            'patientID': patientID,
            'token': myToken
        }]
    ]
    data = fetch_data(pairs)
    # for d in data:
    #     print(d['Bundle']['link']['url']['@value'])
    allergy_intolerance_csv(data[0])
    condition_csv(data[1])
    diagnostic_report_csv(data[2])
    document_reference_csv(data[3])
    encounter_search_csv(data[4])
    medication_order_csv(data[5])
    medication_request_csv(data[6])
    medication_statement_csv(data[7])
    observation_labs_csv(data[8])
    observation_vitals_csv(data[9])
    patient_csv(data[10])
    procedure_csv(data[11])
    procedure_request_csv(data[12])


# This function generates csv tables of the resources specified in the "pairs" of this function
get_epic_data('e63wRTbPfr1p8UW81d8Seiw3')

# This function generates a dictionary of the resources specified in the "pairs" of this function
# print(parse('e63wRTbPfr1p8UW81d8Seiw3'))