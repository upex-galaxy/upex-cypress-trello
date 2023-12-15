import { key, token, idBoard } from '../../fixtures/data/GX2-10188-trello-mover-archivar.json';

class TrelloApi {
	createList({ name }) {
		return cy.api({
			method: 'POST',
			url: `/boards/${idBoard}/lists`,
			qs: {
				key: key,
				token: token,
				name: name,
			},
		});
	}

	createCard({ numberOfCards, idList }) {
		for (let i = 0; i < numberOfCards; i++) {
			cy.api({
				method: 'POST',
				url: '/cards',
				qs: {
					idList: idList,
					key: key,
					token: token,
					name: `card ${i + 1}`,
				},
			}).then(({ status }) => {
				expect(status).eql(200);
			});
		}
	}

	moveAllCardsToAList({ currentIdList, newIdList }) {
		return cy.api({
			method: 'POST',
			url: `lists/${currentIdList}/moveAllCards`,
			qs: {
				key: key,
				token: token,
				idBoard: idBoard,
				idList: newIdList,
			},
		});
	}

	archiveAllCardsInList({ idList }) {
		return cy.api({
			method: 'POST',
			url: `/lists/${idList}/archiveAllCards`,
			qs: {
				key: key,
				token: token,
			},
		});
	}

	archiveList({ idList }) {
		return cy.api({
			method: 'PUT',
			url: `/lists/${idList}/closed`,
			qs: {
				key: key,
				token: token,
				value: true,
			},
		});
	}
}

export const trelloCards = new TrelloApi();
