import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ChallengeResolver } from './resolvers/challenge.resolver';
import { CreateChallengeUseCase } from '../modules/challenges/create-challenge.use-case';
import { DatabaseModule } from '../database/database.module';
import { DeleteChallengeUseCase } from '../modules/challenges/delete-challenge.use-case';
import { UpdateChallengeUseCase } from '../modules/challenges/update-challenge.use-case';
import { SearchChallengeUseCase } from '../modules/challenges/search-challenge.use-case';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ChallengeResolver,
    CreateChallengeUseCase,
    DeleteChallengeUseCase,
    UpdateChallengeUseCase,
    SearchChallengeUseCase,
  ],
})
export class HttpModule {}
