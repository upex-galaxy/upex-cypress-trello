import the from 'cypress/fixtures/data/GX2-4343-TrelloCards.json';

class TrelloCards {
	CreateBoard() {
		return cy
			.api('POST', the.url.Boards, {
				key: the.key,
				token: the.token,
				name: the.board.Name,
			})
			.then(response => {
				Cypress.env.boardId = response.body.id;
			});
	}

	CreateList1() {
		return cy
			.api('POST', the.url.Lists, {
				idBoard: Cypress.env.boardId,
				key: the.key,
				token: the.token,
				name: the.lists.List1,
			})
			.then(response => {
				Cypress.env.list1Id = response.body.id;
			});
	}

	CreateList2() {
		return cy
			.api('POST', the.url.Lists, {
				idBoard: Cypress.env.boardId,
				key: the.key,
				token: the.token,
				name: the.lists.List2,
			})
			.then(response => {
				Cypress.env.list2Id = response.body.id;
			});
	}

	CreateList3() {
		return cy
			.api('POST', the.url.Lists, {
				idBoard: Cypress.env.boardId,
				key: the.key,
				token: the.token,
				name: the.lists.List3,
			})
			.then(response => {
				Cypress.env.list3Id = response.body.id;
			});
	}

	CreateCard(randomName1) {
		return cy
			.api('POST', the.url.Cards, {
				idList: Cypress.env.list1Id,
				key: the.key,
				token: the.token,
				name: randomName1,
			})
			.then(response => {
				Cypress.env.cardId = response.body.id;
				Cypress.env.PosCard = response.body.pos;
			});
	}

	CreateBottomCard(randomName2) {
		return cy
			.api('POST', the.url.Cards, {
				idList: Cypress.env.list1Id,
				key: the.key,
				token: the.token,
				name: randomName2,
				pos: the.card.Pos.Bottom,
			})
			.then(response => {
				Cypress.env.BottomCard = response.body.pos;
			});
	}

	CreateTopCard(randomName3) {
		return cy
			.api('POST', the.url.Cards, {
				idList: Cypress.env.list1Id,
				key: the.key,
				token: the.token,
				name: randomName3,
				pos: the.card.Pos.Top,
			})
			.then(response => {
				Cypress.env.TopCard = response.body.pos;
			});
	}

	ModifyCard(randomDesc) {
		return cy.api('PUT', the.url.Cards + Cypress.env.cardId, {
			key: the.key,
			token: the.token,
			desc: randomDesc,
			idMembers: [the.card.idMembers],
			cover: {
				color: the.card.Cover.Color,
				size: the.card.Cover.Size,
				brightness: the.card.Cover.Brightness,
			},
		});
	}

	MoveCardToList1() {
		return cy.api('PUT', the.url.Cards + Cypress.env.cardId, {
			key: the.key,
			token: the.token,
			idList: Cypress.env.list1Id,
		});
	}
	MoveCardToList2() {
		return cy.api('PUT', the.url.Cards + Cypress.env.cardId, {
			key: the.key,
			token: the.token,
			idList: Cypress.env.list2Id,
		});
	}
	MoveCardToList3() {
		return cy.api('PUT', the.url.Cards + Cypress.env.cardId, {
			key: the.key,
			token: the.token,
			idList: Cypress.env.list3Id,
		});
	}

	DeleteCard() {
		return cy.api('DELETE', the.url.Cards + Cypress.env.cardId, {
			key: the.key,
			token: the.token,
		});
	}

	DeleteBoard() {
		return cy.api('DELETE', the.url.Boards + Cypress.env.boardId, {
			key: the.key,
			token: the.token,
		});
	}
}

export const TrelloCardsPage = new TrelloCards();
