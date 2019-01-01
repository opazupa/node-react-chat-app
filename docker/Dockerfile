# dockerfile for node chat app server

FROM node:9.6.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

EXPOSE 80

CMD ["npm", "run", "server"]
