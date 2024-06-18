"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1718387644638 = void 0;
class Migration1718387644638 {
    constructor() {
        this.name = 'Migration1718387644638';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "point" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "point"`);
    }
}
exports.Migration1718387644638 = Migration1718387644638;
//# sourceMappingURL=1718387644638-migration.js.map