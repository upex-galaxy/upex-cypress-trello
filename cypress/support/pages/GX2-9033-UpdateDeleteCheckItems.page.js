import data from '../../fixtures/data/GX2-9033-UpdateDeleteCheckItem.json';
		
class CheckItems {
	constructor(){	this.boardId = null;
		this.listId = null;
		this.CardId = null;
		this.checkListId = null;
		this.checkItemsId1 = null;
		this.checkItemIds = null;
	}
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
				this.boardId = response.body.id;
				Cypress.env('boardIdPrincipal', this.boardId);
				return this.boardId;
			});
	}

	createList(nombre) {
		cy.log(this.boardId);
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/lists',
				body: {
					name: nombre,
					idBoard: this.boardId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				this.listId = response.body.id;
				Cypress.env('listIdGlobal', this.listId);
			});
	}

	createCard(nombre) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/Cards',
				body: {
					name: nombre,
					idList: this.listId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				this.CardId = response.body.id;
				Cypress.env('cardIdGlobal', this.CardId);
			});
	}

	createCheckList(nombre) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/checklists',
				body: {
					name: nombre,
					idCard: this.CardId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				this.checkListId = response.body.id;
				//Cypress.env('checkListIdGlobal', this.checkListId);
			});
	}

	createCheckItem(nombre, pos, state) {
		return cy
			.request({
				method: 'POST',
				url: `https://api.trello.com/1/checklists/${this.checkListId}/checkItems`,
				body: {
					name: nombre,
					nameData: {
						emoji: {},
					},
					pos: pos,
					state: state,
					idChecklist: this.checkListId,
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				this.checkItemIds = response.body.id;
				return this.checkItemIds;
			});
	}

	modifyCheckItem(nombre, pos, state, item) {
	
		return cy
			.request({
				method: 'PUT',
				url: `https://trello.com/1/cards/${this.CardId}/checklist/${this.checkListId}/checkItem/${item}`,
				body: {
					name: nombre,
					nameData: {
						emoji: {},
					},
					pos: pos,
					state: state,
					idChecklist: this.checkListId,
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
				url: `https://api.trello.com/1/checklists/${this.checkListId}/checkItems/${Item}`,
				body: {
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
			});
	}

	getCheckItem(item) {
		const checkItemIds = Cypress.env('checkItemIdsGlobal');
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/cards/${this.CardId}/checkItem/${item}`,
				body: {
					key: data.key,
					token: data.token,
				},
			})
			.then(response => {
				expect(response.status).to.equal(200);
				return response;
			});
	}
	
	getCheckList() {
		
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/checklists/${this.checkListId}`,
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
