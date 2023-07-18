import { key, token, stickerList, arrayStickers, customImage, urlCustomImage } from '../../fixtures/data/sticker.json';
const randomPosition = Math.floor(Math.random() * (100 - 60));
class Sticker {
	getListA() {
		return cy.api({
			method: 'GET',
			url: `https://trello.com/1/lists/${stickerList}`,
			qs: {
				key,
				token,
				name: 'STICKER LIST',
			},
		});
	}

	createCard() {
		return cy
			.api({
				method: 'POST',
				url: 'https://trello.com/1/cards',
				body: {
					key,
					token,
					name: 'STICKER CARD',
					idList: stickerList,
				},
			})
			.then(response => {
				Cypress.env('cardId', response.body.id);
			});
	}

	createCard2() {
		return cy
			.api({
				method: 'POST',
				url: 'https://trello.com/1/cards',
				body: {
					key,
					token,
					name: 'STICKER CARD 2',
					idList: stickerList,
				},
			})
			.then(response => {
				Cypress.env('cardId2', response.body.id);
			});
	}

	addRandomSticker() {
		const randomSticker = Math.floor(Math.random() * arrayStickers.length);

		return cy
			.api({
				method: 'POST',
				url: `https://trello.com/1/cards/${Cypress.env('cardId')}/stickers`,
				qs: {
					key,
					token,
					image: arrayStickers[randomSticker],
					top: randomPosition,
					left: randomPosition,
					zIndex: 1,
				},
			})
			.then(response => {
				Cypress.env('stickerName', response.body.image);
				Cypress.env('stickerId', response.body.id);
			});
	}

	addCustomSticker() {
		return cy.api({
			method: 'POST',
			url: `https://trello.com/1/cards/${Cypress.env('cardId2')}/stickers`,
			qs: {
				key,
				token,
				image: customImage,
				top: randomPosition,
				left: randomPosition,
				zIndex: 1,
			},
		});
	}

	updateStickerMaxMin(values, rotates, index = 0, responses = []) {
		const value = values[index];
		const rotateValue = rotates[index];

		if (value === undefined || rotateValue === undefined) {
			return responses;
		}

		return cy
			.api({
				method: 'PUT',
				url: `https://api.trello.com/1/cards/${Cypress.env('cardId')}/stickers/${Cypress.env('stickerId')}`,
				qs: {
					top: value,
					left: value,
					zIndex: 2,
					key,
					token,
					rotate: rotateValue,
				},
			})
			.then(response => {
				responses.push(response);
				return this.updateStickerMaxMin(values, rotates, index + 1, responses);
			});
	}
	updateInvalidMaxValues() {
		return cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/cards/${Cypress.env('cardId')}/stickers/${Cypress.env('stickerId')}`,
			failOnStatusCode: false,
			qs: {
				top: 101,
				left: 101,
				zIndex: 2,
				key,
				token,
				rotate: 361,
			},
		});
	}

	updateInvalidMinValues() {
		return cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/cards/${Cypress.env('cardId')}/stickers/${Cypress.env('stickerId')}`,
			failOnStatusCode: false,
			qs: {
				top: -59,
				left: -59,
				zIndex: 2,
				key,
				token,
				rotate: -1,
			},
		});
	}

	getStickers() {
		return cy.api({
			method: 'GET',
			url: `https://api.trello.com/1/cards/${Cypress.env('cardId')}/stickers`,
			qs: {
				key,
				token,
			},
		});
	}

	getCustomStickers() {
		return cy.api({
			method: 'GET',
			url: `https://api.trello.com/1/cards/${Cypress.env('cardId2')}/stickers`,
			qs: {
				key,
				token,
				imageUrl: urlCustomImage,
			},
		});
	}

	deleteSticker() {
		return cy.api({
			method: 'DELETE',
			url: `https://api.trello.com/1/cards/${Cypress.env('cardId')}/stickers/${Cypress.env('stickerId')}`,
			qs: {
				key,
				token,
			},
		});
	}
}

export const sticker = new Sticker();
