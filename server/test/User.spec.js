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
    it('should return a status code of 201 when a regular user has beesn successfully created',
      (done) => {
        client.post('/users')
          .send(regularUser)
          .end((error, response) => {
            expect(response.status).to.equal(201);
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
    it(`Should return a TOKEN 
      if a Regular User is successfully logged in`,
      (done) => {
        client.post('/users/login')
          .send(testData.regularUser1)
          .end((error, response) => {
            // console.log(response);
            expect(response.body).to.have.property('token');
            done();
          });
      });
  });

  describe('Admin User', () => {
    it(`Should return http code 201 
      if an Admin User is successfully created`,
      (done) => {
        client.post('/users')
          .send(testData.adminUser)
          .end((error, response) => {
            console.log(response);
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
    it('Should allow login for correct credentials',
      (done) => {
        client.post('/users/login')
          .send(testData.regularUser1)
          .end((error, response) => {
            // console.log(response);
            expect(response.body).to.have.property('token');
            done();
          });
      });
  });

  // describe('login', () => {
  //   const adminUser = testData.adminUser;

  // });
});