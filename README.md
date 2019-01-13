# node-react-chat-app

Node + React websocket based live chat app

## Includes

- React frontend with Material UI design :heavy_check_mark:
- MobX for state management :heavy_check_mark:
- Websockets for livechat :heavy_check_mark:
- Node backend server :heavy_check_mark:
- Mongo DB for chat history :heavy_check_mark:
- Docker support :heavy_check_mark:

## Code Structure

- Server in **server** folder
- Client in **chat-client** folder

## Run with docker :cake:

**Run locally with hot reloading**

`docker-compose up/down`

**Run nginx-served**

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up/down`

**Or as a stack :)**

`docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml chat-app`
