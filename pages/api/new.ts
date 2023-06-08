import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const db = (await connectDB).db('test');
    const write = await db.collection('post').insertOne({ content: 'test', date: '230608' });
    return res.status(200).json('헉됐다');
  }
}
