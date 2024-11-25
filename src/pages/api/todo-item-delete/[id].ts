import { getDBConnection } from '@/data-source';
import { IResponse } from '@/dtos/interfaces/response.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseUtil from '@/utils/response.util';
import { TodoItemEntity } from '@/entitys/todo-item.entity';

interface DeleteByIdRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

/**
 * @swagger
 * /api/todo-item-delete/{id}:
 *   delete:
 *     description: Delete Todo Item by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Todo Item Id
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: delete item
 */
export default async function handler(
  req: DeleteByIdRequest,
  res: NextApiResponse<IResponse<any>>
) {
  const { method } = req;
  const { id } = req.query;
  const conn = await getDBConnection();

  if (method !== 'DELETE' || !id) {
    res.status(404).json(ResponseUtil.notFound());
    return;
  }

  // find one
  const findResult = await conn.getRepository(TodoItemEntity).findOne({
    where: { id: +id },
  });

  if (findResult == null) {
    res.status(404).json(ResponseUtil.notFound());
    return;
  }

  conn.getRepository(TodoItemEntity).delete(+id);
  res.status(200).json(ResponseUtil.ok(null));
}
