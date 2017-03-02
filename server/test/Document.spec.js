 /* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
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
    it('Should return response status 404 if the database is Empty ', (done) => {
      client.get('/documents')
        .set({ 'x-access-token': adminUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(404);
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
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('Should return error with status code 400 when the inputted document fields are not valid', (done) => {
      client.post('/documents')
        .send(testData.documentNotValid)
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(400);
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
    it('should not authorize access to public documents if user has an invalid token', (done) => {
      client.get('/documents/2')
        .set({ 'x-access-token': 'regularUserToken' })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('should not authorize access to public documents if user has no token', (done) => {
      client.get('/documents/2')
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('Should return status code of 404 for document not found', (done) => {
      client.get('/documents/200')
        .set({ 'x-access-token': regularUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(404);
          client.get('/documents/4')
            .set({ 'x-access-token': regularUserToken })
            .end((error1, response1) => {
              expect(response1.status).to.equal(200);
              done();
            });
        });
    });

    it('Other User cannot access document that has access level of private', (done) => {
      client.get('/documents/4')
        .set({ 'x-access-token': regularUser2Token })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('Should give admin unrestricted access to get documents', (done) => {
      client.get('/documents/4')
        .set({ 'x-access-token': adminUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          client.get('/documents/2')
            .set({ 'x-access-token': adminUserToken })
            .end((error1, response1) => {
              expect(response1.status).to.equal(200);
              done();
            });
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
          expect(response.status).to.equal(401);
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
          expect(response.status).to.equal(401);
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
          expect(response.status).to.equal(200);
          done();
        });
    });
    it('Admin should be able to get all the documents belonging to a particular user', (done) => {
      client.post('/documents')
        .set({ 'x-access-token': regularUserToken })
        .send(testData.documentPublic1)
        .end(() => {
          client.get('/users/2/documents')
            .set({ 'x-access-token': adminUserToken })
            .end((error1, response1) => {
              expect(response1.status).to.equal(200);
              done();
            });
        });
    });
    it('Regular Users should be able to access public documents only', (done) => {
      client.get('/users/2/documents')
        .set({ 'x-access-token': regularUser2Token })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body[0].access).to.equal('public');
          done();
        });
    });
  });
});
