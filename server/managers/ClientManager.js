/**
 *
 * ClientManager to handle client stuff.
 *
 */
module.exports = function() {
  // All clients in the chat.
  const clients = new Map();

  /**
   * Adds client for manager.
   *
   * @param {*} client
   */
  function addClient(client) {
    clients.set(client.id, { client });
  }

  /**
   * Checks if username is free to use.
   *
   * @param {*} userName
   * @returns
   */
  function isUserAvailable(userName) {
    const takenNames = Array.from(clients.values())
      .filter(client => client.userName)
      .map(client => client.userName);
    return !takenNames.some(name => name === userName);
  }

  /**
   * Registers valid username for client.
   *
   * @param {*} client
   * @param {*} userName
   */
  function registerClient(client, userName) {
    clients.set(client.id, { client, userName });
  }

  /**
   * Removes client from manager.
   *
   * @param {*} client
   */
  function removeClient(client) {
    clients.delete(client.id);
  }

  /**
   * Gets user by username.
   *
   * @param {*} userName
   * @returns
   */
  function getUserByName(userName) {
    return Array.from(clients.values()).find(u => u.name === userName);
  }

  /**
   * Gets user by cleint id.
   *
   * @param {*} clientId
   * @returns
   */
  function getUserByClientId(clientId) {
    return (clients.get(clientId) || {}).userName;
  }

  return {
    addClient,
    isUserAvailable,
    registerClient,
    removeClient,
    getUserByName,
    getUserByClientId
  };
};
