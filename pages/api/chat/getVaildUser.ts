import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('book');
  const userId = req.query.id;
  const isbn = req.query.isbn;
  if (req.method === 'GET') {
    if (userId !== '') {
      const userInfo = await db.collection('review').findOne({ userId, isbn });
      if (userInfo === null) {
        res.status(400).json('리뷰 작성해주세요');
      } else {
        res.status(200).json('입장 가능');
      }
    }
    res.status(400).json('로그인 해주세요');
  }
  res.status(400).json('잘못된 요청입니다');
}
