import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    const { db } = await connectToDatabase();
    const collection = db.collection('users');

    const result = await collection.insertOne({ name, email });

    res.status(200).json({ success: true, data: result });
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
