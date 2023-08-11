import { trello } from '@pages/GX2-5421-move-and-archive-cards';
import { lists } from '../../fixtures/data/GX2-5421-mover-y-archivar-cards.json';
let idListOne;
let idListTwo;

describe('US GX2-5421 | TS: Trello (API) | Cards | API Endpoint: mover y archivar todas las tarjetas de una lista', () => {
	before('PRC: Usuario debe tener creadas dos listas y algunas cards', () => {
		cy.viewport(1024, 768);
		idListOne = lists.listOne.id;
		idListTwo = lists.listTwo.id;

		trello.createCard(idListOne, 'First Card').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('First Card');
		});

		trello.createCard(idListOne, 'Second Card').then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Second Card');
		});
	});

	it('5422 | TC01: Validar poder mover todas las tarjetas de una lista a otra', () => {
		trello.moveAllCards(idListOne, idListTwo).then(response => {
			expect(response.status).to.eql(200);
		});
		//Cypress.env('idList');
	});

	it('5422 | TC02: Validar poder archivar todas las tarjetas de una lista', () => {
		trello.archiveAllCards(idListTwo).then(response => {
			expect(response.status).to.eql(200);
		});
	});
});
