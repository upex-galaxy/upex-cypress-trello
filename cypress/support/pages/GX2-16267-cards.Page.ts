const data = {
	key: 'ae2792af729826db3fed7b353719dfba',
	token: 'ATTA8173e9967d92d6239b9fe42c1276cfaeac467beca5b5a0ed92dbf2dd2c5070fa84A0F87C'
};
export class TrelloCardApi {
	static request(
		method: string,
		listsOrCards: string,
		id?:string,
	) {
		const qsParams = {
			key : data.key,
			token: data.token,
		};
		return cy.api({
			method: method,
			url: `https://api.trello.com/1/${listsOrCards}/${id}?key=${data.key}&token=${data.token}`,
			qs: qsParams,
		});
	}

	static requestCard(
		method: string,
		// url: string,
		cardName?: string,
		idList?:string,
		idCard?: string,
	) {
		const qsParams = {
			key : data.key,
			token: data.token,
		};
		const body = {
			name : cardName,
			idList: idList,
		};
		return cy.api({
			method: method,
			url: 'https://api.trello.com/1/cards',
			qs: qsParams,
			body: body,
		});
	}

	// Method to get a List
	static getById(method: string, listOrCard: string, idList: string) {
		return TrelloCardApi.request(method, listOrCard, idList);
	}
	static createCardOnList(method: string,cardName: string, idList: string ) {
		return TrelloCardApi.requestCard(method, idList, cardName);
	}
}
// getCardById(idCard) {
// 	const qsParams = {
// 		key: this.key,
// 		token: this.token,
// 	};
// 	return cy.api({
// 		method: 'GET',
// 		url: `${this.baseUrl}/1/cards/${idCard}`,
// 		qs: qsParams,
// 	});
// }

// updateCard(idCard, updates) {
// 	 return cy.api({
// 		method: 'PUT',
// 		url: `${this.baseUrl}/1/cards/${idCard}`,
// 		qs: {
// 			key: this.key,
// 			token: this.token,
// 		},
// 		body: {
// 			...updates,
// 		},
// 	});
// }
// deleteCardById(idCard) {
// 	return cy.api({
// 		method: 'DELETE',
// 		url: `${this.baseUrl}/1/cards/${idCard}`,
// 		qs: {
// 			key: this.key,
// 			token: this.token,
// 		},
// 	});
// }
// deleteAllCardsFromList(listId) {
// 	return cy.api({
// 		method: 'POST',
// 		url: `${this.baseUrl}/1/lists/${listId}/archiveAllCards`,
// 		qs: {
// 			key: this.key,
// 			token: this.token,
// 		},
// 	});
// }

