import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig161733138598180 implements MigrationInterface {
    name = 'Mig161733138598180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "userId"`);
    }

}
