import pandas as pd
import numpy as np
import pickle
import json
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.layers import Dense, Input, concatenate, Dropout
from tensorflow.keras import backend as K
from tensorflow.keras.models import Model
from predictor.EHRInterface import EpicInterface as epic
from predictor.EHRInterface import Model_config


# Need to have JSON, 1 saved StandardScaler object, medications vocab, procedures vocab, mappings vocab, 4 saved model weights, Model_config.py

thresholds = {'Congestive Heart Failure': 0.5, 'Hypertension': 0.5, 'ASHD coronary artery': 0.5, 'Atrial Fibrilliation':0.5}

#///////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////

def preprocess():

  with open('./predictor/EHRInterface/EpicPatientData.json') as f:
    data = json.load(f)

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
       '50983', '51006', '51144', '51146', '51200', '51221', '51222', '51237',
       '51244', '51248', '51249', '51250', '51254', '51256', '51265', '51274',
       '51275', '51277', '51279', '51301', '51491', '51498']
  labs = pd.DataFrame([], columns=top50lab_cpt)
  X_features = X_features.join(labs)
  print(X_features)
  for l in data['Lab Events']:
    # get cpt of l['code'] using mapping
    #if cpt in cols
    X_features[l] = l['value']

  scaler = pickle.load(open('scale_it.obj', 'rb')) 
  X_features = np.concatenate((X_features.values[:,:1],scaler.transform(X_features.values[:,1:])),axis = 1)

#=============================================================== 
#======================== Procedures =========================== 

  proc_vocab = pd.read_pickle("Procedures_vocab.pkl")
  procedures = keras.preprocessing.sequence.pad_sequences([[proc_vocab[entry["code"]] for entry in data['Procedures'] if entry["code"] in proc_vocab]], maxlen=8)

#=============================================================== 
#======================= Medications =========================== 

  med_vocab = pd.read_pickle("Drug_vocab.pkl")
  meds_used = [entry["name"] for entry in data['Medications']] # this is the list of medications used by the subject
  # we need to pass each element of this list through metamap and get the result. 
  # pass the output through a process method.
  print(meds_used)
  metamap_med_list = epic.parseText(meds_used)# output from process method
  medications = keras.preprocessing.sequence.pad_sequences([[med_vocab[med] for med in metamap_med_list if med in med_vocab]], maxlen=35)

#=============================================================== 
#========================== Notes ============================== 

  map_vocab = pd.read_pickle("Mappings_vocab.pkl")
  note = data['Notes'] # this is the Doctors note for the subject
  # Process the note
  # we need to pass this note through metamap and get the result. 
  # pass the output through a process method.
  
  metamap_note_maps = epic.parseText(note)# output from process method
  mappings = keras.preprocessing.sequence.pad_sequences([[map_vocab[maps] for maps in metamap_note_maps if maps in map_vocab]], maxlen=50)
 
#===============================================================

  return X_features, procedures, medications, mappings

#///////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////

def generate_analytics():
  X_features, procedures, medications, mappings = preprocess()
  model_4280, model_4019, model_41401, model_42731 = Model_config.compile_model(), Model_config.compile_model(), Model_config.compile_model(), Model_config.compile_model()
  model_4280.load_weights('distron_4280.h5')
  model_4019.load_weights('distron_4019.h5')
  model_41401.load_weights('distron_41401.h5')
  model_42731.load_weights('distron_42731.h5')

  predictions = {}
  predictions['Congestive Heart Failure'] = model_4280.predict([mappings, procedures, medications, X_features]) >= thresholds["Congestive Heart Failure"]
  predictions['Hypertension'] = model_4019.predict([mappings, procedures, medications, X_features]) >= thresholds["Hypertension"]
  predictions['ASHD coronary artery'] = model_41401.predict([mappings, procedures, medications, X_features]) >= thresholds["ASHD coronary artery"]
  predictions['Atrial Fibrilliation'] = model_42731.predict([mappings, procedures, medications, X_features]) >= thresholds["Atrial Fibrilliation"]
  return predictions

#///////////////////////////////////////////////////////////////
#///////////////////////////////////////////////////////////////
