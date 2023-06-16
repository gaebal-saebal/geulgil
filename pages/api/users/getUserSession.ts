import { SessionType } from '@/types/interface';
import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('auth');
  let session: SessionType | null = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    if (session) {
      const userInfo = await db.collection('users').findOne({ email: session.user.email });
      session.user._id = userInfo._id;
      return res.status(200).json(session);
    }
    return res.status(400).json('bad request');
  }
  return res.status(400).json('bad request');
}
