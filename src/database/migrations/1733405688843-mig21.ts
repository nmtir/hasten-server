import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig211733405688843 implements MigrationInterface {
    name = 'Mig211733405688843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_a8ec2c35d94e6afe42a7d47f227" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_a8ec2c35d94e6afe42a7d47f227"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "categoryId"`);
    }

}
