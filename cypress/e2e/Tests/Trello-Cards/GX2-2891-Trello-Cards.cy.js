import { Trello } from '@pages/trelloCards.Page';
import fixture from 'cypress/fixtures/data/trelloCards.json';

let idBoard;
let idListBacklog;
let idListActive;
let idListDone;
let idCard1;

describe('GX2-2871 | Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	before('PRC 1: Crear Board', function () {
		Trello.precondition();

		cy.get('@response').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Nuevo Board creado con Cypress');
		});
	});

	before('PRC 2: Crear tres listas', () => {
		Trello.list(fixture.list1.name, fixture.list1.pos, fixture.list1.id);
		cy.get('@Backlog').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Backlog');
		});

		Trello.list(fixture.list2.name, fixture.list2.pos, fixture.list2.id);
		cy.get('@Active').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Active');
		});

		Trello.list(fixture.list3.name, fixture.list3.pos, fixture.list3.id);
		cy.get('@Done').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Done');
		});
	});

	it('TC1: Validate new card is created in a list when a name is entered', () => {
		idListBacklog = Cypress.env('idListBacklog');

		Trello.card(
			idListBacklog,
			fixture.card1.name,
			fixture.card1.desc,
			fixture.card1.pos,
			fixture.card1.start,
			fixture.card1.due,
			fixture.card1.urlSource,
			fixture.card1.color,
			fixture.card1.id
		);
		cy.get('@Nueva Card').then(response => {
			expect(response.status).to.equal(200);
			expect(response.body.name).to.equal('Nueva Card');
			expect(response.body.desc).to.equal('Esta card es creada para testear la api por Cypress');
			expect(response.body.badges).to.have.property('start');
			expect(response.body.badges).to.have.property('due');
			expect(response.body.attachments[0].name).to.equal('http://upexwork.com/');
		});
	});

	it(' TC2: Validate new card is created on top of the List', () => {
		idListBacklog = Cypress.env('idListBacklog');
		idCard1 = Cypress.env('idCard1');

		Trello.cardPos(idListBacklog, fixture.cardTop.pos, fixture.cardTop.name, fixture.cardTop.id);
		cy.get('@Card on top').then(responseTop => {
			expect(responseTop.status).equal(200);
			expect(responseTop.body.name).equal('Card on top');

			Trello.getCard(idCard1);
			cy.get('@getCard').then(responseBottom => {
				expect(responseBottom.body.pos).to.be.greaterThan(responseTop.body.pos);
			});
		});
	});

	it(' TC3: Validate new card is created on bottom of the List when position paramether is on default', () => {
		idListBacklog = Cypress.env('idListBacklog');

		Trello.cardPos(idListBacklog, fixture.cardBottom.pos, fixture.cardBottom.name, fixture.cardBottom.id);
		cy.get('@Card on bottom').then(responseBottom => {
			expect(responseBottom.status).equal(200);
			expect(responseBottom.body.name).equal('Card on bottom');

			Trello.getCard(idCard1);
			cy.get('@getCard').then(responseTop => {
				expect(responseTop.body.pos).to.be.lessThan(responseBottom.body.pos);
			});
		});
	});

	it('TC4: Validate card information changes when data is modified', () => {
		idListBacklog = Cypress.env('idListBacklog');
		idCard1 = Cypress.env('idCard1');

		Trello.putCard(
			fixture.putCard1.name,
			fixture.putCard1.desc,
			fixture.putCard1.pos,
			fixture.putCard1.due,
			fixture.putCard1.start,
			fixture.putCard1.color,
			idCard1,
			idListBacklog
		);

		cy.get('@Cambiando card name').then(response => {
			expect(response.status).equal(200);
			expect(response.body.name).equal('Cambiando card name');
			expect(response.body.desc).equal('Update desc');
		});
	});

	it('TC5: Validate card changes from one list to another when drag-and-drop', () => {
		idListActive = Cypress.env('idListActive');
		idListDone = Cypress.env('idListDone');
		idCard1 = Cypress.env('idCard1');

		Trello.putCard(
			fixture.putCard2.name,
			fixture.putCard2.desc,
			fixture.putCard2.pos,
			fixture.putCard2.due,
			fixture.putCard2.start,
			fixture.putCard2.color,
			idCard1,
			idListActive
		);

		cy.get('@Cambiando de lista').then(response => {
			expect(response.status).equal(200);
			expect(response.body.idList).eql(idListActive);

			Trello.putCard(
				fixture.putCard3.name,
				fixture.putCard3.desc,
				fixture.putCard3.pos,
				fixture.putCard3.due,
				fixture.putCard3.start,
				fixture.putCard3.color,
				idCard1,
				idListDone
			);

			cy.get('@Cambiando de nuevo').then(response2 => {
				expect(response2.status).equal(200);
				expect(response2.body.idList).eql(idListDone);
			});
		});
	});

	it('TC6: Validate card is deleted ', () => {
		idCard1 = Cypress.env('idCard1');
		Trello.deleteCard(idCard1);

		cy.get('@delete').then(response => {
			expect(response.status).equal(200);
			expect(response.body.id).to.not.exist;
		});
	});

	after('PC', () => {
		idBoard = Cypress.env('idBoard');
		Trello.deleteBoard();
	});
});

import { removeLogs } from '@helper/RemoveLogs';

removeLogs();
