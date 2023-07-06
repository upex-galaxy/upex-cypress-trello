import { TrelloCardsPage } from '@pages/GX2-4343-TrelloCards';
import the from 'cypress/fixtures/data/GX2-4343-TrelloCards.json';
import { faker } from '@faker-js/faker';
const randomName1 = faker.name.firstName();
const randomName2 = faker.animal.cat();
const randomName3 = faker.animal.dog();
const randomDesc = faker.commerce.product();

describe('✅Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	before('Precondición: Usuario posee acceso al tablero de Trello', () => {
		TrelloCardsPage.CreateBoard().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql(the.board.Name);
			TrelloCardsPage.GetBoard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(the.board.Name);
			});
		});
	});
	before('Precondición: Usuario posee 3 listas disponibles: Backlog, Active y Done', () => {
		TrelloCardsPage.CreateList1().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql(the.lists.List1);
			TrelloCardsPage.GetList1().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(the.lists.List1);
			});
		});
		TrelloCardsPage.CreateList2().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql(the.lists.List2);
			TrelloCardsPage.GetList2().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(the.lists.List2);
			});
		});

		TrelloCardsPage.CreateList3().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql(the.lists.List3);
			TrelloCardsPage.GetList3().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(the.lists.List3);
			});
		});
	});
	it('TC01 - Validar usuario crea una card en una lista', () => {
		TrelloCardsPage.CreateCard(randomName1).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql(randomName1);
			TrelloCardsPage.GetCard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(randomName1);
			});
		});
	});

	it('TC02 - Validar usuario crea una card en la parte inferior de una lista', () => {
		TrelloCardsPage.CreateBottomCard(randomName2).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql(randomName2);
			expect(response.body.pos).to.greaterThan(Cypress.env.PosCard);
			TrelloCardsPage.GetBottomCard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(randomName2);
				expect(response.body.pos).to.greaterThan(Cypress.env.PosCard);
			});
		});
	});

	it('TC03 - Validar usuario crea una card en la parte superior de una lista', () => {
		TrelloCardsPage.CreateTopCard(randomName3).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql(randomName3);
			expect(response.body.pos).to.lessThan(Cypress.env.BottomCard);
			TrelloCardsPage.GetTopCard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(randomName3);
				expect(response.body.pos).to.lessThan(Cypress.env.BottomCard);
			});
		});
	});
	it('TC04 - Validar usuario modifica la información de una card', () => {
		TrelloCardsPage.ModifyCard(randomDesc).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.desc).to.eql(randomDesc);
			expect(response.body.idMembers).to.eql([the.card.idMembers]);
			expect(response.body.cover).to.include({ color: the.card.Cover.Color });
			TrelloCardsPage.GetCard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.desc).to.eql(randomDesc);
				expect(response.body.idMembers).to.eql([the.card.idMembers]);
				expect(response.body.cover).to.include({ color: the.card.Cover.Color });
			});
		});
	});
	it('TC05 - Validar usuario mueve una card de una lista a otra', () => {
		TrelloCardsPage.MoveCardToList2().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.idList).to.eq(Cypress.env.list2Id);
			TrelloCardsPage.GetCard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eq(Cypress.env.list2Id);
			});
		});
		TrelloCardsPage.MoveCardToList3().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.idList).to.eq(Cypress.env.list3Id);
			TrelloCardsPage.GetCard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eq(Cypress.env.list3Id);
			});
		});
		TrelloCardsPage.MoveCardToList1().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.idList).to.eql(Cypress.env.list1Id);
			TrelloCardsPage.GetCard().then(response => {
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eq(Cypress.env.list1Id);
			});
		});
	});
	it('TC06 - Validar usuario elimina una card', () => {
		TrelloCardsPage.DeleteCard().then(response => {
			expect(response.status).to.eql(200);
		});
	});
	after('Postcondición: Eliminar Board', () => {
		TrelloCardsPage.DeleteBoard().then(response => {
			expect(response.status).to.eql(200);
		});
	});
});
