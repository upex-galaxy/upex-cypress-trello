const { Cy } = require('../../../../../support/POM/example.Page')

describe('US Example | Test Page Object Model', () => {
    beforeEach(() => {
        cy.visit("https://demo.testim.io/")
        cy.contains("Log in").click()
        cy.url().should("contain","login")
    });
    it('test the login page', () => {
        Cy.enterUsername("UPEX")
        Cy.enterPassword("123456")
        Cy.submit()
    });
});