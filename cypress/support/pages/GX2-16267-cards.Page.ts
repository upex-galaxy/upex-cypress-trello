const data = {
	key: 'ae2792af729826db3fed7b353719dfba',
	token: 'ATTA8173e9967d92d6239b9fe42c1276cfaeac467beca5b5a0ed92dbf2dd2c5070fa84A0F87C'
};
export class TrelloCardApi {
	static request(
		method: string,
		endpoint: string,
		id?:string,
		body?: Record<string, any>// Optional body for PUT/POST requests
	) {
		const qsParams = {
			key : data.key,
			token: data.token,
		};
		 let url = `https://api.trello.com/1/${endpoint}`;
		 if (id && method === 'POST' && endpoint === 'lists') {
			url += `/${id}/archiveAllCards`;
		} else if (id) {
			url += `/${id}`;
		}
		url += `?key=${data.key}&token=${data.token}`;
		return cy.api({
			method: method,
			url: url,
			qs: qsParams,
			body: method === 'PUT' || method === 'POST' ? body : undefined,
		});
	}

	static getById(method: string, endpoint: string, idList: string) {
		return TrelloCardApi.request(method, endpoint, idList);
	}
	static createCardOnList(method: string, endpoint: string, options: Record<string, any>) {
		return TrelloCardApi.request(method, endpoint, undefined, options);
	}
	static updateCard(method: string, endpoint: string, idCard: string, updateFields: Record<string, any>) {
		return TrelloCardApi.request(method, endpoint, idCard, updateFields);
	}
	static deleteCard(method: string, endpoint: string, idCard: string) {
		return TrelloCardApi.request(method, endpoint, idCard);
	}
	static deleteList(method: string, endpoint: string, idList: string) {
		return TrelloCardApi.request(method, endpoint, idList);
	}
}
