import { processUrl } from '../../support/types/urlData';
import type { urlList } from '../../support/types/urlData';
import dataJson from '../../fixtures/data/GX2-16267-Cards.json';
import type { TrelloDataPathParameters } from '../../support/types/responseType';
const data: TrelloDataPathParameters = dataJson as TrelloDataPathParameters;

export class TrelloCardApi {
	static request(
		method: string,
		endpointKey: urlList,
		options?: {
            idCard?: string,
			idList?: string,
            idSticker?: string,
            image?: string,
            top?: number,
            left?: number,
            zIndex?: number,
            body?: Record<string, any>
        }
	) {
		const params: Record<string, any> = { key: data.key, token: data.token };
		Object.assign(params, options);
		let url = processUrl(endpointKey, params);

		return cy.api({
			method: method,
			url: url,
			body: options?.body,
		});
	}
}
