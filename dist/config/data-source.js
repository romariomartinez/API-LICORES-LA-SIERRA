"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
const AppDataSource = new typeorm_1.DataSource({
    ...ormconfig_1.default,
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map