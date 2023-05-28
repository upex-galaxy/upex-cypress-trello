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

	card(idList, name, desc, pos, start, due, urlSource, color, id) {
		cy.api({
			method: 'POST',

			url: fixture.url.card,
			qs: {
				key: fixture.key,
				token: fixture.token,
				idList: idList,
				name: name,
				desc: desc,
				pos: pos,
				start: start,
				due: due,
				urlSource: urlSource,
			},
			body: {
				cover: { color: color },
			},
		})
			.as(name)
			.then(response => {
				Cypress.env(id, response.body.id);
			});
	}

	cardPos(idList, pos, name, id) {
		cy.api({
			method: 'POST',
			url: fixture.url.card,
			qs: {
				key: fixture.key,
				token: fixture.token,
				idList: idList,
				pos: pos,
				name: name,
			},
		})
			.as(name)
			.then(response => {
				Cypress.env(id, response.body.id);
			});
	}

	getCard(idCard) {
		cy.api({
			method: 'GET',
			url: fixture.url.card + idCard,
			qs: {
				key: fixture.key,
				token: fixture.token,
			},
		}).as('getCard');
	}

	putCard(name, desc, pos, due, start, color, idCard, idList) {
		idCard1 = Cypress.env('idCard1');
		cy.log(idCard1);
		idListActive = Cypress.env('idListActive');

		cy.api({
			method: 'PUT',
			url: fixture.url.card + idCard,

			qs: {
				key: fixture.key,
				token: fixture.token,
				name: name,
				desc: desc,
				pos: pos,
				due: due,
				start: start,
				idList: idList,
			},
			body: {
				cover: { color: color },
			},
		}).as(name);
	}

	deleteCard(idCard) {
		cy.api({
			method: 'DELETE',
			url: fixture.url.card + idCard,

			qs: {
				key: fixture.key,
				token: fixture.token,
			},
		}).as('delete');
	}

	deleteBoard() {
		cy.api({
			method: 'DELETE',

			url: 'https://api.trello.com/1/boards/' + idBoard,
			qs: {
				key: fixture.key,
				token: fixture.token,
			},
		});
	}
}

export const Trello = new trello();
