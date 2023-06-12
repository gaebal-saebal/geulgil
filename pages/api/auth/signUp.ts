import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('auth');
  let already = await db.collection('users').findOne({ email: req.body.email });

  if (req.method === 'POST') {
    if (req.body.name === '' || req.body.email === '' || req.body.password === '') {
      return res.status(400).json('빈칸을 확인해주세요');
    } else if (already) {
      return res.status(409).json('이미 가입되어 있는 이메일입니다');
    } else {
      req.body.image = '/public/user_profile.png';
      let hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      let db = (await connectDB).db('auth');
      await db.collection('users').insertOne(req.body);
      return res.status(200).json('회원가입이 완료되었습니다.');
    }
  }
}
