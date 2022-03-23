FROM node:16.14.2-slim AS build
WORKDIR /dist/src/app
RUN npm i -g npm@8.5.3
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/front-end /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
