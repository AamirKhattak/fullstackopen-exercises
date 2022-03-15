const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");


const api = supertest(app);

const Blog = require("../models/blog")
const helper = require("./test_helper_blogs")

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


describe("blog-api", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);
});

afterAll(() => {
  mongoose.connection.close();
});
