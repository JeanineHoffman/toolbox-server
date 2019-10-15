const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const { makeToolsArray, makeToolsArrayWithJoin } = require('../test/tools.fixtures');

describe('Tools Endpoints', function () {
  let db

  const testUsers = helpers.makeUsersArray();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db)
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('tools').del());

  afterEach('cleanup', () => db('tools').del());

  describe('GET /api/tools', () => {
    context('Given no tools', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/tools')
          .expect(200, [])
      })
    });

    context('Given there are tools in the database', () => {
      const testTools = makeToolsArray();
      const testToolsWithJoin = makeToolsArrayWithJoin();

      beforeEach('insert tools', () => {
        return db
          .into('tools')
          .insert(testTools)
      });

      it('responds with 200 and all of the tools', () => {
        return supertest(app)
          .get('/api/tools')
          .expect(200, testToolsWithJoin )
      })
    })
  });

  describe('GET /api/tools/:tool_id', () => {
    context(`Given no tools`, () => {
      it(`responds with 404`, () => {
        const toolId = 123456;
        return supertest(app)
          .get(`/api/tools/${toolId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: { message: `Tool does not exist` } })
      })
    });

    context('Given there are tools in the database', () => {
      const testTool = makeToolsArray();

      beforeEach('insert tools', () => {
        return db
          .into('tools')
          .insert(testTool)
      });

      it('responds with 200 and the specified tool', () => {
        const toolId = 1;
        const expectedTool= testTool[toolId - 1]
        return supertest(app)
          .get(`/api/tools/${toolId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedTool)
      });
    });
  });
});
