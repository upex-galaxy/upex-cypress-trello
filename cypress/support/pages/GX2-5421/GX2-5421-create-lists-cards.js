import { global, board } from '../../fixtures/data/GX2-5421-mover-y-archivar-cards.json';

class Create {
	list(name) {
		cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/lists/',
			qs: {
				name: name, //nombre de la lista que se creará
				idBoard: board.id, //id del board donde se creará
				key: global.key,
				token: global.token,
			},
		});
	}

	card(idList, typeName) {
		cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/cards',
			qs: {
				name: typeName,
				idList: idList, //The ID of the list the card should be created in
				key: global.key,
				token: global.token,
			},
		});
	}
}

export const trelloElement = new Create();
