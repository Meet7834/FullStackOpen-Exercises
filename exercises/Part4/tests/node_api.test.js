const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Blogs API tests:', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('new posted blogs are increasing', async () => {

    const newBlog = {
      title: 'Not Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDb()
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogs = blogsAtTheEnd.map(blog => blog.title)
    expect(blogs).toContain('Not Type wars')
  })

  test('is ID written in `id` field insted of `_id`', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0]._id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})