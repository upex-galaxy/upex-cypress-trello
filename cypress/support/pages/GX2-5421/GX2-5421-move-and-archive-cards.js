import { global, board } from '../../fixtures/data/GX2-5421-mover-y-archivar-cards.json';

class Cards {
	moveAllCards(idList, id) {
		cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/lists/${id}/moveAllCards`,
			qs: {
				idBoard: board.id, //id del board al que deberían moverse las cards
				idList: idList, //id de la lista a la que deberían moverse las cards
				key: global.key,
				token: global.token,
			},
		});
		//NOTA: validar que la respuesta sea status 200
	}

	archiveAllCards(id) {
		//requiere el ID (PP) de la lista donde están las cards
		cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/lists/${id}/archiveAllCards`,
			qs: {
				key: global.key,
				token: global.token,
			},
		});
		//NOTA: validar que la respuesta sea status 200
	}
}

export const card = new Cards();
