import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default function getAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.isbn;
    const URL = `http://book.interpark.com/api/search.api?key=${process.env.NEXT_PUBLIC_API_KEY}&query=${req.query.isbn}&queryType=isbn&output=json`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => res.status(400).json('오류임'));
  }
}
