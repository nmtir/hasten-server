import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig541736636388764 implements MigrationInterface {
    name = 'Mig541736636388764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "about" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "about"`);
    }

}
