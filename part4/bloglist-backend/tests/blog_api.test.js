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
      console.log(response);
      response.body.map( blog => expect(blog.id).toBeDefined())
    })
});

afterAll(() => {
    mongoose
        .connection
        .close();
});
