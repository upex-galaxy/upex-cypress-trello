export class LoginPage{
    constructor(){
        this.userInput= 'input[id="user"]' 
        this.login= 'input[id="login"]'
        this.userPass= '#password'
        this.submit= 'input[id="login-submit"]'
    }

    InputUser(){
        cy.get(this.userInput).type('ze.basszender@gmail.com')
    }
    Login(){
        cy.get(this.login).click();
    }
    InputPass(){
        cy.get('#password').type('Arioncete1122');
    }
}