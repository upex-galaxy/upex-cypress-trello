import { Trello } from '@pages/trelloCards.Page';

let idBoard;
let idListBacklog;
let idListActive;
let idListDone;
let idCard1;
let idCard2;
let idCard3;

const key = 'ce28ca26fa743f20e37175332e956ce2'; // Nuestra autenticación
const token = 'ATTA490789ea4f2d87a5fe4a18886e3e00b1f90bebab88bd5e6fac8ec6ee3f1915c392FB0D93'; // la autorización

describe('GX2-2871 | Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	before('PRC 1: Crear Board', function () {
		Trello.precondition();

		cy.get('@response0').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Nuevo Board creado con Cypress');
		});
	});

	before('PRC 2: Crear tres listas', () => {
		Trello.list('Backlog', 1, 'idListBacklog');
		cy.get('@Backlog').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Backlog');
		});

		Trello.list('Active', 2, 'idListActive');
		cy.get('@Active').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Active');
		});

		Trello.list('Done', 3, 'idListDone');
		cy.get('@Done').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Done');
		});
	});

	it('TC1: Validate new card is created in a list when a name is entered', () => {
		idListBacklog = Cypress.env('idListBacklog');
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/cards',
			qs: {
				key: key,
				token: token,
				idList: idListBacklog,
				name: 'Nueva Card',
				desc: 'Esta card es creada para testear la api por Cypress',
				start: '5/19/2023',
				due: '6/19/2023',
				urlSource: 'http://upexwork.com/',
			},
		}).then(response => {
			expect(response.status).to.equal(200);
			expect(response.body.name).to.equal('Nueva Card');
			expect(response.body.desc).to.equal('Esta card es creada para testear la api por Cypress');
			expect(response.body.badges).to.have.property('start');
			expect(response.body.badges).to.have.property('due');
			expect(response.body.attachments[0].name).to.equal('http://upexwork.com/');
			idCard1 = response.body.id;
		});
	});

	it(' TC2: Validate new card is created on top of the List', () => {
		idListBacklog = Cypress.env('idListBacklog');
		cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/cards',
			qs: {
				key: key,
				token: token,
				idList: idListBacklog,
				pos: 'top',
				name: 'Card on top',
			},
		}).then(responseTop => {
			expect(responseTop.status).equal(200);
			expect(responseTop.body.name).equal('Card on top');
			idCard2 = responseTop.body.id;
			cy.api({
				method: 'GET',
				url: 'https://api.trello.com/1/cards/' + idCard1,
				qs: {
					key: key,
					token: token,
				},
			}).then(responseBottom => {
				expect(responseBottom.body.pos).to.be.greaterThan(responseTop.body.pos);
			});
		});
	});

	it(' TC3: Validate new card is created on bottom of the List when position paramether is on default', () => {
		idListBacklog = Cypress.env('idListBacklog');
		cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/cards',
			qs: {
				key: key,
				token: token,
				idList: idListBacklog,
				name: 'Card on bottom',
			},
		}).then(responseBottom => {
			expect(responseBottom.status).equal(200);
			expect(responseBottom.body.name).equal('Card on bottom');
			idCard3 = responseBottom.body.id;
			cy.api({
				method: 'GET',
				url: 'https://api.trello.com/1/cards/' + idCard2,
				qs: {
					key: key,
					token: token,
				},
			}).then(responseTop => {
				expect(responseTop.body.pos).to.be.lessThan(responseBottom.body.pos);
			});
		});
	});

	it('TC4: Validate card information changes when data is modified', () => {
		cy.api({
			method: 'PUT',
			url: 'https://api.trello.com/1/cards/' + idCard1,

			qs: {
				key: key,
				token: token,
				name: 'Cambiando card name',
				desc: 'Update desc',
				pos: 1,
				due: '07/25/2024',
				start: '08/25/2023',
				//cover: { 'color': 'yellow' },
			},
			body: {
				cover: { color: 'yellow' },
			},
		}).then(response => {
			expect(response.status).equal(200);
			expect(response.body.name).equal('Cambiando card name');
			expect(response.body.desc).equal('Update desc');
		});
	});

	it('TC5: Validate card changes from one list to another when drag-and-drop', () => {
		idListActive = Cypress.env('idListActive');
		idListDone = Cypress.env('idListDone');
		cy.api({
			method: 'PUT',
			url: 'https://api.trello.com/1/cards/' + idCard1,

			qs: {
				key: key,
				token: token,
				idList: idListActive,
				name: 'Cambiando card name (y de lista)',
			},
		}).then(response => {
			expect(response.status).equal(200);
			expect(response.body.idList).eql(idListActive);

			cy.api({
				method: 'PUT',
				url: 'https://api.trello.com/1/cards/' + idCard1,

				qs: {
					key: key,
					token: token,
					idList: idListDone,
					name: 'Cambiando card name (y de lista)',
				},
			}).then(response2 => {
				expect(response2.status).equal(200);
				expect(response2.body.idList).eql(idListDone);
			});
		});
	});

	it('TC6: Validate card is deleted ', () => {
		cy.api({
			method: 'DELETE',
			url: 'https://api.trello.com/1/cards/' + idCard1,

			qs: {
				key: key,
				token: token,
			},
		}).then(response => {
			expect(response.status).equal(200);
			expect(response.body.id).to.not.exist;
		});
	});

	after('PC', () => {
		idBoard = Cypress.env('idBoard');
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
