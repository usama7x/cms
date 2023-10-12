import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorResolver } from './vendor.resolver';
import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  providers: [VendorResolver, VendorService],
})
export class VendorModule {}
