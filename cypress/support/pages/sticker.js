import { key, token, stickerList, arrayStickers, customImage, urlCustomImage } from '../../fixtures/data/sticker.json';
const randomSticker = Math.floor(Math.random() * arrayStickers.length);
const randomPosition = Math.floor(Math.random() * (100 - 60)); // limit values for top and left

class Sticker {
	get = {
		stickerList: () => cy.get('[class^="sticker-list"]'),
	};
	getListA() {
		return cy.api({
			method: 'GET',
			url: 'https://trello.com/1/lists/' + stickerList,
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
				const cardID = response.body.id;
				Cypress.env('cardId', cardID);
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
				const cardID2 = response.body.id;
				Cypress.env('cardId2', cardID2);
			});
	}

	addRandomSticker() {
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
				const stickerName = response.body.image;
				const stickerId = response.body.id;
				Cypress.env('stickerName', stickerName);
				Cypress.env('stickerId', stickerId);
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
	updateSticker() {
		return cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/cards/${Cypress.env('cardId')}/stickers/${Cypress.env('stickerId')}`,

			qs: {
				top: randomPosition,
				left: randomPosition,
				zIndex: 2,
				key,
				token,
				rotate: 100,
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
