import { Given, And, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const urlBaseTrello = 'https://api.trello.com';
const key = '96c242574c86f25da04099a76d20d5c8';
const token = 'ATTAed5236cbb1884c8d85d93fc3b288837b6fb25693815d2f53fbfaf4c034eaa0a6DB53888E';
const idCard = '640676936cf5e3f6bf7dd009';
const urlAttachment = 'https://i.blogs.es/210615/one-piece-1-/1366_2000.jpeg';

context('Feature: Update Cards Cover', () => {
	describe('Tener acceso a la api de Trello', () => {
		Given('una card creada dentro de una lista', () => {
			//Comprobar que hay una card dentro de una lista
			cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
				key: key,
				token: token,
			}).should(response => {
				expect(response.body).to.have.property('name', 'Update Card Cover');
			});
		});
		And('con una imagen como attachment', () => {
			cy.request({
				method: 'POST',
				url: urlBaseTrello + '/1/cards/' + idCard + '/attachments',
				qs: {
					key: key,
					token: token,
					url: urlAttachment,
				},
				headers: {
					Accept: 'application/json',
				},
			}).should(response => {
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('1366_2000.jpeg');
			});
		});
	});

	describe('1086 | TC1: Validar que el usuario con acceso a API, {string} agrega un cover {string} para la card', () => {
		Given('la card no tiene un cover seleccionado aún', () => {
			//Comprobar que no posee un cover la card
			cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
				key: key,
				token: token,
			}).then(response => {
				if (response.body.color || response.body.idAttachment || response.body.idUploadedBackground !== null) {
					//Cambiar el cover a null en caso de tener una
					cy.request('PUT', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						cover: '',
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						//Validamos que sea null
						expect(response.body.cover.color).to.be.null,
							expect(response.body.cover.idAttachment).to.be.null,
							expect(response.body.cover.idUploadedBackground).to.be.null;
					});
				}
			});
		});
		When('usuario envía el request de Update a Card con un parámetro: {string} en {string}', (datos, parámetro1) => {
			//Cambiamos el cover por un color
			if (parámetro1 == 'color') {
				if (datos == 'que contiene números') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { color: 'yellow4' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover color');
					});
				} else if (datos == 'que contiene caracteres especiales') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { color: 'az.ul' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover color');
					});
				} else {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { color: datos } },
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.status).to.eq(200);
					});
				}
			} else if (parámetro1 == 'brightness') {
				if (datos === 'que contiene números') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { brightness: 'dark4' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover brightness');
					});
				} else if (datos == 'que contiene caracteres especiales') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { brightness: 'da.rk' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover brightness');
					});
				} else {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { brightness: datos } },
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.status).to.eq(200);
					});
				}
			} else if (parámetro1 == 'url') {
				if (datos == 'una url que no sea de Unsplash') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { url: 'https://i.blogs.es/6f44dd/google-2015-1/1366_2000.jpg' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body).to.eq('url must be from an allowed image service');
					});
				} else {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: {
							cover: {
								url: 'https://images.unsplash.com/photo-1678729465458-cf54e1b4647e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
							},
						},
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.status).to.eq(200);
					});
				}
			} else if (parámetro1 == 'idAttachment') {
				if (datos == 'un ID de 23 caracteres') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { idAttachment: '6413a6668954ab29e098f3f' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover idAttachment');
					});
				} else if (datos == 'un ID de 25 caracteres') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { idAttachment: '6413a6668954ab29e098f3fef' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover idAttachment');
					});
				} else if (datos == 'un ID que contenga letras después de la f') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { idAttachment: '6413a6668954ab29e098f3fk' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover idAttachment');
					});
				} else {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { idAttachment: '6413a6668954ab29e098f3fe' } },
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.status).to.eq(200);
						expect(response.body.cover.idAttachment).to.eq('6413a6668954ab29e098f3fe');
					});
				}
			} else if (parámetro1 == 'size') {
				if (datos == 'fuera de la documentación') {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { size: 'mínimo' } },
						headers: {
							Accept: 'application/json',
						},
						failOnStatusCode: false,
					}).should(response => {
						expect(response.status).to.eq(400);
						expect(response.body.message).to.eq('invalid cover size');
					});
				} else {
					cy.request({
						method: 'PUT',
						url: urlBaseTrello + '/1/cards/' + idCard,
						qs: {
							key: key,
							token: token,
						},
						body: { cover: { size: datos } },
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.status).to.eq(200);
						expect(response.body.cover.size).to.eq(datos);
					});
				}
			}
		});
		Then('{string} agrega {string} en el parámetro: {string} el cover a la card', (resultado, datos, parámetro1) => {
			if (parámetro1 == 'color') {
				if (datos == 'que contiene números' || datos == 'que contiene caracteres especiales') {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.color).to.eq(null);
					});
				} else {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.color).to.eq(datos);
					});
				}
			} else if (parámetro1 == 'brightness') {
				if (datos == 'que contiene números' || datos == 'que contiene caracteres especiales') {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.brightness).to.eq('light');
					});
				} else {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.brightness).to.eq(datos);
					});
				}
			} else if (parámetro1 == 'url') {
				if (datos == 'una url que no sea de Unsplash') {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.idUploadedBackground).to.eq(null);
					});
				} else {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.idUploadedBackground).to.have.length(24);
					});
				}
			} else if (parámetro1 == 'idAttachment') {
				if (datos == 'un ID de 23 caracteres') {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.idAttachment).to.eq(null);
					});
				} else if (datos == 'un ID de 25 caracteres') {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.idAttachment).to.eq(null);
					});
				} else if (datos == 'un ID que contenga letras después de la f') {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.idAttachment).to.eq(null);
					});
				} else {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.idAttachment).to.eq('6413a6668954ab29e098f3fe');
					});
				}
			} else if (parámetro1 == 'size') {
				if (datos == 'fuera de la documentación') {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.size).to.eq('full');
					});
				} else {
					cy.request('GET', urlBaseTrello + '/1/cards/' + idCard, {
						key: key,
						token: token,
						headers: {
							Accept: 'application/json',
						},
					}).should(response => {
						expect(response.body.cover.size).to.eq(datos);
					});
				}
			}
		});
	});
});
