export class HomePage{
    constructor(){
        this.loginbutton= 'a[class="Buttonsstyles__Button-sc-1jwidxo-0 kTwZBr"]'
    }

    LoginButton(){
        cy.get(this.loginbutton).contains('Log in').click();
    }
}