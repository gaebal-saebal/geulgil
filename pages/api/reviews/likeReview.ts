import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let request = JSON.parse(req.body);

  const db = (await connectDB).db('book');
  let likes = await db.collection('likes').findOne({ reviewId: request.reviewId });

  if (req.method === 'POST') {
    let totalLikes: number;
    // 만약 좋아요 문서가 없었다면 자동으로 문서가 추가됩니다.
    if (likes === null) {
      const write = await db
        .collection('likes')
        .insertOne({ likers: [request.userId], reviewId: request.reviewId });
      totalLikes = 1;
    } // userId가 book-likes의 likers 배열에 없으면 book-likes 객체의 likers 배열에 userId를 추가합니다.
    else if (likes.likers.find((e: string) => e === request.userId) === undefined) {
      likes.likers.push(request.userId);
      totalLikes = likes.likers.length;
      const edit = await db
        .collection('likes')
        .updateOne({ _id: new ObjectId(likes._id) }, { $set: likes });
    } else {
      //2에서 받은 userId가 이미 book-likes의 likers 배열에 담겨있으면 book-likes 객체의 likers 배열에서 해당 userId를 삭제합니다.
      const deleteIndex = likes.likers.findIndex((e: string) => e === request.userId);
      likes.likers.splice(deleteIndex, 1);
      totalLikes = likes.likers.length;
      const edit = await db
        .collection('likes')
        .updateOne({ _id: new ObjectId(likes._id) }, { $set: likes });
    }

    // book-review-좋아요를 누른 '리뷰id'에 일치하는 리뷰에 접근합니다.
    let reviews = await db.collection('review').findOne({ _id: new ObjectId(request.reviewId) });
    // 문서의 likes 값을 likers.length = totalLikes로 수정(좋아요든 취소든 알아서 적용될거)
    reviews.likes = totalLikes;
    const edit = await db
      .collection('review')
      .updateOne({ _id: new ObjectId(reviews._id) }, { $set: reviews });
    //클라이언트에 response를 likers.length = totalLikes를 보냅니다.
    return res.status(200).json(totalLikes);
  }
  return res.status(404).json('bad request');
}
