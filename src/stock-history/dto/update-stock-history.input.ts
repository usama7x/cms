import { CreateStockHistoryInput } from './create-stock-history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStockHistoryInput extends PartialType(CreateStockHistoryInput) {
  @Field(() => Int)
  id: number;
}
