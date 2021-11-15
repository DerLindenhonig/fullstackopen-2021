const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenCreator = async () => {
    const users = await User.find({})
    const userForToken = {
        username: users[0].username,
        id: users[0]._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    return 'bearer ' + token
}

module.exports = {
    tokenCreator
}