import data from '../../fixtures/data/GX2-10188-trello-mover-archivar.json';

class TrelloApi {
	createAList({ name }) {
		return cy.api({
			method: 'POST',
			url: `/boards/${data.idBoard}/lists`,
			qs: {
				key: data.key,
				token: data.token,
				name: name,
			},
		});
	}

	createACard({ idList, name }) {
		return cy.api({
			method: 'POST',
			url: '/cards',
			qs: {
				idList: idList,
				key: data.key,
				token: data.token,
				name: name,
			},
		});
	}
}

export const trelloCards = new TrelloApi();
