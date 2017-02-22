 /* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/spec.helper';

const expect = chai.expect;
const client = supertest.agent(app);

describe('Search', () => {
  it('', (done) => {
    expect(true).to.equal(true);
    done();
  });
});
