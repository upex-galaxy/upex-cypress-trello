/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TrelloCardApi } from '@pages/GX2-16267-cards.Page';
import type { GetStickerByIdResponse, TrelloDataParams } from '../../../support/types/GX2-16267-responseType';
import dataJson from '../../../fixtures/data/GX2-16267-Cards.json';
import { method, urlList } from 'cypress/support/types/GX2-16267-urlData';
import { faker } from '@faker-js/faker';

const dataParams: TrelloDataParams = dataJson as TrelloDataParams;
const cardNameA : string =  faker.commerce.productName();
const description : string =  faker.commerce.productDescription();

const createTrelloList = (options : {}) => {
	return TrelloCardApi.request(method.POST, urlList.createList, options).then(response => {
		expect(response).to.be.an('object');
		expect(response.status).to.eql(200);
		return response.body.id;
	});
};
const deleteTrelloList = (options : {}) => {
	return TrelloCardApi.request(method.PUT, urlList.deleteList, options).then(response => {
		expect(response).to.be.an('object');
		expect(response.status).to.eql(200);
	});
};

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
	before('Precon: The user creates a Backlog, Active and Done  List',() => {
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
		createTrelloList(optionsBacklog).then(id => {
			dataParams.lists.backlog.id = id;
		});
		createTrelloList(optionsActive).then(id => {
			dataParams.lists.active.id = id;
		});
		createTrelloList(optionsDone).then(id => {
			dataParams.lists.done.id = id;
		});
	});
	beforeEach('Check that the user can create a card on the Backlog list', () => {
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
	it('GX3-3081 | TC1:Check that the user can Add a Sticker to card A', () => {
		TrelloCardApi.addRandomSticker({idCard: dataParams.cards.idCardA})
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				dataParams.stickers.id = response.body.id;
				expectedStickerResult(dataParams.stickers.id, responseBody);
			});
	});
	it('GX3-3081 | TC2:Check that the user can get a Sticker', () => {
		TrelloCardApi.addRandomSticker({idCard: dataParams.cards.idCardA})
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response.status).to.eql(200);
				dataParams.stickers.id = response.body.id;
				dataParams.stickers.randomStickerName = response.body.image;
				expectedStickerResult(dataParams.stickers.id, responseBody);

				const options = {
					idCard: dataParams.cards.idCardA,
					idSticker: dataParams.stickers.id,
				};
				return TrelloCardApi.request(method.GET, urlList.getSticker, options);
			}).then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.image).to.eql(dataParams.stickers.randomStickerName);
				expect(response.body.id).to.eql(dataParams.stickers.id);
				expectedStickerResult(dataParams.stickers.id, responseBody);
			});
	});
	it('GX3-3081 | TC3:Check that the user can update a Sticker', () => {
		TrelloCardApi.addRandomSticker({idCard: dataParams.cards.idCardA})
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response.status).to.eql(200);
				dataParams.stickers.id = response.body.id;
				dataParams.stickers.randomStickerName = response.body.image;
				expectedStickerResult(dataParams.stickers.id, responseBody);

				const options = {
					idCard: dataParams.cards.idCardA,
					idSticker: dataParams.stickers.id,
					top: 10,
					left: 10,
					zIndex: 1,
				};

				return TrelloCardApi.request(method.PUT, urlList.updateSticker, options);
			})
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				const responseBody : GetStickerByIdResponse = response.body;
				expect(responseBody.image).to.eql(dataParams.stickers.randomStickerName);
				expect(responseBody.id).to.eql(dataParams.stickers.id);
				expectedStickerResult(dataParams.stickers.id, responseBody);
			});
	});
	it('GX3-3081 | TC4:Check that the user can delete the sticker', () => {
		TrelloCardApi.addRandomSticker({idCard: dataParams.cards.idCardA})
			.then(response => {
				const responseBody: GetStickerByIdResponse = response.body;
				expect(response.status).to.eql(200);
				dataParams.stickers.id = response.body.id;
				dataParams.stickers.randomStickerName = response.body.image;
				expectedStickerResult(dataParams.stickers.id, responseBody);

				const options = {
					idCard: dataParams.cards.idCardA,
					idSticker: dataParams.stickers.id,
				};

				return TrelloCardApi.request(method.DELETE, urlList.getSticker, options);
			}).then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
	it('GX3-3081 | TC5: Should return a 400 status when idCard is not valid for adding a sticker', () => {
		TrelloCardApi.addRandomSticker({idCard: 'not-valid-card-id'})
			.then(response => {
				expect(response.status).to.eq(400);
				expect(response.body).to.include('invalid id');
			});
	});
	it('GX3-3081 | TC6: Should return a 404 status when required idCard is missing when adding a sticker', () => {
		TrelloCardApi.addRandomSticker({idCard: ''})
			.then(response => {
				expect(response.status).to.eq(404);
				expect(response.statusText).to.eq('Not Found');
			});
	});
	it.only('GX3-3081 | TC7: Should return a 401 status when sticker name is invalid', () => {
		TrelloCardApi.addRandomSticker({idCard: dataParams.cards.idCardA, image: 'notValidSticker'}).then(response => {
			expect(response.status).to.eq(401);
			expect(response.body.message).to.include('invalid sticker');
		});
	});
	afterEach('Check that the user can delete a card on the Backlog list', () => {
		const options = {
			idList: dataParams.lists.backlog.id
		};
		TrelloCardApi.request(method.POST, urlList.archiveCardsInList, options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
	after('Delete all the created lists', () => {
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
		deleteTrelloList(optionsBacklog);
		deleteTrelloList(optionsActive);
		deleteTrelloList(optionsDone);
	});
});