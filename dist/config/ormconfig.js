"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const ormConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: false,
    logging: false,
};
exports.default = ormConfig;
//# sourceMappingURL=ormconfig.js.map