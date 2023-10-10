import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStock1696937798166 implements MigrationInterface {
    name = 'CreateStock1696937798166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "medicineId" integer, CONSTRAINT "REL_1a55eca28b7d99093a18dd69cf" UNIQUE ("medicineId"), CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_1a55eca28b7d99093a18dd69cff" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_1a55eca28b7d99093a18dd69cff"`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "updatedAt" SET DEFAULT '2023-10-10 16:35:04.618472+05'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "createdAt" SET DEFAULT '2023-10-10 16:35:04.618472+05'`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
