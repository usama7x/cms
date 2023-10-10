import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMedicineVendor1696935173261 implements MigrationInterface {
    name = 'CreateMedicineVendor1696935173261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicine" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "ageLimit" integer NOT NULL, "sideEffects" text NOT NULL, "manufacturingDate" TIMESTAMP WITH TIME ZONE NOT NULL, "expiryDate" TIMESTAMP WITH TIME ZONE NOT NULL, "pricePerUnit" integer NOT NULL, "uom" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dob" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "updatedAt" SET DEFAULT '2023-10-10 02:52:35.160616+05'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "createdAt" SET DEFAULT '2023-10-10 02:52:35.160616+05'`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dob" TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`DROP TABLE "medicine"`);
    }

}
