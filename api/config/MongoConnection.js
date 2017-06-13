import MongoClient from 'mongodb';
import assert from 'assert';

import config from './config';

class MongoConnection {
  static connect() {
    MongoClient.connect(config.database, (err, db) => {
      assert.equal(null, err);
      MongoConnection.db = db;
    });
  }
}

export default MongoConnection;
