import cors from 'cors';
import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';

import makeHandlers from './handlers';
import ChatroomManager from './managers/ChatroomManager';
import ClientManager from './managers/ClientManager';
import { MongooseDb } from './mongo';

// Set up express and socketIO
const app = express();
app.use(cors());
const server = Server(app);
const io = socketIO(server);
const mongooseDb = MongooseDb();

const clientManager = new ClientManager();
const chatroomManager = new ChatroomManager();

io.on('connection', client => {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleCreateChatroom,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager);

  console.log('Client connected...', client.id);
  clientManager.addClient(client);

  client.on('register', handleRegister);

  client.on('join', handleJoin);

  client.on('leave', handleLeave);

  client.on('message', handleMessage);

  client.on('chatrooms', handleGetChatrooms);

  client.on('create chatroom', handleCreateChatroom);

  client.on('disconnect', () => {
    console.log('Client disconnect...', client.id);
    handleDisconnect();
  });

  client.on('error', err => {
    console.log('Received error from client:', client.id);
    console.log(err);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));
