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

# Best Practices

| Best Practice | Purpose |
| ------------- | ------- |
| Always write your name and your contribution to a specific file after you finish modifying it. | In case of a bug in the future, we can refer to the person who wrote the code and understand what’s wrong. |
| Always log your errors and their solutions in the documentation for future reference. | New people and even other people in the organization facing the same error can quickly get the solution to the error by looking at the documentation. |
| When writing a new controller in the backend or creating a new component in the frontend, always comment on what each endpoint within the controller does and for the frontend, what the specific component does. | Creates clarity and makes our code base well organized. New people joining the organization will be able to get a firm understanding of our code base with ease. |
| If working on the frontend, delete any unwanted/not used components. | Keeping unwanted components or components not in use creates unnecessary load and unnecessarily increases the size of the code base. |
| If working on the backend, delete any unwanted/not used controllers and files. | Keeping unwanted controllers or files not in use creates unnecessary load and unnecessarily increases the size of the code base. |
| If working on the frontend, do not use any script tags in the html files. Angular ignores script tags during execution. | Using code that is eventually going to be ignored will contribute unnecessarily to the size of the code base. |
