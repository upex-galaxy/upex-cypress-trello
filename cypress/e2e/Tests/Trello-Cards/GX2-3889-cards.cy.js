//import { apikey } from '../../fixtures/data/keysTrello.json';
//import { secret } from '../../fixtures/data/keysTrello.json';

import { cardsListsPage } from '@pages/cardsListsTrello.js';

describe('US GX2-3889 | TS: Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	let dataKeys;
	before('', () => {
		cy.fixture('/data/keysTrello').then(dato => {
			dataKeys = dato;
		});

		// Crear las listas "por hacer", "haciendo", "listo"
		cardsListsPage.createLists(['Por Hacer', 'Haciendo', 'Listo']);
	});

	it('3900 | TC1: Validar crear una card en lista "Por hacer”', () => {
		// cy.api({
		//     url: 'https://api.trello.com/1/cards',
		//     method: post,
		//     headers: {
		//         authorization: Cypress.env('myToken')
		//     })

		cy.request({
			url: 'https://api.trello.com/1/cards',
			method: 'POST',
			body: {
				name: 'Mi primer Card en Por Hacer',
				idList: dataKeys.idListToDo,
				key: dataKeys.apikey,
				token: dataKeys.token,
			},
		}).then(respuesta => {
			expect(respuesta.status).to.be.equal(201);
			expect(respuesta.body).to.have.keys('name');
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
				expect(respuesta.body).tohave.keys('cardId', 'apikey', 'token'); // Se hace asi esto?
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
	// it('3903 | TC4: Validar eliminar todas las cards en la lista "Listo"', () => {});
});
