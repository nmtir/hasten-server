import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig511736171091160 implements MigrationInterface {
    name = 'Mig511736171091160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_c5a68aa4b5c8d38a06f8e8d4c57"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_c5a68aa4b5c8d38a06f8e8d4c57" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_c5a68aa4b5c8d38a06f8e8d4c57"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_c5a68aa4b5c8d38a06f8e8d4c57" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
