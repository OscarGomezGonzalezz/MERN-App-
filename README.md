# TODO List App

## Index

- [Description](#description)
- [Task 1: Local development with MongoDB and React](#task-1-local-development-with-mongodb-and-react)
- [Task 2: Migrating to docker-compose, nginx and HTTPS setup](#task-2-migrating-to-docker-compose-nginx-and-https-setup)
  - [Development](#development)
  - [Production](#production)
  - [Kubernetes](#kubernetes)
  - [TLS/HTTPS To Keycloak](#tlshttps-to-keycloak)
- [Description](#description)

---

## Description

TODO List App (MERN) with session management. Built using React for the frontend and Node.js for the backend with MongoDB. This guide covers local development, containerization with Docker, Kubernetes deployment, and HTTPS setup via Keycloak.

---

## Task 1: Local development with mongodb and react##

For running mongoDB in the cloud (mongoDB Atlas):
1. Create a cluster
2. create user and password(registered in the .env file)
3. choose the driver connection 

But as we have to run the database locally:
1. Install mongoDB
2. brew start mongodb-community
3. For checking the connection in shell: mongosh "mongodb+srv://clusterxxxxxx" --apiVersion 1 --username username

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

## Task 2: Migrating to docker-compose, nginx and HTTPS setup##

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
add also mongo-express for visualizaing db: ADMIN; PASS

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

### TLS/HTTPS To Keycloak ###

openssl req -x509 -out localhostcert.pem -keyout localhostkey.pem \ 
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

when loading the secured page: https://localhost:8043, we will have to set our local certificate as trusted

