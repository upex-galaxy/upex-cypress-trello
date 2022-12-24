// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
import 'cypress-file-upload'
import 'cypress-wait-until'
require('@4tw/cypress-drag-drop')
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('createCard', () => {
	cy.fixture('DOM/Stickers/AddSticker.Page').then((the) => {
		//Precondition: crea una card
		const cardRandomName = 'Paola Rodriguez'
		cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/cards?idList=${the.idList}&name=${cardRandomName}&key=${the.key}&token=${the.token}`,
		}).then(({body}) => {
			const idCard = body.id //se guarda el id de la card
			idCardGlobalNew = idCard
		})
	})
})

Cypress.Commands.add('addSticker', (imagen, top, left, zIndex, rotate) => {
	let idStickerGlobal
	cy.fixture('DOM/Stickers/AddSticker.Page').then((the) => {
				cy.api({
					//añade a la card un sticker
					method: 'POST',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					qs: {
						image: imagen,
						top: top,
						left: left,
						zIndex: zIndex,
            rotate: rotate,
						key: the.key,
						token: the.token,
					},
				})
			.then((response) => {
				expect(response.status).to.eq(200)
				const idSticker1 = response.body.id //se guarda el id del sticker
				idStickerGlobal = idSticker1
				cy.api({
					//obtengo la card creada anteriormente
					method: 'GET',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					qs: {
						key: the.key,
						token: the.token,
					},
				})

					.then((response) => {
						expect(response.status).to.eq(200) //Post-condition: se valida que la card contenga el sticker, comparando los id
						const idSticker = response.body[0].id
						expect(idSticker).equal(idStickerGlobal)
					})
			})
	})
})

Cypress.Commands.add('addStickerCustom', (top, left, zIndex, rotate) => {
	let idCardCustomGlobal, idStickerCustomGlobal, idImageCustom
	cy.fixture('DOM/Stickers/AddSticker.Page').then((the) => {
			cy.api({
				//Precondition: se obtienen los custom sticker del usuario
				method: 'GET',
				url: `https://api.trello.com/1/members/${the.idMember}/customStickers`,
				qs: {
					key: the.key,
					token: the.token,
				},
			})
				.then(({body}) => {
					const idStickerE = body[0].id //se guarda el id del sticker del board, para usarlo como imagen
					idImageCustom = idStickerE
					cy.api({
						//se añade el sticker a la card
						method: 'POST',
						url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
						qs: {
							image: idImageCustom, //se llama a la id sticker como imagen
							top: top,
							left: left,
							zIndex: zIndex,
                            rotate: rotate,
							key: the.key,
							token: the.token,
						},
					})
				})
				.then((response) => {
					expect(response.status).to.eq(200)
					const idSticker = response.body.id //se guarda el id del sticker añadido a la card
					idStickerCustomGlobal = idSticker
				})
			cy.api({
				//obtengo la card creada anteriormente
				method: 'GET',
				url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
				qs: {
					key: the.key,
					token: the.token,
				},
			}).then((response) => {
				expect(response.status).to.eq(200)
				const idSticker = response.body[0].id //Post-condition: se valida que la card contenga el sticker, comparando los id
				expect(idSticker).equal(idStickerCustomGlobal)
			})
	})
})

Cypress.Commands.add('addStickerInvalidId', (imagen, top, left, zIndex, rotate) => {
	let idCardGlobalId
	cy.fixture('DOM/Stickers/AddSticker.Page').then((the) => {
				cy.api({
					//intenta añadir a la card un sticker, con un id inexistente
					method: 'POST',
					url: `https://api.trello.com/1/cards/nonexisting/stickers`,
					failOnStatusCode: false,
					qs: {
						image: imagen,
						top: top,
						left: left,
						zIndex: zIndex,
                        rotate: rotate,
						key: the.key,
						token: the.token,
					},
				})
			.then((response) => {
				expect(response.status).to.eq(400)
				expect(response.body).to.eq('invalid id')
				cy.api({
					//obtengo la card creada anteriormente
					method: 'GET',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					failOnStatusCode: false,
					qs: {
						key: the.key,
						token: the.token,
					},
				}).then((response) => {
					expect(response.status).to.eq(200) //post-condition: la card no debería tener agregado ningún sticker
					expect(response.body).to.be.an('array').that.is.empty
				})
			})
	})
})

Cypress.Commands.add('addStickerInvalidImage', (imagen, top, left, zIndex, rotate) => {
	let idStickerGlobal
	cy.fixture('DOM/Stickers/AddSticker.Page').then((the) => {
				cy.api({                                      //añade a la card un sticker
					method: 'POST',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
                    failOnStatusCode: false,
					qs: {
						image: imagen,
						top: top,
						left: left,
						zIndex: zIndex,
                        rotate: rotate,
						key: the.key,
						token: the.token,
					},
				})
			.then((response) => {
				expect(response.status).to.eq(401)
                expect(response.body.message).to.eq('invalid sticker')
				cy.api({                             //obtengo la card creada anteriormente
					method: 'GET',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					qs: {
						key: the.key,
						token: the.token,
					},
				})
					.then((response) => {
						expect(response.status).to.eq(200) //post-condition: la card no debería tener agregado ningún sticker
					expect(response.body).to.be.an('array').that.is.empty
					})
			})
	})
})

Cypress.Commands.add('addStickerInvalidTop', (imagen, top, left, zIndex, rotate) => {
	let idCardGlobalId
	cy.fixture('DOM/Stickers/AddSticker.Page').then((the) => {
				cy.api({
					//intenta añadir a la card un sticker, con un id inexistente
					method: 'POST',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					failOnStatusCode: false,
					qs: {
						image: imagen,
						top: top,
						left: left,
						zIndex: zIndex,
                        rotate: rotate,
						key: the.key,
						token: the.token,
					},
				})
			.then((response) => {
				expect(response.status).to.eq(400)
				expect(response.body).to.eq('invalid value for top')
				cy.api({
					//obtengo la card creada anteriormente
					method: 'GET',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					failOnStatusCode: false,
					qs: {
						key: the.key,
						token: the.token,
					},
				}).then((response) => {
					expect(response.status).to.eq(200) //post-condition: la card no debería tener agregado ningún sticker
					expect(response.body).to.be.an('array').that.is.empty
				})
			})
	})
})

Cypress.Commands.add('addStickerInvalidLeft', (imagen, top, left, zIndex, rotate) => {
	let idCardGlobalId
	cy.fixture('DOM/Stickers/AddSticker.Page').then((the) => {
				cy.api({
					//intenta añadir a la card un sticker, con un id inexistente
					method: 'POST',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					failOnStatusCode: false,
					qs: {
						image: imagen,
						top: top,
						left: left,
						zIndex: zIndex,
            rotate: rotate,
						key: the.key,
						token: the.token,
					},
				})
			.then((response) => {
				expect(response.status).to.eq(400)
				expect(response.body).to.eq('invalid value for left')
				cy.api({
					//obtengo la card creada anteriormente
					method: 'GET',
					url: `https://api.trello.com/1/cards/${idCardGlobalNew}/stickers`,
					failOnStatusCode: false,
					qs: {
						key: the.key,
						token: the.token,
					},
				}).then((response) => {
					expect(response.status).to.eq(200) //post-condition: la card no debería tener agregado ningún sticker
					expect(response.body).to.be.an('array').that.is.empty
				})
			})
	})
})


