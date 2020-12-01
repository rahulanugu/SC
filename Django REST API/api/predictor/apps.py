from django.apps import AppConfig
from django.conf import settings
import os
import pickle
from django.core.files.storage import default_storage

class PredictorConfig(AppConfig):
    name = 'predictor'
    # file = default_storage.open('test.txt', 'r')
    # print(file.read())
    model_4280 = pickle.load(
        default_storage.open("models/4280model.pickle.dat", "rb"))
    model_4019 = pickle.load(
        default_storage.open("models/4019model.pickle.dat", "rb"))
    model_41401 = pickle.load(
        default_storage.open("models/41401model.pickle.dat", "rb"))
    model_42731 = pickle.load(
        default_storage.open("models/42731model.pickle.dat", "rb"))

