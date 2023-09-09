from django.test import TestCase
import requests
import json
class ViewTest(TestCase):
    
    def setUp(self):
        self.d_source_url="https://127.0.0.1:5000/DataSource/api/v1.0/getPatient" # URL of the Data Source API
        self.view_url="https://127.0.0.1:8000/generateAnalytics/" # URL of the generateAnalytics Endpoint
    
    def test_generateAnalyticsTest(self):
        
        patient_id=33195
        d_response=requests.get(self.d_source_url, json={'id':patient_id}, auth=("ScriptChain","ScriptChain@123A1"))
        if d_response.status_code==200:
            data=d_response.json()
            response=requests.get(self.view_url,json=data)
            self.assertEqual(response.status_code, 200)
        if d_response.status_code==404:
            print("Check if the data service is running")
            self.assertEqual(1,0)
        else:
            print('Unkown Error')
            self.assertEqual(1,0)
        
        


        




