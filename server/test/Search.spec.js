 /* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
/* eslint no-unused-expressions: 0 */

import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/spec.helper';

const expect = chai.expect;
const client = supertest.agent(app);

let adminUserToken;
const testDocument = testData.documentPublic1;
describe('Search', () => {
  const adminUser = testData.adminUserSearch;
  before((done) => {
    client.post('/users')
    .send(adminUser)
    .end((error, response) => {
      adminUserToken = response.body.token;
      client.post('/documents')
      .set({ 'x-access-token': adminUserToken })
      .send(testDocument)
      .end(() => {
        done();
      });
    });
  });

  it('should return documents limited by a specified number', (done) => {
    const searchLimit = 3;
    client.get(`/documents/?limit=${searchLimit}`)
    .set({ 'x-access-token': adminUserToken })
    .end((error, response) => {
      expect(response.status).to.equal(200);
      expect(response.body.results.length).to.equal(searchLimit);
      done();
    });
  });

  it('should return documents ordered by published date in descending order',
  (done) => {
    client.get('/documents/')
    .set({ 'x-access-token': adminUserToken })
    .end((error, response) => {
      expect(response.status).to.equal(200);
      let oldestDate = Date.now();
      response.body.results.forEach((document) => {
        const createdDate = Date.parse(document.createdAt);
        expect(createdDate).to.be.lte(oldestDate);
        oldestDate = createdDate;
      });
      done();
    });
  });

  it('should return only documents that match a specific query', (done) => {
    const searchText = testDocument.title.split(/\s/)[0];
    client.get(`/documents/?search=${searchText}`)
    .set({ 'x-access-token': adminUserToken })
    .end((error, response) => {
      expect(response.status).to.equal(200);
      response.body.results.forEach((document) => {
        expect(document.title).to.contain(searchText) ||
        expect(document.content).to.contain(searchText);
      });
      done();
    });
  });
  it('should return documents limited by a specified number with result containing the search terms', (done) => {
    const searchLimit = 3;
    const query = 'a';
    client.get(`/documents/?search=${query}&limit=${searchLimit}`)
    .set({ 'x-access-token': adminUserToken })
    .end((error, response) => {
      expect(response.status).to.equal(200);
      response.body.results.forEach((document) => {
        expect(document.title).to.contain(query) || expect(document.content).to.contain(query);
      });
      expect(response.body.results.length).to.equal(searchLimit);
      done();
    });
  });
  it('should return documents limited by a specified number with result containing the search terms', (done) => {
    const searchLimit = 3;
    const query = 's' || 'i';
    client.post('/users')
      .send(testData.regularUser5)
      .end((error1, response1) => {
        const regularToken5 = response1.body.token;
        client.get(`/documents/?search=${query}&limit=${searchLimit}`)
          .set({ 'x-access-token': regularToken5 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            response.body.results.forEach((document) => {
              expect(document.content).to.contain(query);
            });
            expect(response.body.results.length).to.equal(searchLimit);
            done();
          });
      });
  });
});
