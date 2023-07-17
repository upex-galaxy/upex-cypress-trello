import { sticker } from '@pages/sticker';
import { urlCustomImage } from '../../../fixtures/data/sticker.json';

describe('GX-4787 | Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	before('User should have a list created', () => {
		sticker.getListA().then(response => {
			expect(response.status).to.eql(200);
		});
	});
	it('4788|TC1: Validate add a random and Custom sticker to a card', () => {
		// create first card
		sticker
			.createCard()
			.then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql('STICKER CARD');
			})
			.then(() => {
				// add 1 random sticker to the created card
				sticker.addRandomSticker().then(response => {
					expect(response.status).to.eql(200);
					expect(response.body.image).to.eql(Cypress.env('stickerName'));
				});
			});

		// create second card
		sticker
			.createCard2()
			.then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql('STICKER CARD 2');
			})
			.then(() => {
				// add a custom sticker
				sticker.addCustomSticker().then(response => {
					expect(response.status).to.equal(200);
				});
			});
	});
	it('4788|TC2: Validate update a sticker', () => {
		sticker.updateSticker().then(response => {
			expect(response.status).to.eql(200);
		});
	});
	it('4788|TC3: Validate get all the stickers added on the cards', () => {
		sticker.getStickers().then(response => {
			expect(response.body[0].image).to.include(Cypress.env('stickerName'));
		});
		sticker.getCustomStickers().then(response => {
			expect(response.body[0].imageUrl).to.include(urlCustomImage);
		});
	});
	it('4788|TC4: Validate delete a sticker ', () => {
		sticker.deleteSticker().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.stickers).to.be.empty;
		});
	});
});
