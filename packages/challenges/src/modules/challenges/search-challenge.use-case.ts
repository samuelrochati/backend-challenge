import { Injectable } from '@nestjs/common';
import { Challenge } from '../../entities/challenge.entity';
import { ChallengesRepository } from '../../database/repositories/challenges.repository';

@Injectable()
export class SearchChallengeUseCase {
  constructor(private challengesRepository: ChallengesRepository) {}

  async perform(
    search: string,
    skip?: number,
    take?: number,
  ): Promise<Challenge[]> {
    const challenge = await this.challengesRepository.search(
      search,
      skip,
      take,
    );
    return challenge;
  }
}
