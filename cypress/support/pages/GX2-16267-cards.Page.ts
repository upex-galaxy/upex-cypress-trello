const data = {
	key: 'ae2792af729826db3fed7b353719dfba',
	token: 'ATTA8173e9967d92d6239b9fe42c1276cfaeac467beca5b5a0ed92dbf2dd2c5070fa84A0F87C'
};
export class TrelloCardApi {
	static request(
		method: string,
		endpoint: string,
		id?:string,
		body?: Record<string, any> // Optional body for PUT/POST requests
	) {
		const qsParams = {
			key : data.key,
			token: data.token,
		};
		return cy.api({
			method: method,
			url: `https://api.trello.com/1/${endpoint}/${id}?key=${data.key}&token=${data.token}`,
			qs: qsParams,
			body: method === 'PUT' || method === 'POST' ? body : undefined,
		});
	}

	static requestCard(
		method: string,
		cardName?: string,
		idList?:string,
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
	static getById(method: string, endpoint: string, idList: string) {
		return TrelloCardApi.request(method, endpoint, idList);
	}
	static createCardOnList(method: string,cardName: string, idList: string ) {
		return TrelloCardApi.requestCard(method, idList, cardName);
	}
	static updateCard(method: string, endpoint: string, idCard: string, updateFields: Record<string, any>) {
		return TrelloCardApi.request(method, endpoint, idCard, updateFields);
	}
	static deleteCard(method: string, endpoint: string, idCard: string) {
		return TrelloCardApi.request(method, endpoint, idCard);
	}
}


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

