import { Chat } from '../mongo';

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
    this.symbol = room.symbol;
    this.members = new Map();
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
    Chat.create({ ...entry, chatroom: this.name });
  }

  /**
   * Gets chat history.
   *
   * @memberof Chatroom
   * @returns
   */
  async getChatHistory() {
    // Return max 1000 chats
    return Chat.find({ event: null, chatroom: this.name })
      .limit(1000)
      .exec();
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
   * @param {*} clientId
   */
  removeUser(clientId) {
    this.members.delete(clientId);
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
      symbol: this.symbol,
      members: this.members.size
    };
  }
}
