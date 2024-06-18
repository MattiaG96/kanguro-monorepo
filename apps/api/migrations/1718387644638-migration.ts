import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718387644638 implements MigrationInterface {
    name = 'Migration1718387644638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "point" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "point"`);
    }

}
