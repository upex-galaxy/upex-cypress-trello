import { stickers } from '@pages/stickers/GX2-6416-stickers.Page.js';
import data from '@data/GX2-6416-stickers.json';
import { removeLogs } from '@helper/RemoveLogs';

describe('GX2-6416 | Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card', () => {
	before('Precondition: The user should have a list created', () => {
		const { credentials, boardData, listData, statusCodes } = data;

		// todo: Create list
		stickers.createList(credentials.key, credentials.token, boardData, listData.name).then(responseInfo => {
			// Verificar que el tablero fue creado correctamente
			expect(responseInfo.resBoard.status).to.equal(statusCodes.OK);
			expect(responseInfo.resBoard.body.name).to.equal(boardData.name);

			//todo: Retrieve the Board ID
			Cypress.env('boardId', responseInfo.idBoard);

			// Verificar que la lista fue creada correctamente
			expect(responseInfo.resList.status).to.equal(statusCodes.OK);
			expect(responseInfo.resList.body.name).to.equal(listData.name);

			//todo: Retrieve the list ID
			Cypress.env('listId', responseInfo.idList);
		});
	});

	it('6417 |  TC1: Validate Add a sticker to a card', () => {
		const { credentials, cardIdStickerData, cardData, parametersSticker, statusCodes } = data;

		// todo: Create cards 1 - random values

		stickers.createCard(credentials.key, credentials.token, cardData[0].name, Cypress.env('listId')).then(cardResponse => {
			// Verificar que las tarjetas fueron creadas correctamente
			expect(cardResponse.status).to.equal(statusCodes.OK);
			expect(cardResponse.body.name).to.equal(cardData[0].name);

			//todo: Retrieve the card ID
			Cypress.env('cardId', cardResponse.body.id);

			// capturar valores de ID de tarjetas existentes en la app de Trello que almacenan diferentes pegatinas
			const cardIdStickersData = [
				cardIdStickerData[0].defaultSticker,
				cardIdStickerData[1].dynamicSticker,
				cardIdStickerData[2].customStickers,
			];

			// todo: add a sticker random default, dynamic and custom
			cardIdStickersData.forEach((idStickerData, index) => {
				stickers
					.addStickersRandom(
						credentials.key,
						credentials.token,
						idStickerData,
						cardResponse.body.id,
						parametersSticker.top.limits[0],
						parametersSticker.top.limits[1],
						parametersSticker.left.limits[0],
						parametersSticker.left.limits[1],
						parametersSticker.rotate.limits[0],
						parametersSticker.rotate.limits[1],
						index
					)
					.then(respAddStickers => {
						// Verificar que las pegatinas se agregaron correctamente a la tarjeta
						expect(respAddStickers.status).to.equal(statusCodes.OK);

						//todo: Retrieve the stickers ID
						Cypress.env(`idStickers${index}`, respAddStickers.body.id);
					});
			});
		});

		// todo: Create cards 2 - limit values

		stickers.createCard(credentials.key, credentials.token, cardData[1].name, Cypress.env('listId')).then(cardResponse => {
			// Verificar que la  fue creada correctamente
			expect(cardResponse.status).to.equal(statusCodes.OK);
			expect(cardResponse.body.name).to.equal(cardData[1].name);

			// todo: add a sticker default with  min/max value limits for top/left/rotate

			parametersSticker.top.limits.forEach((top, index) => {
				parametersSticker.left.limits.forEach(left => {
					parametersSticker.rotate.limits.forEach(rotate => {
						stickers
							.addStickers(
								credentials.key,
								credentials.token,
								cardIdStickerData[0].defaultSticker,
								cardResponse.body.id,
								top,
								left,
								index,
								rotate
							)
							.then(respAddStickers => {
								// Verificar que las pegatinas se agregaron correctamente a la tarjeta usando valores min/max para top/left/rotate
								expect(respAddStickers.status).to.equal(statusCodes.OK);
							});
					});
				});
			});
		});
	});

	it('6417 |  TC2: Validate trying to Add a sticker with invalid values', () => {
		const { credentials, cardIdStickerData, cardData, parametersSticker, parametersStickerInvalid, statusCodes } = data;

		// todo: Create cards 3 -invalid values

		stickers.createCard(credentials.key, credentials.token, cardData[2].name, Cypress.env('listId')).then(cardResponse => {
			// Verificar que las tarjeta fue creada correctamente
			expect(cardResponse.status).to.equal(statusCodes.OK);
			expect(cardResponse.body.name).to.equal(cardData[2].name);

			// todo: try to add a sticker default with invalid values for top

			parametersStickerInvalid.top.forEach((top, index) => {
				parametersSticker.left.limits.forEach(left => {
					parametersSticker.rotate.limits.forEach(rotate => {
						stickers
							.addStickers(
								credentials.key,
								credentials.token,
								cardIdStickerData[0].defaultSticker,
								cardResponse.body.id,
								top,
								left,
								index,
								rotate
							)
							.then(respAddStickers => {
								if (respAddStickers.status === 400) {
									// Verificar que las pegatinas no se agregaron a la tarjeta por datos top inválidos
									// y fue enviado un status code 400
									cy.log({ values: { top: top, left: left, rotate: rotate } });
									expect(respAddStickers.status).to.equal(statusCodes.BadRequest);
									expect(respAddStickers.body).to.equal('invalid value for top');
								} else if (respAddStickers.status === 200) {
									cy.log({
										name: 'Error',
										statusCode: respAddStickers.status,
										message: `El test acepta un valor para la propiedad 'top' de ${top}, que está fuera del rango aceptado (-60 a 100) según la documentación de la API de Trello`,
									});
								}
							});
					});
				});
			});

			// todo: try to add a sticker default with invalid values for left
			parametersStickerInvalid.left.forEach((left, index) => {
				parametersSticker.top.limits.forEach(top => {
					parametersSticker.rotate.limits.forEach(rotate => {
						stickers
							.addStickers(
								credentials.key,
								credentials.token,
								cardIdStickerData[0].defaultSticker,
								cardResponse.body.id,
								top,
								left,
								index,
								rotate
							)
							.then(respAddStickers => {
								if (respAddStickers.status === 400) {
									// Verificar que las pegatinas no se agregaron a la tarjeta por datos lef inválidos
									// y fue enviado un status code 400
									cy.log({ values: { top: top, left: left, rotate: rotate } });
									expect(respAddStickers.status).to.equal(statusCodes.BadRequest);
									expect(respAddStickers.body).to.equal('invalid value for left');
								} else if (respAddStickers.status === 200) {
									cy.log({
										name: 'Error',
										statusCode: respAddStickers.status,
										message: `El test acepta un valor para la propiedad 'left' de ${left}, que está fuera del rango aceptado (-60 a 100) según la documentación de la API de Trello`,
									});
								}
							});
					});
				});
			});

			// todo: try to add a sticker default with invalid values for rotate
			parametersStickerInvalid.rotate.forEach((rotate, index) => {
				parametersSticker.top.limits.forEach(top => {
					parametersSticker.left.limits.forEach(left => {
						stickers
							.addStickers(
								credentials.key,
								credentials.token,
								cardIdStickerData[0].defaultSticker,
								cardResponse.body.id,
								top,
								left,
								index,
								rotate
							)
							.then(respAddStickers => {
								if (respAddStickers.status === 400) {
									// Verificar que las pegatinas no se agregaron a la tarjeta por datos rotate inválidos
									// y fue enviado un status code 400
									cy.log({ values: { top: top, left: left, rotate: rotate } });
									expect(respAddStickers.status).to.equal(statusCodes.BadRequest);
									expect(respAddStickers.body).to.equal('invalid value for rotate');
								} else if (respAddStickers.status === 200) {
									cy.log({
										name: 'Error',
										statusCode: respAddStickers.status,
										message: `El test acepta un valor para la propiedad 'rotate' de ${rotate}, que está fuera del rango aceptado (0 a 360) según la documentación de la API de Trello`,
									});
								}
							});
					});
				});
			});
		});
	});

	it('6417 |  TC3: Validate Update a sticker on a card', () => {
		const { credentials, parametersSticker, statusCodes } = data;
		const index = [0, 1, 2]; // permite iterar los id de las 3 pegatinas (predeterminada, dinámica , personalizada) agregadas a la tarjeta

		// todo: update a sticker: default, dynamic, custom  with random values for top/left/rotate
		index.forEach(index => {
			stickers
				.updateStickersRandom(
					credentials.key,
					credentials.token,
					Cypress.env('cardId'),
					Cypress.env(`idStickers${index}`),
					parametersSticker.top.limits[0],
					parametersSticker.top.limits[1],
					parametersSticker.left.limits[0],
					parametersSticker.left.limits[1],
					parametersSticker.rotate.limits[0],
					parametersSticker.rotate.limits[1],
					index
				)
				.then(respUpdateStickers => {
					// Verificar que los parámetros de posición y rotación de las pegatinas fueron actualizados correctamente
					expect(respUpdateStickers.status).to.equal(statusCodes.OK);
				});
		});

		// todo: update a sticker default with  min/max value limits for top/left/rotate
		parametersSticker.top.limits.forEach((top, index) => {
			parametersSticker.left.limits.forEach(left => {
				parametersSticker.rotate.limits.forEach(rotate => {
					stickers
						.updateStickers(
							credentials.key,
							credentials.token,
							Cypress.env('cardId'),
							Cypress.env('idStickers0'),
							top,
							left,
							rotate,
							index
						)
						.then(respUpdateStickers => {
							// Verificar que los parámetros de posición y rotación de las pegatinas fueron actualizados correctamente
							expect(respUpdateStickers.status).to.equal(statusCodes.OK);
						});
				});
			});
		});
	});

	it('6417 |  TC4: Validate trying to Update a sticker with invalid values', () => {
		const { credentials, parametersSticker, parametersStickerInvalid, statusCodes } = data;

		// todo: try to update a sticker default  with invalid values for top
		parametersStickerInvalid.top.forEach((top, index) => {
			parametersSticker.left.limits.forEach(left => {
				parametersSticker.rotate.limits.forEach(rotate => {
					stickers
						.updateStickers(
							credentials.key,
							credentials.token,
							Cypress.env('cardId'),
							Cypress.env('idStickers0'),
							top,
							left,
							rotate,
							index
						)
						.then(respUpdateStickers => {
							if (respUpdateStickers.status === 400) {
								// Verificar que las pegatinas no fueron actualizadas por datos top inválidos
								// y se genera un código de error 400
								cy.log({ values: { top: top, left: left, rotate: rotate } });
								expect(respUpdateStickers.status).to.equal(statusCodes.BadRequest);
								expect(respUpdateStickers.body).to.equal('invalid value for top');
							} else if (respUpdateStickers.status === 200) {
								cy.log({
									name: 'Error',
									statusCode: respUpdateStickers.status,
									message: `El test acepta un valor para la propiedad 'top' de ${top}, que está fuera del rango aceptado (-60 a 100) según la documentación de la API de Trello`,
								});
							}
						});
				});
			});
		});

		// todo: try to update a sticker update a sticker: default  with invalid values for left
		parametersStickerInvalid.left.forEach((left, index) => {
			parametersSticker.top.limits.forEach(top => {
				parametersSticker.rotate.limits.forEach(rotate => {
					stickers
						.updateStickers(
							credentials.key,
							credentials.token,
							Cypress.env('cardId'),
							Cypress.env('idStickers0'),
							top,
							left,
							rotate,
							index
						)
						.then(respUpdateStickers => {
							if (respUpdateStickers.status === 400) {
								// Verificar que las pegatinas no fueron actualizadas por datos left inválidos
								// y se genera un código de error 400
								cy.log({ values: { top: top, left: left, rotate: rotate } });
								expect(respUpdateStickers.status).to.equal(statusCodes.BadRequest);
								expect(respUpdateStickers.body).to.equal('invalid value for left');
							} else if (respUpdateStickers.status === 200) {
								cy.log({
									name: 'Error',
									statusCode: respUpdateStickers.status,
									message: `El test acepta un valor para la propiedad 'left' de ${left}, que está fuera del rango aceptado (-60 a 100) según la documentación de la API de Trello`,
								});
							}
						});
				});
			});
		});

		// todo: try to update a sticker default  with invalid values for rotate
		parametersStickerInvalid.rotate.forEach((rotate, index) => {
			parametersSticker.top.limits.forEach(top => {
				parametersSticker.left.limits.forEach(left => {
					stickers
						.updateStickers(
							credentials.key,
							credentials.token,
							Cypress.env('cardId'),
							Cypress.env('idStickers0'),
							top,
							left,
							rotate,
							index
						)
						.then(respUpdateStickers => {
							if (respUpdateStickers.status === 400) {
								// Verificar que las pegatinas no fueron actualizadas por datos rotate inválidos
								// y se genera un código de error 400
								cy.log({ values: { top: top, left: left, rotate: rotate } });
								expect(respUpdateStickers.status).to.equal(statusCodes.BadRequest);
								expect(respUpdateStickers.body).to.equal('invalid value for rotate');
							} else if (respUpdateStickers.status === 200) {
								cy.log({
									name: 'Error',
									statusCode: respUpdateStickers.status,
									message: `El test acepta un valor para la propiedad 'rotate' de ${rotate}, que está fuera del rango aceptado (0 a 360) según la documentación de la API de Trello`,
								});
							}
						});
				});
			});
		});
	});

	it('6417 |  TC5: Validate Get the stickers on a card', () => {
		const { credentials, statusCodes } = data;

		// todo: Get the stickers
		stickers.getStickers(credentials.key, credentials.token, Cypress.env('cardId')).then(respGetStickers => {
			//Verificar que la solicitud de obtener las pegatinas de la tarjeta haya tenido éxito.
			expect(respGetStickers.status).to.equal(statusCodes.OK);
		});
	});

	it('6417 |  TC6: Validate Delete a Sticker on a Card', () => {
		const { credentials, statusCodes } = data;
		const index = [0, 1, 2]; // permite iterar los id de las 3 pegatinas (predeterminada, dinámica , personalizada) agregadas a la tarjeta
		index.forEach(index => {
			// todo: Delete the stickers
			stickers
				.deleteStickers(credentials.key, credentials.token, Cypress.env('cardId'), Cypress.env(`idStickers${index}`))
				.then(respDeleteStickers => {
					//Verificar que la solicitud de eliminar las pegatinas de la tarjeta haya tenido éxito.
					expect(respDeleteStickers.status).to.equal(statusCodes.OK);
				});
		});

		//!  eliminar tablero para evitar creaciones duplicadas durante la prueba que puedan saturar la app de Trello.
		stickers.deleteBoard(credentials.key, credentials.token, Cypress.env('boardId')).then(respDeleteBoard => {
			//Verificar que la solicitud de eliminar el tablero del espacio de trabajo de Trello haya tenido éxito.
			expect(respDeleteBoard.status).to.equal(statusCodes.OK);
		});
	});
});

removeLogs();
