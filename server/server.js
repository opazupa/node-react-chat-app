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
const io = socketIO(http);

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

io.on('connection', function(client) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager);

  console.log('client connected...', client.id);
  clientManager.addClient(client);

  client.on('register', handleRegister);

  client.on('join', handleJoin);

  client.on('leave', handleLeave);

  client.on('message', handleMessage);

  client.on('chatrooms', handleGetChatrooms);

  client.on('availableUsers', handleGetAvailableUsers);

  client.on('disconnect', function() {
    console.log('client disconnect...', client.id);
    handleDisconnect();
  });

  client.on('error', function(err) {
    console.log('received error from client:', client.id);
    console.log(err);
  });
});

const port = process.env.PORT || 5000;
// console.log that your server is up and running
server.listen(port, () => console.log(`Listening on port ${port}`));
