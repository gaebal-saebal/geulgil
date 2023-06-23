import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.isbn as string;
  if (req.method === 'GET') {
    let db = (await connectDB).db('book');
    let reviews = await db.collection('review').find({ isbn: id }).toArray();
    res.status(200).json(reviews);
  }
}
