import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module';
import request from 'supertest';
import { HttpModule } from '../http.module';

describe('Creator follower resolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, DatabaseModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able create a challenge', async () => {
    const challenge = {
      title: 'Challenge Rocketseat Space',
      description: 'The Next Musk',
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation createChallenge($title: String!, $description: String!) {
          createChallenge (
            createChallengeInput: {
              title: $title,
              description: $description
            }
          ) {
            id
            title
            description
          }
        }`,
        variables: {
          title: challenge.title,
          description: challenge.description,
        },
      })
      .expect(200);

    const { createChallenge } = response.body.data;

    expect(createChallenge).toEqual(expect.objectContaining(challenge));
  });
});
