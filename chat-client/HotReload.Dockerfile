# dockerfile for node chat app client wit dev hot reloading

FROM node:10.15.0-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

EXPOSE 3000 35729

CMD ["npm", "run", "start"]


