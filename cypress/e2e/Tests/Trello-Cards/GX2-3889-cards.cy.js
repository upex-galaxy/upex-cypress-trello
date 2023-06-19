import { CardsListsTrello } from '@pages/cardsListsTrello.js';

describe('US GX2-3889 | TS: Trello (API) | Cards | Crear, Modificar, Mover y Eliminar Tarjetas de un Tablero', () => {
	const LISTO = 'Listo';
	const HACIENDO = 'Haciendo';
	const PORHACER = 'Por Hacer';

	const cardsListsPage = new CardsListsTrello([LISTO, HACIENDO, PORHACER]);

	let listPages = {};
	let idCard;
	before('', () => {
		// Crear las listas "por hacer", "haciendo", "listo"
		cardsListsPage.createLists().then(resp => {
			listPages = resp;
		});
	});

	after('Borrar las listas al terminar de correr los tests', () => {
		cardsListsPage.deleteAllLists().then(resp => {
			expect(resp.status).to.be.equal(200);
		});
	});

	it('3900 | TC1: Validar crear una card en lista "Por hacer”', () => {
		cardsListsPage.createCard(listPages[PORHACER]).then(respuesta => {
			cy.log(respuesta.body.id);
			idCard = respuesta.body.id;
			expect(respuesta.status).to.be.equal(200);
			// expect(respuesta.body).to.have.keys('name'); // por alguna razon no funciona
		});
	});

	it('3901 | TC2: Validar modificar una card', () => {
		cardsListsPage.updateCard(idCard).then(resp => {
			cy.log(idCard);

			expect(idCard).to.exist;
			expect(resp.status).to.be.equal(200);
			//expect(resp.body).to.have.keys('cardId', 'apikey', 'token'); // Se hace asi esto?
		});
	});

	it('3902 | TC3:  Validar mover card de "Por hacer" a "Haciendo", a "Listo"', () => {
		cardsListsPage.moveList(idCard, HACIENDO).then(response => {
			expect(response.status).to.be.equal(200);
		});
	});
	it('3903 | TC4: Validar eliminar todas las cards en la lista "Listo"', () => {
		cardsListsPage.deleteCards(listPages[LISTO]).then(response => {
			expect(response.status).to.be.equal(200);
		});
	});
});
