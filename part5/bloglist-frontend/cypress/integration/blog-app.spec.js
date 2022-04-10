// blog-app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

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

  describe.only("When logged in", function () {
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

      cy.contains(
        "a new blog introduction to cypress testing by cypress-bot added."
      );
      cy.contains("introduction to cypress testing cypress-botview");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "1st blog cypress",
          author: "cypress-bot",
          url: "localhost.com/123",
          likes: 0,
        });
        cy.createBlog({
          title: "2nd blog cypress",
          author: "cypress-bot",
          url: "localhost.com/123",
          likes: 100,
        });
        cy.createBlog({
          title: "3rd blog cypress",
          author: "cypress-bot",
          url: "localhost.com/123",
          likes: 0,
        });
      });
      it("it can be liked(5.20)", async () => {
        cy.contains("2nd blog cypress cypress-bot")
          .as("concernedBlog")
          .find("button")
          .click();

        let likesAtStart = -1,
          likesAtEnd = -1;


        cy.get("@concernedBlog")
          .get(".likes>span")
          .then((likes) => {
            likesAtStart = likes.text();
          });
        cy.get("@concernedBlog")
          .get(".likes>button")
          .as("concernedBlogLikesBtn");

        cy.get("@concernedBlogLikesBtn").click();

        cy.contains("2nd blog cypress")
          .parent()
          .get(".likes>span")
          .then((likes) => {
            likesAtEnd = likes.text();
            console.log(likesAtStart, likesAtEnd);
          });
      });
    });
  });
});

/**
 * TODO: 5.20 partialiy completed, comparision of likes before and after pending
 * TODO: 5.21, 5.22 
 */