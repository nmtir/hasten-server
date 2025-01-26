import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig111732880168719 implements MigrationInterface {
    name = 'Mig111732880168719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "className" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "className"`);
    }

}
