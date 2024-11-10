import { getDBConnection } from "@/data-source";
import { IResponse } from "@/dto/interfaces/response.interface";
import { TodoItemCreateDto } from "@/dto/req/todo-item-create.dto";
import { TodoListDto } from "@/dto/res/todo-list.dto";
import { TodoItemEntity } from "@/entity/todo-item.entity";
import type { NextApiRequest, NextApiResponse } from "next";

interface TodoItemCreateRequest extends NextApiRequest {
  body: TodoItemCreateDto;
}

/**
 * @swagger
 * /api/todo-item:
 *   get:
 *     description: Returns Todo List
 *     responses:
 *       200:
 *         description: return Todo List
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
  req: TodoItemCreateRequest, // TODO: filter
  res: NextApiResponse<IResponse<any>>
) {
  const { method } = req;

  const conn = await getDBConnection();

  switch (method) {
    case "GET":
      // get
      const result = await conn.getRepository(TodoItemEntity).find();
      res.status(200).json({
        message: "success",
        httpCode: 200,
        statusCode: "000000",
        result,
      });
      break;
    case "POST":
      // create
      const data = req.body;
      await conn
        .getRepository(TodoItemEntity)
        .createQueryBuilder()
        .insert()
        .into(TodoItemEntity)
        .values({
          ...data,
        })
        .execute();
      res.status(200).json({
        message: "success",
        httpCode: 200,
        statusCode: "000000",
        result: null,
      });
      break;
    default:
      res.status(404).json({
        message: "not found",
        httpCode: 404,
        statusCode: "000001",
        result: null,
      });
  }

  return;
}
