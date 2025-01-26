import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig251733445568058 implements MigrationInterface {
    name = 'Mig251733445568058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "color" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "color"`);
    }

}
