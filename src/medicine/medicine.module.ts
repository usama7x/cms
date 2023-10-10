import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineResolver } from './medicine.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  providers: [MedicineResolver, MedicineService],
})
export class MedicineModule {}
