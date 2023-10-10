import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStockHistory1696944289969 implements MigrationInterface {
    name = 'CreateStockHistory1696944289969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendor" DROP CONSTRAINT "FK_1fceb4a3a41e8139e481cc806af"`);
        await queryRunner.query(`ALTER TABLE "medicine" DROP CONSTRAINT "FK_777f388ba29776387f4d0b49751"`);
        await queryRunner.query(`ALTER TABLE "vendor" DROP COLUMN "stockHistoryId"`);
        await queryRunner.query(`ALTER TABLE "medicine" DROP COLUMN "stockHistoryId"`);
        await queryRunner.query(`ALTER TABLE "stock_history" ADD "medicineId" integer`);
        await queryRunner.query(`ALTER TABLE "stock_history" ADD "vendorId" integer`);
        await queryRunner.query(`ALTER TABLE "stock_history" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "stock_history" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "createdAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "updatedAt" SET DEFAULT 'NOW()'`);
        await queryRunner.query(`ALTER TABLE "stock_history" ADD CONSTRAINT "FK_29fa6f7c818398a58d60ad03159" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_history" ADD CONSTRAINT "FK_511102f5e24ab61e6d10edac606" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_history" DROP CONSTRAINT "FK_511102f5e24ab61e6d10edac606"`);
        await queryRunner.query(`ALTER TABLE "stock_history" DROP CONSTRAINT "FK_29fa6f7c818398a58d60ad03159"`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "updatedAt" SET DEFAULT '2023-10-10 18:21:30.278323+05'`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "createdAt" SET DEFAULT '2023-10-10 18:21:30.278323+05'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "updatedAt" SET DEFAULT '2023-10-10 18:21:30.278323+05'`);
        await queryRunner.query(`ALTER TABLE "patient" ALTER COLUMN "createdAt" SET DEFAULT '2023-10-10 18:21:30.278323+05'`);
        await queryRunner.query(`ALTER TABLE "stock_history" ALTER COLUMN "updatedAt" SET DEFAULT '2023-10-10 18:21:30.278323+05'`);
        await queryRunner.query(`ALTER TABLE "stock_history" ALTER COLUMN "createdAt" SET DEFAULT '2023-10-10 18:21:30.278323+05'`);
        await queryRunner.query(`ALTER TABLE "stock_history" DROP COLUMN "vendorId"`);
        await queryRunner.query(`ALTER TABLE "stock_history" DROP COLUMN "medicineId"`);
        await queryRunner.query(`ALTER TABLE "medicine" ADD "stockHistoryId" integer`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD "stockHistoryId" integer`);
        await queryRunner.query(`ALTER TABLE "medicine" ADD CONSTRAINT "FK_777f388ba29776387f4d0b49751" FOREIGN KEY ("stockHistoryId") REFERENCES "stock_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendor" ADD CONSTRAINT "FK_1fceb4a3a41e8139e481cc806af" FOREIGN KEY ("stockHistoryId") REFERENCES "stock_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
