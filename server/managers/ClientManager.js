module.exports = function() {
  // mapping of all connected clients
  const clients = new Map();

  function addClient(client) {
    clients.set(client.id, { client });
  }

  function registerClient(client, user) {
    clients.set(client.id, { client, user });
  }

  function removeClient(client) {
    clients.delete(client.id);
  }

  // function getUserByName(userName) {
  //   return userTemplates.find(u => u.name === userName);
  // }

  function getUserByClientId(clientId) {
    return (clients.get(clientId) || {}).user;
  }

  return {
    addClient,
    registerClient,
    removeClient,
    // getUserByName,
    getUserByClientId
  };
};
