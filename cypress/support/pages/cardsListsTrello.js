import { resolve } from 'cypress/types/bluebird';
import { apikey } from '../../fixtures/data/keysTrello.json';
import { idBoard } from '../../fixtures/data/keysTrello.json';
import { token } from '../../fixtures/data/keysTrello.json';
import { idListToDo, idListDoing, idListDone } from '../../fixtures/data/keysTrello.json';

class CardsListsTrello {
	// Crear las listas "por hacer", "haciendo", "listo"
	createLists(listNames) {
		return new Promise((resolve, reject) => {
			const ids = {}; // Objeto para almacenar los ids

			cy.wrap(listNames)
				.each(listName => {
					cy.request({
						url: `https://api.trello.com/1/boards/${idBoard}/lists?key=${apikey}&token=${token}`,
						method: 'POST',
						body: {
							name: listName,
						},
					}).then(response => {
						ids[listName] = response.body.id; // Asignar el id al objeto usando el nombre de la lista como clave
					});
				})
				.then(() => {
					resolve(ids);
				});
		});
	}

	createCard(idList) {
		cy.request({
			url: 'https://api.trello.com/1/cards',
			method: 'POST',
			body: {
				name: 'Mi primer Card en Por Hacer',
				idList: idList,
				key: apikey,
				token: token,
			},
		});
	}
}

export const cardsListsPage = new CardsListsTrello();
