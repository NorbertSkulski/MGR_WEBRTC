import { randomBytes } from "crypto";



describe('Registration spec', () => {

    before(()=>{
        const newUserData = {
            email: `${randomBytes(7).toString('hex')}@test.com`,
            name: "TestUser",
            lastName: "Testowy",
            login: randomBytes(7).toString('hex'),
            password: "testPassword"         
        }

        Cypress.env("newUserData",newUserData);
    })
    
    
    beforeEach(()=>{
        cy.visit("/");
    })

    it('Test registration modal', () => {
      cy.contains("Logowanie").should("exist");;
      cy.contains("Rejestracja").should("exist");;
      cy.get('#LoginForm').should("exist");
      cy.contains("pole wymagane").should("not.exist");
      cy.contains("Logowanie").click();
      cy.contains("pole wymagane").should("exist");
    })
  
    it('Test registration', () => {
        const newUserData = Cypress.env('newUserData');
        cy.contains("Rejestracja").should("exist");
        cy.contains("Rejestracja").click();
        cy.get('.ModalBody').should("exist");
        cy.contains("pole wymagane").should("not.exist");
        cy.contains("Zarejestruj").should("exist"); 
        cy.contains("Zarejestruj").click();     
        cy.contains("pole wymagane").should("exist");
        for(let key in newUserData){
            cy.get('.ModalBody').find(`#${key}`).type(newUserData[key]).should("have.value",newUserData[key])
        }
        cy.contains("pole wymagane").should("not.exist");
        cy.contains("Zarejestruj").click();     
        cy.get('.notification').contains("Zarejestrowano pomyślnie!").should("exist",{timeout:10000}); 
        cy.wait(5000);       
    })

    it('New User Login',()=>{
        const newUserData = Cypress.env('newUserData');
        cy.get('#login').type(newUserData.login).should("have.value", newUserData.login);
        cy.get('#password').type(newUserData.password).should("have.value", newUserData.password);
        cy.contains("Logowanie").click();
        cy.contains(newUserData.name,{timeout:10000}).should('exist',{timeout:10000});
        cy.contains("Zaproszenia").should('exist',{timeout:10000});
    })
  })