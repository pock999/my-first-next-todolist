import { TodoItemEntity } from "@/entity/todo-item.entity";
import { IResponse } from "../interfaces/response.interface";

export class TodoItemDto implements IResponse<TodoItemEntity> {
  message: string;
  httpCode: number;
  statusCode: string;
  result: TodoItemEntity;
}
