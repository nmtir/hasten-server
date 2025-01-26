import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig201733405353974 implements MigrationInterface {
    name = 'Mig201733405353974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_assign_user" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_2af6f0e5f76d5361fe41b078228" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cef24ee4d812b1b57386ad3675" ON "task_assign_user" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c504df2d4e873f02eaec382168" ON "task_assign_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "assignDate"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueTime"`);
        await queryRunner.query(`ALTER TABLE "task_assign_user" ADD CONSTRAINT "FK_cef24ee4d812b1b57386ad36751" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assign_user" ADD CONSTRAINT "FK_c504df2d4e873f02eaec3821686" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_assign_user" DROP CONSTRAINT "FK_c504df2d4e873f02eaec3821686"`);
        await queryRunner.query(`ALTER TABLE "task_assign_user" DROP CONSTRAINT "FK_cef24ee4d812b1b57386ad36751"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dueTime" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "dueDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "assignDate" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c504df2d4e873f02eaec382168"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cef24ee4d812b1b57386ad3675"`);
        await queryRunner.query(`DROP TABLE "task_assign_user"`);
    }

}
