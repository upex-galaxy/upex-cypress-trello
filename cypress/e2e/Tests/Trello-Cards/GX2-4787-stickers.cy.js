import { sticker } from '@pages/GX2-4787-stickerPage';
import data from '../../../fixtures/data/GX2-4787.sticker.json';

describe('GX2-4787 | Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	before('User should have a list created', () => {
		sticker.getListA().then(response => {
			expect(response.status).to.eql(200);
		});
	});
	it('4788 |  TC1: Validate add a random and Custom sticker to a card', () => {
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
	it('4788 |  TC2: Validate update a sticker with their max/min value limits.', () => {
		const values = [100, -60]; // limit values for top and left
		const rotates = [360, 0]; // limit values for rotate

		sticker.updateStickerMaxMin(values, rotates).then(responses => {
			// Validate max values
			expect(responses[0].status).to.eql(200);
			expect(responses[0].body.top).to.eql(data.maxValue);
			expect(responses[0].body.left).to.eql(data.maxValue);
			expect(responses[0].body.rotate).to.eql(data.maxRotate);

			// Validate min values
			expect(responses[1].status).to.eql(200);
			expect(responses[1].body.top).to.eql(data.minValue);
			expect(responses[1].body.left).to.eql(data.minValue);
			expect(responses[1].body.rotate).to.eql(data.minRotate);
		});
	});
	it('4788 | TC3: Validate no update a sticker with max invalid value limits.', () => {
		sticker.updateInvalidMaxValues().then(response => {
			expect(response.status).to.eql(400);
			expect(response.body).to.be.equal('invalid value for top');
		});
	});
	it.skip('4788 | TC4: Validate no update a sticker with min invalid value limits.', () => {
		// Test was skipped because have bugs.
		sticker.updateInvalidMinValues().then(response => {
			expect(response.body.left).to.be.lessThan(data.minValue);
			expect(response.body.top).to.be.lessThan(data.minValue);
			expect(response.body.rotate).to.be.greaterThan(data.minRotate);
		});
	});
	it('4788 | TC5: Validate get all the stickers added on the cards', () => {
		sticker.getStickers().then(response => {
			expect(response.body[0].image).to.include(Cypress.env('stickerName'));
		});
		sticker.getCustomStickers().then(response => {
			expect(response.body[0].imageUrl).to.include(data.urlCustomImage);
		});
	});
	it('4788 | TC6: Validate delete a sticker ', () => {
		sticker.deleteSticker().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.stickers).to.be.empty;
		});
	});
});
