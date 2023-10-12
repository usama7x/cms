import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStockHistory1697064802541 implements MigrationInterface {
    name = 'CreateStockHistory1697064802541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`CREATE TABLE "stock_history" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "purchaseDate" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()', "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "medicineId" integer, "vendorId" integer, CONSTRAINT "PK_16924caa54ac1fa49162ea3afca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_history" ADD CONSTRAINT "FK_29fa6f7c818398a58d60ad03159" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_history" ADD CONSTRAINT "FK_511102f5e24ab61e6d10edac606" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "stock_history" DROP CONSTRAINT "FK_511102f5e24ab61e6d10edac606"`);
        await queryRunner.query(`ALTER TABLE "stock_history" DROP CONSTRAINT "FK_29fa6f7c818398a58d60ad03159"`);
        await queryRunner.query(`DROP TABLE "stock_history"`);

    }

}
