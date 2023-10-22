import { Field, InputType, Int } from '@nestjs/graphql';
import { SortOrder } from './sort-order.enum';

@InputType()
export class ResourceOrderBy {
  @Field(() => String)
  sortKey: string;

  @Field(() => SortOrder)
  sortOrder: SortOrder;
}

@InputType()
export class PageInfoInput /*<ResourceOrderBy>*/ {
  @Field(() => Int, { defaultValue: 1 })
  pageNo?: number = 1;

  @Field(() => Int, { defaultValue: 20 })
  pageSize?: number = 20;

  @Field(() => [ResourceOrderBy], { nullable: true })
  orderBy?: ResourceOrderBy[];
}
