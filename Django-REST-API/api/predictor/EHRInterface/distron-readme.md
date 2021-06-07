#Distron Prediction model
- This file explains the models built in Distron.py and Model_config.py
- The data used is in the file EpicPatientData.json
- The pre-trained models are 4019model.pickle.dat, 4280model.pickle.dat, 41401model.pickle.dat and 42731model.pickle.dat

-- The data is the collection of multiple lab results of deidentified patient data.

-- The features extracted include top 50 lab tests.

-- Pretrained models of normal lab result values, procedure vocab, Drug vocab are used.

-- Medications are derived from the drug_vocab using keras.

-- Each of different features are used on different models. 

THE CODE FOR THE FOLLOWING DOCUMENTATION IS IN MODEL_CONFIG.PY

-- First using the vocab size of different features, we have an embedding layer that encodes the tokens into fixed size using keras layers.

-- Then the medication map, procedures and medications are converted to results using MultiHead Self Attension model on the embedded data. 

-- The number of attention heads is fixed at 2.

-- The lab results features are learnt using a simple CNN model

-- The resulting weights from four different models are then used to make the final predictions.
