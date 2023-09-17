class sticker {
	createList(key, token, boardData, listName) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/boards',
				qs: {
					key: key, // API key de Trello
					token: token, //token de acceso de Trello
				},
				body: boardData,
			})
			.then(responseBoard => {
				const resBoard = responseBoard;
				const boardId = responseBoard.body.id;

				cy.request({
					method: 'POST',
					url: 'https://api.trello.com/1/lists',
					qs: {
						key: key, // API key de Trello
						token: token, //token de acceso de Trello
					},
					body: {
						name: listName,
						idBoard: boardId,
					},
				}).then(responseList => {
					const resList = responseList;
					// ID de la lista recién creada
					const listId = responseList.body.id;

					return {
						resBoard: resBoard,
						resList: resList,
						idBoard: boardId,
						idList: listId,
					};
				});
			});
	}

	createCard(key, token, cardName, listId) {
		return cy
			.request({
				method: 'POST',
				url: 'https://api.trello.com/1/cards',
				qs: {
					key: key, // API key de Trello
					token: token, //token de acceso de Trello
				},
				body: {
					name: cardName,
					idList: listId,
				},
			})
			.then(cardResponse => {
				const resCard = cardResponse;
				return resCard;
			});
	}

	addStickersRandom(key, token, cardIdSticker, idCard, minTop, maxTop, minLeft, maxLeft, minRotate, maxRotate, zIndex) {
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/cards/${cardIdSticker}/stickers`,
				qs: {
					key: key, // API key de Trello
					token: token, //token de acceso de Trello
				},
			})
			.then(imageStickers => {
				// Array para almacenar nombres de imágenes
				const stickerImageRandom = [];

				imageStickers.body.forEach((sticker, index) => {
					const imageSticker = sticker.image;
					// Verifica si el nombre de la imagen ya está en el array
					if (stickerImageRandom.includes(imageSticker)) {
						// Si el nombre de la imagen ya está en el array, enviar el siguiente  mensaje:
						cy.log(`La imagen #${index} es una imagen repetida: ${imageSticker}`);
					} else {
						// Agrega el nombre de la imagen al array si no está repetida
						stickerImageRandom.push(imageSticker);
					}
				});

				let index = Cypress._.random(0, stickerImageRandom.length - 1);
				let image = stickerImageRandom[index];

				let top = Cypress._.random(minTop, maxTop, true);
				let left = Cypress._.random(minLeft, maxLeft, true);
				let rotate = Cypress._.random(minRotate, maxRotate, true);
				cy.request({
					method: 'POST',
					url: `https://api.trello.com/1/cards/${idCard}/stickers`,
					qs: {
						image: image,
						top: top,
						left: left,
						zIndex: zIndex,
						rotate: rotate,
						key: key,
						token: token,
					},
				}).then(respAddStickers => {
					const resAddStickers = respAddStickers;
					return resAddStickers;
				});
			});
	}

	addStickers(key, token, cardIdSticker, idCard, top, left, zIndex, rotate) {
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/cards/${cardIdSticker}/stickers`,
				qs: {
					key: key, // API key de Trello
					token: token, //token de acceso de Trello
				},
			})
			.then(imageStickers => {
				// Array para almacenar nombres de imágenes
				const stickerImage = [];

				imageStickers.body.forEach((sticker, index) => {
					const imageSticker = sticker.image;
					// Verifica si el nombre de la imagen ya está en el array
					if (stickerImage.includes(imageSticker)) {
						// Si el nombre de la imagen ya está en el array, enviar el siguiente  mensaje:
						cy.log(`La imagen #${index} es una imagen repetida: ${imageSticker}`);
					} else {
						// Agrega el nombre de la imagen al array si no está repetida
						stickerImage.push(imageSticker);
					}
				});

				let index = Cypress._.random(0, stickerImage.length - 1);
				let image = stickerImage[index];

				cy.request({
					method: 'POST',
					url: `https://api.trello.com/1/cards/${idCard}/stickers`,
					failOnStatusCode: false,
					qs: {
						image: image,
						top: top,
						left: left,
						zIndex: zIndex,
						rotate: rotate,
						key: key,
						token: token,
					},
				}).then(respAddStickers => {
					const resAddStickers = respAddStickers;
					return resAddStickers;
				});
			});
	}

	updateStickersRandom(key, token, cardId, stickerId, minTop, maxTop, minLeft, maxLeft, minRotate, maxRotate, zIndex) {
		let top = Cypress._.random(minTop, maxTop, true);
		let left = Cypress._.random(minLeft, maxLeft, true);
		let rotate = Cypress._.random(minRotate, maxRotate, true);
		return cy
			.request({
				method: 'PUT',
				url: `https://api.trello.com/1/cards/${cardId}/stickers/${stickerId}`,
				qs: {
					top: top,
					left: left,
					zIndex: zIndex,
					rotate: rotate,
					key: key,
					token: token,
				},
			})
			.then(respUpdateStickers => {
				const resUpdateStickers = respUpdateStickers;
				return resUpdateStickers;
			});
	}

	updateStickers(key, token, cardId, stickerId, top, left, rotate, zIndex) {
		return cy
			.request({
				method: 'PUT',
				url: `https://api.trello.com/1/cards/${cardId}/stickers/${stickerId}`,
				failOnStatusCode: false,
				qs: {
					top: top,
					left: left,
					zIndex: zIndex,
					rotate: rotate,
					key: key,
					token: token,
				},
			})
			.then(respUpdateStickers => {
				const resUpdateStickers = respUpdateStickers;
				return resUpdateStickers;
			});
	}

	getStickers(key, token, cardId) {
		return cy
			.request({
				method: 'GET',
				url: `https://api.trello.com/1/cards/${cardId}/stickers`,
				qs: {
					key: key, // API key de Trello
					token: token, //token de acceso de Trello
				},
			})
			.then(respGetStickers => {
				const resGetStickers = respGetStickers;
				return resGetStickers;
			});
	}

	deleteStickers(key, token, cardId, stickerId) {
		return cy
			.request({
				method: 'DELETE',
				url: `https://api.trello.com/1/cards/${cardId}/stickers/${stickerId}`,
				qs: {
					key: key, // API key de Trello
					token: token, //token de acceso de Trello
				},
			})
			.then(respDeleteStickers => {
				const resDeleteStickers = respDeleteStickers;
				return resDeleteStickers;
			});
	}

	deleteBoard(key, token, boardId) {
		return cy
			.request({
				method: 'DELETE',
				url: `https://api.trello.com/1/boards/${boardId}`,
				qs: {
					key: key, // API key de Trello
					token: token, //token de acceso de Trello
				},
			})
			.then(respDeleteBoard => {
				const resDeleteBoard = respDeleteBoard;
				return resDeleteBoard;
			});
	}
}

export const stickers = new sticker();
