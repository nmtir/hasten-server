import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig11731245434964 implements MigrationInterface {
    name = 'Mig11731245434964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_contacts_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_70b58d86cb4e76666ddc307389f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7476f44166ea089024ca3dd271" ON "user_contacts_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_90d50e9eaf2ba430c86acb7631" ON "user_contacts_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "user_contacts_user" ADD CONSTRAINT "FK_7476f44166ea089024ca3dd2719" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_contacts_user" ADD CONSTRAINT "FK_90d50e9eaf2ba430c86acb76315" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_contacts_user" DROP CONSTRAINT "FK_90d50e9eaf2ba430c86acb76315"`);
        await queryRunner.query(`ALTER TABLE "user_contacts_user" DROP CONSTRAINT "FK_7476f44166ea089024ca3dd2719"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90d50e9eaf2ba430c86acb7631"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7476f44166ea089024ca3dd271"`);
        await queryRunner.query(`DROP TABLE "user_contacts_user"`);
    }

}
