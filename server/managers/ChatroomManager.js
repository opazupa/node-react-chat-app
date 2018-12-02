const Chatroom = require('../models/Chatroom');
// Todo get from mongo DB!
const CHATROOMS = [{ name: 'Room1', theme: null }, { name: 'Room2', theme: null }];

module.exports = function() {
  // mapping of all available chatrooms
  const chatrooms = new Map(CHATROOMS.map(c => [c.name, Chatroom(c)]));

  function removeClient(client) {
    chatrooms.forEach(c => c.removeUser(client));
  }

  function getChatroomByName(chatroomName) {
    return chatrooms.get(chatroomName);
  }

  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(c => c.serialize());
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms
  };
};
