# TODO App

## Task 1 ##

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

### Development
First, we migrate the backend to a docker container:
1. for testing just the node server (mongo running locally not in container), the uri should be:
- docker build -t test .
- docker run -d -p 3500:3500 test

Update dbConnection.js with: 
- const uri = "mongodb://host.docker.internal:27017/"; 

2. Once we know node image is working, we migrate the database to a container, for so, instead of 
   creating another dockerfile for the db, we will directly create it in the docker-compose 

3. Then, we change the uri of the dbConnection.js to process.env ones, as these are defined in the .yml.

4. Once full backend is tested and works, we have to integrate frontend. Before everything, we have to understand:

In task 1, When you run npm start, React uses Vite, webpack-dev-server, or React Scripts, depending on your setup.
This development server runs by default on localhost:3000 (unless it's taken).
It's only used during development and is not included in your production Docker image

When you do this in the Dockerfile:
RUN npm run build
It generates a static build of your React app in /build. Then, Nginx serves those files — and Nginx typically listens on port 80 inside the container, but we will use 3000

5. Now we create the default.conf of nginx, forwarding requests to services, to its inside containers ips and add it too to the docker-compose

### Production
6. test it in production env by creating dockerfiles of production and adding other nginx inside frontend

Lets build and push the image of our frontend and backend testing them with:
- docker buildx build --platform linux/amd64,linux/arm64 -t your-dockerhub-username/your-image-name:tag . --push
and then docker run

### Kubernetes

4. You have to set the image used in the web-app.yaml to your-dockerhub-username/your-image-name:tag and also
 set the env linked to your mongo-secret and mongo-config, where you will have to indicate your credentials in base64
 Also Delete the .env file, just in case it interferes with process.env

5. Test everything with:
- minikube start --driver=docker
a. kubectl apply -f mongo-secret.yaml 
b. kubectl apply -f mongo-config.yaml 
c. kubectl apply -f mongo/
d. kubectl apply -f node/ 

Now we have to export that service to our machine for testing it:
- minikube service node-service 




After changing smth: 
- kubectl logs -l app=node-server
- kubectl delete configmap --all y asi con el resto


## Description

TODO List App with user session management, made with React(npx create-react-app mi-app)for the frontend and Node + JS for the backend



