import Chatroom from '../models/Chatroom';

// Todo get from mongo DB!
const CHATROOMS = [{ name: 'Sports', symbol: '⚽' }, { name: 'Food', symbol: '🍔' }, { name: 'Wine', symbol: '🍷' }];

/**
 * ChatroomManager to handle chatroom stuff.
 *
 * @export
 * @class ChatroomManager
 */
export default class ChatroomManager {
  // Map all availevable chatrooms
  constructor() {
    this.chatrooms = new Map(CHATROOMS.map(c => [c.name, new Chatroom(c)]));
  }

  /**
   * Removes client from all chatrooms.
   *
   * @param {*} client
   * @memberof ChatroomManager
   */
  removeClient(client) {
    this.chatrooms.forEach(c => c.removeUser(client.id));
  }

  /**
   * Gets chatroom by name.
   *
   * @param {*} chatroomName
   * @returns
   * @memberof ChatroomManager
   */
  getChatroomByName(chatroomName) {
    return this.chatrooms.get(chatroomName);
  }

  /**
   * Gets chatrooms by client id.
   *
   * @param {*} clientId
   * @returns
   * @memberof ChatroomManager
   */
  getChatroomsByClientId(clientId) {
    return Array.from(this.chatrooms.values())
      .filter(c => c.members.has(clientId))
      .map(c => c.serialize());
  }

  /**
   * Returns serialized chatrooms.
   *
   * @returns
   * @memberof ChatroomManager
   */
  serializeChatrooms() {
    return Array.from(this.chatrooms.values()).map(c => c.serialize());
  }
}
