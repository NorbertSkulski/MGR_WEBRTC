describe('Login spec', () => {
  it('Test form', () => {
    cy.visit("/");
    cy.contains("Logowanie").should("exist");;
    cy.contains("Rejestracja").should("exist");;
    cy.get('#LoginForm').should("exist");
    cy.contains("pole wymagane").should("not.exist");
    cy.contains("Logowanie").click();
    cy.contains("pole wymagane").should("exist");
  })

  it('Test login', () => {
    cy.visit("/");
    cy.get('#login').type("nskulski").should("have.value", "nskulski");
    cy.get('#password').type("admin").should("have.value", "admin");
    cy.contains("Logowanie").click();
    cy.contains("Norbert").should('exist',{timeout:10000});
    cy.contains("Zaproszenia").should('exist',{timeout:10000});
  })
})