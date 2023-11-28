import { trelloCards } from '@pages/GX2-10969-trello-api-cards-crear-modificar-mover-y-eliminar-tarjetas-de-un-tablero';
import { succes } from '../../../fixtures/data/GX2-10969-CRUD.json';
import { faker } from '@faker-js/faker';

const randomCardName = faker.commerce.product();
const randomCardDescription = faker.commerce.productDescription();

let idList1;
let idList2;
let idList3;
let idCard;

describe('GX2-10969-trello-api-CRUD', () => {
	before('10970 | PRC: Debe tener las listas Backlog, Active y Done Creadas ', function () {
		trelloCards.createList({ name: 'Done' }).then(({ status, body }) => {
			expect(status).eq(succes);
			idList3 = body.id;
			cy.wrap(idList2).as('idList3');
		});
		trelloCards.createList({ name: 'Active' }).then(({ status, body }) => {
			expect(status).eq(succes);
			idList2 = body.id;
			cy.wrap(idList2).as('idList2');
		});
		trelloCards.createList({ name: 'Backlog' }).then(({ status, body }) => {
			expect(status).eql(succes);
			idList1 = body.id;
			cy.wrap(idList1).as('idList1');
		});
	});

	it('10970 | TC1: Validarr crear una carta en la lista Backlog.', function () {
		trelloCards.createCard({ idList: idList1, cardName: 'Card 1' }).then(({ status, body }) => {
			idCard = body.id;
			cy.wrap(idCard).as('idCard');
			expect(status).eql(succes);
		});
	});

	it('10970 | TC2: Validar modificar la informacion de la card', function () {
		trelloCards
			.updateCard({ idCard: idCard, newCardDescription: randomCardDescription, newCardName: randomCardName })
			.then(({ status, body }) => {
				expect(status).eql(succes);
				expect(body.desc).eql(randomCardDescription);
				expect(body.name).eql(randomCardName);
			});
	});

	after(() => {
		trelloCards.archiveList({ idList: idList1 });
		trelloCards.archiveList({ idList: idList2 });
		trelloCards.archiveList({ idList: idList3 });
	});
});
