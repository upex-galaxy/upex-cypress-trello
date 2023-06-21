import { apikey } from '../../fixtures/data/keysTrello.json';
import { idBoard } from '../../fixtures/data/keysTrello.json';
import { token } from '../../fixtures/data/keysTrello.json';
export class CardsListsTrello {
	constructor(listNames) {
		this.ids = {}; // Propiedad para almacenar los IDs
		this.listNames = listNames;
	}

	// Crear las listas "por hacer", "haciendo", "listo"
	createLists() {
		return new Promise(resolve => {
			cy.wrap(this.listNames)
				.each(listName => {
					cy.request({
						url: `https://api.trello.com/1/boards/${idBoard}/lists?key=${apikey}&token=${token}`,
						method: 'POST',
						body: {
							name: listName,
						},
					}).then(response => {
						this.ids[listName] = response.body.id; // Asignar el id al objeto usando el nombre de la lista como clave
					});
				})
				.then(() => {
					resolve(this.ids);
				});
		});
	}

	createCard(value) {
		return new Promise(resolve => {
			cy.request({
				url: `https://api.trello.com/1/cards?idList=${value}&key=${apikey}&token=${token}`,
				method: 'POST',
				body: {
					name: 'Mi primer Card en Por Hacer',
				},
			}).then(response => {
				resolve(response);
			});
		});
	}

	updateCard(valueCard) {
		return new Promise(resolve => {
			cy.request({
				method: 'PUT',
				url: `https://api.trello.com/1/cards/${valueCard}?key=${apikey}&token=${token}`,
				body: {
					name: 'Una tarea muy importante por hacer',
					desc: 'Primero saber los requerimientos',
				},
			}).then(response => {
				resolve(response);
			});
		});
	}

	moveCard(cardId, nameList) {
		return cy.request({
			method: 'PUT',
			url: `https://api.trello.com/1/cards/${cardId}?key=${apikey}&token=${token}&idList=${this.ids[nameList]}`,
		});
	}

	deleteCards(list) {
		return new Promise(resolve => {
			cy.request({
				method: 'POST',
				url: `https://api.trello.com/1/lists/${list}/archiveAllCards?key=${apikey}&token=${token}`,
			}).then(response => {
				resolve(response);
			});
		});
	}

	deleteAllLists() {
		//borrar las listas despues de ejecutar los tests
		return new Promise(resolve => {
			cy.log(JSON.stringify(this.ids));

			cy.wrap(this.listNames).each(element => {
				cy.request({
					method: 'PUT',
					url: `https://api.trello.com/1/lists/${this.ids[element]}/closed?key=${apikey}&token=${token}&value=true`,
				}).then(response => {
					resolve(response);
				});
			});
		});
	}
}
