import { getDBConnection } from "@/data-source";
import { TodoItem } from "@/entity/todo-item.entity";
import type { NextApiRequest, NextApiResponse } from "next";

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
 *     responses:
 *       200:
 *         description: Create Success
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method } = req;

  const conn = await getDBConnection();

  if(method === 'GET') {
    // create
    const data = await conn.getRepository(TodoItem).find();

    res.status(200).json({ message: 'test', data});
    return ;
  }

  res.status(404).json({ message: 'not found'});
}