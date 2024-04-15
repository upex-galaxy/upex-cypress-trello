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
	before('GX3-3081 | Precon: The user creates a Backlog, Active and Done  List',() => {
		const optionsBacklog = {
			idBoard: dataParams.board.idBoard,
			name: dataParams.lists.backlog.name
		};
		const optionsActive = {
			idBoard: dataParams.board.idBoard,
			name: dataParams.lists.active.name
		};
		const optionsDone = {
			idBoard: dataParams.board.idBoard,
			name: dataParams.lists.done.name
		};
		TrelloCardApi.request(method.POST, urlList.createList, optionsBacklog).then(response => {
			expect(response).to.be.an('object');
			expect(response.status).to.eql(200);
			dataParams.lists.backlog.id = response.body.id;
		});
		TrelloCardApi.request(method.POST, urlList.createList, optionsActive).then(response => {
			expect(response).to.be.an('object');
			expect(response.status).to.eql(200);
			dataParams.lists.active.id = response.body.id;
		});
		TrelloCardApi.request(method.POST, urlList.createList, optionsDone).then(response => {
			expect(response).to.be.an('object');
			expect(response.status).to.eql(200);
			dataParams.lists.done.id = response.body.id;
		});
	});
	it('GX3-3081 | TC1: Check that the user can create a card on the Backlog list', () => {
		const options = {
			idList: dataParams.lists.backlog.id,
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
				dataParams.cards.idCardA = response.body.id;
			});
	});
	it('GX3-3081 | TC2:Check that the user can Add a Sticker to card A', () => {
		TrelloCardApi.addRandomSticker(dataParams.cards.idCardA)
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				dataParams.stickers.id = response.body.id;
				dataParams.stickers.randomStickerName = response.body.image;
				expectedStickerResult(dataParams.stickers.id, responseBody);
			});
	});
	it('GX3-3081 | TC3:Check that the user can get a Sticker', () => {
		const options = {
			idCard: dataParams.cards.idCardA,
			idSticker: dataParams.stickers.id,
		};
		TrelloCardApi.request(method.GET, urlList.getSticker, options)
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.image).to.eql(dataParams.stickers.randomStickerName);
				expectedStickerResult(dataParams.stickers.id, responseBody);
			});
	});
	it('GX3-3081 | TC4:Check that the user can update a Sticker', () => {
		const options = {
			idCard: dataParams.cards.idCardA,
			idSticker: dataParams.stickers.id,
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
				expectedStickerResult(dataParams.stickers.id, responseBody);
			});
	});
	it('GX3-3081 | TC5:Check that the user can delete the sticker', () => {
		const options = {
			idCard: dataParams.cards.idCardA,
			idSticker: dataParams.stickers.id,
		};
		TrelloCardApi.request(method.DELETE, urlList.getSticker, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
	it('GX3-3081 | TC6:Check that the user can delete the card', () => {
		const options = {
			idList: dataParams.lists.backlog.id
		};
		TrelloCardApi.request(method.POST, urlList.archiveCardsInList, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
	after(() => {
		const optionsBacklog = {
			idList: dataParams.lists.backlog.id,
			body: {
				closed: true,
			}
		};
		const optionsActive = {
			idList: dataParams.lists.active.id,
			body: {
				closed: true,
			}
		};
		const optionsDone = {
			idList: dataParams.lists.done.id,
			body: {
				closed: true,
			}
		};
		TrelloCardApi.request(method.PUT, urlList.deleteList, optionsBacklog).then(response => {
			expect(response).to.be.an('object');
			expect(response.status).to.eql(200);
		});
		TrelloCardApi.request(method.PUT, urlList.deleteList, optionsActive).then(response => {
			expect(response).to.be.an('object');
			expect(response.status).to.eql(200);
		});
		TrelloCardApi.request(method.PUT, urlList.deleteList, optionsDone).then(response => {
			expect(response).to.be.an('object');
			expect(response.status).to.eql(200);
		});
	});
});