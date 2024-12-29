import { getDBConnection } from '@/data-source';
import { IResponse } from '@/dtos/interfaces/response.interface';
import { TodoItemCreateDto } from '@/dtos/req/todo-item-create.dto';
import { TodoListDto } from '@/dtos/res/todo-list.dto';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseUtil from '@/utils/response.util';

interface TodoItemCreateRequest extends NextApiRequest {
  body: TodoItemCreateDto;
}

/**
 * @swagger
 * /api/todo-item/create:
 *   post:
 *     description: Create Todo Item
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - isStar
 *               - status
 *               - seq
 *             properties:
 *               title:
 *                 type: string
 *                 example: test
 *               content:
 *                 type: string
 *                 example: test
 *               isStar:
 *                 type: boolean
 *                 example: false
 *               status:
 *                 type: string
 *                 example: TODO
 *               seq:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: Create Success
 */
export default async function handler(
  req: TodoItemCreateRequest,
  res: NextApiResponse<IResponse<any>>
) {
  const { method } = req;

  const conn = await getDBConnection();

  let result: any;

  switch (method) {
    case 'GET':
      // get
      result = await conn.getRepository(TodoItemEntity).find();
      res.status(200).json(ResponseUtil.ok(result));
      break;
    case 'POST':
      // create
      const data = JSON.parse(req.body as any);
      result = await conn
        .getRepository(TodoItemEntity)
        .createQueryBuilder()
        .insert()
        .into(TodoItemEntity)
        .values({
          ...data,
        })
        .execute();
      res.status(200).json(ResponseUtil.ok(result.raw[0]));
      break;
    default:
      res.status(404).json(ResponseUtil.notFound());
  }

  return;
}
