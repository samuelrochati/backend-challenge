import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaChallengesRepository } from './prisma/repositories/prisma-challenges.repository';
import { ChallengesRepository } from './repositories/challenges.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ChallengesRepository,
      useClass: PrismaChallengesRepository,
    },
  ],
  exports: [PrismaService, ChallengesRepository],
})
export class DatabaseModule {}
