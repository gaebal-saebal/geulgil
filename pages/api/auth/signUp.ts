import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('auth');
  let request = JSON.parse(req.body);
  let already = await db.collection('users').findOne({ email: request.email });

  if (req.method === 'POST') {
    if (request.name === '' || request.email === '' || request.password === '') {
      return res.status(400).json('빈칸을 확인해주세요');
    } else if (already) {
      return res.status(409).json('이미 가입되어 있는 이메일입니다');
    } else {
      request.image = '/public/user_profile.png';

      let hash = await bcrypt.hash(request.password, 10);
      request.password = hash;

      let db = (await connectDB).db('auth');
      await db.collection('users').insertOne(request);

      return res.status(200).json('성공');
    }
  }
}
