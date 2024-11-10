export class TodoItemCreateDto {
  title: string;
  content?: string;
  isStar: boolean;
  status: string;
  seq: number;
}
