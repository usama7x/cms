import { Module } from '@nestjs/common';
import { CheckupService } from './checkup.service';
import { CheckupResolver } from './checkup.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkup } from './entities/checkup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkup])],
  providers: [CheckupResolver, CheckupService],
})
export class CheckupModule {}
