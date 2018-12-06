import Chatroom from '../models/Chatroom';

// Todo get from mongo DB!
const CHATROOMS = [{ name: 'Room1', theme: null }, { name: 'Room2', theme: null }];

/**
 *
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
    this.chatrooms.forEach(c => c.removeUser(client));
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
   * Returns serialized chatrooms.
   *
   * @returns
   * @memberof ChatroomManager
   */
  serializeChatrooms() {
    return Array.from(this.chatrooms.values()).map(c => c.serialize());
  }
}
