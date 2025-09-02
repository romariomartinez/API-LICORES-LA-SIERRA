import 'reflect-metadata';
import { DataSource } from 'typeorm';
import ormConfig from './ormconfig';

const AppDataSource = new DataSource({
  ...(ormConfig as any),
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
});

export default AppDataSource;
