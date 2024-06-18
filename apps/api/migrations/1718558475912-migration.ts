import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718558475912 implements MigrationInterface {
    name = 'Migration1718558475912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" ADD "schedule" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "schedule"`);
    }

}
