const supertest = require('supertest');
const request = supertest('https://gorest.co.in/public/v2/');
const faker = require('faker');

const TOKEN = 'd441663371cad147f55bd56afb5eb52064dd06e7e9e7aa1ee770353ef07f0a79'

export const createRandomUserWithFaker = async () => {
  const data = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    status: 'Active',
    gender: 'Male',
  };

  const res = await request
    .post(`users`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data);

  return res.body;
};

export const createRandomUser = async () => {
  const data = {
    email: 'jmathews' + Math.floor(Math.random() * 99999) + '@mail.ca',
    name: 'John',
    status: 'Active',
    gender: 'Male',
  };
  const res = await request
    .post(`users`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data);
  return res.body;
};
