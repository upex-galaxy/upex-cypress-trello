import data from '../../fixtures/data/GX2-8301-UpdateDeleteCheckItems.json';

class CheckItems {
	get() {
		this.boardId = null;
		this.listId = null;
		this.CardId = null;
		this.checkListId =null;
		this.checkItemsId1=null;
	}

	createBoard(nombre) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/boards',
				body: {
					name: nombre,
					//idOrganization: data.organizationId,
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
				Cypress.env('checkListIdGlobal', this.checkListId);
			});
	}

	
	createCheckItem() {
		//const idCheck = Cypress.env('checkListIdGlobal');
		return cy
			.request({
				method: 'POST',
			    url: `https://api.trello.com/1/checklists/${this.checkListId}/checkItems`,
				body: {
					
					'name': 'test 1',
					'nameData': {
						'emoji': '😀'
					},
					'pos': 16697,
					'state': 'incomplete',
					'idChecklist': this.checkListId,
					key: data.key,
					token: data.token,
					
				}

				
			})
			.then(response => {
				expect(response.status).to.equal(200);
				this.checkItemsId1 = response.body.id;
				Cypress.env('checkItemIdGlobal', this.checkItemsId1);
			});
	}
}
export const checkItems = new CheckItems();
