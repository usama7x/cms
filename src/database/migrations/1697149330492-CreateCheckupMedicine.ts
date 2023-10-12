import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCheckupMedicine1697149330492 implements MigrationInterface {
    name = 'CreateCheckupMedicine1697149330492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "checkup_medicine" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "morningIntake" integer, "morningIntakeAfterMeal" boolean, "afternoonIntake" integer, "afternoonIntakeAfterMeal" boolean, "eveningIntake" integer, "eveningIntakeAfterMeal" boolean, "nightIntake" integer, "nightIntakeAfterMeal" boolean, "intakeDays" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_67a72c4cb902e5eb0dc0c70a356" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_67a72c4cb902e5eb0dc0c70a356"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "morningIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "morningIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "afternoonIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "afternoonIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "eveningIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "eveningIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "nightIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "nightIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "intakeDays"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_67a72c4cb902e5eb0dc0c70a356" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "morningIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "morningIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "afternoonIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "afternoonIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "eveningIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "eveningIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "nightIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "nightIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "intakeDays" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "medicineId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_67a72c4cb902e5eb0dc0c70a356"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_6e2a9b3a9b6a6d1a11cc39ec277" PRIMARY KEY ("id", "medicineId")`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "checkupId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_6e2a9b3a9b6a6d1a11cc39ec277"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_93b56bf68e0ca54d6e96b752371" PRIMARY KEY ("id", "medicineId", "checkupId")`);

        


        
        await queryRunner.query(`CREATE INDEX "IDX_29ab73edc04c6063a57854d2f0" ON "checkup_medicine" ("medicineId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e279ded6571bc493ecab27333" ON "checkup_medicine" ("checkupId") `);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "FK_29ab73edc04c6063a57854d2f0c" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "FK_4e279ded6571bc493ecab273335" FOREIGN KEY ("checkupId") REFERENCES "checkup"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "FK_4e279ded6571bc493ecab273335"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "FK_29ab73edc04c6063a57854d2f0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e279ded6571bc493ecab27333"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29ab73edc04c6063a57854d2f0"`);
        
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_c09cf4f30db083082612fcf3324"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_93b56bf68e0ca54d6e96b752371" PRIMARY KEY ("id", "medicineId", "checkupId")`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_c09cf4f30db083082612fcf3324"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_93b56bf68e0ca54d6e96b752371" PRIMARY KEY ("id", "medicineId", "checkupId")`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_93b56bf68e0ca54d6e96b752371"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_6e2a9b3a9b6a6d1a11cc39ec277" PRIMARY KEY ("id", "medicineId")`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "checkupId"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_6e2a9b3a9b6a6d1a11cc39ec277"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_67a72c4cb902e5eb0dc0c70a356" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "medicineId"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "intakeDays"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "nightIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "nightIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "eveningIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "eveningIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "afternoonIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "afternoonIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "morningIntakeAfterMeal"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "morningIntake"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP CONSTRAINT "PK_67a72c4cb902e5eb0dc0c70a356"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "intakeDays" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "nightIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "nightIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "eveningIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "eveningIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "afternoonIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "afternoonIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "morningIntakeAfterMeal" boolean`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "morningIntake" integer`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "checkup_medicine" ADD CONSTRAINT "PK_67a72c4cb902e5eb0dc0c70a356" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "checkup_medicine"`);
    }

}
