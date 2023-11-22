import { stickerCardPage } from '@pages/GX2-10417-CRUD-Sticker-on-a-Card-Page';

describe('GX2-10417 - Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	it('Validate create a new card', () => {
		stickerCardPage.createCard().then(response => {
			expect(response).to.exist.and.to.have.property('status', 200);
		});
	});

	it('The card should contain a sticker', () => {
		stickerCardPage.addRandomStickerToCard().then(response => {
			expect(response.status).to.be.equal(200);
		});
	});
});
