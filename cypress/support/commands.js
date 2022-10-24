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
require('@4tw/cypress-drag-drop')

Cypress.Commands.add("addToSticker", (imagen, top, left, zIndex) => {
    let idCardGlobal, idStickerGlobal
    cy.fixture("DOM/Stickers/AddSticker.Page").then((the) => {
        const cardRandomName = "Paola"
        cy.api(
            {
                method: 'POST',
                url: `https://api.trello.com/1/cards?idList=${the.idList}&name=${cardRandomName}&key=${the.key}&token=${the.token}`
            })
            .then(( { body } ) => {
                const idCardA = body.id
                this.idCardGlobal = idCardA 
                cy.api(
                    {
                        method: 'POST',
                        url: `https://api.trello.com/1/cards/${idCardA}/stickers`,
                        qs: {
                            image: imagen,
                            top: top,
                            left: left,
                            zIndex: zIndex,
                            key: the.key,
                            token: the.token
                        }
                    })
            })
            .then(( { body } ) => {
                const idSticker1 = body.id
                this.idStickerGlobal = idSticker1 
                cy.api(
                    {
                        method: 'GET',
                        url: `https://api.trello.com/1/cards/${this.idCardGlobal}/stickers`,
                        qs: {
                            key: the.key,
                            token: the.token
                        }
                    })
 /*                    .its('body[0].id') preguntar porque esta assersion da error o undefined!
                    .should('eq', this.idStickerGlobal) */
                    .then(({ body }) => {
                    const idSticker = body[0].id
                    expect(idSticker).equal(this.idStickerGlobal)
                    })
            })
    })
})