"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1718558475912 = void 0;
class Migration1718558475912 {
    constructor() {
        this.name = 'Migration1718558475912';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "point" ADD "schedule" character varying NOT NULL DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "schedule"`);
    }
}
exports.Migration1718558475912 = Migration1718558475912;
//# sourceMappingURL=1718558475912-migration.js.map