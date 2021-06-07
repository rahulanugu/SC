### Starting the application
<br>
1) Create a virtaul environment to avoid package conflicts. Use command - python -m venv "Name of your virtual env". <br>
2) Activate the virtual environment using the command- source "Name of your virtual env"/bin/activate. <br>
3) Install the requirments in the virtual environment using the command "pip install -r requirements.txt". <br>
4) Navigate into the directory "api/". <br>
5) Run the command "python manage.py runserver". The Django server should be running now. <br>
6) Send an echo "post" request from postman using the URL-  http://127.0.0.1:8000/generateAnalytics/ and passing some json data.<br>


