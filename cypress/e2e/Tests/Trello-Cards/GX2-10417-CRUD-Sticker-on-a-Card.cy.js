import { stickerCardPage } from '@pages/GX2-10417-CRUD-Sticker-on-a-Card-Page';

describe('GX2-10417 - Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	it('TC01: Should add a sticker on a card using valid values', () => {
		stickerCardPage
			.createCard()
			.then(response => {
				expect(response).to.exist.and.to.have.property('status', 200);
				expect(response.body.name).to.be.equal('CARD 1');
			})
			.then(() => {
				stickerCardPage.addRandomStickerToCard().then(response => {
					expect(response.status).to.be.equal(200);
					expect(response.body.image).to.be.equal(stickerCardPage.stickerImage);
				});
			});
	});
});
