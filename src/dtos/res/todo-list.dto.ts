import { TodoItemEntity } from '@/entitys/todo-item.entity';
import { IResponse } from '../interfaces/response.interface';

export interface TodoListDto extends IResponse<Array<TodoItemEntity>> {
  message: string;
  httpCode: number;
  statusCode: string;
  result: Array<TodoItemEntity>;
}
