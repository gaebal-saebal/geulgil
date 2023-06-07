import { NextApiRequest, NextApiResponse } from 'next';

export default function getAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    fetch(
      `http://book.interpark.com/api/bestSeller.api?key=${process.env.NEXT_PUBLIC_API_KEY}&categoryId=100&output=json`
    )
      .then((res) => res.json())
      .then((data) => {
        res.status(200).json(data);
      })

      .catch(() => console.log('안됨'));
  }
}
