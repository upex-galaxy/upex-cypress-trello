const key = '3a71d9fbbd711e00d79697c7d811cb27'; // Nuestra autenticación
const token = 'ATTA7f7562055ec5d05e60143f697462126328138cc8964faadab4d0665f4532b8c0998A5D23';
const listA = '6476665fc6132f819210b657';
const listB = '647666649a8212d12e69047c';
const listC = '64766667bbbddd634d45201f';
const card1 = '647666821d85b3c51110b6e2';
const card2 = '647666879118d09d55b1f7c3';
const card3 = '6476668cf653244c103f3ccc';
const board = '6475222592f14dbb1aeba0f5';
class MoveAndArchive {
	getListA() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + listA,
			qs: {
				key: key,
				token: token,
				name: 'LIST A',
			},
		});
	}
	getListB() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + listB,
			qs: {
				key: key,
				token: token,
				name: 'LIST B',
			},
		});
	}
	getListC() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/lists/' + listC,
			qs: {
				key: key,
				token: token,
				name: 'LIST C',
			},
		});
	}

	createCard1() {
		return cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/cards',
			body: {
				key: key,
				token: token,
				idList: listA,
				name: 'Card 1',
			},
		});
	}
	createCard2() {
		return cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/cards',
			body: {
				key: key,
				token: token,
				idList: listA,
				name: 'Card 2',
			},
		});
	}
	createCard3() {
		return cy.api({
			method: 'POST',
			url: 'https://api.trello.com/1/cards',
			body: {
				key: key,
				token: token,
				idList: listA,
				name: 'Card 3',
			},
		});
	}
	archiveAllCards() {
		return cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/lists/${listC}/archiveAllCards`,
			body: {
				key: key,
				token: token,
			},
		});
	}
}
export const moveAndArchive = new MoveAndArchive();
