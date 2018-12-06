/**
 *
 * ClientManager to handle client stuff.
 *
 * @export
 * @class ClientManager
 */
export default class ClientManager {
  // All clients in the chat.
  constructor() {
    this.clients = new Map();
  }

  /**
   * Adds client for manager.
   *
   * @param {*} client
   * @memberof ClientManager
   */
  addClient(client) {
    this.clients.set(client.id, { client });
  }

  /**
   * Checks if username is free to use.
   *
   * @param {*} userName
   * @returns
   * @memberof ClientManager
   */
  isUserAvailable(userName) {
    const takenNames = Array.from(this.clients.values())
      .filter(client => client.userName)
      .map(client => client.userName);
    return !takenNames.some(name => name === userName);
  }

  /**
   * Registers valid username for client.
   *
   * @param {*} client
   * @param {*} userName
   * @memberof ClientManager
   */
  registerClient(client, userName) {
    this.clients.set(client.id, { client, userName });
  }

  /**
   * Removes client from manager.
   *
   * @param {*} client
   * @memberof ClientManager
   */
  removeClient(client) {
    this.clients.delete(client.id);
  }

  /**
   * Gets user by username.
   *
   * @param {*} userName
   * @returns
   * @memberof ClientManager
   */
  getUserByName(userName) {
    return Array.from(this.clients.values()).find(u => u.name === userName);
  }

  /**
   * Gets user by cleint id.
   *
   * @param {*} clientId
   * @returns
   * @memberof ClientManager
   */
  getUserByClientId(clientId) {
    return (this.clients.get(clientId) || {}).userName;
  }
}
