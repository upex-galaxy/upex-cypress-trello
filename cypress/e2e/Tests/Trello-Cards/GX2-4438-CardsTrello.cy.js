import { removeLogs } from '@helper/RemoveLogs';
removeLogs();
import { cardsTrello } from '../../../support/pages/cardsPageTrello.Page.js';

describe('GX2-4438Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	let createListOne;
	let createListTwo;
	let createListThree;
	let CardID;
	before('', () => {
		cardsTrello.createList('Done').then(response => {
			expect(response.status).to.be.equal(200);
			expect(response.body.name).to.be.equal('Done');
			createListOne = response;
		});

		cardsTrello.createList('Active').then(response => {
			expect(response.status).to.be.equal(200);
			expect(response.body.name).to.be.equal('Active');
			createListTwo = response;
		});

		cardsTrello.createList('Backlog').then(response => {
			expect(response.status).to.be.equal(200);
			expect(response.body.name).to.be.equal('Backlog');
			createListThree = response;
		});
	});

	after('Eliminar Listas', () => {
		cardsTrello.deleteList(createListOne.body.id).then(responseOne => {
			expect(responseOne.status).to.be.equal(200);
		});

		cardsTrello.deleteList(createListTwo.body.id).then(responseTwo => {
			expect(responseTwo.status).to.be.equal(200);
		});

		cardsTrello.deleteList(createListThree.body.id).then(responseThree => {
			expect(responseThree.status).to.be.equal(200);
		});
	});

	it('4439 | TC1: Create Card', () => {
		let name = 'new task';
		cardsTrello.createCard(createListThree.body.id, name).then(response => {
			expect(response.status).to.be.equal(200);
			expect(response.body.name).to.be.equal(name);
			CardID = response.body.id;
		});
	});

	it('4439 | TC2: Move card', () => {
		cardsTrello.moveCard(CardID, createListTwo.body.id).then(response => {
			expect(response.status).to.be.equal(200);
			expect(response.body.idList).to.be.equal(createListTwo.body.id);
		});
	});

	it('4439 | TC3: Edit card', () => {
		let name = 'Task two';
		cardsTrello.editCard(CardID, name).then(response => {
			expect(response.status).to.be.equal(200);
			expect(response.body.name).to.be.equal(name);
		});
	});

	it('4439 | TC3: Delete card', () => {
		cardsTrello.deleteCard(CardID).then(response => {
			expect(response.status).to.be.equal(200);
		});
	});
});
