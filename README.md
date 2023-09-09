# How to work with Moh

# Coming up with new ideas and how to present it?
I love to hear new ideas that get brought up to the team either through meetings or direct messages. It is a requirement to come up with ideas and have it backed by evidence. 

# How and when to ask questions?
Asking questions is a part of any job and I encourage everyone to do so but after you have actually tried to look into finding out the answer independently. Many of the questions have already been answered within our documentation or with a google search on stack overflow so don't waste time during times where you could have found the answer yourself with some effort put into it. If someone during meetings ask a question, before I can say anything ask your own colleagues to see if they can answer it. The meetings are a collaboration amongst everyone.

# When do we get to collaborate?
You have that opportunity as long as you take initiative doing it. Do not wait for me to tell and set up meetings amongst people you need to take ownership over your work to build efficiencies without a middle man. My time is very valuable so having to stop what I am doing just to inform you you need to contact someone else directly is a waste of time and loss of productivity. 

# What kind of communication do we reach out to you?
I think pinging me on Slack should always be your go to strategy then email and then maybe text messaging if it is something really important. I try to respond promptly but I juggle multiple tasks at the same time so it may not happen every time.

# What is the best way to present and what should we include?
Making sure that your powerpoint presentations are professional and properly labeled is great. When presenting to any senior management you want to make the presentation visually appealing but also easy to follow. That is why I require 3-4 slide page decks that are properly formatted in the way I see most effective. Afterward, we can dive deeper on what the work actually looks like.

# What are the best skills to have in order to be successful in working with you?
Being organized, transparent, and professional. I can not emphasize enough how important that is with me. I repeat myself when I assign a mini project to someone but it is very obnoxious when I repeat myself and right after we get off a call when you don’t remember a thing of what we just spoke about due to the lack of you preparing to meet with me and not taking notes during our conversation. It shows that you are all over the place especially if it happens frequently. ALWAYS TAKE NOTES during talks with me so you do not fall behind and don’t cause inefficiencies. 






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
Navigate to https://localhost:3000/patient to see a list of all current patients in the database.

```bash
cd web-application/node/
node index.js
```

## 4. Run Angular Application

Build and serve the front-end application to a local server.
The webpage will open on the following url:  https://localhost:4200/.
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
| If you comment a chunk of code out, please comment why you commented out this said chunk of code. | This will inform the reader what is the purpose of this mass uncommenting.|
| Follow the same coding practices whether it be forms, loading images, responsiveness, dynamic sizing, so an incumbent can review the code and understand how to modify if necessary.| Ease of reading and comprehending teams code seamlessly.|
|Set up the PR for Dev Environment,Resolve any conflicts and Ping me and I will merge them. I will notify you to start testing using the testing document https://www.softwaretestinghelp.com/web-application-testing/ . Once the testing has been done and completed successfully. I will then merge them into Prod.| Create fully secure web application|
|When PR is set, push only the specific pages worked on | organize code and avoid conflicts|
| Steps to push code: git add (name of component) => git commit -m " (text) " => git push| Cleaner code|
