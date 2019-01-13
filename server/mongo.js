import mongoose from 'mongoose';

// Mongoose models
export const Chat = mongoose.model(
  'Chat',
  new mongoose.Schema({ clientId: String, userName: String, timestamp: Date, event: String, message: String })
);

export const Chatroom = mongoose.model('Chatroom', new mongoose.Schema({ name: String, symbol: String }));

const MongoConfig = {
  URI: 'mongodb://mongo:27017',
  OPTIONS: {
    user: 'chat',
    pass: 'app',
    dbName: 'chat-app'
  }
};

export const MongooseDb = () => {
  return mongoose.connect(
    MongoConfig.URI,
    MongoConfig.OPTIONS,
    err => {
      console.log('mongodb connected', err ? `with: ${err}` : 'successfully');
    }
  );
};
