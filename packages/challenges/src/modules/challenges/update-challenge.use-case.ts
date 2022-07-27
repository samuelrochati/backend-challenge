import { Injectable } from '@nestjs/common';
import { Challenge } from '../../entities/challenge.entity';
import { ChallengesRepository } from '../../database/repositories/challenges.repository';

@Injectable()
export class UpdateChallengeUseCase {
  constructor(private challengesRepository: ChallengesRepository) {}

  async perform(
    id: string,
    title?: string,
    description?: string,
  ): Promise<Challenge | null> {
    const challenge = await this.challengesRepository.update(
      id,
      title,
      description,
    );
    return challenge;
  }
}
