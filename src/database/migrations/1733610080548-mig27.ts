import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig271733610080548 implements MigrationInterface {
    name = 'Mig271733610080548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "status" TO "color"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME COLUMN "color" TO "status"`);
    }

}
