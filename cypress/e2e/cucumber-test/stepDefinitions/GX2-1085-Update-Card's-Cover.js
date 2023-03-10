import { Given, And, When, Then } from '@badeball/cypress-cucumber-preprocessor'

const urlBaseTrello = 'https://api.trello.com'
const key = '96c242574c86f25da04099a76d20d5c8'
const token = 'ATTAed5236cbb1884c8d85d93fc3b288837b6fb25693815d2f53fbfaf4c034eaa0a6DB53888E'
const idCard = '640676936cf5e3f6bf7dd009'

context('Feature: Update Cards Cover', () => {
	describe('Tener acceso a la api de Trello', () => {
		Given('una card creada dentro de una lista', () => {
			//Comprobar que hay una card dentro de una lista
			cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
				key: key,
				token: token,
			}).should((response) => {
				expect(response.body).to.have.property('name', 'Update Card Cover')
			})
		})
		And('la card no tiene un cover seleccionado aún', () => {
			//Comprobar que no posee un cover la card
			cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
				key: key,
				token: token,
			}).then((response) => {
				if (response.body.color || response.body.idAttachment || response.body.idUploadedBackground !== null) {
					//Cambiar el cover a null en caso de tener una
					cy.request('PUT', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						cover: '',
						headers: {
							Accept: 'application/json',
						},
					}).should((response) => {
						//Validamos que sea null
						expect(response.body.cover.color).to.be.null,
							expect(response.body.cover.idAttachment).to.be.null,
							expect(response.body.cover.idUploadedBackground).to.be.null
					})
				}
			})
		})
	})

	describe('1086 | TC1: Validar que el usuario con acceso a API, agrega un cover para la card', () => {
		When(
			'usuario envía el request de Update a Card con el siguiente parámetro: {string} en {string} {string}',
			(datos, parámetro1, parámetro2) => {
				//Enviar request con colores validos
				if (parámetro1 == 'color') {
					cy.request('PUT', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						cover: { color: datos },
						headers: {
							Accept: 'application/json',
						},
					}).should((response) => {
						expect(response.status).to.eq(200)
					})
				} //Enviar request con colores no válidos (que contiene números)
				else if (datos == 'que contiene números') {
					cy.request('PUT', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						cover: { color: 'yellow1' },
						headers: {
							Accept: 'application/json',
						},
					}).should((response) => {
						expect(response.status).to.eq(400)
					})
				}
			}
		)
		Then('{string} agrega {string} en el parámetro: {string} {string} el cover a la card', (resultado, datos, parámetro1, parámetro2) => {
			if (parámetro1 == 'color') {
				cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
					key: key,
					token: token,
					headers: {
						Accept: 'application/json',
					},
				}).should((response) => {
					expect(response.body.cover.color).to.equal(datos)
				})
			}
		})
	})
})

//________________________________________________________________________
// Comando predeterminado para que no ocurran errores de excepciones:
Cypress.on('uncaught:exception', () => {
	// returning false here prevents Cypress from
	// failing the test
	return false
})
// Comando predeterminado para que no aparezcan los Fetch en el log del Test Runner:
const origLog = Cypress.log
Cypress.log = function (opts, ...other) {
	if (opts.displayName === 'xhr' || (opts.displayName === 'fetch' && opts.url.startsWith('https://'))) {
		return
	}
	return origLog(opts, ...other)
}
