import { apikey } from '../../fixtures/data/keysTrello.json';
import { idBoard } from '../../fixtures/data/keysTrello.json';
import { token } from '../../fixtures/data/keysTrello.json';

class CardsListsTrello {
	// Crear las listas "por hacer", "haciendo", "listo"
	createLists(listNames) {
		cy.wrap(listNames).each(listName => {
			cy.request({
				url: `https://api.trello.com/1/boards/${idBoard}/lists?key=${apikey}&token=${token}`,
				method: 'POST',
				body: {
					name: listName,
				},
			});
		});
	}
}
export const cardsListsPage = new CardsListsTrello();
