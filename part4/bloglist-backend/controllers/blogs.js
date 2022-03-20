const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const logger = require('../utils/logger')

const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    blog ? response.json(blog) : response.status(404).end()
  } catch (exception) {
    next(exception)
  }
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  const { title, author, url, likes } = body
  if (!title || !url)
    return response
      .status(400)
      .json({ error: 'title or url is missing' })
      .end()

  const token = getTokenFrom(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const userId = decodedToken.id
    const user = await User.findById(userId)

    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes ? likes : 0,
      user: user.id,
    })

    const savedblog = await blog.save()

    user.blogs = user.blogs.concat(savedblog.id)
    await user.save()

    if (savedblog) response.json(savedblog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body
  if (!likes) return response.status(400).end()

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes: 100 },
      {
        new: true,
      }
    )
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
