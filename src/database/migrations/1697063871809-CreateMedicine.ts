import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMedicine1697063871809 implements MigrationInterface {
    name = 'CreateMedicine1697063871809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicine" ("id" SERIAL NOT NULL, "name" character varying, "type" character varying, "description" character varying, "ageLimit" integer, "sideEffects" text, "manufacturingDate" TIMESTAMP WITH TIME ZONE NOT NULL, "expiryDate" TIMESTAMP WITH TIME ZONE NOT NULL, "pricePerUnit" integer, "uom" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "medicine"`);
    }

}
