import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false, // Usar migraciones
  logging: false,
};

export default ormConfig;
