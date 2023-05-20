let idBoard;
let idListBacklog;
let idListActive;
let idListDone;
let idCard1;

const key = 'ce28ca26fa743f20e37175332e956ce2'; // Nuestra autenticación
const token = 'ATTA490789ea4f2d87a5fe4a18886e3e00b1f90bebab88bd5e6fac8ec6ee3f1915c392FB0D93'; // la autorización

describe('GX2-2871 | Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	before('PRC 1: Crear Board', () => {
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/boards/',
			qs: {
				key: key,
				token: token,
				name: 'Nuevo Board creado con Cypress',
				defaultLists: false,
			},
		}).then(response => {
			expect(response).to.be.an('object');
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Nuevo Board creado con Cypress');
			idBoard = response.body.id;
		});
	});

	before('PRC 2: Crear tres listas', () => {
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/lists',
			qs: {
				key: key,
				token: token,
				name: 'Backlog',
				idBoard: idBoard,
				pos: 1,
			},
		}).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Backlog');
			idListBacklog = response.body.id;
		});

		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/lists',
			qs: {
				key: key,
				token: token,
				name: 'Active',
				idBoard: idBoard,
				pos: 2,
			},
		}).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Active');
			idListActive = response.body.id;
		});

		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/lists',
			qs: {
				key: key,
				token: token,
				name: 'Done',
				idBoard: idBoard,
				pos: 3,
			},
		}).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Done');
			idListDone = response.body.id;
		});
	});

	it('TC1: Validate new card is created in a list when a name is entered', () => {
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/cards',
			qs: {
				key: key,
				token: token,
				idList: idListBacklog,
				name: 'Nueva Card',
				desc: 'Esta card es creada para testear la api por Cypress',
			},
		}).then(response => {
			expect(response.status).to.equal(200);
			expect(response.body.name).to.equal('Nueva Card');
			expect(response.body).to.have.property('desc');
			idCard1 = response.id;
		});
	});

	after('PC', () => {
		cy.api({
			method: 'DELETE',

			url: 'https://api.trello.com/1/boards/' + idBoard,
			qs: {
				key: key,
				token: token,
			},
		});
	});
});

import { removeLogs } from '@helper/RemoveLogs';

removeLogs();
