import { Injectable } from '@nestjs/common';
import { Challenge } from 'src/entities/challenge.entity';

@Injectable()
export abstract class ChallengesRepository {
  abstract create(title: string, description: string): Promise<Challenge>;
  abstract findById(id: string): Promise<Challenge | null>;
  abstract search(
    search: string,
    skip?: number,
    take?: number,
  ): Promise<Challenge[]>;
  abstract update(
    id: string,
    title?: string,
    description?: string,
  ): Promise<Challenge | null>;
  abstract delete(id: string): Promise<boolean>;
}
