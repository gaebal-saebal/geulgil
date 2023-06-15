import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { SessionType, ReviewDataType } from '@/types/interface';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let request = JSON.parse(req.body);

  let session: SessionType | null = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    if (session) {
      let date = new Date();
      let year = date.getFullYear();
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);
      let dateResult = `${year}-${month}-${day}`;
      let reviewData: ReviewDataType = {
        rate: request.rate,
        content: request.content,
        date: dateResult,
        likes: 0,
        isbn: request.isbn,
        userId: session.user._id,
      };

      reviewData.name = session.user.name;

      const db = (await connectDB).db('book');
      const write = await db.collection('review').insertOne(reviewData);
      return res.status(200).json('리뷰데이터 저장완료');
    } else {
      res.status(400).json('로그인해주세요');
    }
  }
  res.status(400).json('잘못된 요청입니다.');
}
