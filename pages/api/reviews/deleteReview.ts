import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { SessionType } from '@/types/interface';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let session: SessionType | null = await getServerSession(req, res, authOptions);
  let userId = session?.user._id; // 현재 로그인하고 있는 사람의 userId
  const db = (await connectDB).db('book');
  let reviewId = req.query.reviewId; // 클라이언트에서 보내준 review의 Id

  if (req.method === 'DELETE') {
    //@ts-ignore
    let review = await db.collection('review').findOne({ _id: new ObjectId(reviewId) });
    // 인증 확인 : 로그인하고있는 사람의 userId와 삭제하려고 하는 review의 userId가 같은가?
    if (userId === review.userId) {
      //@ts-ignore
      const deleteReview = await db.collection('review').deleteOne({ _id: new ObjectId(reviewId) });
      return res.status(200).json('리뷰가 삭제되었습니다');
    } else return res.status(401).json('삭제하려는 리뷰 작성자가 아닙니다');
  }
  return res.status(400).json('Bad Request');
}
