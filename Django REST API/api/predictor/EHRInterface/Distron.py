import pandas as pd
import numpy as np
import pickle
import json
import os
import math
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.layers import Dense, Input, concatenate, Dropout
from tensorflow.keras import backend as K
from tensorflow.keras.models import Model
from predictor.EHRInterface import EpicInterface as epic
from predictor.EHRInterface import Model_config
from django.core.files.storage import default_storage
#STORAGE_BUCKETS = 'https://storage.googleapis.com/scriptchain-1/'

# Need to have JSON, 4 saved StandardScaler objects, medications vocab, procedures vocab, mappings vocab, 4 saved model weights, Model_config.py

thresholds = {'Congestive Heart Failure': 0.5, 'Hypertension': 0.3, 'ASHD coronary artery': 0.5, 'Atrial Fibrilliation':0.5}

#///////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////


def preprocess():

  with default_storage.open('data/EpicPatientData.json') as f:
    data = json.load(f)#fetch this from epic

#============= GENDER + AGE + 50 LAB TEST ====================== 

  gender = data['Demography']['gender'].lower()
  if gender.startswith('m'):
  	X_features = pd.DataFrame({'GENDER' : [1]})
  else:
    X_features = pd.DataFrame({'GENDER' : [0]})

  X_features["AGE"] = data['Demography']['age']

  top50lab_cpt = ['50802', '50804', '50808', '50809',
       '50810', '50811', '50813', '50818', '50820', '50821', '50822', '50824',
       '50861', '50862', '50863', '50868', '50878', '50882', '50885', '50893',
       '50902', '50910', '50912', '50931', '50954', '50960', '50970', '50971',
       '50983', '51006', '51144', '51146', '51200', '51221', '51222','51237',
       '51244', '51248', '51249', '51250', '51254', '51256', '51265', '51274',
       '51275', '51277', '51279', '51301', '51491', '51498']
  
  top50lab_lionc = ['11555-0','34728-6','1994-3','2339-0','20570-8',
    '718-7','32693-4','11557-6','11558-4','11556-8','6298-4','2947-0','1742-6',
    '1751-7','6768-6','1863-0','1920-8','1963-8','1975-2','2000-8','2075-0','2157-6',
    '2160-0','2345-7','2532-0','2601-3','2777-1','2823-3','2951-2','3094-0','763-3',
    '704-7','711-2','4544-3','718-7','5895-7','731-0','785-6','786-4','787-2','742-7',
    '761-7','777-3','5902-2','3173-2','788-0','789-8','804-5','5803-2','5811-5']

  #use loinc codes directly
  labs = pd.DataFrame([], columns=top50lab_cpt)
  X_features = X_features.join(labs)
  
  #print(X_features)
  #print(data['Lab Events'][0]['value'])
  #content = ""
  #with open("./predictor/EHRInterface/MRSMAP.RRF") as f:
  #  content = f.readlines()
  dicti={}
  for i in range(len(top50lab_cpt)):
    dicti[top50lab_lionc[i]]=top50lab_cpt[i]
  '''dicti = {}
  for i in range(len(content)):
    splitted = content[i].split('|')
    loinc=splitted[4]
    cpt=splitted[8]
    dicti[loinc]=cpt'''
  for l in data['Lab Events']:
    lionc = l['code']
    cpt=""
    if lionc in dicti.keys():
      cpt=dicti[lionc]
    if cpt in X_features.columns.tolist():
      X_features[cpt] = l['value']
      if lionc=='718-7':
        X_features['50811']=l['value']
  pre_data = pd.read_pickle(default_storage.open('models/lab_normal_vals.pkl'))
  for cpt in X_features.columns.tolist():
    if math.isnan(X_features[cpt]):
      X_features[cpt]=pre_data[int(cpt)]
  data1 = pickle.load(default_storage.open('models/data_4019.pkl', 'rb'))
  #dt = pd.read_csv("./predictor/EHRInterface/final_data.csv")
  scaler1 = StandardScaler()
  #print(data1.head())
  req_arr = ['AGE']
  req_arr.extend(top50lab_cpt)
  req_data1 = data1[req_arr]
  scaler1.fit(req_data1)
  #update the distron models such that it gets trained and tested on a single set of X features
  #then one could use a single scaler
  #filehandler = open('scale_it.obj', 'wb')
  #pickle.dump(dt_, filehandler)
  #scaler = pickle.load(open('scale_it.obj', 'rb')) 
  #train the scaler with age first and cpts later from the datasets
  #Add regularization for the distron model while training
  X_features = np.concatenate((X_features.values[:,:1],scaler1.transform(X_features.values[:,1:])),axis = 1)

