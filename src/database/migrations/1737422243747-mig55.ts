import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig551737422243747 implements MigrationInterface {
    name = 'Mig551737422243747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "function" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "function"`);
    }

}
