import { trelloCards } from '@pages/GX2-10188-trello-api-cards-api-endpoint-mover-y-archivar-todas-las-tarjetas-de-una-lista.page';

let idList1;
describe('GX2-10188-trello-api-cards-api-endpoint-mover-y-archivar-todas-las-tarjetas-de-una-lista', function () {
	before(function () {
		let idList22;
		trelloCards.createAList({ name: 'list 2' }).then(({ status, body }) => {
			expect(status).eq(200);
			idList22 = body.id;
			cy.wrap(idList22).as('idList2');
		});
		cy.log(this.idList22);

		// trelloCards.createAList({ name: 'list 1' }).then(({ status, body }) => {
		// 	expect(status).equal(200);
		// 	idList1 = body.id;
		// 	trelloCards.createACard({ idList: idList1, name: 'card 1' }).then(({ status }) => {
		// 		expect(status).equal(200);
		// 	});
		// 	trelloCards.createACard({ idList: idList1, name: 'card 2' }).then(({ status }) => {
		// 		expect(status).equal(200);
		// 	});
		// 	trelloCards.createACard({ idList: idList1, name: 'card 3' }).then(({ status }) => {
		// 		expect(status).equal(200);
		// 	});
		// });
	});

	it('10189 | TC1: Validar mover todas las cards de la tabla Backlog a la tabla Active.', function () {
		cy.log('idList2', this.idList2);
		cy.get('*');
	});
});
