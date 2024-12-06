import { WhereClauseCondition } from './../../../../node_modules/typeorm/query-builder/WhereClause.d';
import { getDBConnection } from '@/data-source';
import { IResponse } from '@/dtos/interfaces/response.interface';
import { TodoItemCreateDto } from '@/dtos/req/todo-item-create.dto';
import { TodoListDto } from '@/dtos/res/todo-list.dto';
import { TodoItemEntity } from '@/entitys/todo-item.entity';
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseUtil from '@/utils/response.util';
import { FindManyOptions } from 'typeorm';
import { Or, Like } from 'typeorm';

interface ListFilterRequest extends NextApiRequest {
  query: {
    q: string; // 關鍵字
  };
}

/**
 * @swagger
 * /api/todo-item/list:
 *   get:
 *     description: Returns Todo List
 *     parameters:
 *       - in: query
 *         name: q
 *         type: string
 *         description: The Keyword
 *     responses:
 *       200:
 *         description: return Todo List
 */
export default async function handler(
  req: ListFilterRequest,
  res: NextApiResponse<IResponse<any>>
) {
  const { method } = req;

  const conn = await getDBConnection();

  if (method !== 'GET') {
    res.status(404).json(ResponseUtil.notFound());
    return;
  }

  // keyword
  const { q } = req.query;

  let optionClauseCondition: FindManyOptions = {};

  if (!!q) {
    optionClauseCondition = {
      where: [{ title: Like(`%${q}%`) }, { content: Like(`%${q}%`) }],
    };
  }

  optionClauseCondition.order = {
    seq: 'ASC',
  };

  const result = await conn
    .getRepository(TodoItemEntity)
    .find(optionClauseCondition);
  res.status(200).json(ResponseUtil.ok(result));
}
