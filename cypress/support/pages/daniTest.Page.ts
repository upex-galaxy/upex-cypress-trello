import {AccessData} from '../types/daniTestData';
urlAddCard: string = AccessData.urlAddCard;
export class DaniTestPage {

	public static request(method: string, url: string, idOption?: string) {
		return cy.api({
			method: method,
			url: url,
			qs: {
				idOption: idOption
			}
		});
	}
	public static addCard(name: string, idList: string, apiKey: string, apiToken: string) {
		return this.request('POST',`https://api.trello.com/1/cards?idList=${idList}&key=${apiKey}&token=${apiToken}`, name );
	};
	// public static addCard(name: string, idList: string, apiKey: string, apiToken: string) {
	// 	return cy.api({
	// 		method: 'POST',
	// 		url: `https://api.trello.com/1/cards?idList=${idList}&key=${apiKey}&token=${apiToken}`,
	// 		qs: {
	// 			name: name
	// 		},
	// 		headers:{
	// 			accept: 'application/json'
	// 		}
	// 	});
	// }	it('GX2-16274 | TC4: Check that the user can create Card A on th
}