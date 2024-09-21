import { trelloCheckItemPage } from '@pages/GX3-5007-update-checkitem.Page';
import {data} from '@data/GX3-5007-trello-api-update-checkitem.json';
import { faker, Faker } from '@faker-js/faker';

const nameList = faker.person.firstName();
const nameCard = faker.person.lastName();
const nameCheckList = faker.color;
const nameCheckItems = faker.animal.dog();
const nameCheckItems1 = faker.animal.cat();

describe('[Automation] Trello (API) | Checkitems | API Endpoint: Update Checkitems on Checklist',() => {
	beforeEach('PRC: El usuario deberia tener creada una lista, una carta y un ckeckitem',() => {
		trelloCheckItemPage.createList(data.key,data.token,nameList,data.idBoards,200).then(idList => {
			trelloCheckItemPage.createCard(data.key,data.token,idList,nameCard,200).then(idCard => {
				Cypress.env('idCard',idCard);
				trelloCheckItemPage.createCheckList(idCard,data.key,data.token,nameCheckList,200).then(idCheckList => {
					trelloCheckItemPage.createCheckItem(nameCheckItems,idCheckList,data.key,data.token).then(idCheckItems => {
						Cypress.env('idCheckItems',idCheckItems);
					});
				});
			});
		});
	});
	it ('5019 | TC1:Validar que el usuario pueda actualizar un ckeckitem en una carta exitosamente',() => {
		trelloCheckItemPage.updateCheckItem(nameCheckItems1,Cypress.env('idCard'),Cypress.env('idCheckItems'),data.key,data.token,200);
	});
	it ('5019 | TC2:Validar que el usuario No pueda actualizar un ckeckitem en una carta cuando el IdCarta es Vacio',() => {
		trelloCheckItemPage.updateCheckItem(nameCheckItems1,'',Cypress.env('idCheckItems'),data.key,data.token,404);
	});
	it ('5019 | TC3:Validar que el usuario No pueda actualizar un ckeckitem en una carta cuando el IdCheckItems es Vacio',() => {
		trelloCheckItemPage.updateCheckItem(nameCheckItems1,Cypress.env('idCard'),'',data.key,data.token,404);
	});

});


