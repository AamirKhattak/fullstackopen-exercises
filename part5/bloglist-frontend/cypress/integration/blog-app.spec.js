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
});
