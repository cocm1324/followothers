FROM node:10.18.1-alpine as build-step
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.16.0-alpine as prod-stage
COPY --from=build-step /app/dist/dockerangular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
