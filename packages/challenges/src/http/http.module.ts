import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ChallengeResolver } from './resolvers/challenge.resolver';
import { CreateChallengeUseCase } from '../modules/challenges/create-challenge.use-case';
import { DatabaseModule } from '../database/database.module';

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
  providers: [ChallengeResolver, CreateChallengeUseCase],
})
export class HttpModule {}
