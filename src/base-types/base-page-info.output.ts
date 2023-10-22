import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPageInfo<T> {
  data: T;
  pageInfo: PageInformation;
}
export type IPageInfoWrapper<T> = (e: T) => IPageInfo<T>;

@ObjectType()
export class PageInformation {
  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  // This amount of requested records
  @Field(() => Int)
  requestedQueryCost: number;

  // This anount of returned records
  @Field(() => Int)
  actualQueryCost: number;

  @Field()
  maximumAvailable: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PageInfo = <TItem>(TItemClass: Type<TItem>[]): any => {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => TItemClass)
    data: TItem;

    @Field(() => PageInformation)
    pageInfo: PageInformation;
  }
  return PaginatedResponseClass;
};
