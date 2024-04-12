/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TrelloCardApi } from '@pages/GX2-16267-cards.Page';
import type { GetStickerByIdResponse, TrelloDataParams } from '../../../support/types/responseType';
import dataJson from '../../../fixtures/data/GX2-16267-Cards.json';
import { method, urlList } from 'cypress/support/types/urlData';
import { faker } from '@faker-js/faker';

const dataParams: TrelloDataParams = dataJson as TrelloDataParams;
const cardNameA : string =  faker.commerce.productName();
const description : string =  faker.commerce.productDescription();

const expectedStickerResult = (stickerId : string, responseBody : GetStickerByIdResponse) => {
	expect(responseBody).to.have.property('id').that.is.equal(stickerId);
	expect(responseBody).to.have.property('id').that.is.a('string');
	expect(responseBody).to.have.property('top').that.is.a('number');
	expect(responseBody).to.have.property('left').that.is.a('number');
	expect(responseBody).to.have.property('zIndex').that.is.a('number');
	expect(responseBody).to.have.property('rotate').that.is.a('number');
	expect(responseBody).to.have.property('image').that.is.a('string');
	expect(responseBody).to.have.property('imageUrl').that.is.a('string').and.includes('http');
	expect(responseBody).to.have.property('imageScaled').that.is.an('array');
};

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
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				dataParams.stickerId = response.body.id;
				expectedStickerResult(dataParams.stickerId, responseBody);
			});
	});
	it('GX3-3081 | Check that the user can get a Sticker', () => {
		const options = {
			idCard: dataParams.idCardA,
			idSticker: dataParams.stickerId,
		};
		TrelloCardApi.request(method.GET, urlList.getSticker, options)
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.top).to.eql(dataParams.top);
				expect(response.body.image).to.eql(dataParams.image);
				expectedStickerResult(dataParams.stickerId, responseBody);
			});
	});
	it('GX3-3081 | Check that the user can update a Sticker', () => {
		const options = {
			idCard: dataParams.idCardA,
			idSticker: dataParams.stickerId,
			body: {
				top: 50,
				left: 50,
			}
		};
		TrelloCardApi.request(method.PUT, urlList.getSticker, options)
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.top).to.eql(options.body.top);
				expect(response.body.left).to.eql(options.body.left);
				expectedStickerResult(dataParams.stickerId, responseBody);
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