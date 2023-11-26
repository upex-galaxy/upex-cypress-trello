import { stickerCardPage } from '@pages/GX2-10417-CRUD-Sticker-on-a-Card-Page';
import {
	successful,
	badRequest,
	newCardName,
	leftMin,
	topMin,
	zIndexMin,
	rotateMin,
	leftMax,
	topMax,
	zIndexMax,
	rotateMax,
} from '../../../fixtures/data/GX2-10417-CRUDStickerOnACard.json';

describe('GX2-10417 - Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	context('Happy path', () => {
		beforeEach('10418 | Precondition: Should add a sticker on a card using valid values', () => {
			stickerCardPage
				.createCard()
				.then(response => {
					expect(response).to.exist.and.to.have.property('status', successful);
					expect(response.body.name).to.be.equal(newCardName);
				})
				.then(() => {
					stickerCardPage.addRandomStickerToCardUsingValidValues().then(response => {
						expect(response.status).to.be.equal(successful);
						expect(response.body.image).to.be.equal(stickerCardPage.stickerImage);
					});
				});
		});

		it('10418 | TC01: Should update a sticker on a card using valid values', () => {
			return stickerCardPage.updateStickerToACard().then(response => {
				expect(response.status).to.be.equal(successful);
				expect(response.body.image).to.be.equal(stickerCardPage.stickerImage);
			});
		});

		it('10418 | TC02: Should get the sticker added on the card using valid values', () => {
			stickerCardPage.getStickers().then(response => {
				expect(response.status).to.eql(successful);
			});
		});

		it('10418 | TC03: Should delete a sticker on a card using valid values', () => {
			stickerCardPage.deleteSticker().then(response => {
				expect(response.status).to.eql(successful);
				expect(response.body.stickers).to.be.empty;
			});
		});

		it('10418| TC04: Should add a sticker on a card using minimum values', () => {
			stickerCardPage.addRandomStickerToCardUsingInferiorLimitValid().then(response => {
				expect(response).to.have.property('status');
				expect(response.status).to.be.equal(successful);
				expect(response.body.top).to.be.equal(topMin);
				expect(response.body.left).to.be.equal(leftMin);
				expect(response.body.zIndex).to.be.equal(zIndexMin);
				expect(response.body.rotate).to.be.equal(rotateMin);
			});
		});

		it('10418| TC05: Should add a sticker on a card using superior values', () => {
			stickerCardPage.addRandomStickerToCardUsingSuperiorLimitValid().then(response => {
				expect(response).to.have.property('status');
				expect(response.status).to.be.equal(successful);
				expect(response.body.top).to.be.equal(topMax);
				expect(response.body.left).to.be.equal(leftMax);
				expect(response.body.zIndex).to.be.equal(zIndexMax);
				expect(response.body.rotate).to.be.equal(rotateMax);
			});
		});

		afterEach('Delete card with sticker', () => {
			stickerCardPage.deleteCardWithSticker();
		});
	});

	context('Negatives TC', () => {
		beforeEach('10418 | Precondition: Create a card on a list', () => {
			return stickerCardPage.createCard().then(response => {
				expect(response).to.exist.and.to.have.property('status', successful);
				expect(response.body.name).to.be.equal(newCardName);
			});
		});

		it('10418| TC06: Should not add a sticker with max invalid value limits', () => {
			stickerCardPage.addRandomStickerToCardUsingSuperiorLimitInvalid().then(response => {
				expect(response.status).to.eql(badRequest);
				expect(response.body).to.be.equal('invalid value for image');
			});
		});

		it.skip('10418| TC07: Should not add a sticker with min invalid value limit', () => {
			// Test was skipped because have bugs.
			stickerCardPage.addRandomStickerToCardUsingInferiorLimitInvalid.then(response => {
				expect(response.status).to.eql(badRequest);
				expect(response.body.left).to.be.lessThan(leftMin);
				expect(response.body.top).to.be.lessThan(topMin);
				expect(response.body.zIndex).to.be.greaterThan(zIndexMin);
				expect(response.body.rotate).to.be.greaterThan(rotateMin);
			});
		});

		afterEach('Delete card with sticker', () => {
			stickerCardPage.deleteCardWithSticker();
		});
	});
});
