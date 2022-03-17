const userRouter = require('express').Router()
const User = require('../models/blog')

userRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await User.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

userRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await User.findById(request.params.id)
    blog ? response.json(blog) : response.status(404).end()
  } catch (exception) {
    next(exception)
  }
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body
  const { title, author, url, likes } = request.body

  if (!(title && url)) return response.status(400).end()

  const blog = new User({
    title: title,
    author: author,
    url: url,
    likes: likes ? likes : 0,
  })

  try {
    const savedblog = await blog.save()
    if (savedblog) response.json(savedblog)
  } catch (exception) {
    next(exception)
  }
})

userRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

userRouter.put('/:id', async (request, response, next) => {

  const { likes } = request.body
  if(!likes) return response.status(400).end()

  try {
    const updatedBlog = await User.findByIdAndUpdate(request.params.id, { likes: 100 }, {
      new: true,
    })
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = userRouter
