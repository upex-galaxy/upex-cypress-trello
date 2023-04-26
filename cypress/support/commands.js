// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import 'cypress-file-upload';
import 'cypress-wait-until';
import '@4tw/cypress-drag-drop';
import 'cypress-downloadfile/lib/downloadFileCommand';

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('createList', (listName,number) => {
    cy.fixture('data/Archivarymover').then((the) =>{
      cy.api({
        method: "POST",
        url: the.url.CreateList,
        body: {
          name: listName,
          idBoard: the.idBoard,
          key: the.key,
          token: the.token
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.wrap(response.body.id).as(`idList${number}`);
        Cypress.env(`idList${number}`, response.body.id)
      })
  
    })
    ;
  })
  
  
  
  
Cypress.Commands.add('createCard', (cardName,number_idList,numberCard) => {
    cy.fixture('data/Archivarymover').then((the) =>{
    cy.api({
      method: "POST",
      url: the.url.CreateCard,
      body: {
        name: cardName,
        idList: Cypress.env(`idList${number_idList}`), 
        key: the.key,
        token: the.token
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.idList).to.eq(Cypress.env(`idList${number_idList}`));
      cy.wrap(response.body.id).as(`idCard${numberCard}`)
      Cypress.env(`idCard${numberCard}`, response.body.id);
    });
  
  }) 
  })