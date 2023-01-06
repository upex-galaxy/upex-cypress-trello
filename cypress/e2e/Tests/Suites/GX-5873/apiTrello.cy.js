/// <reference types="cypress" />

import { HomePage } from "@pages/GX-5873/HomePage";
import { LoginPage } from  "@pages/GX-5873/LoginPage"

describe('GX-5873| ✅{API} Trello | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero',()=>{
    
    let loginpage= new LoginPage();
    let homepage= new HomePage();
    let Trello;
    let cardID;
    before('Precondiciones',()=>{
        
        cy.fixture('DOM/Cards/apiTrello').then(data=>{
            Trello= data;
        })
    })

    it('GX-5874| TC1:  Validar que el usuario crea una card en una lista del tablero',()=>{
        cy.api({
            url: Trello.API.board,
            method: 'GET',
            qs:{
                key: Trello.key,
                token: Trello.token,
            }
        }).then(response=>{
            cy.log(response)
            let boardID= response.body[1].id;
            cy.log(boardID)
            cy.api({
                url: `${Trello.API.list}${boardID}/lists`,
                method: 'GET',
                qs:{
                    key: Trello.key,
                    token: Trello.token,
                }
            })
        }).then(response2=>{
            cy.log(response2);
            let listID= response2.body[0].id;
            cy.log(listID);
            cy.api({
                url: Trello.API.card,
                method: 'POST',
                qs:{
                    key: Trello.key,
                    token: Trello.token,
                    name: 'Nueva tarjeta',
                    idList: listID,
                    desc: 'Tarjeta creada con propositos de testing',
                    pos: 'bottom',
                }
            })
        }).then(respuesta=>{
            cy.log(respuesta);
            assert.equal(respuesta.status, 200)
            cardID= respuesta.body.id
        })
        
    })

    it('GX-5874| TC2:  Validar que el usuario modifica la informacion de una card',()=>{
        let boardID;
        let listID;
        cy.api({
            url: Trello.API.board,
            method: 'GET',
            qs:{
                key: Trello.key,
                token: Trello.token,
            }
        }).then(response=>{
            cy.log(response)
            boardID= response.body[1].id;
            cy.log(boardID)
            cy.api({
                url: `${Trello.API.list}${boardID}/lists`,
                method: 'GET',
                qs:{
                    key: Trello.key,
                    token: Trello.token,
                }
            })
        }).then(response2=>{
            cy.log(response2);
            listID= response2.body[2].id;
            cy.log(listID);
            cy.api({
                url: Trello.API.card,
                method: 'POST',
                qs:{
                    key: Trello.key,
                    token: Trello.token,
                    name: 'Nueva tarjeta 2',
                    idList: listID,
                    desc: 'Tarjeta creada con propositos de testing en la lista "Done"',
                    pos: 'bottom',
                }
            })
        }).then(response3=>{
            let cardID= response3.body.id;
            let numero= Math.floor(Math.random()*1000)
            cy.api({
                url: `${Trello.API.card}${cardID}`,
                method: 'PUT',
                qs:{
                    key: Trello.key,
                    token: Trello.token,
                    name: `Ahora se llama nueva tarjeta 2${numero}`,
                    desc: 'y la descripcion es ahora esta',
                    pos: 'top',
                    idList: listID,
                    idBoard: boardID,
                }
            })
        }).then(response4=>{
            cy.log(response4);
        })
    })    

    it.only('GX-5874| TC3:  Validar que el usuario arrastra una card a otra lista',()=>{
        cy.visit('https://trello.com/home');
        homepage.LoginButton();
        loginpage.InputUser();
        loginpage.Login();
        loginpage.InputPass();   
        
        loginpage.Submit();
            
        cy.visit('https://trello.com/b/b7Sd9eJq/tablero-para-testing')
    })
    

    it('GX-5874| TC4:  Validar que el usuario elimina una card',()=>{
        let boardID;
        cy.api({
            url: Trello.API.board,
            method: 'GET',
            qs:{
                key: Trello.key,
                token: Trello.token,
            }

        }).then(response=>{
            cy.log(response)
            boardID= response.body[1].id;
            cy.api({
                url: `${Trello.API.list}${boardID}/lists?`,
                method: 'GET',
                qs:{
                    key: Trello.key,
                    token: Trello.token
                }
            })
        }).then(response2=>{
            cy.log(response2)
            listID= response2.body[0].id;
            cy.api({
                url: `https://api.trello.com/1/cards/${cardID}`,
                method: 'DELETE',
                qs:{
                    key: Trello.key,
                    token: Trello.token
                }
            })
        }).then(response=>{
            assert.equal(response.status, 200);
        })
    }) 
    it.only('user information',()=>{
        cy.api({
            url: 'https://api.trello.com/1/members/me',
            method: 'GET',
            qs:{
                key: Trello.key,
                token: Trello.token
            }
        }).then(response=>{
            cy.log(response);
        })
    })   
})  

//________________________________________________________________________
// Comando predeterminado para que no ocurran errores de excepciones:
Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
})
// Comando predeterminado para que no aparezcan los Fetch en el log del Test Runner:
const origLog = Cypress.log
Cypress.log = function (opts, ...other) {
	if (opts.displayName === 'xhr'|| opts.displayName === 'fetch' && opts.url.startsWith('https://')) {
		return
	}
	return origLog(opts, ...other)
}

// ** COPIA Y PEGA EN CADA SUITE QUE SE REALICE CON UN SUT DE MUCHO FETCH Y XHR O PROBLEMAS DE EXCEPCIÓN 

