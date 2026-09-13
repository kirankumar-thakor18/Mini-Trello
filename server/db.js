const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

try {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
} catch {
  // .env is optional; fall back to process env
}

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB || 'mini-trello';

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