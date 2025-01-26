import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig271733658377181 implements MigrationInterface {
    name = 'Mig271733658377181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying, "userId" integer, "color" character varying, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_tags_tag" ("taskId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_28bdc8d6452f65a8ae3f4c2ab25" PRIMARY KEY ("taskId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_374509e2164bd1126522f424f6" ON "task_tags_tag" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e31820cdb45be62449b4f69c8" ON "task_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" ADD CONSTRAINT "FK_374509e2164bd1126522f424f6f" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" ADD CONSTRAINT "FK_0e31820cdb45be62449b4f69c8c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_tags_tag" DROP CONSTRAINT "FK_0e31820cdb45be62449b4f69c8c"`);
        await queryRunner.query(`ALTER TABLE "task_tags_tag" DROP CONSTRAINT "FK_374509e2164bd1126522f424f6f"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "tags" text array NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e31820cdb45be62449b4f69c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_374509e2164bd1126522f424f6"`);
        await queryRunner.query(`DROP TABLE "task_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
