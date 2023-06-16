import { ReviewDataType } from '@/types/interface';
import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAPI(req: NextApiRequest, res: NextApiResponse) {
  let db = (await connectDB).db('book');
  if (req.method === 'GET') {
    let userId = req.query.userId;

    let myReviews = await db.collection('review').find({ userId: userId }).toArray();

    let userReviews = myReviews.map((review: ReviewDataType) => {
      return { content: review.content, isbn: review.isbn };
    });
    let myReviewImg: { img: string; isbn: string }[] = [];
    await Promise.all(
      userReviews.map(async (review: { content: string; isbn: string }) => {
        const URL = `http://book.interpark.com/api/search.api?key=${process.env.NEXT_PUBLIC_API_KEY}&query=${review.isbn}&queryType=isbn&output=json`;
        await fetch(URL)
          .then((res) => res.json())
          .then((data) => {
            myReviewImg.push({ img: data.item[0].coverLargeUrl, isbn: review.isbn });
          });
      })
    );

    return res.status(200).json({ userReviews, myReviewImg });
  }
}