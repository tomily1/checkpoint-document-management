 /* eslint-disable import/no-extraneous-dependencies */
 /* eslint-disable import/no-unresolved */
import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/spec.helper';

const expect = chai.expect;
const client = supertest.agent(app);

const adminUser = testData.adminUserForDocumentTest;
const regularUser = testData.regularUserForDocumentTest;
const regularUser2 = testData.regularUserForDocumentTest2;

describe('Documents:', () => {
  // lets create neccessary users for these tests and get their details
  let regularUserToken, adminUserToken, regularUser2Token;
  before((done) => {
    client.post('/users')
      .send(adminUser)
      .end((error, response) => {
        adminUserToken = response.body.token;
        client.post('/users')
          .send(regularUser)
          .end((error1, response1) => {
            regularUserToken = response1.body.token;
            client.post('/users')
              .send(regularUser2)
              .end((error2, response2) => {
                regularUser2Token = response2.body.token;
                done();
              });
          });
      });
  });

  describe('POST: ==>\n', () => {
    it('Should return response status 201 even if the database is Empty ', (done) => {
      client.get('/documents')
        .set({ 'x-access-token': adminUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(302);
          done();
        });
    });
    it('Admin should be able to create a new document', (done) => {
      client.post('/documents')
        .send(testData.documentPublic2)
        .set({ 'x-access-token': adminUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
    it('User should create a new document',
      (done) => {
        const document = testData.documentPublic1;
        const document2 = testData.documentRole3;
        client.post('/documents')
          .send(document)
          .set({ 'x-access-token': regularUserToken })
          .end((error, response) => {
            expect(response.status).to.equal(201);
            client.post('/documents')
              .send(document2)
              .set({ 'x-access-token': regularUserToken })
              .end((error1, response1) => {
                expect(response1.status).to.equal(201);
                done();
              });
          });
      });
    it('User should not be able to create documents if document fields are not inputted properly', (done) => {
      client.post('/documents')
        .send(testData.documentInvalid)
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
    it('Should return error with status code 401 when the inputted document fields are not valid', (done) => {
      client.post('/documents')
        .send(testData.documentNotValid)
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
  });
  describe('GET: ==>\n', () => {
    it('should be able to get documents by id', (done) => {
      client.get('/documents/2')
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          client.post('/documents')
            .send(testData.documentPrivate2)
            .set({ 'x-access-token': regularUserToken })
            .end(() => {
              done();
            });
        });
    });
    it('Other User cannot access document that has access level of private', (done) => {
      client.get('/documents/4')
        .set({ 'x-access-token': regularUser2Token })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });
  });
  describe('Update: ==>\n', () => {
    it('User should be able to update their document information', (done) => {
      client.put('/documents/4')
        .set({ 'x-access-token': regularUserToken })
        .send(testData.documentPrivate3)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
    it('User without access should not be able to update other users documents', (done) => {
      client.put('/documents/4')
        .set({ 'x-access-token': regularUser2Token })
        .send(testData.documentPrivate3)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });
    it('Should not authorize update and return status code 401 for invalid request parameter', (done) => {
      client.put('/documents/w')
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('Should not authorize update and return status code 401 for invalid update parameters', (done) => {
      client.put('/documents/4')
        .send(testData.documentNotValid)
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
  });
  describe('DELETE: ==>\n', () => {
    it('Users should be able to delete their own documents', (done) => {
      client.delete('/documents/2')
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
    it('Users cannot delete documents they do not own', (done) => {
      client.delete('/documents/1')
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });
    it('Should not authorize delete and return status code 401 for invalid request parameter ', (done) => {
      client.delete('/documents/w')
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
  });

  describe('GET documents by id :==>\n', () => {
    it('All documents Should only be accessed by the admin only', (done) => {
      client.get('/documents')
        .set({ 'x-access-token': adminUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(302);
          done();
        });
    });
  });
});
