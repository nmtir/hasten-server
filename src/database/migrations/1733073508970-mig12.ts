import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig121733073508970 implements MigrationInterface {
    name = 'Mig121733073508970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_8c9920b5fb32c3d8453f64b705c"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "parentId" TO "taskId"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_c5a68aa4b5c8d38a06f8e8d4c57" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_c9951f13af7909d37c0e2aec484" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_c9951f13af7909d37c0e2aec484"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_c5a68aa4b5c8d38a06f8e8d4c57"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "taskId" TO "parentId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_8c9920b5fb32c3d8453f64b705c" FOREIGN KEY ("parentId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
