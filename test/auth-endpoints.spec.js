const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Auth Endpoints', function() {
  let db

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/authentication/login`, () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers,
      )
    )

    const requiredFields = ['user_name', 'user_password']
    
    requiredFields.forEach(field => {
      const loginAttemptBody = {
        user_name: testUser.user_name,
        user_password: testUser.user_password,
      }

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field]

        return supertest(app)
          .post('/api/authentication/login')
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })

      it(`responds 400 'invalid user_name or password' when bad user_name`, () => {
        const userInvalidUser = { user_name: 'user-not', user_password: 'existy' }
        return supertest(app)
          .post('/api/authentication/login')
          .send(userInvalidUser)
          .expect(400, { error: `Incorrect username or password` })
      })

      it(`responds 400 'invalid user_name or password' when bad password`, () => {
        const userInvalidUser = { user_name: testUser.user_name, user_password: 'incorrect' }
        return supertest(app)
          .post('/api/authentication/login')
          .send(userInvalidUser)
          .expect(400, { error: `Incorrect username or password` })
      })

      it(`Responds with 200 and JWT authorization token using a secret when valid credentials`, () => {

        return supertest(app)
          .post('/api/authentication/login')
          .send(testUsers[0])
          .expect(200)
      })
    })
  })
})