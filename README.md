# TODO App

## Getting started

For running mongoDB in the cloud (mongoDB Atlas):
1. Create a cluster
2. create user and password(registered in the .env file)
3. choose the driver connection 

But as we have to run the database locally:
1. Install mongoDB
2. brew start mongodb-community
3. For checking the connection in shell: mongosh "mongodb+srv://cluster0.7m91o.mongodb.net/" --apiVersion 1 --username oscar

IMPORTANT: WHEN TESTING IT WITH POSTMAN:
Authorization: {token} <--- WITHOUT ADDING "Token" OR "Bearer" before the token itself

Before inizialising the backend, we have to create a .env file, inside the /backend folder, with our secret key: JWT_SECRET=example
For security reasons, add this file to the .gitignore

Now, we can run the backend: 
1. cd backend
2. nodemon server.js



Now, backend is ready for receiving requests from the frontend, so we run it with:
1. cd ../frontend
2. npm start

## Task 2 ##

First, we migrate the backend to a docker container:
1. for testing just the node server (mongo running locally not in container), the uri should be:
- docker build -t test .
- docker run -d -p 3500:3500 test

Update dbConnection.js with: 
- const uri = "mongodb://host.docker.internal:27017/"; 

2. Once we know node image is working, we migrate the database to a container, for so, instead of 
   creating another dockerfile for the db, we will directly create it in the .yml file 


## Description

TODO List App with user session management, made with React(npx create-react-app mi-app)for the frontend and Node + JS for the backend



