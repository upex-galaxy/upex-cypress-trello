import { global, board } from '../../fixtures/data/GX2-5421-mover-y-archivar-cards.json';

class TrelloAPI {
	createCard(idList, name) {
		return cy
			.api({
				method: 'POST',
				url: 'https://api.trello.com/1/cards',
				qs: {
					name: name,
					idList: idList, //The ID of the list the card should be created in
					key: global.key,
					token: global.token,
				},
			})
			.then(response => {
				return response;
			});
	}

	moveAllCards(idList, id) {
		return cy
			.api({
				//Donde el param. id es el id de la lista en la que se encuentran las cards
				method: 'POST',
				url: `https://api.trello.com/1/lists/${id}/moveAllCards`,
				qs: {
					idBoard: board.id, //id del board al que deberían moverse las cards
					idList: idList, //id de la lista a la que deberían moverse las cards
					key: global.key,
					token: global.token,
				},
			})
			.then(response => {
				return response;
			});
		//NOTA: validar que la respuesta sea status 200
	}

	archiveAllCards(id) {
		//requiere el ID (PP) de la lista donde están las cards
		return cy
			.api({
				method: 'POST',
				url: `https://api.trello.com/1/lists/${id}/archiveAllCards`,
				qs: {
					key: global.key,
					token: global.token,
				},
			})
			.then(response => {
				return response;
			});
		//NOTA: validar que la respuesta sea status 200
	}

	archiveList(id) {
		//id de la lista que va a ser eliminada
		cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/lists/${id}/closed`,
			qs: {
				key: global.key,
				token: global.token,
			},
		});
	}
}

export const trello = new TrelloAPI();
