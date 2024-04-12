import { trello } from '@pages/GX3-2958_trello-api-cards';



describe('GX3-2958 | TX: [Automation] Trello (API) | Cards | API Endpoint: mover y archivar todas las tarjetas de una lista', () => {
	it('GX3-2958 | TC 01: Cambiar tarjetas de lista exitosamente', () => {
		trello.moveCards();
	});
});