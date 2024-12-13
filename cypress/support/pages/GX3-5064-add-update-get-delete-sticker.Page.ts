class TrelloSticker {
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

	addStickerCard  (id,key,token,image,top,left,zIndex,status)  {
		return cy.request({
			url:`/cards/${id}/stickers`,
			method:'POST',
			qs:{
				key:key,
				token:token,
				image:image,
				top:top,
				left:left,
				zIndex:zIndex,
			}
		}).then(response => {
			expect(response.status).to.equal(status);
			return response.body.id;
		});
	};
	updateStickerCard  (id,key,token,idSticker,top,left,zIndex,status)  {
		return cy.request({
			url:`/cards/${id}/stickers/${idSticker}`,
			method:'PUT',
			qs:{
				key:key,
				token:token,
				top:top,
				left:left,
				zIndex:zIndex,
			}
		}).then(response => {
			expect(response.status).to.equal(status);
		});
	};
	getStickerCard  (id,key,token,status)  {
		return cy.request({
			url:`/cards/${id}/stickers`,
			method:'GET',
			qs:{
				key:key,
				token:token,
			}
		}).then(response => {
			expect(response.status).to.equal(status);
		});
	};

	deleteStickerCard  (id,key,token,idSticker,status)  {
		return cy.request({
			url:`/cards/${id}/stickers/${idSticker}`,
			method:'DELETE',
			qs:{
				key:key,
				token:token,
			}
		}).then(response => {
			expect(response.status).to.equal(status);
		});
	};

}
export const trelloStickerPage = new TrelloSticker();