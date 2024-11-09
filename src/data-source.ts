import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { TodoItem } from './entity/todo-item.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '',
  database: 'next-todo',
  synchronize: false,
  logging: true,
  entities: [TodoItem],
  migrations: [],
});

export const getDBConnection = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
  }
  console.log('data source init !!!');
  return AppDataSource;
};