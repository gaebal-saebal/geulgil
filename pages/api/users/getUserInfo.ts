import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('auth');
  let userId = req.query.userId;
  if (req.method === 'GET') {
    //@ts-ignore
    const userInfo = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    const myInfo = {
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
    };

    return res.status(200).json(myInfo);
  }
}
