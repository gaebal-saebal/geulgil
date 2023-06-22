import { SessionType } from '@/types/interface';
import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('auth');
  let bookDb = (await connectDB).db('book');
  let session: SessionType | null = await getServerSession(req, res, authOptions);
  // session에 userId가 담겨져있음

  if (req.method === 'PATCH') {
    if (session) {
      // auth - user의 닉네임 항목 수정
      const userInfo = await db.collection('users').findOne({ email: session.user.email });
      userInfo.name = req.body;
      const userNameChange = await db
        .collection('users')
        .updateOne({ _id: new ObjectId(userInfo._id) }, { $set: userInfo });

      // 모든 리뷰에 적용된 닉네임도 바뀐 닉네임으로 수정
      const userAllReviews = await bookDb
        .collection('review')
        //@ts-ignore
        .find({ userId: session.user._id })
        .toArray();
      for (let i = 0; i < userAllReviews.length; i++) {
        userAllReviews[i].name = req.body;
        const updateUserNameInReview = await bookDb
          .collection('review')
          .updateOne({ _id: new ObjectId(userAllReviews[i]._id) }, { $set: userAllReviews[i] });
      }
      return res.status(200).json(userInfo);
    }
    return res.status(400).json('bad request');
  }
  return res.status(400).json('bad request');
}
