import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig171733266604476 implements MigrationInterface {
    name = 'Mig171733266604476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`);
        await queryRunner.query(`CREATE TABLE "priority" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "color" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_413921aa4a118e20f361ceba8b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "board" ADD "status" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "priorityId" integer`);
        await queryRunner.query(`ALTER TABLE "priority" ADD CONSTRAINT "FK_9804a398fe4ab5f1b17f86f0a53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_9ef9d93f2b4576505432917a0f7" FOREIGN KEY ("priorityId") REFERENCES "priority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_9ef9d93f2b4576505432917a0f7"`);
        await queryRunner.query(`ALTER TABLE "priority" DROP CONSTRAINT "FK_9804a398fe4ab5f1b17f86f0a53"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "priorityId"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "priority" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "boardId" integer`);
        await queryRunner.query(`ALTER TABLE "board" ADD "label" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "priority"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
