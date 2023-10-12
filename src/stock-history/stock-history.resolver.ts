import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StockHistoryService } from './stock-history.service';
import { StockHistory } from './entities/stock-history.entity';
import { CreateStockHistoryInput } from './dto/create-stock-history.input';
import { UpdateStockHistoryInput } from './dto/update-stock-history.input';

@Resolver(() => StockHistory)
export class StockHistoryResolver {
  constructor(private readonly stockHistoryService: StockHistoryService) {}

  @Mutation(() => StockHistory)
  createStockHistory(@Args('createStockHistoryInput') createStockHistoryInput: CreateStockHistoryInput) {
    return this.stockHistoryService.create(createStockHistoryInput);
  }

  @Query(() => [StockHistory], { name: 'stockHistory' })
  findAll() {
    return this.stockHistoryService.findAll();
  }

  @Query(() => StockHistory, { name: 'stockHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stockHistoryService.findOne(id);
  }

  @Mutation(() => StockHistory)
  updateStockHistory(@Args('updateStockHistoryInput') updateStockHistoryInput: UpdateStockHistoryInput) {
    return this.stockHistoryService.update(updateStockHistoryInput.id, updateStockHistoryInput);
  }

  @Mutation(() => StockHistory)
  removeStockHistory(@Args('id', { type: () => Int }) id: number) {
    return this.stockHistoryService.remove(id);
  }
}
