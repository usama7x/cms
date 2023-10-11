import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStockHistoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
