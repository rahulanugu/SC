# ScriptChain Web Application

The web application is built using the MEAN stack (MondoDB, Express, Angular, and Node.js). 
To run the entire application, follow the steps below.

# Video tutorial to start the application on local server
https://www.youtube.com/watch?v=hXFf1Ncwkgw

## 1. Install Angular Application 

Install all modules listed as dependencies in package.json under the "angular" directory.

```bash
cd web-application/angular/
npm install
```

## 2. Install Node.js Application

Install all modules listed as dependencies in package.json under the "node" directory.

```bash
cd web-application/node/
npm install
```

## 3. Run Node Application

Build and serve the back-end application to a local server.
Navigate to http://localhost:3000/patient to see a list of all current patients in the database.

```bash
cd web-application/node/
node index.js
```

## 4. Run Angular Application

Build and serve the front-end application to a local server.
The webpage will open on the following url:  http://localhost:4200/.
These instructions are also written in the README under the angular directory.


## 5. Steps for index.js file from backend side
Just follow the comments written in the index.js file for development mode and production mode. 

```bash
cd web-application/angular/
ng serve --o
```

You should now have the full website running that is connected to the MongoDB database!
