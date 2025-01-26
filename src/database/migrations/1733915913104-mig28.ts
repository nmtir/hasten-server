import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig281733915913104 implements MigrationInterface {
    name = 'Mig281733915913104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_9ef9d93f2b4576505432917a0f7"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_9ef9d93f2b4576505432917a0f7" FOREIGN KEY ("priorityId") REFERENCES "priority"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_9ef9d93f2b4576505432917a0f7"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_9ef9d93f2b4576505432917a0f7" FOREIGN KEY ("priorityId") REFERENCES "priority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
