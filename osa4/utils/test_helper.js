const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const testToken = async () => {
  const users = await User.find({})
  const firstUser = _.head(users)

  const user = {
    username: firstUser.username,
    id: firstUser.id
  }
  return jwt.sign(user, process.env.SECRET)
}

module.exports = {testToken}