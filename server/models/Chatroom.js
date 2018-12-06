/**
 *
 * Chatroom class to handle single chatroom stuff.
 *
 * @export
 * @class Chatroom
 */
export default class Chatroom {
  constructor(room) {
    this.name = room.name;
    this.theme = room.theme;

    this.members = new Map();
    // TODO persist history to mongodb
    this.chatHistory = [];
  }

  /**
   * Broadcasts message to all subscribed clients.
   *
   * @param {*} message
   * @memberof Chatroom
   */
  broadcastMessage(message) {
    this.members.forEach(m => m.emit('message', message));
  }

  /**
   * Adds new entry to chat.
   *
   * @param {*} entry
   * @memberof Chatroom
   */
  addEntry(entry) {
    this.chatHistory = this.chatHistory.concat(entry);
  }

  /**
   * Gets chat history.
   * TODO Olli shoudl we return a max eg. 100 chats in join
   *
   * @memberof Chatroom
   * @returns
   */
  getChatHistory() {
    return this.chatHistory.slice();
  }

  /**
   * Adds user to chatroom.
   *
   * @memberof Chatroom
   * @param {*} client
   */
  addUser(client) {
    this.members.set(client.id, client);
  }

  /**
   * Removes user from the chatroom.
   *
   * @memberof Chatroom
   * @param {*} client
   */
  removeUser(client) {
    this.members.delete(client.id);
  }

  /**
   * Serializes single chatroom.
   *
   * @memberof Chatroom
   * @returns
   */
  serialize() {
    return {
      name: this.name,
      theme: this.theme,
      members: members.size
    };
  }
}
