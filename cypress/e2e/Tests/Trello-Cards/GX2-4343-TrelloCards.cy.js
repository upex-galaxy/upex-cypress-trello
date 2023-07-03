import { TrelloCardsPage } from 'cypress/support/pages/GX2-4242-TrelloCards';
import the from 'cypress/fixtures/data/GX2-4343-TrelloCards.json';
import { faker } from '@faker-js/faker';
const randomName = faker.name.firstName();
const randomDesc = faker.commerce.product();
//let cardId;

describe('✅Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	before('Precondición: Usuario posee acceso al tablero de Trello', () => {
		TrelloCardsPage.PostBoard();
		// .then(response => {
		// 	expect(response.status).to.eq(200);
		// 	expect(response.body.name).to.eql(the.board.Name);
		// });
	});
	before('Precondición: Usuario posee 3 listas disponibles: Backlog, Active y Done', () => {
		TrelloCardsPage.PostList1();
		// .then(response => {
		// 	expect(response.status).to.eq(200);
		// 	expect(response.body.name).to.eql(the.lists.List1);
		// });
		TrelloCardsPage.PostList2();
		// .then(response => {
		// 	expect(response.status).to.eq(200);
		// 	expect(response.body.name).to.eql(the.lists.List2);
		// });

		TrelloCardsPage.PostList3();
		// .then(response => {
		// 	expect(response.status).to.eq(200);
		// 	expect(response.body.name).to.eql(the.lists.List3);
		// });
	});
	it('TC01 - Validar usuario crea una card en una lista', () => {
		TrelloCardsPage.CreateCard(randomName);
		// .then(response => {
		// 	expect(response.status).to.eq(200);
		// 	expect(response.body.name).to.eql(randomName);
		// });
	});
	it('TC02 - Validar usuario modifica la información de una card', () => {
		TrelloCardsPage.ModifyCard(randomDesc);
		// .then(response => {
		// 	expect(response.status).to.eq(200);
		// 	expect(response.body.desc).to.eql(randomDesc);
		// });
	});
	it.skip('TC03 - Validar usuario mueve una card de una lista a otra', () => {
		cy.get('@list1Id').then(list1Id => {
			cy.api('POST', the.url.Cards, {
				idList: list1Id,
				key: the.key,
				token: the.token,
				name: randomName,
			}).then(response => {
				const cardId = response.body.id;
				cy.wrap(cardId).as('cardId');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eql(randomName);
			});
		});
	});
	it.skip('TC04 - Validar usuario elimina una card', () => {
		cy.get('@list1Id').then(list1Id => {
			cy.api('POST', the.url.Cards, {
				idList: list1Id,
				key: the.key,
				token: the.token,
				name: randomName,
			}).then(response => {
				const cardId = response.body.id;
				cy.wrap(cardId).as('cardId');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eql(randomName);
			});
		});
	});
	// after('Eliminar Board', () => {
	// 	cy.get('@boardId').then(boardId => {
	// 		cy.api('DELETE', the.url.Boards + boardId, {
	// 			key: the.key,
	// 			token: the.token,
	// 		}).then(response => {
	// 			expect(response.status).to.eq(200);
	// 		});
	// 	});
	// });
});
