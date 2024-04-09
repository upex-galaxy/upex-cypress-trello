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
		body?: Record<string, any>
	) {
		const params = { idList: id, idCard: id, key: data.key, token: data.token };
		let url = processUrl(endpointKey, params);

		return cy.api({
			method: method,
			url: url,
			body: body,
		});
	}
}
