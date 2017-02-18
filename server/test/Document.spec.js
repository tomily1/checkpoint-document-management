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
  let regularUserToken, regularUserId, adminUserToken, adminUserId,
    regularUser2Id, regularUser2Token;
  before((done) => {
    client.post('/users')
      .send(adminUser)
      .end((error, response) => {
        adminUserToken = response.body.token;
        adminUserId = response.body.id;
        client.post('/users')
          .send(regularUser)
          .end((error1, response1) => {
            regularUserToken = response1.body.token;
            regularUserId = response1.body.id;
            client.post('/users')
              .send(regularUser2)
              .end((error2, response2) => {
                regularUser2Token = response2.body.token;
                regularUser2Id = response2.body.id;
                done();
              });
          });
      });
  });

  describe('Post', () => {
    it('should create a new document',
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
              .end((error, response) => {
                expect(response.status).to.equal(201);
                done();
              });
          });
      });
  });
  describe('Get all documents', () => {
    it('Should only be accessed by the admin only', (done) => {
      client.get('/documents')
        .set({ 'x-access-token': adminUserToken })
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
  });
});
