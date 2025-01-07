import {} from "cypress";
describe("template spec", () => {
  it("signup the user", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="signupbutton"]').click();
    cy.get('[data-testid="usernameinput"]').type("cypress");
    cy.get('[data-testid="passwordinput"]').type("cypress");
    cy.get('[data-testid="passwordconfirminput"]').type("cypress");
    cy.get('[data-testid="signupconfirm"]').click();

    cy.get('[data-testid="hellomessage"]', { timeout: 2000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="hellomessage"]').should(
      "contain.text",
      "Hello, cypress"
    );
    cy.get('[data-testid="logoutbutton"]').click();
  });

  it("logs in the user", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="loginbutton"]').click();
    cy.get('[data-testid="login-username"]').type("cypress");
    cy.get('[data-testid="login-password"]').type("cypress");
    cy.get('[data-testid="loginsubmit"]').click();

    cy.get('[data-testid="hellomessage"]', { timeout: 2000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="hellomessage"]').should(
      "contain.text",
      "Hello, cypress"
    );
    cy.get('[data-testid="logoutbutton"]').click();
  });
});

