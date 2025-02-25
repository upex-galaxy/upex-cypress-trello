import { processUrl } from '../types/GX2-16267-urlData';
import type { urlList } from '../types/GX2-16267-urlData';
import dataJson from '../../fixtures/data/GX2-16267-Cards.json';
import type { TrelloDataParams } from '../types/GX2-16267-responseType';
const data: TrelloDataParams = dataJson as TrelloDataParams;

export class TrelloCardApi {
	static request(
		method: string,
		endpointKey: urlList,
		options?: {
            idCard?: string,
            idList?: string,
            body?: Record<string, any>
        }
	) {
		const params: Record<string, any> = { key: data.auth.key, token: data.auth.token };
		Object.assign(params, options);
		let url = processUrl(endpointKey, params);

		return cy.api({
			method: method,
			url: url,
			body: options?.body,
		});
	}
}
