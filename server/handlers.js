/**
 * Init function that connects managers together.
 *
 * @param {*} client
 * @param {*} clientManager
 * @param {*} chatroomManager
 * @returns
 */
const makeHandleEvent = (client, clientManager, chatroomManager) => {
  /**
   * Helper function to create promises.
   *
   * @param {*} getter
   * @param {*} rejectionMessage
   * @returns
   */
  const ensureExists = (getter, rejectionMessage) => {
    return new Promise((resolve, reject) => {
      const res = getter();
      return res ? resolve(res) : reject(rejectionMessage);
    });
  };

  /**
   * Verifies that user exists.
   *
   * @param {*} clientId
   * @returns
   */
  const ensureUser = clientId => {
    return ensureExists(() => clientManager.getUserByClientId(clientId), 'Register username to chat.');
  };

  /**
   * Verifies that chatroom exists.
   *
   * @param {*} chatroomName
   * @returns
   */
  const ensureValidChatroom = chatroomName => {
    return ensureExists(() => chatroomManager.getChatroomByName(chatroomName), `Invalid chatroom name: ${chatroomName}`);
  };

  /**
   * Verifies that both chatroom and user exists.
   *
   * @param {*} chatroomName
   * @returns
   */
  async function ensureValidChatroomAndUser(chatroomName) {
    return Promise.all([ensureValidChatroom(chatroomName), ensureUser(client.id)]).then(([chatroom, userName]) =>
      Promise.resolve({ chatroom, userName, clientId: client.id })
    );
  }

  async function handleEvent(chatroomName, createEntry) {
    return await ensureValidChatroomAndUser(chatroomName).then(({ chatroom, userName, clientId }) => {
      // append event to chat history
      const entry = { clientId, userName, timestamp: new Date().toUTCString(), ...createEntry() };
      chatroom.addEntry(entry);

      // notify other clients in chatroom
      chatroom.broadcastMessage({ chat: chatroomName, ...entry });
      return chatroom;
    });
  }

  return handleEvent;
};

/**
 * Exported handler functions.
 *
 * @param {*} client
 * @param {*} clientManager
 * @param {*} chatroomManager
 * @returns
 */
export default (client, clientManager, chatroomManager) => {
  const handleEvent = makeHandleEvent(client, clientManager, chatroomManager);

  /**
   * Handles registration for new user.
   *
   * @param {*} userName
   * @param {*} callback
   * @returns
   */
  const handleRegister = (userName, callback) => {
    if (!clientManager.isUserAvailable(userName)) return callback(`Username ${userName} not available`);

    clientManager.registerClient(client, userName);

    return callback(null, { id: client.id, userName });
  };

  /**
   * Handles joining a chatroom.
   *
   * @param {*} chatroomName
   * @param {*} callback
   */
  async function handleJoin(chatroomName, callback) {
    const createEntry = () => ({ event: `joined ${chatroomName}` });

    await handleEvent(chatroomName, createEntry)
      .then(async chatroom => {
        // add member to chatroom
        chatroom.addUser(client);

        // send chat history to client
        callback(null, await chatroom.getChatHistory());
      })
      .catch(callback);
  }

  /**
   * Handles leaving a chatroom.
   *
   * @param {*} chatroomName
   * @param {*} callback
   */
  async function handleLeave(chatroomName, callback) {
    const createEntry = () => ({ event: `left ${chatroomName}` });

    await handleEvent(chatroomName, createEntry)
      .then(chatroom => {
        // remove member from chatroom
        chatroom.removeUser(client.id);

        callback(null);
      })
      .catch(callback);
  }

  /**
   * Handles new messages.
   *
   * @param {*} [{ chatroomName, message }={}]
   * @param {*} callback
   */
  async function handleMessage({ chatroomName, message } = {}, callback) {
    const createEntry = () => ({ message });

    await handleEvent(chatroomName, createEntry)
      .then(() => callback(null))
      .catch(callback);
  }

  /**
   * Handles getting existing chatrooms.
   *
   * @param {*} callback
   * @returns
   */
  const handleGetChatrooms = ({ chatroomNameFilter }, callback) => {
    const chatrooms = chatroomManager.serializeChatrooms().filter(c => (chatroomNameFilter ? c.name === chatroomNameFilter : true));
    return callback(null, chatrooms);
  };

  /**
   * Handles adding a new chatroom.
   *
   * @param {*} chatroomName
   * @param {*} callback
   * @returns
   */
  const handleCreateChatroom = (chatroomName, callback) => {
    // TODO Olli create new chat room for users to chat in
    return;
  };

  /**
   * Handles client disconnect.
   *
   */
  async function handleDisconnect() {
    // send leave messages
    await chatroomManager.getChatroomsByClientId(client.id).forEach(c => handleEvent(c.name, () => ({ event: `left ${c.name}` })));
    // remove member from all chatrooms
    chatroomManager.removeClient(client);
    // remove user profile
    clientManager.removeClient(client);
  }

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleCreateChatroom,
    handleDisconnect
  };
};
