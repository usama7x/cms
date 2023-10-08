import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1696792565901 implements MigrationInterface {
    name = 'Migrations1696792565901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dob" date NOT NULL, "gender" character varying NOT NULL, "address" character varying NOT NULL, "guardianName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "age" integer NOT NULL, "healthProblems" text NOT NULL, "medication" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
