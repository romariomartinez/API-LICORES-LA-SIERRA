"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto1756827692595 = void 0;
class Auto1756827692595 {
    constructor() {
        this.name = 'Auto1756827692595';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(120) NOT NULL, \`description\` varchar(255) NULL, \`order\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(160) NOT NULL, \`description\` text NULL, \`price\` decimal(10,2) NOT NULL, \`image_url\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`category_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(120) NOT NULL, \`email\` varchar(160) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'admin', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }
}
exports.Auto1756827692595 = Auto1756827692595;
//# sourceMappingURL=1756827692595-auto.js.map