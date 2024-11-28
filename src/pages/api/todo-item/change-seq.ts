import { getDBConnection } from '@/data-source';
import { IResponse } from '@/dtos/interfaces/response.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseUtil from '@/utils/response.util';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import _ from 'lodash-es';
import { In } from 'typeorm';

interface ChangeSeqRequest extends NextApiRequest {
  body: Array<{
    id: number;
    seq: number;
  }>;
}

/**
 * @swagger
 * /api/todo-item/change-seq:
 *   patch:
 *     description: Change Todo Item Seq
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 seq:
 *                   type: number
 *                   example: 1
 *     responses:
 *       200:
 *         description: change item seq
 */
export default async function handler(
  req: ChangeSeqRequest,
  res: NextApiResponse<IResponse<any>>
) {
  const { method, body } = req;
  const conn = await getDBConnection();

  if (method !== 'PATCH') {
    res.status(404).json(ResponseUtil.notFound());
    return;
  }

  const results = await conn.getRepository(TodoItemEntity).find({
    where: {
      id: In(_.map(body, 'id')),
    },
  });

  if (_.isEmpty(results)) {
    res.status(404).json(ResponseUtil.notFound());
    return;
  }

  try {
    await conn.transaction(async (transactionManager) => {
      for (const item of results) {
        const existingItem = body.find((result) => result.id === item.id);
        item.seq = existingItem?.seq ?? 0;

        await transactionManager.save(item);
      }
    });
  } catch (err) {
    console.error('err => ', err);
    res.status(500).json(ResponseUtil.serverErr(null));
  }

  res.status(200).json(ResponseUtil.ok(null));
  return;
}
