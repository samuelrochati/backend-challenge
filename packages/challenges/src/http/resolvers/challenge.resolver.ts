import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateChallengeUseCase } from '../../modules/challenges/create-challenge.use-case';
import { Challenge } from '../models/challenge.model';
import { CreateChallengeInput } from '../inputs/create-challenge.input';

@Resolver(Challenge)
export class ChallengeResolver {
  constructor(private createChallengeUseCase: CreateChallengeUseCase) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => Challenge)
  createChallenge(
    @Args('createChallengeInput') { title, description }: CreateChallengeInput,
  ) {
    return this.createChallengeUseCase.perform(title, description);
  }
}
