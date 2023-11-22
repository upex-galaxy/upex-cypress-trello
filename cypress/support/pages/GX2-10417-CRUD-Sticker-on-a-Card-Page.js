import { APIkey, APItoken, idList, arrayStickers } from 'cypress/fixtures/data/GX2-10417-CRUDStickerOnACard.json';

const leftMin = -60;
const leftMax = 100;
const topMin = -60;
const topMax = 100;
const zIndexMin = 1;
const zIndexMax = 5;
const rotateMin = 0;
const rotateMax = 360;
const randomLeft = Math.floor(Math.random() * (leftMax - leftMin + 1) + leftMin);
const randomTop = Math.floor(Math.random() * (topMax - topMin + 1) + topMin);
const randomZIndex = Math.floor(Math.random() * (zIndexMax - zIndexMin + 1) + zIndexMin);
const randomRotate = Math.floor(Math.random() * (rotateMax - rotateMin + 1) + rotateMin);
const randomIndexSticker = Math.floor(Math.random() * arrayStickers.length);

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
					name: 'CARD 1',
					desc: 'probando 1 2 3',
				},
			})
			.then(response => {
				this.cardID = response.body.id;
			});
	}

	addRandomStickerToCard() {
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

	updateStickerToCard() {
		return cy.api({
			method: 'PUT',
			url: `/cards/${this.cardID}/stickers/${this.stickerId}`,
			qs: {
				key: APIkey,
				token: APItoken,
				top: randomTop,
				left: randomLeft,
				zIndex: randomZIndex,
				rotate: randomRotate,
			},
		});
	}
}

export const stickerCardPage = new StickerOnCardPage();
