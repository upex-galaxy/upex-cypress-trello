import { trello } from '@pages/GX3-2958_trello-api-cards';

interface StatusJSON {
    [key: string]: number;
}

async function moveCards() {
	cy.wrap(await trello.moveCards()).then((statusJSON: unknown) => {
		const typedStatusJSON = statusJSON as StatusJSON;
		for (const cardId in typedStatusJSON) {
			expect(typedStatusJSON[cardId]).to.equal(200);
		}
	});
}

async function archiveCards() {
	cy.wrap(await trello.archiveCards()).then((statusJSON: unknown) => {
		const typedStatusJSON = statusJSON as StatusJSON;
		for (const cardId in typedStatusJSON) {
			expect(typedStatusJSON[cardId]).to.equal(200);
		}
	});
}

describe('GX3-2958 | TX: [Automation] Trello (API) | Cards | API Endpoint: mover y archivar todas las tarjetas de una lista', () => {
	before('Agregar informacion al tablero', () => {
		for (let index = 0; index <= 5; index++) {
			trello.createCard();
		}
	});
	it('GX3-2958 | TC 01: Validar poder cambiar tarjetas de lista exitosamente', () => {
		moveCards();
	});
	it('GX3-2958 | TC 02: Validar poder archivar todas las tarjetas exitosamente',  () => {
		archiveCards();
	});
});