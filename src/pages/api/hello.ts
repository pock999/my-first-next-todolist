// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns name
 *     responses:
 *       200:
 *         description: return John Doe
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' });
}
