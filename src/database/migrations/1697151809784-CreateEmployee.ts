import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1697151809784 implements MigrationInterface {
    name = 'CreateEmployee1697151809784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "cnic" character varying NOT NULL, "dob" TIMESTAMP WITH TIME ZONE NOT NULL, "salary" double precision NOT NULL, "gender" character varying NOT NULL, "address" character varying NOT NULL, "role" character varying NOT NULL, "contactNumber" integer, "guardianNumber" integer, "isFulltime" boolean, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
