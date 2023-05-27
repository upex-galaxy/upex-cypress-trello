let idBoard;
let idListBacklog;
let idListActive;
let idListDone;
let idCard1;
let idCard2;
let idCard3;

const key = 'ce28ca26fa743f20e37175332e956ce2'; // Nuestra autenticación
const token = 'ATTA490789ea4f2d87a5fe4a18886e3e00b1f90bebab88bd5e6fac8ec6ee3f1915c392FB0D93';

class trello {
	precondition() {
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/boards/',
			qs: {
				key: key,
				token: token,
				name: 'Nuevo Board creado con Cypress',
				defaultLists: false,
			},
		})
			.as('response0')
			.then(response => {
				Cypress.env('idBoard', response.body.id);
			});
	}

	list(name, pos, id) {
		idBoard = Cypress.env('idBoard');
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/lists',
			qs: {
				key: key,
				token: token,
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

	list2() {
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
		})
			.as('response2')
			.then(response => {
				idListActive = response.body.id;
			});
	}

	list3() {
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
		})
			.as('response3')
			.then(response => {
				idListDone = response.body.id;
			});
	}
}

export const Trello = new trello();
