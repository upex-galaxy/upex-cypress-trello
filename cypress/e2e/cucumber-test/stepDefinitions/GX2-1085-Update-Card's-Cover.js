import { Given, And, When, Then } from '@badeball/cypress-cucumber-preprocessor'

const urlBaseTrello = 'https://api.trello.com'
const key = '96c242574c86f25da04099a76d20d5c8'
const token = 'ATTAed5236cbb1884c8d85d93fc3b288837b6fb25693815d2f53fbfaf4c034eaa0a6DB53888E'

context('Feature: Update Cards Cover', () => {
	describe('Tener acceso a la api de Trello', () => {
		Given('una card creada dentro de una lista', () => {
			//Comprobar que hay una card dentro de una lista
			cy.request('GET', urlBaseTrello + '/1/cards/640676936cf5e3f6bf7dd009', {
				key: key,
				token: token,
			}).then((response) => {
				expect(response.body).to.have.property('name', 'Update Card Cover')
			})
		})
		And('la card no tiene un cover seleccionado aún', () => {
			//Comprobar que no posee un cover la card
			cy.request('GET', urlBaseTrello + '/1/cards/640676936cf5e3f6bf7dd009', {
				key: '96c242574c86f25da04099a76d20d5c8',
				token: 'ATTAed5236cbb1884c8d85d93fc3b288837b6fb25693815d2f53fbfaf4c034eaa0a6DB53888E',
			}).then((response) => {
				expect(response.body.cover).to.have.property('color').that.is.null
				expect(response.body.cover).to.have.property('idAttachment').that.is.null
				expect(response.body.cover).to.have.property('idUploadedBackground').that.is.null
			})
		})
	})

	describe('1086 | TC1: Validar que el usuario con acceso a API, agrega un cover para la card', () => {
		When(
			'usuario envía el request de "Update a Card" con el siguiente parámetro: <string> en <string> <string>',
			(datos, parametro1, parametro2) => {
				cy.request('PUT', urlBaseTrello + '/1/cards/640676936cf5e3f6bf7dd009', {
					key: '96c242574c86f25da04099a76d20d5c8',
					token: 'ATTAed5236cbb1884c8d85d93fc3b288837b6fb25693815d2f53fbfaf4c034eaa0a6DB53888E',
					parametro1: 'datos',
				})
			}
		)
		Then('automáticamente {string} agrega el cover a la card'), () => {}
	})
})
