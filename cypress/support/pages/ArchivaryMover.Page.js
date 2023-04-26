class Precondition {
	createList(listName, number) {
		return cy.fixture('data/Archivarymover').then(the => {
			return cy
				.api({
					method: 'POST',
					url: the.url.CreateList,
					body: {
						name: listName,
						idBoard: the.idBoard,
						key: the.key,
						token: the.token,
					},
				})
				.then(response => {
					Cypress.env(`idList${number}`, response.body.id);
					return response;
				});
		});
	}

	createCard(cardName, number_idList, numberCard) {
		return cy.fixture('data/Archivarymover').then(the => {
			return cy
				.api({
					method: 'POST',
					url: the.url.CreateCard,
					body: {
						name: cardName,
						idList: Cypress.env(`idList${number_idList}`),
						key: the.key,
						token: the.token,
					},
				})
				.then(response => {
					Cypress.env(`idCard${numberCard}`, response.body.id);
					return response;
				});
		});
	}
}

export const precondition = new Precondition();



//Esta linea es comentanda para que se detecte un cambio en el archivo