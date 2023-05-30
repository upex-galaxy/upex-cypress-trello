const key = '3a71d9fbbd711e00d79697c7d811cb27'; // Nuestra autenticación
const token = 'ATTA7f7562055ec5d05e60143f697462126328138cc8964faadab4d0665f4532b8c0998A5D23'; // la autorización
const listA = '64763489c099ccfa084a821a';
const listB = '64752275edf99f729f6bb69e';
const listC = '64752277195322ca2ecb57f6';

class Cards {
	getListA() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + listA,
			qs: {
				key: key,
				token: token,
				name: 'BACKLOG',
			},
		});
	}

	getListB() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + listB,
			qs: {
				key: key,
				token: token,
				name: 'ACTIVE',
			},
		});
	}
	getListC() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + listC,
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
				idList: listA,
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
				idList: listA,
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
				idList: listB,
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
				idList: listC,
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
			url: `https://api.trello.com/1/lists/${listA}/cards`,
			qs: {
				key: key,
				token: token,
				id: Cypress.env('cardID'),
			},
		});
	}
}
export const cards = new Cards();
