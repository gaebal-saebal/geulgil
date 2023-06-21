import { SessionType } from '@/types/interface';
import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';
import bcrtpt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('auth');
  let session: SessionType | null = await getServerSession(req, res, authOptions);

  if (req.method === 'PATCH') {
    if (session) {
      const userInfo = await db.collection('users').findOne({ email: session.user.email });
      const hashedPassword = await bcrtpt.hash(req.body, 10);

      userInfo.password = hashedPassword;
      const userPasswordChange = await db
        .collection('users')
        .updateOne({ _id: new ObjectId(userInfo._id) }, { $set: userInfo });
      return res.status(200).json(userInfo);
    }
    return res.status(400).json('bad request');
  }
  return res.status(400).json('bad request');
}
