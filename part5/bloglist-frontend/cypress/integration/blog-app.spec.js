// blog-app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const blogs = [
  {
    title: "1st blog cypress",
    author: "cypress-bot",
    url: "localhost.com/123",
    likes: 10,
  },
  {
    title: "2nd blog cypress",
    author: "cypress-bot",
    url: "localhost.com/123",
    likes: 2,
  },
  {
    title: "3rd blog cypress",
    author: "cypress-bot",
    url: "localhost.com/123",
    likes: 3,
  },
  {
    title: "4rd blog cypress",
    author: "cypress-bot",
    url: "localhost.com/123",
    likes: 5,
  },
  {
    title: "5rd blog cypress",
    author: "cypress-bot",
    url: "localhost.com/123",
    likes: 5,
  },
];

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    //create a user to backend
    const user = {
      name: "Muhammad Aamir Javid",
      username: "aamirKhattak",
      password: "aamirKhattak",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login into application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("aamirKhattak");
      cy.get("#password").type("aamirKhattak");
      cy.get("#login-btn").click();

      cy.contains("Muhammad Aamir Javid logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("aamirKhattak");
      cy.get("#password").type("test123");
      cy.get("#login-btn").click();

      cy.get(".error").contains("wrong username or password");

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Muhammad Aamir Javid logged in");
    });
  });

  describe("When logged in", function () {
    //excercise 5.19
    beforeEach(function () {
      // log in user here
      cy.login({ username: "aamirKhattak", password: "aamirKhattak" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("introduction to cypress testing");
      cy.get("#author").type("cypress-bot");
      cy.get("#url").type("cypress.com");
      cy.get("#create-btn").click();

      cy.get(".success").should(
        "contain",
        "a new blog introduction to cypress testing by cypress-bot added."
      );
      cy.get(".blogStyle").should(
        "contain",
        "introduction to cypress testing cypress-botview"
      );
    });
  });

  describe("and a note exists", function () {
    beforeEach(function () {
      // log in user here
      cy.login({ username: "aamirKhattak", password: "aamirKhattak" });
    });

    beforeEach(function () {
      blogs.forEach((blog) => cy.createBlog(blog));
    });

    it("it can be liked(5.20)", () => {
      // const blogForTesting = blogs[2];
      blogs.forEach((blogForTesting) => {
        cy.contains(blogForTesting.title)
          .as("concernedBlog")
          .contains("view")
          .click();

        let likesAtStart = blogForTesting.likes,
          likesAtEnd = likesAtStart + 1;

        cy.get("@concernedBlog").get(".likes>span");

        cy.get("@concernedBlog")
          .get(".likes>button")
          .as("concernedBlogLikesBtn");

        cy.get("@concernedBlogLikesBtn").click();

        cy.contains(blogForTesting.title)
          .parent()
          .get(".likes>span")
          .contains(likesAtEnd);

        cy.contains(blogForTesting.title).parent().contains("hide").click();
      });
    });

    it("the user who created a blog can delete it.(5.21)", () => {
      const blogForTesting = blogs[2];
      // blogs.forEach((blogForTesting) => {
      cy.contains(blogForTesting.title)
        .as("concernedBlog")
        .contains("view")
        .click();

      cy.get("@concernedBlog").contains("remove").click();

      // cy.get(blogForTesting.title).should("not.exist");
      cy.get("html").should("not.contain", blogForTesting.title);
    });

    it("blogs are ordered according to likes with the blog with the most likes being first(5.22)", () => {
      // blogs.forEach((blogForTesting) => {
      const likes = [];
      blogs.forEach((blogForTesting) => {
        cy.contains(blogForTesting.title)
          .as("concernedBlog")
          .contains("view")
          .click();
        cy.get("@concernedBlog").get(".likes>button").click();
        cy.wait(500);

        cy.contains(blogForTesting.title).parent().contains("hide").click();
      });

      cy.get(".blogStyle").eq(0).should("contain", blogs[0].title);
      cy.get(".blogStyle").eq(1).should("contain", blogs[3].title);
      cy.get(".blogStyle").eq(2).should("contain", blogs[4].title);
      cy.get(".blogStyle").eq(3).should("contain", blogs[2].title);
      cy.get(".blogStyle").eq(4).should("contain", blogs[1].title);
    });
  });
});

/**
 * TODO: 5.21, 5.22
 */
