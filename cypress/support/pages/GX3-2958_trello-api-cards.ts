/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import data from 'cypress/fixtures/data/GX3-2958-trello-api-cards.json';
import { faker } from '@faker-js/faker';

interface StatusJSON {
    [key: string]: number;
}
class Trello {

	public static getLists() {
		return cy.api({
			method: 'GET',
			url: `${data.url.trelloBoards}${data.data.boards}/lists`,
			qs: {
				key: data.data.key,
            	token: data.data.token
			}
		}).then((response) => {
			const lists: { id: string, name: string }[] = response.body;

			return lists;
		});
	}

	public static getCards() {
		return cy.api({
			method: 'GET',
			url: `${data.url.trelloBoards}${data.data.boards}/cards`,
			qs: {
				key: data.data.key,
            	token: data.data.token
			}
		}).then((response) => {
			const cards: { id: string, idList: string }[] = response.body;
			return cards;
		});
	}

	private static cardCountByList(cards: { id: string; idList: string; }[]) {
		const cardCountByList: Record<string, number> = {};
		cards.forEach((card) => {
			cardCountByList[card.idList] = (cardCountByList[card.idList] || 0) + 1;
		});

		return cardCountByList;
	}

	private static getTargetList(cardCountByList: Record<string, number> = {}, lists: { id: string; name: string; }[]) {
		let minCardCount = Infinity;

		let targetListId = '';
		lists.forEach((list) => {
			const cardCount = cardCountByList[list.id] || 0;
			if (cardCount < minCardCount) {
				minCardCount = cardCount;
				targetListId = list.id;
			}
		});

		return targetListId;
	}

	private static getRandomList() {
		return cy.request({
			method: 'GET',
			url: `${data.url.trelloBoards}${data.data.boards}/lists`,
			qs: {
				key: data.data.key,
            	token: data.data.token
			}
		}).then(response => {
			const lists = response.body;
			const randomListIndex = Number(faker.number.bigInt({ min: 0, max: lists.length - 1 }));
      		const randomListId = lists[randomListIndex].id;
			return randomListId;
		});
	}

	public static createCard() {
		this.getRandomList().then((randomListId: any) => {
			const cardData = {
				name: faker.lorem.words(3),
				desc: faker.lorem.paragraph(),
				labeText: faker.lorem.words(3)
			};

			cy.request({
				method: 'POST',
				url: data.url.trelloCards,
				qs: {
					key: data.data.key,
        	    	token: data.data.token,
					idList: randomListId,
					name: cardData.name,
					desc: cardData.desc
				}
			});
		});
	}

	public static moveCards() {
		const statusJSON: StatusJSON = {};
		return new Promise((resolve) => {
			this.getLists().then((lists: { id: string, name: string }[]) => {
				this.getCards().then((cards: { id: string; idList: string; }[]) => {
					const cardCountByList: Record<string, number> = this.cardCountByList(cards);
					const targetListId = this.getTargetList(cardCountByList, lists);

					const apiPromises = cards.map(card => {
						if (card.idList !== targetListId) {
							cy.api({
								method: 'PUT',
								url: `${data.url.trelloCards}${card.id}`,
								qs:{
									key: data.data.key,
            						token: data.data.token,
									idList: targetListId
								}
							}).then(response => {
								const { status } = response;
								statusJSON[card.id] = status;
							});
						}
					});
					Promise.all(apiPromises)
						.then(() => {
							resolve(statusJSON);
						});
				});
			});
		});
	}

	public static archiveCards() {
		const statusJSON: StatusJSON = {};
		return new Promise((resolve) => {
			this.getCards().then((cards: { id: string;}[]) => {

				const apiPromises = cards.map(card => {
					return cy.api({
						method: 'PUT',
						url: `${data.url.trelloCards}${card.id}/closed`,
						qs: {
							value: true,
							key: data.data.key,
							token: data.data.token
						}
					}).then(response => {
						const { status } = response;
						statusJSON[card.id] = status;
					});
				});

				Promise.all(apiPromises)
					.then(() => {
						resolve(statusJSON);
					});
			});
		});
	}
}

export const trello = Trello;