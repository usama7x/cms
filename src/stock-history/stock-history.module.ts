import { Module } from '@nestjs/common';
import { StockHistoryService } from './stock-history.service';
import { StockHistoryResolver } from './stock-history.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockHistory } from './entities/stock-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockHistory])],
  providers: [StockHistoryResolver, StockHistoryService],
})
export class StockHistoryModule { }
