import { processUrl } from '../../support/types/urlData';
import type { urlList } from '../../support/types/urlData';
import dataJson from '../../fixtures/data/GX2-16267-Cards.json';
import type { TrelloDataPathParameters } from '../../support/types/responseType';
const data: TrelloDataPathParameters = dataJson as TrelloDataPathParameters;

export class TrelloCardApi {
	static request(
		method: string,
		endpointKey: urlList,
		id?: string,
		body?: Record<string, any>
	) {
		const params = { idList: id, idCard: id, idSticker: id, image: data.image, left: data.left, top: data.top, zIndex: data.zIndex, key: data.key, token: data.token };
		let url = processUrl(endpointKey, params);

		return cy.api({
			method: method,
			url: url,
			body: body,
		});
	}
}
