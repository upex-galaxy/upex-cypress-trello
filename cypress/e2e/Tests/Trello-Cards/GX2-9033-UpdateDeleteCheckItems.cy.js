import { checkItems } from '@pages/GX2-8301-UpdateDeleteCheckItems.Page';
describe('Trello (API) | Checkitems | API Endpoint: Create, Update and Delete Checkitems on Checklist', () => {
	let nameBoard = 'Tareas Diarias';

	before(() => {
		checkItems.createBoard('Lista de Pendientes').then(()=>{
			checkItems.createList('Pendientes de Hoy').then(()=>{
				checkItems.createCard('Test para Hacer').then(()=>{
					checkItems.createCheckList('Test Manuales');
				});
			});
		});
		
		});
	
	it('9034 | TC1: Validar crear un CheckItem', () => {
		checkItems.createCheckItem();
	});
	it('9034 | TC2: Validar actualizar un CheckItem', () => {
		// Write your test case two here
	});
	it('9034 | TC3:  Validar eliminar un CheckItem', () => {
		// Write your test case one here
	});
	it('9034 | TC4: Validar que el nombre del nuevo CheckItem tiene 1 caracter.', () => {
		// Write your test case two here
	});
	it('9034 | TC5: Validar que el nombre del nuevo CheckItem tiene 16384 caracteres.', () => {
		// Write your test case one here
	});
	it('9034 | TC6: Validar que el nombre del nuevo CheckItem tiene 16385 caracteres.', () => {
		// Write your test case two here
	});
	it('9034 | TC7: Validar no ponerle nombre al nuevo CheckItem.', () => {
		// Write your test case one here
	});
	it('9034 | TC8: Validar que la posición del CheckItem en posición Top', () => {
		// Write your test case two here
	});
	it('9034 | TC9: Validar que la posición del CheckItem en posición Bottom', () => {
		// Write your test case one here
	});
	it('9034 | TC10: Validar que la posición del CheckItem en posición 20', () => {
		// Write your test case two here
	});
	it('9034 | TC11: Validar que el estado del CheckItem por defecto sea false', () => {
		// Write your test case two here
	});
	it('9034 | TC12:  Validar cambiar el estado del CheckItem a true', () => {
		// Write your test case two here
	});
	it('9034 | TC13:  Validar que cambia la barra de progreso', () => {
		// Write your test case two here
	});
	it('9034 | TC14:  Validar agregar un emoji al título', () => {
		// Write your test case two here
	});
	
});
