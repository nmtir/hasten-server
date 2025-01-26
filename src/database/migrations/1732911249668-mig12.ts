import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig121732911249668 implements MigrationInterface {
    name = 'Mig121732911249668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
    }

}
