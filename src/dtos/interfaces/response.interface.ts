export interface IResponse<T> {
  message: string;
  httpCode: number;
  statusCode: string;
  result: T;
}
