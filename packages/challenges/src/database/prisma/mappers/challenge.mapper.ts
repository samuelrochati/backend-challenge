import { Prisma, Challenge as PrismaChallenge } from '@prisma/client';
import { Challenge } from '../../../entities/challenge.entity';

export class ChallengeMapper {
  public static toDomain(prismaChallenge: PrismaChallenge): Challenge {
    const challenge = Challenge.create(
      {
        title: prismaChallenge.title,
        description: prismaChallenge.description,
      },
      prismaChallenge.id,
    );

    return challenge;
  }

  public static toPersistence(
    challenge: Challenge,
  ): Prisma.ChallengeCreateInput {
    const prismaChallenge = {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      created_at: challenge.createdAt || new Date(),
    };

    return prismaChallenge;
  }
}
