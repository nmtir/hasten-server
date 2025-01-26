import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig231733436003868 implements MigrationInterface {
    name = 'Mig231733436003868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "start" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "end" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dueDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "date" TIMESTAMP`);
    }

}
