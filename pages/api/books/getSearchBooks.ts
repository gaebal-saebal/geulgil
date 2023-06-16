import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default function getAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query;

    const URL = `http://book.interpark.com/api/search.api?key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query.searchKeyword}&queryType=${query.queryType}&searchTarget=${query.searchTarget}&output=json`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch(() => res.status(400).json('Bad Request'));
  }
}
