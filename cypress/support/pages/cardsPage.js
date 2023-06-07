import { backlogList } from '../../fixtures/data/cards.json';
import { doneList } from '../../fixtures/data/cards.json';
import { activeList } from '../../fixtures/data/cards.json';
import { key } from '../../fixtures/data/cards.json';
import { token } from '../../fixtures/data/cards.json';

class Cards {
	getBacklogList() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + backlogList,
			qs: {
				key: key,
				token: token,
				name: 'BACKLOG',
			},
		});
	}

	getActiveList() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + activeList,
			qs: {
				key: key,
				token: token,
				name: 'ACTIVE',
			},
		});
	}
	getDoneList() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + doneList,
			qs: {
				key: key,
				token: token,
				name: 'DONE',
			},
		});
	}
	createCard() {
		return cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/cards',
			body: {
				key: key,
				token: token,
				idList: backlogList,
				name: 'Insert Card',
			},
		});
	}
	updateCard() {
		return cy.api({
			method: 'PUT',
			url: 'https://api.trello.com/1/cards/' + Cypress.env('cardID'),
			body: {
				key: key,
				token: token,
				idList: backlogList,
				name: 'Modify Card',
				desc: 'Adding description',
				cover: { color: 'green' },
			},
		});
	}
	moveCardActive() {
		return cy.api({
			method: 'PUT',
			url: 'https://api.trello.com/1/cards/' + Cypress.env('cardID'),
			body: {
				key: key,
				token: token,
				idList: doneList,
				name: 'Modify Card',
				desc: 'Adding description',
				cover: { color: 'green' },
			},
		});
	}
	moveCardDone() {
		return cy.api({
			method: 'PUT',
			url: 'https://api.trello.com/1/cards/' + Cypress.env('cardID'),
			body: {
				key: key,
				token: token,
				idList: activeList,
				name: 'Modify Card',
				desc: 'Adding description',
				cover: { color: 'green' },
			},
		});
	}
	deleteCard() {
		return cy.api({
			method: 'DELETE',
			url: 'https://api.trello.com/1/cards/' + Cypress.env('cardID'),
			body: {
				key: key,
				token: token,
			},
		});
	}
	getListCards() {
		return cy.api({
			method: 'GET',
			url: `https://api.trello.com/1/lists/${backlogList}/cards`,
			qs: {
				key: key,
				token: token,
				id: Cypress.env('cardID'),
			},
		});
	}
}
export const cards = new Cards();
