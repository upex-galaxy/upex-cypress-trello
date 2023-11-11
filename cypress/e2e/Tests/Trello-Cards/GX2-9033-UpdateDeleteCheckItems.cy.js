import { removeLogs } from '@helper/RemoveLogs';
removeLogs();
import { checkItems } from '../../../support/pages/GX2-9033-UpdateDeleteCheckItems.page';
import data from '../../../fixtures/data/GX2-9033-UpdateDeleteCheckItem.json';

let board;
describe('Trello (API) | Checkitems | API Endpoint: Create, Update and Delete Checkitems on Checklist', () => {
	context('Test para el Backend', () => {
		let name;
		let item;
		let item2;
		let itemUnCaracter;
		let itemNombreLargo;
		let itemTop;
		let itemBottom;
		let itemNumeroEntero;
		let itemIncomplete;
		let itemParaBorrar;

		before(() => {
			checkItems.createBoard('Lista de Pendientes').then(boardId => {
				board = boardId;
				checkItems.createList('Pendientes de Hoy').then(() => {
					checkItems.createCard('Test para Hacer').then(() => {
						checkItems.createCheckList('Test Manuales');
					});
				});
			});
		});

		it('9034 | TC1: Validar crear un CheckItem', () => {
			checkItems.createCheckItem(data.name1, data.posTop, data.stateIncomplete).then(checkItemIds => {
				item = checkItemIds;
				cy.log(item);
			});
		});

		it('9034 | TC2: Validar actualizar un CheckItem', () => {
			checkItems.createCheckItem(data.name2, data.posTop, data.stateIncomplete).then(checkItemIds => {
				item2 = checkItemIds;
				cy.log(item2);

				checkItems.modifyCheckItem('Test 2 Nuevo', 200, 'complete', item2);
			});
		});

		it.only('9034 | TC3:  Validar eliminar un CheckItem', () => {
			checkItems.createCheckItem(data.name11, data.posBottom, data.stateComplete).then(checkItemIds => {
				itemParaBorrar = checkItemIds;
				checkItems.deleteCheckItem(itemParaBorrar);
				
				});
		});
		it('9034 | TC4: Validar que el nombre del nuevo CheckItem tiene 1 caracter.', () => {
			checkItems.createCheckItem(data.name3, data.posTop, data.stateIncomplete).then(checkItemIds => {
				itemUnCaracter = checkItemIds;
				checkItems.modifyCheckItem('a', '', 'incomplete', itemUnCaracter);
				checkItems.getCheckItem(itemUnCaracter).then(response => {
					expect(response.body.name.length).to.equal(1);
				});
			});
		});

		it('9034 | TC5: Validar que el nombre del nuevo CheckItem tiene 16384 caracteres.', () => {
			const nombreCon16384Caracteres = 'a'.repeat(16384);
			checkItems.createCheckItem(nombreCon16384Caracteres, 'top', 'incomplete').then(checkItemIds => {
				itemNombreLargo = checkItemIds;
				checkItems.getCheckItem(itemNombreLargo).then(response => {
					expect(response.body.name.length).to.equal(16384);
				});
			});
		});

		it('9034 | TC6: Validar que el nombre del nuevo CheckItem tiene 16385 caracteres.', () => {
			const nombreCon16385Caracteres = 'a'.repeat(16385);
			if (nombreCon16385Caracteres.length > 16385) {
				cy.log('No se puede ingresar un nombre de esa longitud');
			}
		});

		it('9034 | TC7: Validar no ponerle nombre al nuevo CheckItem.', () => {
			if (name == data.name9) {
				cy.log('El item debe tener nombre');
			}
		});

		it('9034 | TC8: Validar que la posición del CheckItem en posición Top', () => {
			checkItems.createCheckItem(data.name4, data.posTop, data.stateIncomplete).then(checkItemIds => {
				itemTop = checkItemIds;
				checkItems.getCheckItem(itemTop).then(response => {
					expect(response.body.pos).to.equal(data.posTopValue);
				});
			});
		});

		it('9034 | TC9: Validar que la posición del CheckItem en posición Bottom', () => {
			checkItems.createCheckItem(data.name5, data.posBottom, data.stateComplete).then(checkItemIds => {
				itemBottom = checkItemIds;
				checkItems.getCheckItem(itemBottom).then(response => {
					expect(response.body.pos).to.equal(data.posBottomValue);
				});
			});
		});

		it('9034 | TC10: Validar que la posición del CheckItem en posición 20', () => {
			checkItems.createCheckItem(data.name6, data.pos20, data.stateIncomplete).then(checkItemIds => {
				itemNumeroEntero = checkItemIds;
				checkItems.getCheckItem(itemNumeroEntero).then(response => {
					expect(response.body.pos).to.equal(data.pos20);
				});
			});
		});

		it('9034 | TC11: Validar que el estado del CheckItem por defecto sea Incomplete', () => {
			checkItems.createCheckItem(data.name7, data.pos20, data.state).then(checkItemIds => {
				itemIncomplete = checkItemIds;
				checkItems.getCheckItem(itemIncomplete).then(response => {
					expect(response.body.state).to.equal(data.stateIncomplete);
				});
			});
		});

		it('9034 | TC12:  Validar cambiar el estado del CheckItem a complete', () => {
			checkItems.modifyCheckItem(data.name8, '', data.stateComplete, itemTop);
			checkItems.getCheckItem(itemTop).then(response => {
				expect(response.body.state).to.equal(data.stateComplete);
			});
		});

		it('9034 | TC13: Validar agregar un emoji al título', () => {
			checkItems.modifyCheckItem(data.name10, data.posTop, data.stateComplete, itemUnCaracter).then(() => {
				checkItems.getCheckItem(itemUnCaracter).then(response => {
					expect(response.body.name).to.equal(data.name10);
				});
			});
		});
	});

	context('Test para el Frontend', () => {
		beforeEach(() => {
			cy.visit(
				'https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D'
			);

			checkItems.get.userName().type(data.userName);
			checkItems.get.botonSubmit().click();
			checkItems.get.password().type(data.password);
			checkItems.get.botonSubmit().click();
		});

		it('9034 | TC14:  Validar que cambia la barra de progreso', () => {
			cy.contains('Lista de Pendientes').click();
			cy.contains('Test para Hacer').click();
			checkItems.get.barra().should('have.text', '38%');
			cy.log(board);
		});
	});
	context('Test para eliminar el Board desde el backend', () => {
		it.only('9034| TC15:Eliminar tablero', () => {
			checkItems.deleteBoard();
			
		});
	});
});
