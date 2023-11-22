import { stickerCardPage } from '@pages/GX2-10417-CRUD-Sticker-on-a-Card-Page';

describe('GX2-10417 - Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	it('10418 | TC01: Should add a sticker on a card using valid values', () => {
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

	it('10418 | TC02: Should updated a sticker on a card using valid values', () => {
		stickerCardPage
			.createCard()
			.then(response => {
				expect(response).to.exist.and.to.have.property('status', 200);
				expect(response.body.name).to.be.equal('CARD 1');
			})
			.then(() => {
				return stickerCardPage.addRandomStickerToCard();
			})
			.then(() => {
				// cy.wait(2000);  //para poder ver el cambio hay que poner una espera
				return stickerCardPage.updateStickerToACard();
			})
			.then(response => {
				expect(response.status).to.be.equal(200);
				expect(response.body.image).to.be.equal(stickerCardPage.stickerImage);
			});
	});

	it('10418 | TC03: Validate get all the stickers added on the cards', () => {
		stickerCardPage.getStickers().then(response => {
			expect(response.status).to.eql(200);
		});
	});

	it('10418 | TC04: Should deleted a sticker on a card', () => {
		stickerCardPage.deleteSticker().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.stickers).to.be.empty;
		});
	});
});
