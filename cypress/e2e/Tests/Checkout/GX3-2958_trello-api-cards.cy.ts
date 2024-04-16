import { trello } from '@pages/GX3-2958_trello-api-cards';

describe('GX3-2958 | TX: [Automation] Trello (API) | Cards | API Endpoint: mover y archivar todas las tarjetas de una lista', () => {
	before('Agregar informacion al tablero', () => {
		trello.createCard();
		trello.createCard();
		trello.createCard();
		trello.createCard();
		trello.createCard();
	});
	it('GX3-2958 | TC 01: Validar poder cambiar tarjetas de lista exitosamente', () => {
		trello.moveCards();
	});
	it('GX3-2958 | TC 02: Validar poder archivar todas las tarjetas exitosamente', () => {
		trello.archiveCards();
	});
});