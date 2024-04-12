/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TrelloCardApi } from '@pages/GX2-16267-cards.Page';
import type { TrelloDataParams } from '../../../support/types/responseType';
import dataJson from '../../../fixtures/data/GX2-16267-Cards.json';
import { method, urlList } from 'cypress/support/types/urlData';
import { faker } from '@faker-js/faker';

const dataParams: TrelloDataParams = dataJson as TrelloDataParams;
const cardNameA : string =  faker.commerce.productName();
const description : string =  faker.commerce.productDescription();

describe('GX3-3077 | Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	it('GX3-3081 | TC1: Check that the user can create a card on the Backlog list', () => {
		const options = {
			idList: dataParams.listBacklogId,
			body: {
				name: cardNameA,
				desc: description,
			}
		};
		TrelloCardApi.request(method.POST, urlList.createCard, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(options.body.name);
				expect(response.body.desc).to.eql(options.body.desc);
				dataParams.idCardA = response.body.id;
			});
	});
	it('GX3-3081 | Check that the user can Add a Sticker to card A', () => {
		const options = {
			idCard: dataParams.idCardA,
			body: {
				top: dataParams.top,
				zIndex: dataParams.zIndex,
				left: dataParams.left,
				image: dataParams.image
			}
		};
		TrelloCardApi.request(method.POST, urlList.addStickerToCard, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				dataParams.stickerId = response.body.id;
			});
	});
	it('GX3-3081 | Check that the user can get a Sticker', () => {
		const options = {
			idCard: dataParams.idCardA,
			idSticker: dataParams.stickerId,
		};
		TrelloCardApi.request(method.GET, urlList.getSticker, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.id).to.eql(dataParams.stickerId);
				expect(response.body.top).to.eql(dataParams.top);
			});
	});
	it('GX3-3081 | Check that the user can delete the card', () => {
		const options = {
			idList: dataParams.listBacklogId
		};
		TrelloCardApi.request(method.POST, urlList.archiveCardsInList, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
});