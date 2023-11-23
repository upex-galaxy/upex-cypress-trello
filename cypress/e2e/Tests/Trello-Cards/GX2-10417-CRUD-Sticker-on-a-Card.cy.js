import { stickerCardPage } from '@pages/GX2-10417-CRUD-Sticker-on-a-Card-Page';
import { successful, newCardName } from '../../../fixtures/data/GX2-10417-CRUDStickerOnACard.json';

describe('GX2-10417 - Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	beforeEach('10418 | Precondition: Should add a sticker on a card using valid values', () => {
		stickerCardPage
			.createCard()
			.then(response => {
				expect(response).to.exist.and.to.have.property('status', successful);
				expect(response.body.name).to.be.equal(newCardName);
			})
			.then(() => {
				stickerCardPage.addRandomStickerToCard().then(response => {
					expect(response.status).to.be.equal(successful);
					expect(response.body.image).to.be.equal(stickerCardPage.stickerImage);
				});
			});
	});

	it('10418 | TC01: Should updated a sticker on a card using valid values', () => {
		return stickerCardPage.updateStickerToACard().then(response => {
			expect(response.status).to.be.equal(successful);
			expect(response.body.image).to.be.equal(stickerCardPage.stickerImage);
		});
	});

	it('10418 | TC02: Validate get all the stickers added on the cards', () => {
		stickerCardPage.getStickers().then(response => {
			expect(response.status).to.eql(successful);
		});
	});

	it('10418 | TC03: Should deleted a sticker on a card', () => {
		stickerCardPage.deleteSticker().then(response => {
			expect(response.status).to.eql(successful);
			expect(response.body.stickers).to.be.empty;
		});
	});

	afterEach('Delete card with sticker', () => {
		stickerCardPage.deleteCardWithSticker();
	});
});
