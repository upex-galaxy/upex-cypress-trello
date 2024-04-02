interface TrelloData {
  key: string;
  token: string;
}
import { processUrl } from '../../support/types/urlData';
import type { urlList } from '../../support/types/urlData';
import dataJson from '../../fixtures/data/GX2-16267-Cards.json';
const data: TrelloData = dataJson as TrelloData;

export class TrelloCardApi {
	static request(
		method: string,
		endpointKey: urlList,
		id?: string,
		body?: Record<string, any> // Optional body for PUT/POST requests
	) {
		// Prepare parameters for URL processing
		const params = { idList: id, idCard: id, key: data.key, token: data.token };
		let url = processUrl(endpointKey, params);

		return cy.api({
			method: method,
			url: url,
			body: body,
		});
	}
	// static request(
	// 	method: string,
	// 	endpoint: string,
	// 	id?:string,
	// 	body?: Record<string, any>// Optional body for PUT/POST requests
	// ) {
	// 	const qsParams = {
	// 		key : data.key,
	// 		token: data.token,
	// 	};
	// 	 let url = `https://api.trello.com/1/${endpoint}`;
	// 	 if (id && method === 'POST' && endpoint === 'lists') {
	// 		url += `/${id}/archiveAllCards`;
	// 	} else if (id) {
	// 		url += `/${id}`;
	// 	}
	// 	url += `?key=${data.key}&token=${data.token}`;
	// 	return cy.api({
	// 		method: method,
	// 		url: url,
	// 		qs: qsParams,
	// 		body: method === 'PUT' || method === 'POST' ? body : undefined,
	// 	});
	// }

	// static getById(method: string, endpoint: string, idList: string) {
	// 	return TrelloCardApi.request(method, endpoint, idList);
	// }
	// static createCardOnList(method: string, endpoint: string, options: Record<string, any>) {
	// 	return TrelloCardApi.request(method, endpoint, undefined, options);
	// }
	// static updateCard(method: string, endpoint: string, idCard: string, updateFields: Record<string, any>) {
	// 	return TrelloCardApi.request(method, endpoint, idCard, updateFields);
	// }
	// static deleteCard(method: string, endpoint: string, idCard: string) {
	// 	return TrelloCardApi.request(method, endpoint, idCard);
	// }
	// static deleteList(method: string, endpoint: string, idList: string) {
	// 	return TrelloCardApi.request(method, endpoint, idList);
	// }
}
