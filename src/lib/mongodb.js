import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  // During build time or when URI is not set, create a rejected promise
  clientPromise = Promise.reject(new Error('MONGODB_URI is not configured'));
}

export async function getDatabase(dbName = null) {
  if (!uri) {
    throw new Error('MONGODB_URI is not configured. Please set it in your environment variables.');
  }
  const databaseName = dbName || process.env.DB_NAME || 'carexyz';
  const client = await clientPromise;
  return client.db(databaseName);
}

export async function getClient() {
  return clientPromise;
}

export default clientPromise;

