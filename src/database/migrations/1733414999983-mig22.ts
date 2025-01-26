import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig221733414999983 implements MigrationInterface {
    name = 'Mig221733414999983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dueDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dueDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "date" character varying NOT NULL`);
    }

}
