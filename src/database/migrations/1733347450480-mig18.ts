import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig181733347450480 implements MigrationInterface {
    name = 'Mig181733347450480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`CREATE TABLE "user_status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_892a2061d6a04a7e2efe4c26d6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "status" character varying NOT NULL, "label" character varying NOT NULL, "priority" character varying NOT NULL, "description" character varying NOT NULL, "percentage" integer NOT NULL, "assignDate" character varying NOT NULL, "dueDate" character varying NOT NULL, "logo" character varying NOT NULL, "isFavorite" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "label" ("id" integer NOT NULL, "value" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_5692ac5348861d3776eb5843672" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "priority" ADD "label" character varying`);
        await queryRunner.query(`ALTER TABLE "priority" ADD "value" character varying`);
        await queryRunner.query(`ALTER TABLE "priority" ADD "icon" character varying`);
        await queryRunner.query(`ALTER TABLE "status" ADD "label" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD "icon" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "user_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "priority" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "priority" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "priority" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "status" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "label"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user_status"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
