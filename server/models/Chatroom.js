/**
 *
 * Chatroom class to handle single chatroom stuff.
 *
 */
module.exports = function({ name, theme }) {
  const members = new Map();
  // TODO persist history to mongodb
  let chatHistory = [];

  /**
   * Broadcasts message to all subscribed clients.
   *
   * @param {*} message
   */
  function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message));
  }

  /**
   * Adds new entry to chat.
   *
   * @param {*} entry
   */
  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry);
  }

  /**
   * Gets chat history.
   * TODO Olli shoudl we return a max eg. 100 chats in join
   *
   * @returns
   */
  function getChatHistory() {
    return chatHistory.slice();
  }

  /**
   * Adds user to chatroom.
   *
   * @param {*} client
   */
  function addUser(client) {
    members.set(client.id, client);
  }

  /**
   * Removes user from the chatroom.
   *
   * @param {*} client
   */
  function removeUser(client) {
    members.delete(client.id);
  }

  /**
   * Serializes single chatroom.
   *
   * @returns
   */
  function serialize() {
    return {
      name,
      theme,
      numMembers: members.size
    };
  }

  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize
  };
};
