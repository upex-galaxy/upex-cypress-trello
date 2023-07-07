import { idBoard } from '../../fixtures/data/GX2-4438-cardsTrello.json';
import { Token } from '../../fixtures/data/GX2-4438-cardsTrello.json';
import { apikey } from '../../fixtures/data/GX2-4438-cardsTrello.json';

class CardsTrello {
	constructor(listNames) {
		this.ids = {}; // Propiedad para almacenar los IDs
		this.listNames = listNames;
	}
	createList() {
		return cy.api({
			url: `https://api.trello.com/1/boards/${idBoard}/lists?key=${apikey}&token=${Token}`,

			method: 'POST',
			body: {
				name: 'Lista 1',
			}.then(response => {
				return response;
				//response.body.id;
				//Cypress.env('listId', listId);
				//this.ids[listName] = response.body.id;
			}),
		});
	}

	deleteList() {
		return cy
			.api({
				//url: `https://api.trello.com/1/lists/${this.listId}?key=${apikey}&token=${Token}`,
				//url: `https://api.trello.com/1/boards/${idBoard}/lists?key=${this.listId}&token=${Token}`,
				url: `https://api.trello.com/1/lists/${Cypress.env('listId')}/closed?key=${apikey}&token=${Token}`,
				method: 'PUT',
			})
			.then(response => {
				this.listId = null; // Reiniciar el ID de la lista en el constructor
				return response;
			});
	}
}

export const cardsTrello = new CardsTrello();
