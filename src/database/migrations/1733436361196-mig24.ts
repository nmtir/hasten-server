import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig241733436361196 implements MigrationInterface {
    name = 'Mig241733436361196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "allDay"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "allDay" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "allDay"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "allDay" character varying`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" character varying`);
    }

}
