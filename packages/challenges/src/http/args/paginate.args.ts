import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginateArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => Int)
  take = 10;
}
