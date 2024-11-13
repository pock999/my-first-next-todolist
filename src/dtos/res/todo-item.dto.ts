import { TodoItemEntity } from '@/entitys/todo-item.entity';
import { IResponse } from '../interfaces/response.interface';

export interface TodoItemDto extends IResponse<TodoItemEntity> {
  message: string;
  httpCode: number;
  statusCode: string;
  result: TodoItemEntity;
}
