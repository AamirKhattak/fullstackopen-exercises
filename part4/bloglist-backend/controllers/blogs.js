const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    blog ? response.json(blog) : response.status(404).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const { title, author, url, likes } = request.body;

  if (!(title && url)) return response.status(400).end();

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes ? likes : 0,
  });

  try {
    const savedblog = await blog.save();
    if (savedblog) response.json(savedblog);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  
  const {likes} = request.body; 
  if(!likes) return response.status(400).end();

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {likes: 100}, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
