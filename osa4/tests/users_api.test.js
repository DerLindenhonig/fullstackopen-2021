const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const initialUser = {
    username: 'username',
    passwordHash: 'password',
    name: 'name'
}

beforeEach(async () => {
    await User.deleteMany({})

    const userObject = new User(initialUser)
    await userObject.save()
})

describe('Adding new user', () => {
    test('POST new user with status code 200', async () => {
        const usersBefore = await api.get('/api/users')

        const newUser = {
            username: 'newuser',
            name: 'New User',
            password: 'salasana'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const usersAfter = await api.get('/api/users')
        expect(usersBefore.body.length + 1).toBe(usersAfter.body.length)
        expect(usersAfter.body[usersAfter.body.length-1].username).toBe(newUser.username)
    })

    // ei saa lisätä käyttäjää, jos salasana puuttuu
    test('if password missing, returns 400', async () => {
        const usersBefore = await api.get('/api/users')

        const newUser = {
            username: 'newuser',
            name: 'New User'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAfter = await api.get('/api/users')
        expect(usersBefore.body.length).toBe(usersAfter.body.length)
    })

    // ei saa lisätä käyttäjää, jos salasana sisältää < 3 kirjainta
    test('if password < 3 letters, returns 400', async () => {
        const usersBefore = await api.get('/api/users')

        const newUser = {
            username: 'newuser',
            name: 'New User',
            password: 'lo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAfter = await api.get('/api/users')
        expect(usersBefore.body.length).toBe(usersAfter.body.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
