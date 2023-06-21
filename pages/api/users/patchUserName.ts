import { SessionType } from '@/types/interface';
import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

//TODO: 작성한 리뷰 찾아서 book-review의 name들을 바뀐 닉네임으로 변경

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('auth');
  let bookDb = (await connectDB).db('book');
  let session: SessionType | null = await getServerSession(req, res, authOptions);
  // session에 userId가 담겨져있음

  /*
  const userAllReview = await bookDb
        .collection('review')
        .find({ userId: 세션에담긴userId })
        .toArray();

        => 그 사람이 작성한 리뷰 다 가져올 수 있음

        userAllReview에 반복문을 돌려서
        userAllReview[0]~userAllReview[끝]의 name을 req.body(바꿀이름)으로 수정하고
        updateOne을 사용해서 set에 담아주기만 하면 끝
  */

  if (req.method === 'PATCH') {
    if (session) {
      const userInfo = await db.collection('users').findOne({ email: session.user.email });
      userInfo.name = req.body;
      const userNameChange = await db
        .collection('users')
        .updateOne({ _id: new ObjectId(userInfo._id) }, { $set: userInfo });
      return res.status(200).json(userInfo);
    }
    return res.status(400).json('bad request');
  }
  return res.status(400).json('bad request');
}
