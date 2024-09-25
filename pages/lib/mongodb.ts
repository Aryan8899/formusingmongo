import { MongoClient } from 'mongodb';
import type { Global } from 'node';

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!(global as any).mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any).mongoClientPromise = client.connect();
  }
  clientPromise = (global as any).mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  return { db: client.db('your-database-name') };
}
