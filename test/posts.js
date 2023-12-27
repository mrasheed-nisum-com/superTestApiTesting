const faker = require('faker');
import supertest from "supertest";


import { expect } from 'chai';

const TOKEN = 'd441663371cad147f55bd56afb5eb52064dd06e7e9e7aa1ee770353ef07f0a79'
const REQUEST = supertest("https://gorest.co.in/public/v2/");

const {
  createRandomUser,
  createRandomUserWithFaker,
} = require('../helpers/users');


describe('Posts', () => {
  let user, postId;

  before(async () => {
     user = await createRandomUser();
    //user = await createRandomUserWithFaker();
  });

  after(() => {
    // clean up
    // delete a user
  });

  describe.only('POST', () => {
    it('/posts', async () => {
      const data = {
        user_id: user.id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs().slice(0,200),
      };

      const res = await REQUEST
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);

      expect(res.body).to.deep.include(data);
      postId = res.body.id;
    });

    // dependent on previous test
    it('posts/:id', async () => {
      if (postId) {
        await REQUEST
          .get(`posts/${postId}`)
          .set('Authorization', `Bearer ${TOKEN}`)
          .expect(200);
      } else {
        throw new Error(`postId is invalid - ${postId}`);
      }
    });
  });

  describe('Negative Tests', () => {
    it('422 Data validation failed', async () => {
      const data = {
        user_id: user.id,
        title: '',
        body: faker.lorem.paragraphs(),
      };

      const res = await REQUEST
        .post(`posts`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);

      expect(res.body.code).to.eq(422);
      expect(res.body.data[0].message).to.eq("can't be blank");
    });

    it('401 Authentication failed', async () => {
      const data = {
        user_id: user.id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
      };

      const res = await REQUEST.post(`posts`).send(data);

      expect(res.body.code).to.eq(401);
      expect(res.body.data.message).to.eq('Authentication failed');
    });
  });
});
