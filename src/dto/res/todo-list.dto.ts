import { TodoItemEntity } from "@/entity/todo-item.entity";
import { IResponse } from "../interfaces/response.interface";

export class TodoListDto implements IResponse<Array<TodoItemEntity>> {
  message: string;
  httpCode: number;
  statusCode: string;
  result: Array<TodoItemEntity>;
}
