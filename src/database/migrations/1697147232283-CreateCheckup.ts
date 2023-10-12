import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCheckup1697147232283 implements MigrationInterface {
    name = 'CreateCheckup1697147232283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "checkup" ("id" SERIAL NOT NULL, "fee" double precision NOT NULL, "intakeDays" integer NOT NULL, "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "patientId" integer, CONSTRAINT "PK_464a9b90a27723918e9b87305a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "checkup" ADD CONSTRAINT "FK_4c7fa827e5673f3230825e9569e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checkup" DROP CONSTRAINT "FK_4c7fa827e5673f3230825e9569e"`);
        await queryRunner.query(`DROP TABLE "checkup"`);
    }

}
