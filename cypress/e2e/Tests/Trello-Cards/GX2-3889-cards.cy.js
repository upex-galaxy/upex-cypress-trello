//import { apikey } from '../../fixtures/data/keysTrello.json';
//import { secret } from '../../fixtures/data/keysTrello.json';

import { cardsListsPage } from '@pages/cardsListsTrello.js';

describe('US GX2-3889 | TS: Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
    const LISTO = "Listo"
    const HACIENDO = "Haciendo"
    const PORHACER = "Por Hacer"

	let dataKeys;
    let listPages = {}
	before('', () => {
		cy.fixture('/data/keysTrello').then(dato => {
			dataKeys = dato;
		});

		// 	// Crear las listas "por hacer", "haciendo", "listo"
        cardsListsPage.createLists([ LISTO, HACIENDO, PORHACER ]).then(resp => {
            listPages = resp
        });
	});

	// after('Borrar las listas al correr los tests', () => {
	// 	//borrar las listas despues de ejecutar los tests
	// 	const listNames = ['Listo', 'Haciendo', 'Por Hacer'];
	// 	listNames.forEach(listName => {
	// 		cy.request({
	// 			url: `https://api.trello.com/1/lists/${listId[listName]}?key=${dataKeys.apikey}&token=${dataKeys.token}`,
	// 			method: 'DELETE',
	// 		});
	// 	});
	// });

	it('3900 | TC1: Validar crear una card en lista "Por hacer”', () => {
        createCard(listPages[PORHACER]).then(respuesta => {
			expect(respuesta.status).to.be.equal(200);
			// expect(respuesta.body).to.have.keys('name'); / por alguna razon no funciona
		});
	});

	it('3901 | TC2: Validar modificar una card', () => {
		cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/cards/${cardId}?key=${dataKeys.apiKey}&token=${dataKeys.token}`,
			body: {
				name: 'Una tarea muy importante por hacer',
				desc: 'Primero saber los requerimientos',
			}.then(respuesta => {
				expect(respuesta.body).to.have.keys('cardId', 'apikey', 'token'); // Se hace asi esto?
			}),
		});
	});

	it('3902 | TC3:  Validar mover card de "Por hacer" a "Haciendo", a "Listo"', () => {
		cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/cards/${cardId}?idList=${listId}&key=${apiKey}&token=${token}`,
			body: {},
		});
	});
    it('3903 | TC4: Validar eliminar todas las cards en la lista "Listo"', () => {
        cy.api({
            method: 'DELETE',
            url:,
        })
    });
});
