import the from 'cypress/fixtures/data/GX2-4343-TrelloCards.json';

class TrelloCards {
	PostBoard() {
		cy.api('POST', the.url.Boards, {
			key: the.key,
			token: the.token,
			name: the.board.Name,
		}).then(response => {
			Cypress.env.boardId = response.body.id;
		});
	}

	PostList1() {
		cy.api('POST', the.url.Lists, {
			idBoard: Cypress.env.boardId,
			key: the.key,
			token: the.token,
			name: the.lists.List1,
		}).then(response => {
			Cypress.env.list1Id = response.body.id;
		});
	}

	PostList2() {
		cy.api('POST', the.url.Lists, {
			idBoard: Cypress.env.boardId,
			key: the.key,
			token: the.token,
			name: the.lists.List2,
		}).then(response => {
			Cypress.env.list2Id = response.body.id;
		});
	}

	PostList3() {
		cy.api('POST', the.url.Lists, {
			idBoard: Cypress.env.boardId,
			key: the.key,
			token: the.token,
			name: the.lists.List3,
		}).then(response => {
			Cypress.env.list3Id = response.body.id;
		});
	}

	CreateCard(randomName) {
		cy.api('POST', the.url.Cards, {
			idList: Cypress.env.list1Id,
			key: the.key,
			token: the.token,
			name: randomName,
		}).then(response => {
			Cypress.env.cardId = response.body.id;
		});
	}
	ModifyCard(randomDesc) {
		cy.api('PUT', the.url.Cards + Cypress.env.cardId, {
			key: the.key,
			token: the.token,
			desc: randomDesc,
			idMembers: ['6453aa0ecb3d191f7be1583a'],
			labels: ['64a30cc18b05e865ec1718a1'],
		});
	}
}

export const TrelloCardsPage = new TrelloCards();
