import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVendor1697064020504 implements MigrationInterface {
    name = 'CreateVendor1697064020504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vendor" ("id" SERIAL NOT NULL, "name" character varying, "phoneNumber" character varying, "address" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vendor"`);
    }

}
