import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module';
import request from 'supertest';
import { HttpModule } from '../http.module';

describe('Creator follower resolver (e2e)', () => {
  let app: INestApplication;
  const challenge = {
    id: '',
    title: 'Challenge Rocketseat Space',
    description: 'The Next Musk',
  };

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

    challenge.id = createChallenge.id;

    expect(createChallenge).toEqual(expect.objectContaining(challenge));
  });

  it('should be able search a challenge', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query searchChallenge($search: String!){
          searchChallenge(
            searchChallengeInput: { search: $search }
          ){
            id
            title
            description
          }
        }`,
        variables: {
          search: challenge.title,
        },
      })
      .expect(200);

    const { searchChallenge } = response.body.data;

    expect(searchChallenge).toHaveLength(searchChallenge.length);
  });

  it('should be able update challenge', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation updateChallenge(
          $id: String!
          $title: String!
          $description: String!
        ) {
          updateChallenge(
            updateChallengeInput: { id: $id, title: $title, description: $description }
          ) {
            id
            title
            description
          }
        }`,
        variables: {
          id: challenge.id,
          title: 'Update',
          description: 'Update',
        },
      })
      .expect(200);

    const { updateChallenge } = response.body.data;

    expect(updateChallenge.title).toEqual('Update');
  });

  it('should be able delete challenge', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation createChallenge($id: String!) {
          deleteChallenge(
            deleteChallengeInput: {
              id: $id
            }
          )
        }`,
        variables: {
          id: challenge.id,
        },
      })
      .expect(200);

    const { deleteChallenge } = response.body.data;

    expect(deleteChallenge).toEqual(true);
  });
});
