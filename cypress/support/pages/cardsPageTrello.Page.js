import { idBoard } from '../../fixtures/data/GX2-4438-cardsTrello.json';
import { Token } from '../../fixtures/data/GX2-4438-cardsTrello.json';
import { apikey } from '../../fixtures/data/GX2-4438-cardsTrello.json';

class CardsTrello {
	constructor(listNames) {
		this.ids = {}; // Propiedad para almacenar los IDs
		this.listNames = listNames;
	}
	createList(name) {
		return cy
			.api({
				url: `https://api.trello.com/1/boards/${idBoard}/lists?key=${apikey}&token=${Token}`,

				method: 'POST',
				body: {
					name: name,
				},
			})
			.then(response => {
				return response;
			});
	}

	deleteList(idList) {
		return cy
			.api({
				url: `https://api.trello.com/1/lists/${idList}/closed?key=${apikey}&token=${Token}&value=true`,
				method: 'PUT',
			})
			.then(response => {
				this.listId = null; // Reiniciar el ID de la lista en el constructor
				return response;
			});
	}

	createCard(idList, name) {
		return cy
			.api({
				url: `https://api.trello.com/1/cards?idList=${idList}&key=${apikey}&token=${Token}`,
				method: 'POST',
				body: {
					name: name,
				},
			})
			.then(response => {
				return response;
			});
	}

	moveCard(idCard, idList) {
		return cy
			.api({
				url: `https://api.trello.com/1/cards/${idCard}?key=${apikey}&token=${Token}&idList=${idList}`,
				method: 'PUT',
			})
			.then(response => {
				return response;
			});
	}

	editCard(idCard, name) {
		return cy
			.api({
				url: `https://api.trello.com/1/cards/${idCard}?key=${apikey}&token=${Token}`,

				method: 'PUT',
				body: {
					name: name,
				},
			})
			.then(response => {
				return response;
			});
	}

	deleteCard(idCard) {
		return cy
			.api({
				url: `https://api.trello.com/1/cards/${idCard}?key=${apikey}&token=${Token}`,
				method: 'DELETE',
			})
			.then(response => {
				return response;
			});
	}
}

export const cardsTrello = new CardsTrello();
