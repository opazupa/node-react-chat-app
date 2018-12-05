const Chatroom = require('../models/Chatroom');
// Todo get from mongo DB!
const CHATROOMS = [{ name: 'Room1', theme: null }, { name: 'Room2', theme: null }];

/**
 *
 * ChatroomManager to handle chatroom stuff.
 *
 */
module.exports = function() {
  // Map all availevable chatroom
  const chatrooms = new Map(CHATROOMS.map(c => [c.name, Chatroom(c)]));

  /**
   * Removes client from all chatrooms.
   *
   * @param {*} client
   */
  function removeClient(client) {
    chatrooms.forEach(c => c.removeUser(client));
  }

  /**
   * Gets chatroom by name.
   *
   * @param {*} chatroomName
   * @returns
   */
  function getChatroomByName(chatroomName) {
    return chatrooms.get(chatroomName);
  }

  /**
   * Returns serialized chatrooms.
   *
   * @returns
   */
  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(c => c.serialize());
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms
  };
};
