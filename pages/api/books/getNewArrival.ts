import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default function getAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const categoryId = req.query.categoryId as string;
    fetch(
      `http://book.interpark.com/api/newBook.api?key=${process.env.NEXT_PUBLIC_API_KEY}&categoryId=${categoryId}&output=json`
    )
      .then((response) => response.json())
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch(() => res.status(400).json('Bad Request'));
  }
}
