import { faker } from '@faker-js/faker';
const cardName = [faker.company.companyName(), faker.company.companyName(),faker.company.companyName()];
const ListValue = ['Lista A', 'Lista B', 'Lista C', 'Lista D', 'Lista H'];
const ListRandom = Math.floor(Math.random() * ListValue.length);
const List = ListValue[ListRandom];

describe('Api commands', () => {
	beforeEach('Precondition : Create Lists y Cards', function () {
		cy.createList(List, '1');
		cy.createList(List, '2');
		cy.createCard(cardName[1], '2', '1');
		cy.createCard(cardName[2], '2', '2');
		cy.createCard(cardName[3], '2', '3');
	});

	it('2140 | TC1: Validar mover todas las cards de una lista a otra lista', function () {
		cy.fixture('data/ArchivarYmover').then(the => {
			const MoveToidList = Cypress.env('idList1');
			const FromidList = Cypress.env('idList2');
			cy.api({
				method: 'POST',
				url: `${the.url.Dom}/lists/${FromidList}/moveAllCards/`,
				body: {
					idList: MoveToidList,
					idBoard: the.idBoard,
					key: the.key,
					token: the.token,
				},
			}).then(response => {
				expect(response.status).to.eq(200);
				expect(response.body[0].idList).to.eq(MoveToidList);
			});
		});
	});

	it('2140 | TC2: Validar archivar todas las cards de una lista', () => {
		cy.fixture('data/ArchivarYmover').then(the => {
			const idListName = Cypress.env('idList2');
			cy.api({
				method: 'POST',
				url: `${the.url.Dom}/lists/${idListName}/archiveAllCards/`,
				body: {
					key: the.key,
					token: the.token,
				},
			}).then(response => {
				expect(response.status).to.eq(200);
				expect(response.isOkStatusCode).to.eq(true);
			});
		});
	});
	beforeEach('Precondition : Crear 1 lista y creas 1 Card', function () {
		cy.createList(List, '1');
		cy.createList(List, '2');
		cy.createCard(cardName[2], '2', '1');
	});

	it('2140 | TC3: Validar mover 1 card de una lista a otra lista', function () {
		cy.fixture('data/ArchivarYmover').then(the => {
			const idCard1 = Cypress.env('idCard1');
			const idList = Cypress.env('idList1');

			cy.api({
				method: 'PUT',
				url: `${the.url.Dom}/cards/${idCard1}/`,
				body: {
					idList: idList,
					idBoard: the.idBoard,
					key: the.key,
					token: the.token,
				},
			}).then(response => {
				expect(response.status).to.eq(200);
				expect(response.body.idList).to.eq(idList);
			});
		});
	});

	it('2140 | TC4: Validar archivar 1 card de una lista', function () {
		cy.fixture('data/ArchivarYmover').then(the => {
			const idCard1 = Cypress.env('idCard1');
			// const idList=Cypress.env('idList1')

			cy.api({
				method: 'PUT',
				url: `${the.url.Dom}/cards/${idCard1}/`,
				body: {
					closed: true,
					idBoard: the.idBoard,
					key: the.key,
					token: the.token,
				},
			}).then(response => {
				expect(response.status).to.eq(200);
				expect(response.isOkStatusCode).to.eq(true);
			});
		});
	});
});
