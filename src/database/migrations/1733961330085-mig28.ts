import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig281733961330085 implements MigrationInterface {
    name = 'Mig281733961330085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "pages"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "messageCount"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "desc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "desc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "messageCount" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "pages" character varying NOT NULL`);
    }

}
