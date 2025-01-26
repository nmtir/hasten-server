import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig271733606410744 implements MigrationInterface {
    name = 'Mig271733606410744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "subtitle" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "label" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "priority" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "percentage" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "logo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "isFavorite" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "isFavorite" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "logo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "percentage" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "priority" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "label" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "subtitle" SET NOT NULL`);
    }

}
