/* eslint-disable no-duplicate-imports */
import { processUrl } from '../types/GX2-16267-urlData';
import { urlList } from '../types/GX2-16267-urlData';
import dataJson from '../../fixtures/data/GX2-16267-Cards.json';
import type { TrelloDataParams } from '../types/GX2-16267-responseType';
const data: TrelloDataParams = dataJson as TrelloDataParams;

export class TrelloCardApi {
	static request(
		method: string,
		endpointKey: urlList,
		options?: {
			failOnStatusCode?: boolean,
            idCard?: string,
			idList?: string,
			idBoard?: string,
            idSticker?: string,
            image?: string,
            top?: number,
            left?: number,
            zIndex?: number,
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
			failOnStatusCode: options?.failOnStatusCode
		});
	}
	static getRandomInt(min : number, max : number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	static addRandomSticker(options?: { idCard?: string; top?: number; left?: number; image?: string; zIndex?: number }) {

		const idCard = options?.idCard;
		const stickerImage = options?.image || data.stickers.defaultStickers[Math.floor(Math.random() * data.stickers.defaultStickers.length)];
		const top = options?.top === undefined ?  TrelloCardApi.getRandomInt(-60, 100)  : options.top;
		const left = options?.left === undefined ? TrelloCardApi.getRandomInt(-60, 100) : options.left;
		const zIndex = options?.zIndex === undefined ? TrelloCardApi.getRandomInt(0, 10) : options.zIndex;

		return TrelloCardApi.request('POST', urlList.addStickerToCard, {
			failOnStatusCode: false,
			idCard: idCard,
			image: stickerImage,
			top: top,
			left: left,
			zIndex: zIndex
		});
	}
	static generateNumberAbove100(): number {
		return Math.floor(Math.random() * 100) + 101;
	}
	static generateNumberBelowMinus60(): number {
		return Math.floor(Math.random() * 60) - 120;
	}
}
