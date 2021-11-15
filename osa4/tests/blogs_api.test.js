const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('../utils/test_helper')

// Alusta tietokanta ennen jokaisen testin suoritusta (funktiossa beforeEach).
const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('HTTP GET request testing', () => {
// Testi tekee HTTP GET -pyynnön osoitteeseen api/blogs ja varmistaa, että pyyntöön vastataan statuskoodilla 200.
// Testaa, että data palautetaan oikeassa muodossa, eli Content-Type:n arvo on application/json.
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('right amount of blogs is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

// Testi varmistaa, että palautettujen blogien identifioivan kentän tulee olla nimeltään id.
// Oletusarvoisestihan tietokantaan talletettujen olioiden tunnistekenttä on _id.
    test('right property of the blog is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
        expect(response.body[0]._id).toBe(undefined)
    })
})

describe('HTTP POST request testing', () => {
    // Testi varmistaa, että blogien määrä kasvaa yhdellä, sekä että lisätyn blogin nimi täsmää.
    test('adding a new blog', async () => {
        const newBlog = {
            _id: "5a422b3a198aa670234d17f9",
            title: "mmiisas",
            author: "Miisa Rotola-Pukkila",
            url: "https://www.youtube.com/user/mmiisas",
            likes: 45,
            __v: 0
        }

        const bearerToken = await testHelper.tokenCreator()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', bearerToken)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await Blog.find({})
        const titles = response.map(r => r.title)

        expect(response.length).toBe(initialBlogs.length + 1)
        expect(titles).toContain('mmiisas')
    })

    test('if autorization token is missing, returns 401', async () => {
        const users = await User.find({})

        const newBlog = {
            title: "new blog",
            author: "kirjoittaja",
            url: "https://www.newblog",
            likes: 2,
            user: users[0]._id
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('if likes property is missing, it gets default value 0', async () => {
        const newBlog = {
            title: 'Blog without likes',
            author: 'New author',
            url: 'http://www.newblogurl.html'
        }

        const bearerToken = await testHelper.tokenCreator()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', bearerToken)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const latestBlog = response.body[response.body.length-1]

        expect(latestBlog.likes).toBe(0)
    })

    // Testi varmistaa, että jos uusi blogi ei sisällä kenttiä title ja url, pyyntöön vastataan statuskoodilla 400 Bad Request.
    test('if title is empty, returns 400 Bad request', async () => {
        const newBlog = {
            author: 'New author',
            url: 'http://www.newblogurl.html',
            likes: 3
        }

        const bearerToken = await testHelper.tokenCreator()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', bearerToken)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('if url is empty, returns 400 Bad request', async () => {
        const newBlog = {
            title: 'New blog without url',
            author: 'New author',
            likes: 3
        }

        const bearerToken = await testHelper.tokenCreator()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', bearerToken)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })
})

// fails after adding decodedToken
describe('HTTP DELETE request testing', () => {
    test('blog deliting', async () => {
        const users = await User.find({})

        const deleteBlog = new Blog({
            title: 'Blog for deleting',
            author: 'New author',
            url: 'http://www.newblogurl.html',
            likes: 3,
            user: users[0]._id
        })

        await deleteBlog.save()

        const bearerToken = await testHelper.tokenCreator()

        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .set('Authorization', bearerToken)
            .expect(204)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })
})

describe('HTTP PUT request testing', () => {
    test('blog updating', async () => {
        const responseBefore = await api.get('/api/blogs')
        const editBlog = responseBefore.body[0]

        await api
            .put(`/api/blogs/${editBlog.id}`)
            .send({likes: 99})

        const responseAfter = await api.get('/api/blogs')
        expect(responseAfter.body[0].likes).toBe(99)
    })
})

afterAll(() => {
    mongoose.connection.close()
})