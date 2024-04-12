/* eslint-disable @typescript-eslint/no-unsafe-assignment */

class Trello {
	public static getLists() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/boards/6592ed58a34878ef297261d5/lists?key=4b6c632cc1e7a202e9ad79f28f549d34&token=ATTAc47382028c4b75d1cc4df76132118d08134c919e95cbb01e15b9de168208314bCB6F74BD'
		}).then((response) => {
			const lists: { id: string, name: string }[] = response.body;

			return lists;
		});
	}

	public static getCards() {
		return cy.api({
			method: 'GET',
			url: 'https://api.trello.com/1/boards/6592ed58a34878ef297261d5/cards?key=4b6c632cc1e7a202e9ad79f28f549d34&token=ATTAc47382028c4b75d1cc4df76132118d08134c919e95cbb01e15b9de168208314bCB6F74BD'
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

	public static moveCards() {
		this.getLists().then((lists: { id: string, name: string }[]) => {
			this.getCards().then((cards: { id: string; idList: string; }[]) => {
				const cardCountByList: Record<string, number> = this.cardCountByList(cards);
				const targetListId = this.getTargetList(cardCountByList, lists);

				cards.forEach((card) => {
					if (card.idList !== targetListId) {
						cy.api({
							method: 'PUT',
							url: `https://api.trello.com/1/cards/${card.id}?key=4b6c632cc1e7a202e9ad79f28f549d34&token=ATTAc47382028c4b75d1cc4df76132118d08134c919e95cbb01e15b9de168208314bCB6F74BD&idList=${targetListId}`
						}).then((response) => {
							expect(response.status).to.eq(200);

							expect(response.body.idList).to.eq(targetListId);
						});
					}
				});
			});
		});
	}

}

export const trello = Trello;