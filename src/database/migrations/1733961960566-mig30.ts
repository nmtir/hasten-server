import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig301733961960566 implements MigrationInterface {
    name = 'Mig301733961960566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "area" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "coordenadas" character varying NOT NULL, "mapId" integer, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_98ec735f82be066de3718387add" FOREIGN KEY ("mapId") REFERENCES "map"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_98ec735f82be066de3718387add"`);
        await queryRunner.query(`DROP TABLE "area"`);
    }

}
