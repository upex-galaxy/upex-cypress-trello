import data from '../../fixtures/data/GX2-9033-UpdateDeleteCheckItem.json';

let boardId = null;
let listId = null;
let CardId = null;
let checkListId = null;
let checkItemIds = null;
class CheckItems {
		
	
	get= {
	
		item:() => cy.get('[class="checklist-item-details-text markeddown js-checkitem-name"]'),
		userName: ()=> cy.get('#username'),
		password: ()=> cy.get('#password'),
		botonSubmit:()=> cy.get('#login-submit'),
		barra:()=> cy.get('span.checklist-progress-percentage'),

	};

	createBoard(nombre) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/boards',
				body: {
					name: nombre,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				boardId = response.body.id;	
				return boardId;
			});
	}

	createList(nombre) {
		
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/lists',
				body: {
					name: nombre,
					idBoard: boardId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				listId = response.body.id;
				Cypress.env('listIdGlobal', listId);
			});
	}

	createCard(nombre) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/Cards',
				body: {
					name: nombre,
					idList: listId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				CardId = response.body.id;
				
			});
	}

	createCheckList(nombre) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/checklists',
				body: {
					name: nombre,
					idCard: CardId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				checkListId = response.body.id;
				
			});
	}

	createCheckItem(nombre, pos, state) {
		return cy
			.request({
				method: 'POST',
				url: `https://api.trello.com/1/checklists/${checkListId}/checkItems`,
				body: {
					name: nombre,
					nameData: {
						emoji: {},
					},
					pos: pos,
					state: state,
					idChecklist: checkListId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				checkItemIds = response.body.id;
				return checkItemIds;
			});
	}

	modifyCheckItem(nombre, pos, state, item) {
	
		return cy
			.request({
				method: 'PUT',
				url: `https://trello.com/1/cards/${CardId}/checklist/${checkListId}/checkItem/${item}`,
				body: {
					name: nombre,
					nameData: {
						emoji: {},
					},
					pos: pos,
					state: state,
					idChecklist: checkListId,
					idCheckItem:item,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
			    
			});
	}

	deleteCheckItem(Item) {
		
		return cy
			.request({
				method: 'DELETE',
				url: `https://api.trello.com/1/checklists/${checkListId}/checkItems/${Item}`,
				body: {
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
			});
	}
	
	deleteBoard() {
		
		return cy
			.request({
				method: 'DELETE',
				url: `https://api.trello.com/1/Boards/${boardId}`,
				body: {
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
			});
	}
	getBoard() {
		
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/boards/${boardId}`,
				body: {
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(404);
				return response;
			});
	}
	
	

	
	getCheckItem(item) {
		
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/cards/${CardId}/checkItem/${item}`,
				body: {
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(404);
				return response;
			});
	}
	
	getCheckList() {
		
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/checklists/${checkListId}`,
				body: {
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
			});
	}

	
}

export const checkItems = new CheckItems();
