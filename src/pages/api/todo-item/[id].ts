import { getDBConnection } from '@/data-source';
import { IResponse } from '@/dtos/interfaces/response.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseUtil from '@/utils/response.util';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import { TodoItemUpdateDto } from '@/dtos/req/todo-item-update.dto';

interface DeleteByIdRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

interface TodoItemUpdateRequest extends NextApiRequest {
  body: TodoItemUpdateDto;
  query: {
    id: string;
  };
}

/**
 * @swagger
 * /api/todo-item/{id}:
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
 *   put:
 *     description: Update Todo Item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Todo Item Id
 *         schema:
 *           type: number
 *         example: 1
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: test
 *               content:
 *                 type: string
 *                 example: test
 *     responses:
 *       200:
 *         description: update item
 */
export default async function handler(
  req: DeleteByIdRequest,
  res: NextApiResponse<IResponse<any>>
) {
  const { method } = req;
  const { id } = req.query;
  const conn = await getDBConnection();

  if ((method !== 'DELETE' && method !== 'PUT') || !id) {
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

  if (method === 'DELETE') {
    await conn.getRepository(TodoItemEntity).delete(+id);
  } else {
    await conn.getRepository(TodoItemEntity).save({
      ...findResult,
      ...req.body,
    });
  }

  res.status(200).json(ResponseUtil.ok(null));
  return;
}
