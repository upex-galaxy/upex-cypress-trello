class TrelloCheckItem {
	createList(key,token,name,idBoard,status) {
		return cy.request ({
			url:'https://trello.com/1/lists',
			method:'POST',
			qs:
            {
            	key: key,
            	token:token,
            	name:name,
            	idBoard:idBoard,
            }
		}).then(response => {
			expect(response.status).to.equal(status);
			return response.body.id;
		});
	}
	createCard  (key,token,idList,name,status)  {
		return cy.request({
			url:'/cards',
			method:'POST',
			qs:{
				key:key,
				token:token,
				name:name,
				idList: idList,
			}
		}).then(response => {
			expect(response.status).to.equal(status);
			expect(response.body.name).to.equal(name);
			return response.body.id;
		});
	};

	createCheckList (id,key,token,name,status) {
		return cy.request({
			url: `/cards/${id}/checklists`,
			method:'POST',
			qs:{
				key:key,
				token:token,
				name:name,
			}
		}).then(response => {
			expect(response.status).to.equal(status);
			return response.body.id;
		});
	};

	createCheckItem (name,id,key,token,) {
		return cy.request({
			url:`/checklists/${id}/checkItems`,
			method:'POST',
			qs:{
				key:key,
				token:token,
				name:name,
			}
		}).then(response => {
			expect(response.status).to.equal(200);
			return response.body.id;
		});
	}
	updateCheckItem (name,id,idCheckItem,key,token,status) {
		return cy.request({
			failOnStatusCode: false,
			url:`/cards/${id}/checkItem/${idCheckItem}`,
			method:'PUT',
			qs:{
				key:key,
				token:token,
				name:name,
			}
		}).then(response => {
			expect(response.status).to.equal(status);
		});
	}


}
export const trelloCheckItemPage = new TrelloCheckItem();