import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig01730970572685 implements MigrationInterface {
    name = 'Mig01730970572685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "status" character varying NOT NULL, "label" character varying NOT NULL, "priority" character varying NOT NULL, "description" character varying NOT NULL, "percentage" integer NOT NULL, "assignDate" character varying NOT NULL, "dueDate" character varying NOT NULL, "logo" character varying NOT NULL, "isFavorite" boolean NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_item" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "taskId" integer, CONSTRAINT "PK_45e3b8582f2ec4c1e138ddca80d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "avatar" character varying NOT NULL, "firstname" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "status" character varying NOT NULL, "tags" text array NOT NULL, "priority" character varying NOT NULL, "image" character varying, "board" character varying NOT NULL, "pages" character varying NOT NULL, "messageCount" character varying NOT NULL, "link" character varying NOT NULL, "date" character varying NOT NULL, "dueDate" character varying NOT NULL, "time" character varying NOT NULL, "dueTime" character varying, "parentId" integer, "boardId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_label" ("id" integer NOT NULL, "value" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_532dca1d307e1f244082d3cc56f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_priority" ("id" integer NOT NULL, "label" character varying NOT NULL, "value" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_b44c1f6488051ab7e0424a2319e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_status" ("id" integer NOT NULL, "label" character varying NOT NULL, "value" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_625ed5469429a6b32e34ba9f827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_assign_user" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_d918cbd6f7f291cc5b8a2c5d78d" PRIMARY KEY ("projectId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fa8d3e4dae6afb29e6bf1e1fb8" ON "project_assign_user" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dea4141189ed93866ca7360556" ON "project_assign_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "task_assign_user" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_2af6f0e5f76d5361fe41b078228" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cef24ee4d812b1b57386ad3675" ON "task_assign_user" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c504df2d4e873f02eaec382168" ON "task_assign_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "coordenadas"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "coordenadas" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task_item" ADD CONSTRAINT "FK_684166faa827a4689abd35c83b1" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_8c9920b5fb32c3d8453f64b705c" FOREIGN KEY ("parentId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_assign_user" ADD CONSTRAINT "FK_fa8d3e4dae6afb29e6bf1e1fb8d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_assign_user" ADD CONSTRAINT "FK_dea4141189ed93866ca73605568" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assign_user" ADD CONSTRAINT "FK_cef24ee4d812b1b57386ad36751" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assign_user" ADD CONSTRAINT "FK_c504df2d4e873f02eaec3821686" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_assign_user" DROP CONSTRAINT "FK_c504df2d4e873f02eaec3821686"`);
        await queryRunner.query(`ALTER TABLE "task_assign_user" DROP CONSTRAINT "FK_cef24ee4d812b1b57386ad36751"`);
        await queryRunner.query(`ALTER TABLE "project_assign_user" DROP CONSTRAINT "FK_dea4141189ed93866ca73605568"`);
        await queryRunner.query(`ALTER TABLE "project_assign_user" DROP CONSTRAINT "FK_fa8d3e4dae6afb29e6bf1e1fb8d"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_8c9920b5fb32c3d8453f64b705c"`);
        await queryRunner.query(`ALTER TABLE "task_item" DROP CONSTRAINT "FK_684166faa827a4689abd35c83b1"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "coordenadas"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "coordenadas" point NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c504df2d4e873f02eaec382168"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cef24ee4d812b1b57386ad3675"`);
        await queryRunner.query(`DROP TABLE "task_assign_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dea4141189ed93866ca7360556"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa8d3e4dae6afb29e6bf1e1fb8"`);
        await queryRunner.query(`DROP TABLE "project_assign_user"`);
        await queryRunner.query(`DROP TABLE "project_status"`);
        await queryRunner.query(`DROP TABLE "project_priority"`);
        await queryRunner.query(`DROP TABLE "project_label"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "task_item"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
