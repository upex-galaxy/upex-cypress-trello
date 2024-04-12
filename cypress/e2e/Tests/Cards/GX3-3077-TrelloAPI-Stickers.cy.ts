/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TrelloCardApi } from '@pages/GX2-16267-cards.Page';
import type { GetListByIdResponse, GetCardByIdResponse, TrelloDataQueryParams, TrelloDataPathParameters } from '../../../support/types/responseType';
import dataJson from '../../../fixtures/data/GX2-16267-Cards.json';
import { method, urlList } from 'cypress/support/types/urlData';
import { faker } from '@faker-js/faker';

const dataQp: TrelloDataQueryParams = dataJson as TrelloDataQueryParams;
const dataPath: TrelloDataPathParameters = dataJson as TrelloDataPathParameters;
const cardNameA : string =  faker.commerce.productName();
const description : string =  faker.commerce.productDescription();

describe('GX3-3077 | Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	it('GX3-3081 | TC1: Check that the user can create a card on the Backlog list', () => {
		const options = {
			name: cardNameA,
			desc: description,
		};
		TrelloCardApi.request(method.POST, urlList.createCard, dataQp.listBacklogId, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(options.name);
				expect(response.body.desc).to.eql(options.desc);
				dataQp.idCardA = response.body.id;
			});
	});
	it('GX3-3081 | Check that the user can Add a Sticker to card A', () => {
		TrelloCardApi.request(method.POST, urlList.addStickerToCard, dataQp.idCardA)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				dataQp.idSticker = response.body.id;
			});
	});
	it('GX3-3081 | Check that the user can get a Sticker', () => {
		TrelloCardApi.request(method.GET, urlList.getSticker, dataQp.idCardA)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.id).to.eql(dataQp.idSticker);
				expect(response.body.top).to.eql(dataPath.top);
			});
	});
	it('GX3-3081 | Check that the user can delete the card', () => {
		TrelloCardApi.request(method.POST, urlList.archiveCardsInList, dataQp.listBacklogId)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
});