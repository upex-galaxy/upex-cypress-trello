import {
	APIkey,
	APItoken,
	idList,
	arrayStickers,
	leftMin,
	leftMax,
	topMin,
	topMax,
	zIndexMin,
	zIndexMax,
	rotateMin,
	rotateMax,
	cardDescription,
	newCardName,
} from '../../fixtures/data/GX2-10417-CRUDStickerOnACard.json';

let randomLeft = Math.floor(Math.random() * (leftMax - leftMin + 1) + leftMin);
let randomTop = Math.floor(Math.random() * (topMax - topMin + 1) + topMin);
let randomZIndex = Math.floor(Math.random() * (zIndexMax - zIndexMin + 1) + zIndexMin);
let randomRotate = Math.floor(Math.random() * (rotateMax - rotateMin + 1) + rotateMin);

let randomValueBelowMinLeft = Cypress._.random(-80, -61);
let randomValueBelowMinTop = Cypress._.random(-80, -61);
let randomValueBelowMinZIndex = Cypress._.random(-0, 0);
let randomValueBelowMinRotate = Cypress._.random(-20, -1);

let randomValueAboveMaxLeft = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - leftMax) + leftMax);
let randomValueAboveMaxTop = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - topMax) + topMax);
let randomValueAboveMaxZIndex = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - zIndexMax) + zIndexMax);
let randomValueAboveMaxRotate = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - rotateMax) + rotateMax);

let randomIndexSticker = Math.floor(Math.random() * arrayStickers.length);

class StickerOnCardPage {
	get() {
		this.cardID = null;
		this.stickerImage = null;
		this.stickerId = null;
	}

	createCard() {
		return cy
			.api({
				method: 'POST',
				url: '/cards',
				qs: {
					key: APIkey,
					token: APItoken,
					idList: idList,
					name: newCardName,
					desc: cardDescription,
				},
			})
			.then(response => {
				this.cardID = response.body.id;
			});
	}

	addRandomStickerToCardUsingValidValues() {
		return cy
			.api({
				method: 'POST',
				url: `/cards/${this.cardID}/stickers`,
				qs: {
					key: APIkey,
					token: APItoken,
					top: randomTop,
					left: randomLeft,
					zIndex: randomZIndex,
					rotate: randomRotate,
					image: arrayStickers[randomIndexSticker],
				},
			})
			.then(response => {
				this.stickerImage = response.body.image;
				this.stickerId = response.body.id;
			});
	}

	addRandomStickerToCardUsingInferiorLimitValid() {
		return cy
			.api({
				method: 'POST',
				url: `/cards/${this.cardID}/stickers`,
				qs: {
					key: APIkey,
					token: APItoken,
					top: topMin,
					left: leftMin,
					zIndex: zIndexMin,
					rotate: rotateMin,
					image: arrayStickers[randomIndexSticker],
				},
			})
			.then(response => {
				this.stickerImage = response.body.image;
				this.stickerId = response.body.id;
			});
	}

	addRandomStickerToCardUsingSuperiorLimitValid() {
		return cy
			.api({
				method: 'POST',
				url: `/cards/${this.cardID}/stickers`,
				qs: {
					key: APIkey,
					token: APItoken,
					top: topMax,
					left: leftMax,
					zIndex: zIndexMax,
					rotate: rotateMax,
					image: arrayStickers[randomIndexSticker],
				},
			})
			.then(response => {
				this.stickerImage = response.body.image;
				this.stickerId = response.body.id;
			});
	}

	addRandomStickerToCardUsingInferiorLimitInvalid() {
		return cy.api({
			method: 'POST',
			url: `/cards/${this.cardID}/stickers`,
			failOnStatusCode: false,
			qs: {
				key: APIkey,
				token: APItoken,
				top: randomValueBelowMinTop,
				left: randomValueBelowMinLeft,
				zIndex: randomValueBelowMinZIndex,
				rotate: randomValueBelowMinRotate,
			},
		});
	}

	addRandomStickerToCardUsingSuperiorLimitInvalid() {
		return cy.api({
			method: 'POST',
			url: `/cards/${this.cardID}/stickers`,
			failOnStatusCode: false,
			qs: {
				key: APIkey,
				token: APItoken,
				top: randomValueAboveMaxTop,
				left: randomValueAboveMaxLeft,
				zIndex: randomValueAboveMaxZIndex,
				rotate: randomValueAboveMaxRotate,
			},
		});
	}

	updateStickerToACard() {
		return cy
			.api({
				method: 'PUT',
				url: `/cards/${this.cardID}/stickers/${this.stickerId}`,
				qs: {
					key: APIkey,
					token: APItoken,
					top: topMin,
					left: leftMin,
					zIndex: zIndexMin,
					rotate: rotateMin,
					image: arrayStickers[randomIndexSticker],
				},
			})
			.then(response => {
				this.stickerImage = response.body.image;
				this.stickerId = response.body.id;
			});
	}

	getStickers() {
		return cy.api({
			method: 'GET',
			url: `/cards/${this.cardID}/stickers/${this.stickerId}`,
			qs: {
				key: APIkey,
				token: APItoken,
				image: arrayStickers[randomIndexSticker],
			},
		});
	}

	deleteSticker() {
		return cy.api({
			method: 'DELETE',
			url: `https://api.trello.com/1/cards/${this.cardID}/stickers/${this.stickerId}`,
			qs: {
				key: APIkey,
				token: APItoken,
			},
		});
	}

	deleteCardWithSticker() {
		return cy.api({
			method: 'DELETE',
			url: `/cards/${this.cardID}`,
			qs: {
				key: APIkey,
				token: APItoken,
			},
		});
	}
}

export const stickerCardPage = new StickerOnCardPage();
