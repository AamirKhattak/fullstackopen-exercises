const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper_blogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  })
})

describe('updation of a blog', () => {
  test('updated blog has correct number of updated likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 100 })
    const updatedBlog = response.body
    expect(updatedBlog.likes).toBe(100)
  })

})

describe('Get requests', () => {
  test('returns correct amount of blog posts in JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 10000)

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map((blog) => expect(blog.id).toBeDefined())
  })
})

describe('POST requests', () => {
  test('HTTP POST request to the /api/blogs url successfully creates a new blog post & returns the desired object', async () => {
    const newBlog = {
      title: 'fullstackopen-part4',
      author: 'Uni of H',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
      likes: 120,
    }

    const response = await api.post('/api/blogs').send(newBlog)
    const savedBlog = response.body
    delete savedBlog.id

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(savedBlog).toEqual(newBlog)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'fullstackopen-part4(withoutlikes)',
      author: 'Uni of H',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
    }

    const response = await api.post('/api/blogs').send(newBlog)
    const savedBlog = response.body
    delete savedBlog.id

    expect({ likes: savedBlog.likes }).toEqual({ likes: 0 })
  })

  test('if the title and url properties are missing from the request data, the backend responds with bad request ', async () => {
    const newBlog = {
      title: 'fullstackopen-part4(withoutlikes)',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
