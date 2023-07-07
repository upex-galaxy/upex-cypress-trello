import { removeLogs } from '@helper/RemoveLogs';
removeLogs();
import { cardsTrello } from '../../../support/pages/cardsPageTrello.Page.js';

describe('GX2-4438Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	//alta de listas
	//before('', () => {});

	// after('', () => {
	// 	cardsTrello.deleteList();
	// });

	it.only('Prueba', () => {
		//cy.log('hola');
		cardsTrello.createList().then(response => {
			expect(response.status).to.be.equal(200);
			expect(response.body.name).to.be.equal('Lista 1');
		});
	});

	//it('alta de card', () => {});

	//it('update card', () => {});

	//it('mover card', () => {});
});
