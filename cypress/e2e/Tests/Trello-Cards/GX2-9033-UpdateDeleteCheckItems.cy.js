import { checkItems } from '../../../support/pages/GX2-9033-UpdateDeleteCheckItems.page';

describe('Trello (API) | Checkitems | API Endpoint: Create, Update and Delete Checkitems on Checklist', () => {
	let nameBoard = 'Tareas Diarias';
	let name;
	let state;
	let pos;
	let item;
	let item2;
	let itemUnCaracter;
	let itemNombreLargo;
	let itemSinNombre;
	let itemTop;
	let itemBottom;
	let itemNumeroEntero;
	let itemIncomplete;

	before(() => {
		checkItems.createBoard('Lista de Pendientes').then(() => {
			checkItems.createList('Pendientes de Hoy').then(() => {
				checkItems.createCard('Test para Hacer').then(() => {
					checkItems.createCheckList('Test Manuales');
				});
			});
		});
	});

	it('9034 | TC1: Validar crear un CheckItem', () => {
		name = 'Test 1';
		pos = 'top';
		state = 'incomplete';

		checkItems.createCheckItem(name, 'top', 'incomplete').then(checkItemIds => {
			item = checkItemIds;
			cy.log(item);
		});
	});
	it('9034 | TC2: Validar actualizar un CheckItem', () => {
		name = 'Test 2';
		checkItems.createCheckItem(name, 'top', 'incomplete').then(checkItemIds => {
			item2 = checkItemIds;
			cy.log(item2);

			checkItems.modifyCheckItem('Test 2 Nuevo', 200, 'complete', item2);
			
		});
	});
	it('9034 | TC3:  Validar eliminar un CheckItem', () => {
		cy.log(item);
		checkItems.deleteCheckItem(item);
	});
	it('9034 | TC4: Validar que el nombre del nuevo CheckItem tiene 1 caracter.', () => {
		name = 'Test 3';
		checkItems.createCheckItem(name, 'top', 'incomplete').then(checkItemIds => {
			itemUnCaracter = checkItemIds;
			cy.log(itemUnCaracter);

			checkItems.modifyCheckItem('a', '', 'incomplete', itemUnCaracter);
		});
	});
	it('9034 | TC5: Validar que el nombre del nuevo CheckItem tiene 16384 caracteres.', () => {
		const nombreCon16384Caracteres = 'a'.repeat(16384);
		checkItems.createCheckItem(nombreCon16384Caracteres, 'top', 'incomplete').then(checkItemIds => {
			itemNombreLargo = checkItemIds;
			checkItems.getCheckItem(itemNombreLargo);
		});
	});
	it('9034 | TC6: Validar que el nombre del nuevo CheckItem tiene 16385 caracteres.', () => {
		const nombreCon16385Caracteres = 'a'.repeat(16385);
		if (nombreCon16385Caracteres.length > 16385) {
				cy.log('No se puede ingresar un nombre de esa longitud');
		}
	});
	it('9034 | TC7: Validar no ponerle nombre al nuevo CheckItem.', () => {
		name = '';
		if (name == '') {
			cy.log('El item debe tener nombre');
		}
	});
	it('9034 | TC8: Validar que la posición del CheckItem en posición Top', () => {
		checkItems.createCheckItem('CheckItemTop', 'top', 'incomplete').then(checkItemIds => {
			itemTop = checkItemIds;
			checkItems.getCheckItem(itemTop);
		});
	});
	it('9034 | TC9: Validar que la posición del CheckItem en posición Bottom', () => {
		checkItems.createCheckItem('CheckItemTop', 'bottom', 'incomplete').then(checkItemIds => {
			itemBottom = checkItemIds;
			checkItems.getCheckItem(itemBottom);
		});
	});
	it('9034 | TC10: Validar que la posición del CheckItem en posición 20', () => {
		checkItems.createCheckItem('CheckItemTop', 20, 'incomplete').then(checkItemIds => {
			itemNumeroEntero = checkItemIds;
			checkItems.getCheckItem(itemNumeroEntero);
		});
	});
	it('9034 | TC11: Validar que el estado del CheckItem por defecto sea Incomplete', () => {
		checkItems.createCheckItem('CheckItemTop', 20, 'incomplete').then(checkItemIds => {
			itemIncomplete = checkItemIds;
			checkItems.getCheckItem(itemIncomplete);
		});
	});
	it('9034 | TC12:  Validar cambiar el estado del CheckItem a complete', () => {
		checkItems.modifyCheckItem('a', '', 'complete', itemTop);
		checkItems.getCheckItem(itemTop);
		
		
		
	});
	it('9034 | TC13:  Validar que cambia la barra de progreso', () => {
		
	
	});
	it('9034 | TC14:  Validar agregar un emoji al título', () => {
		checkItems.modifyCheckItem(':smile: Test 1', 200, 'complete', itemUnCaracter);
		
	});
});
