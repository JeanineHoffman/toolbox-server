const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      first_name: 'Test userfirst 1',
      last_name: 'Test userlast 1',
      email: 'testuser@email.com',
      user_password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      first_name: 'Test userfirst 2',
      last_name: 'Test userlast 2',
      email: 'TU2@gmail.com',
      user_password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      first_name: 'Test userfirst 3',
      last_name: 'Test userlast 3',
      email: 'TU3@email.com',
      user_password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      first_name: 'Test userfirst 4',
      last_name: 'Test userlast 4',
      email: 'TU4@gmail.com',
      user_password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeToolsArray() {
  return [
    {
      id: 1,
      tool_name: 'First test hammer!',
      tool_category: 'hammers',
      tool_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      tool_img_filename: 'http://placehold.it/500x500',
      tool_img_alt: 'alt image 1',
    },
    {
      id: 2,
      tool_name: 'First test screwdriver!',
      tool_category: 'hand tool',
      tool_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      tool_img_filename: 'http://placehold.it/500x500',
      tool_img_alt: 'alt image 2',
    },
    {
      id: 3,
      tool_name: 'First test saw!',
      tool_category: 'saw',
      tool_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      tool_img_filename: 'http://placehold.it/500x500',
      tool_img_alt: 'alt image 3',
    },
    {
      id: 4,
      tool_name: 'First test compound miter saw!',
      tool_category: 'saw',
      tool_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      tool_img_filename: 'http://placehold.it/500x500',
      tool_img_alt: 'alt image 4',
    },
  ]
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    user_password: bcrypt.hashSync(user.user_password, 1)
  }))
  return db.into('users').insert(preppedUsers)
}

function seedToolsTables(db, tools) {
  // use a transcation to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await trx.into('tools').insert(tools)
  })
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      tools
      RESTART IDENTITY CASCADE`
  )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}


module.exports = {
  makeUsersArray,
  makeToolsArray,
  seedUsers,
  seedToolsTables,
  cleanTables,
  makeAuthHeader,
}