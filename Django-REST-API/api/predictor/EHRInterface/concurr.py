# Concurrency features
# Multi-threading functionality will live here; async behavior implemented in views.py

from futures3.thread import ThreadPoolExecutor
from futures3 import as_completed
import requests


def get_error_code(message):
    return {'status_code': 404, 'message': message}

'''
 Use: Fetch multiple patient data using multithreading
 Input: Array of (key, object) pairs reflecting (resource type, request data)
 Output: List of available patient data as requests.py responses
'''
def fetch_all_patient_data(pairs, fetch_handler):
    threads = []
    results = []

    with ThreadPoolExecutor(max_workers=20) as executor:
        for value in pairs:
            key = value[0]
            params = value[1]
            threads.append(executor.submit(fetch_handler, key, params)) # fetch_handler(key, params)

        for task in as_completed(threads):
            try:
                results.append(task.result())
                print(task.result())
            except requests.ConnectTimeout:
                results.append(get_error_code('Resource timed out'))
                print('Resource timed out')

    return results

