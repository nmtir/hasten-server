import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig101732877735943 implements MigrationInterface {
    name = 'Mig101732877735943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "start" character varying NOT NULL, "end" character varying NOT NULL, "allDay" character varying NOT NULL, "calendarId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_9ed681dd5aacb6842046c7b657b" FOREIGN KEY ("calendarId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_9ed681dd5aacb6842046c7b657b"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }

}
