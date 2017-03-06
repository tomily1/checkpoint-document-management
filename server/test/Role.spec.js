/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/spec.helper';

const expect = chai.expect;
const client = supertest.agent(app);

describe('Admin Roles:', () => {
  let adminToken;
  const userInput = {
    email: 'test@test.com',
    password: 'test'
  };
  before((done) => {
    client.post('/users/login')
      .send(userInput)
      .end((error1, response1) => {
        adminToken = response1.body.token;
        done();
      });
  });
  it('should only allow user with a valid token to create Roles', (done) => {
    client.post('/roles')
      .set({ 'x-access-token': adminToken })
      .send(testData.newRole1)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
  });
  it('should return 404 status code if the roles title is inputted', (done) => {
    client.post('/roles')
      .set({ 'x-access-token': adminToken })
      .send({})
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
  });
  it('should be able to fetch all the roles in the database', (done) => {
    client.get('/roles')
      .set({ 'x-access-token': adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
  });
  it('should be able to delete roles from the table', (done) => {
    client.delete('/roles/3')
      .set({ 'x-access-token': adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        done();
      });
  });
  it('should return params 401 for invalid request params', (done) => {
    client.delete('/roles/4')
      .set({ 'x-access-token': adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
  });
  it('should return params 401 for invalid request params', (done) => {
    client.delete('/roles/4e')
      .set({ 'x-access-token': adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
  });
});
