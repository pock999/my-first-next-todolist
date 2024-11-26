import { getDBConnection } from '@/data-source';
import { IResponse } from '@/dtos/interfaces/response.interface';
import { TodoItemCreateDto } from '@/dtos/req/todo-item-create.dto';
import { TodoListDto } from '@/dtos/res/todo-list.dto';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseUtil from '@/utils/response.util';

/**
 * @swagger
 * /api/todo-item/list:
 *   get:
 *     description: Returns Todo List
 *     responses:
 *       200:
 *         description: return Todo List
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse<any>>
) {
  const { method } = req;

  const conn = await getDBConnection();

  if (method !== 'GET') {
    res.status(404).json(ResponseUtil.notFound());
    return;
  }

  const result = await conn.getRepository(TodoItemEntity).find();
  res.status(200).json(ResponseUtil.ok(result));
}
