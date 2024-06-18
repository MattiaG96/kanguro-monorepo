"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1718552589807 = void 0;
class Migration1718552589807 {
    constructor() {
        this.name = 'Migration1718552589807';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "longitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "latitude" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "longitude" integer NOT NULL`);
    }
}
exports.Migration1718552589807 = Migration1718552589807;
//# sourceMappingURL=1718552589807-migration.js.map