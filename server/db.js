const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

try {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
} catch {
  // .env is optional; fall back to process env
}

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'Mini-Trello';

if (!MONGODB_URI) {
  console.error(
    'MONGODB_URI is not set. Create a .env file (see README) for local use, ' +
      'or add MONGODB_URI to the Render dashboard environment variables.'
  );
  process.exit(1);
}

let client;
let db;

async function connectDB() {
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
}

module.exports = { connectDB, getDB, ObjectId };