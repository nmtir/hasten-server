import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig181733321989226 implements MigrationInterface {
    name = 'Mig181733321989226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_586dfdcae7fab5d9723506049a7"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "categoryId" TO "boardId"`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "boardId" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_586dfdcae7fab5d9723506049a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
