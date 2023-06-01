import { key } from '../../fixtures/data/moveAndArchive.json';
import { token } from '../../fixtures/data/moveAndArchive.json';
import { listA } from '../../fixtures/data/moveAndArchive.json';
import { listB } from '../../fixtures/data/moveAndArchive.json';
import { listC } from '../../fixtures/data/moveAndArchive.json';
import { board } from '../../fixtures/data/moveAndArchive.json';

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
	moveCardsToListB() {
		return cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/lists/${listA}/moveAllCards`,
			body: {
				key: key,
				token: token,
				idList: listB,
				idBoard: board,
			},
		});
	}
	moveCardsToListC() {
		return cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/lists/${listB}/moveAllCards`,
			body: {
				key: key,
				token: token,
				idList: listC,
				idBoard: board,
			},
		});
	}
}
export const moveAndArchive = new MoveAndArchive();
