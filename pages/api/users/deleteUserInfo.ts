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

  if (req.method === 'DELETE') {
    // @ts-ignore
    if (req.query.userId === session.user._id) {
      const userAllReview = await bookDb
        .collection('review')
        .find({ userId: req.query.userId })
        .toArray();

      const userInfo = await db
        .collection('users')
        .deleteOne({ _id: new ObjectId(req.query.userId) });
      const userReview = await bookDb.collection('review').deleteMany({ userId: req.query.userId });
      const userLikes = await bookDb
        .collection('likes')
        .find({ likers: req.query.userId })
        .toArray();
      userLikes.forEach((userLike: any) => {
        let arr = userLike.likers.filter((e: any) => e !== req.query.userId);
        userLike.likers = arr;
      });

      for (let i = 0; i < userLikes.length; i++) {
        const deleteLikes = await bookDb
          .collection('likes')
          .updateOne({ _id: new ObjectId(userLikes[i]._id) }, { $set: userLikes[i] });

        const minusLikes = await bookDb
          .collection('review')
          .updateOne(
            { _id: new ObjectId(userLikes[i].reviewId) },
            { $set: { likes: userLikes[i].likers.length } }
          );
      }
      for (let i = 0; i < userAllReview.length; i++) {
        console.log(userAllReview[i]);
        let id = new ObjectId(userAllReview[i]._id);
        let idStr = id.toString();

        const deleteDbLikes = await bookDb.collection('likes').deleteOne({ reviewId: idStr });
      }

      return res.status(200).json('계정 삭제 완료');
    }
    return res.status(400).json('bad request');
  }
  return res.status(400).json('bad request');
}
