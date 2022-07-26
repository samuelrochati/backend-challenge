import { Injectable } from '@nestjs/common';
import { Challenge } from '../../../entities/challenge.entity';
import { ChallengesRepository } from '../../repositories/challenges.repository';
import { ChallengeMapper } from '../mappers/challenge.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaChallengesRepository implements ChallengesRepository {
  constructor(private prisma: PrismaService) {}

  async create(title: string, description: string): Promise<Challenge> {
    const challenge = Challenge.create({ title, description });

    await this.prisma.challenge.create({
      data: ChallengeMapper.toPersistence(challenge),
    });

    return challenge;
  }

  async findById(id: string): Promise<Challenge | null> {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) return null;

    return ChallengeMapper.toDomain(challenge);
  }

  async search(search: string, skip: 0, take: 10): Promise<Challenge[]> {
    const challenges = await this.prisma.challenge.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
        deleted: false,
      },
      skip,
      take,
    });

    const result = challenges.map((challenge) =>
      ChallengeMapper.toDomain(challenge),
    );

    return result;
  }

  async update(
    id: string,
    title?: string,
    description?: string,
  ): Promise<Challenge | null> {
    const challenge = await this.prisma.challenge.update({
      where: { id },
      data: { title, description },
    });

    if (!challenge) return null;

    return ChallengeMapper.toDomain(challenge);
  }

  async delete(id: string): Promise<boolean> {
    const challenge = await this.prisma.challenge.update({
      where: { id },
      data: { deleted: true },
    });

    return !!challenge;
  }
}
