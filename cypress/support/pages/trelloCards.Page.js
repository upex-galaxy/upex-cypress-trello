let idBoard;
let idListBacklog;
let idListActive;
let idListDone;
let idCard1;
let idCard2;
let idCard3;

import fixture from 'cypress/fixtures/data/trelloCards.json';
class trello {
	precondition() {
		cy.api({
			method: 'POST',

			url: fixture.url.board,
			qs: {
				key: fixture.key,
				token: fixture.token,
				name: fixture.board.name,
				defaultLists: fixture.board.defaultLists,
			},
		})
			.as('response')
			.then(response => {
				Cypress.env('idBoard', response.body.id);
			});
	}

	list(name, pos, id) {
		idBoard = Cypress.env('idBoard');
		cy.api({
			method: 'POST',

			url: fixture.url.list,
			qs: {
				key: fixture.key,
				token: fixture.token,
				name: name,
				idBoard: idBoard,
				pos: pos,
			},
		})
			.as(name)
			.then(response => {
				Cypress.env(id, response.body.id);
			});
	}

	card(name, desc, start, due, urlSource) {
		idListBacklog = Cypress.env('idListBacklog');
		cy.api({
			method: 'POST',

			url: fixture.url.card,
			qs: {
				key: fixture.key,
				token: fixture.token,
				idList: idListBacklog,
				name: name,
				desc: desc,
				start: start,
				due: due,
				urlSource: urlSource,
			},
		})
			.as(name)
			.then(response => {
				Cypress.env('idCard1', response.body.id);
			});
	}
}

export const Trello = new trello();