#=============================================================== 
#======================== Procedures =========================== 

  proc_vocab = pd.read_pickle(default_storage.open("models/Procedures_vocab.pkl"))
  procedures = keras.preprocessing.sequence.pad_sequences([[proc_vocab[entry["code"]] for entry in data['Procedures'] if entry["code"] in proc_vocab]], maxlen=8)

#=============================================================== 
#======================= Medications =========================== 

  med_vocab = pd.read_pickle(default_storage.open("models/Drug_vocab.pkl"))
  if 'Medications' not in data:
    data['Medications']=[]
  meds_used = [entry["name"] for entry in data['Medications']] # this is the list of medications used by the subject
  # we need to pass each element of this list through metamap and get the result. 
  # pass the output through a process method.
  metamap_med_list = [epic.parseMedications(med) for med in meds_used]# output from process method
  medications = keras.preprocessing.sequence.pad_sequences([[med_vocab[med] for med in metamap_med_list if med in med_vocab]], maxlen=35)

#=============================================================== 
#========================== Notes ============================== 
  map_vocab = pd.read_pickle(default_storage.open("models/Mappings_vocab.pkl"))
  if 'Notes' not in data:
    data['Notes']=""
  note = data['Notes'] # this is the Doctors note for the subject
  # Process the note. we need to filter out negative statements
  # we need to pass this note through metamap and get the result. 
  # pass the output through a process method. -- this is to extract the highlighted word
  
  metamap_note_maps = epic.parseNotes(note)# output from process method
  mappings = keras.preprocessing.sequence.pad_sequences([[map_vocab[maps] for maps in metamap_note_maps if maps in map_vocab]], maxlen=50)
 
#===============================================================

  return X_features, procedures, medications, mappings

#///////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////

def generate_analytics():
  X_features, procedures, medications, mappings = preprocess()
  model_4280, model_4019, model_41401, model_42731 = Model_config.compile_model(), Model_config.compile_model(), Model_config.compile_model(), Model_config.compile_model()
  #model_4019=Model_config.compile_model()
  model_4019.load_weights('./predictor/models/distron_4019.h5')
  model_4280.load_weights('./predictor/models/distron_4280.h5')
  model_41401.load_weights('./predictor/models/distron_41401.h5')
  model_42731.load_weights('./predictor/models/distron_42731.h5')

  # model_4019.load_weights(default_storage.path('models/distron_4019.h5'))
  # model_4280.load_weights(default_storage.path('models/distron_4280.h5'))
  # model_41401.load_weights(default_storage.path('models/distron_41401.h5'))
  # model_42731.load_weights(default_storage.path('models/distron_42731.h5'))

  predictions = {}
  predictions['Congestive Heart Failure'] = model_4280.predict([mappings, procedures, medications, X_features]) >= thresholds["Congestive Heart Failure"]
  predictions['Hypertension'] = model_4019.predict([mappings, procedures, medications, X_features]) >= thresholds["Hypertension"]
  #print(predictions)
  predictions['ASHD coronary artery'] = model_41401.predict([mappings, procedures, medications, X_features]) >= thresholds["ASHD coronary artery"]
  predictions['Atrial Fibrilliation'] = model_42731.predict([mappings, procedures, medications, X_features]) >= thresholds["Atrial Fibrilliation"]
  #threshold needs to be learned as well. we need a trainset test set and a validation set in order to figure
  #out the threshold
  #regularization in every layer if possible(wherever possible)
  print(predictions)
  return predictions

#///////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////
