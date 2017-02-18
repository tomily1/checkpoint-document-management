import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/spec.helper';
import db from '../models';

const expect = chai.expect;
const client = supertest.agent(app);

const regularUser = testData.regularUser1;
describe('Users', () => {
  describe('Create Regular Users', () => {
    let regularUserToken;
    it('should return a status code of 201 when a regular user has beesn successfully created',
      (done) => {
        client.post('/users')
          .send(regularUser)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            done();
          });
      });
    it('should be able to search for another user in the database', (done) => {
      client.get('/users/1')
        .end((error, response) => {
          expect(response.status).equal(200);
          done();
        });
    });
    it('should return status code 400 for incorrect input', (done) => {
      client.post('/users')
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('Should NOT allow users with Duplicate Email address allow and user credentials to be created',
      (done) => {
        client.post('/users')
          .send(testData.regularUser1)
          .end((error, response) => {
            expect(response.status).to.equal(500);
            done();
          });
      });
    it('Role Id for regular users should be 2',
      (done) => {
        client.post('/users')
          .send(testData.regularUser3)
          .end((error, response) => {
            expect(response.body.RoleId).to.equal(2);
            done();
          });
      });
    it('Should return a TOKEN if a Regular User is successfully logged in',
      (done) => {
        client.post('/users/login')
          .send(testData.regularUser1)
          .end((error, response) => {
            regularUserToken = response.body.token;
            expect(response.body).to.have.property('token');
            done();
          });
      });
    it('Regular users should not be authenticated as an admin', (done) => {
      client.get('/users')
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });
    it('Should be able to update user details', (done) => {
      client.put('/users/1')
        .send({
          firstname: 'Tomilayo',
          lastname: 'Israel',
          password: 'Israel123'
        })
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
    it('should not update details for non existent user', (done) => {
      client.put('/users/100')
        .send({})
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
  });

  describe('Admin User', () => {
    it('Should return http code 201 if an Admin User is successfully created',
      (done) => {
        client.post('/users')
          .send(testData.adminUser)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            done();
          });
      });
    it('Role Id for admin user should be 1',
      (done) => {
        client.post('/users')
          .send(testData.adminUser2)
          .end((error, response) => {
            expect(response.body.RoleId).to.equal(1);
            done();
          });
      });
    it('Should be able to delete users', (done) => {
      client.delete('/users/1')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
    it('should return a status code of 404 for invalid delete parameter or if user not found', (done) => {
      client.delete('/users/100')
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
    it('should return 404 response status for a user that is not present in the database', (done) => {
      client.get('/users/300')
        .end((error, response) => {
          expect(response.status).equal(404);
          done();
        });
    });
  });

  describe('login', () => {
    const adminUser = testData.adminUser;
    let adminUserTokens;
    it('Should allow login for only CORRECT details of an Admin user', (done) => {
      client.post('/users/login')
        .send({
          email: adminUser.email,
          password: adminUser.password
        })
        .end((error, response) => {
          adminUserTokens = response.body.token;
          expect(response.body).to.have.property('token');
          done();
        });
    });
    it('should be able to fetch all the users in the database', (done) => {
      client.get('/users')
        .set({ 'x-access-token': adminUserTokens })
        .send(testData.adminUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
    it('should not authenticate for invalid credentials', (done) => {
      client.post('/users/login')
        .send(testData.regularUser5)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
  });
  describe('logout', () => {
    it('should be able to logout users successfully', (done) => {
      client.post('/users/logout')
        .end((error, response) => {
          expect(response.body.success).to.equal(true);
          done();
        });
    });
  });
});
