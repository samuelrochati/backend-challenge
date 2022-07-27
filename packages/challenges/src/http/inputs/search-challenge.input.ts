import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchChallengeInput {
  @Field()
  search: string;
}
