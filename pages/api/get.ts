import { NextApiRequest, NextApiResponse } from 'next';

export default function getAPI(res: NextApiResponse, req: NextApiRequest) {
  if (req.method === 'GET') {
    fetch(
      `http://book.interpark.com/api/bestSeller.api?key=${process.env.NEXT_PUBLIC_API_KEY}&categoryId=100`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch(() => console.log('안됨'));
    return res.status(200).json('잘됨');
  }
}
