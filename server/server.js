const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const ClientManager = require('./managers/ClientManager');
const ChatroomManager = require('./managers/ChatroomManager');
const makeHandlers = require('./handlers');

const app = express();
app.use(cors());

const server = http.Server(app);
const io = socketIO(server);

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

io.on('connection', function(client) {
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

  client.on('disconnect', function() {
    console.log('Client disconnect...', client.id);
    handleDisconnect();
  });

  client.on('error', function(err) {
    console.log('Received error from client:', client.id);
    console.log(err);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));
