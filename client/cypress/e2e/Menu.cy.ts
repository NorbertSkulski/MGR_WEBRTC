describe('Menu spec', () => {
     
    it('Open Kontact', () => {
      cy.visit("/");
        cy.get('#login').type("nskulski").should("have.value", "nskulski");
        cy.get('#password').type("admin").should("have.value", "admin");
        cy.contains("Logowanie").click();
        cy.contains("Norbert").should('exist',{timeout:10000});
        cy.contains("Zaproszenia").should('exist',{timeout:10000});
        cy.contains("Kontakty").should('exist',{timeout:10000}).click();
        cy.get('.ContentArea').should('exist');
        cy.get('.ContentArea').contains("Kontakty").should('exist');;
    })

    it('Open Profile', () => {
        cy.visit("/");
        cy.get('#login').type("nskulski").should("have.value", "nskulski");
        cy.get('#password').type("admin").should("have.value", "admin");
        cy.contains("Logowanie").click();
        cy.contains("Norbert").should('exist',{timeout:10000});
        cy.contains("Zaproszenia").should('exist',{timeout:10000});
        cy.contains("Profil").should('exist',{timeout:10000}).click();
        cy.get('.ContentArea').should('exist');
        cy.get('.ContentArea').contains("Profil").should('exist');
      })
});