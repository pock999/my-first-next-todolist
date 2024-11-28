import { getDBConnection } from '@/data-source';
import { IResponse } from '@/dtos/interfaces/response.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseUtil from '@/utils/response.util';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import { TodoStatusConst } from '@/consts/todo.const';

interface SwitchByIdRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

/**
 * @swagger
 * /api/todo-item/switch-status/{id}:
 *   put:
 *     description: Switch Status of Todo Item
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
 *         description: switch star
 */
export default async function handler(
  req: SwitchByIdRequest,
  res: NextApiResponse<IResponse<any>>
) {
  const { method } = req;
  const { id } = req.query;
  const conn = await getDBConnection();

  if (method !== 'PUT' || !id) {
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

  await conn.getRepository(TodoItemEntity).save({
    ...findResult,
    status:
      findResult.status === TodoStatusConst.TODO
        ? TodoStatusConst.DONE
        : TodoStatusConst.TODO,
  });

  res.status(200).json(ResponseUtil.ok(null));
  return;
}
