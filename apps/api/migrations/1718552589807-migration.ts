import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718552589807 implements MigrationInterface {
    name = 'Migration1718552589807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "longitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "latitude" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "point" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "point" ADD "longitude" integer NOT NULL`);
    }

}
