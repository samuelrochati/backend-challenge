import { Injectable } from '@nestjs/common';
import { ChallengesRepository } from '../../database/repositories/challenges.repository';
import { Challenge } from '../../entities/challenge.entity';

@Injectable()
export class CreateChallengeUseCase {
  constructor(private challengesRepository: ChallengesRepository) {}

  async perform(title: string, description: string): Promise<Challenge> {
    const challenge = await this.challengesRepository.create(
      title,
      description,
    );
    return challenge;
  }
}
