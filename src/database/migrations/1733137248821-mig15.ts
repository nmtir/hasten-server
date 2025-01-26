import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig151733137248821 implements MigrationInterface {
    name = 'Mig151733137248821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "board"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "className"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "allDay" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "boardId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_586dfdcae7fab5d9723506049a7" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_586dfdcae7fab5d9723506049a7"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "allDay"`);
        await queryRunner.query(`ALTER TABLE "board" ADD "className" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD "board" character varying NOT NULL`);
    }

}
