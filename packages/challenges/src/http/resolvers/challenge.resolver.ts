import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateChallengeUseCase } from '../../modules/challenges/create-challenge.use-case';
import { Challenge } from '../models/challenge.model';
import { CreateChallengeInput } from '../inputs/create-challenge.input';
import { DeleteChallengeInput } from '../inputs/delete-challenge.input';
import { DeleteChallengeUseCase } from '../../modules/challenges/delete-challenge.use-case';
import { UpdateChallengeUseCase } from '../../modules/challenges/update-challenge.use-case';
import { UpdateChallengeInput } from '../inputs/update-challenge.input';
import { SearchChallengeInput } from '../inputs/search-challenge.input';
import { SearchChallengeUseCase } from '../../modules/challenges/search-challenge.use-case';
import { PaginateArgs } from '../args/paginate.args';

@Resolver(Challenge)
export class ChallengeResolver {
  constructor(
    private createChallengeUseCase: CreateChallengeUseCase,
    private deleteChallengeUseCase: DeleteChallengeUseCase,
    private updateChallengeUseCase: UpdateChallengeUseCase,
    private searchChallengeUseCase: SearchChallengeUseCase,
  ) {}

  @Query(() => [Challenge])
  searchChallenge(
    @Args('searchChallengeInput') { search }: SearchChallengeInput,
    @Args() { skip, take }: PaginateArgs,
  ) {
    return this.searchChallengeUseCase.perform(search, skip, take);
  }

  @Mutation(() => Challenge)
  createChallenge(
    @Args('createChallengeInput') { title, description }: CreateChallengeInput,
  ) {
    return this.createChallengeUseCase.perform(title, description);
  }

  @Mutation(() => Boolean)
  deleteChallenge(@Args('deleteChallengeInput') { id }: DeleteChallengeInput) {
    return this.deleteChallengeUseCase.perform(id);
  }

  @Mutation(() => Challenge || null)
  updateChallenge(
    @Args('updateChallengeInput')
    { id, title, description }: UpdateChallengeInput,
  ) {
    return this.updateChallengeUseCase.perform(id, title, description);
  }
}
