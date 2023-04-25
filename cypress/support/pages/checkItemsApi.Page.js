const key = 'e155e99ea60ec4dbd0e5f93089249a07'; // autenticación
const token = 'ATTAba42efddba222935732db6c797a983ce0ae9abc515d133400b2fd54e91a1c36d7DFD8060'; // autorización
const idBoards = '63f4dccc919eb736dd5e5824';

class trelloAPI {
	createNewList() {
		let response = [];
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/lists/',
			qs: {
				name: 'New',
				idBoard: idBoards,
				key: key,
				token: token,
			},
		}).then(Response => {
			const id = Response.body.id;
			response.push(id);
			const status = Response.status;
			response.push(status);
		});
		return response;
	}

	createNewCard(IdList) {
		let response = [];
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/cards/',
			qs: {
				name: 'carta nueva',
				idList: IdList,
				key: key,
				token: token,
			},
		}).then(Response => {
			const id = Response.body.id;
			response.push(id);
			const status = Response.status;
			response.push(status);
		});
		return response;
	}
	createNewCheckList(IdCarD) {
		let response = [];
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/checklists/',
			qs: {
				name: 'checklist nuevo',
				idCard: IdCarD,
				key: key,
				token: token,
			},
		}).then(Response => {
			const id = Response.body.id;
			response.push(id);
			const status = Response.status;
			response.push(status);
		});
		return response;
	}
	createNewCheckItem(IdcheckList) {
		let response = [];
		cy.api({
			method: 'POST',

			url: 'https://api.trello.com/1/checklists/' + IdcheckList + '/checkItems/',
			qs: {
				name: 'Check item nuevo',
				key: key,
				token: token,
			},
		}).then(Response => {
			const id = Response.body.id;
			response.push(id);
			const status = Response.status;
			response.push(status);
		});
		return response;
	}
	updateCheckItem({ idCheckItem, idCard, State }) {
		let response = [];
		cy.api({
			method: 'PUT',

			url: 'https://api.trello.com/1/cards/' + idCard + '/checkItem/' + idCheckItem,
			qs: {
				state: State,
				key: key,
				token: token,
			},
		}).then(Response => {
			const status = Response.status;
			response.push(status);
		});
		return response;
	}
	deleteCheckItem({ idCheckItem, idCard }) {
		let response = [];
		cy.api({
			method: 'DELETE',

			url: 'https://api.trello.com/1/cards/' + idCard + '/checkItem/' + idCheckItem,
			qs: {
				key: key,
				token: token,
			},
		}).then(Response => {
			const status = Response.status;
			response.push(status);
		});
		return response;
	}
	deleteCheckList({ idCheckList }) {
		let response = [];
		cy.api({
			method: 'DELETE',

			url: 'https://api.trello.com/1/checklists/' + idCheckList,
			qs: {
				key: key,
				token: token,
			},
		}).then(Response => {
			const status = Response.status;
			response.push(status);
		});
		return response;
	}
	getCard({ idCard }) {
		cy.api({
			method: 'GET',

			url: 'https://api.trello.com/1/cards/' + idCard,
			qs: {
				key: key,
				token: token,
			},
		}).then(Response => {
			cy.log(Response.status);
		});
	}
	getCheckList({ idChecklist }) {
		let response = [];
		cy.api({
			method: 'GET',

			url: 'https://api.trello.com/1/checklists/' + idChecklist,
			failOnStatusCode: false,
			qs: {
				key: key,
				token: token,
			},
		}).then(Response => {
			response.push(Response.body.checkItems);
		});
		return response;
	}
	getCheckItem({ idCard, idCheckItem }) {
		let response = [];
		cy.api({
			method: 'GET',

			url: 'https://api.trello.com/1/cards/' + idCard + '/checkItem/' + idCheckItem,
			failOnStatusCode: false,
			qs: {
				key: key,
				token: token,
			},
		}).then(Response => {
			response.push(Response.status);
		});
		return response;
	}
	getCheckItemState({ idCard, idCheckItem }) {
		let response = [];
		cy.api({
			method: 'GET',

			url: 'https://api.trello.com/1/cards/' + idCard + '/checkItem/' + idCheckItem,
			qs: {
				key: key,
				token: token,
			},
		}).then(Response => {
			response.push(Response.body.state);
		});
		return response;
	}
	getStatusCheckList({ idChecklist }) {
		let response = [];
		cy.api({
			method: 'GET',

			url: 'https://api.trello.com/1/checklists/' + idChecklist,
			failOnStatusCode: false,
			qs: {
				key: key,
				token: token,
			},
		}).then(Response => {
			response.push(Response.status);
		});
		return response;
	}
}

export const TrelloAPI = new trelloAPI();
