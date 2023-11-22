import { stickerCardPage } from '@pages/GX2-10417-CRUD-Sticker-on-a-Card-Page';

describe('GX2-10417 - Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	it('Precondition: Create a new card', () => {
		stickerCardPage.createCard().then(response => {
			expect(response).to.exist.and.to.have.property('status', 200);
		});
	});

	it('TC01: Should add a sticker on a card using valid values', () => {
		stickerCardPage.addRandomStickerToCard().then(response => {
			expect(response.status).to.be.equal(200);
		});
	});
});
