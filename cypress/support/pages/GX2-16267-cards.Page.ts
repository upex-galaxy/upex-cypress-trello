export class TrelloCardApi {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
		this.key = 'ae2792af729826db3fed7b353719dfba';
		this.token = 'ATTA8173e9967d92d6239b9fe42c1276cfaeac467beca5b5a0ed92dbf2dd2c5070fa84A0F87C';
	}
	// Method to get a List
	getListById(idList, additionalQsParams = {}) {
		const qsParams = {
			key: this.key,
			token: this.token,
			...additionalQsParams,
		};
		return cy.api({
			method: 'GET',
			url: `${this.baseUrl}/1/lists/${idList}`,
			qs: qsParams,
		});
	}
	getCardById(idCard) {
		const qsParams = {
			key: this.key,
			token: this.token,
		};
		return cy.api({
			method: 'GET',
			url: `${this.baseUrl}/1/cards/${idCard}`,
			qs: qsParams,
		});
	}
	createCardOnList(idList, cardName) {
		 return cy.api({
			method: 'POST',
			url: `${this.baseUrl}/1/cards`,
			qs: {
				key: this.key,
				token: this.token,
			},
			body: {
				idList: idList,
				name: cardName
			},
		});
	}
	updateCard(idCard, updates) {
		 return cy.api({
			method: 'PUT',
			url: `${this.baseUrl}/1/cards/${idCard}`,
			qs: {
				key: this.key,
				token: this.token,
			},
			body: {
				...updates,
			},
		});
	}
	deleteCardById(idCard) {
		return cy.api({
			method: 'DELETE',
			url: `${this.baseUrl}/1/cards/${idCard}`,
			qs: {
				key: this.key,
				token: this.token,
			},
		});
	}
	deleteAllCardsFromList(listId) {
		return cy.api({
			method: 'POST',
			url: `${this.baseUrl}/1/lists/${listId}/archiveAllCards`,
			qs: {
				key: this.key,
				token: this.token,
			},
		});
	}
}
