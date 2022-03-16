const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper_blogs");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("blog-api", () => {
  test("returns correct amount of blog posts in JSON format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.map((blog) => expect(blog.id).toBeDefined());
  });

  test("HTTP POST request to the /api/blogs url successfully creates a new blog post & returns the desired object", async () => {
    const newBlog = {
      title: "fullstackopen-part4",
      author: "Uni of H",
      url: "https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
      likes: 120,
    };

    const response = await api.post("/api/blogs").send(newBlog);
    const savedBlog = response.body;
    delete savedBlog.id;

    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);
    expect(savedBlog).toEqual(newBlog);
  });

  test("if the likes property is missing from the request, it will default to the value 0", async () => {
    const newBlog = {
      title: "fullstackopen-part4(withoutlikes)",
      author: "Uni of H",
      url: "https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
    };

    const response = await api.post("/api/blogs").send(newBlog);
    const savedBlog = response.body;
    delete savedBlog.id;

    expect({ likes: savedBlog.likes }).toEqual({ likes: 0 });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
