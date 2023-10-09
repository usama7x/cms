import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatient1696888317925 implements MigrationInterface {
    name = 'CreatePatient1696888317925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "dob" TIMESTAMP, "gender" character varying, "address" character varying, "guardianName" character varying, "phoneNumber" character varying, "age" integer, "healthProblems" text, "medication" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
