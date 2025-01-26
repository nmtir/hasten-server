import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig261733606245975 implements MigrationInterface {
    name = 'Mig261733606245975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "title" SET NOT NULL`);
    }

}
