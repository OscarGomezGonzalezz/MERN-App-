# Build phase
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Serve static build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
#nginx serves the app from build stage in port 80
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
