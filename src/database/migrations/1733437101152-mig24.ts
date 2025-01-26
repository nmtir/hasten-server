import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig241733437101152 implements MigrationInterface {
    name = 'Mig241733437101152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_586dfdcae7fab5d9723506049a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_586dfdcae7fab5d9723506049a7"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "categoryId"`);
    }

}
