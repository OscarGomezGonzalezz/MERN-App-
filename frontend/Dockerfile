# Build phase
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Serve static build
FROM nginx:alpine
EXPOSE 3000
COPY --from=build /app/build /usr/share/nginx/html
#nginx serves the app from build stage in port 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

