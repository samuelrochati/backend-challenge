import { Injectable } from '@nestjs/common';
import { ChallengesRepository } from '../../database/repositories/challenges.repository';

@Injectable()
export class DeleteChallengeUseCase {
  constructor(private challengesRepository: ChallengesRepository) {}

  async perform(id: string): Promise<boolean> {
    const result = await this.challengesRepository.delete(id);
    return result;
  }
}
