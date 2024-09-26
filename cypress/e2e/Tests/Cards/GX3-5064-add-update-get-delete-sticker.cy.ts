import { trelloStickerPage } from '@pages/GX3-5064-add-update-get-delete-sticker.Page';
import { data } from '@data/GX3-5064-add-update-get-delete-sticker.json';
import { faker, tr } from '@faker-js/faker';

const nameList = faker.person.firstName();
const nameCard = faker.person.lastName();
const randomsleft= Cypress._.random(-50,80);
const randomstop=Cypress._.random(-50,80);
const zIndex =1;
const idSticker = ['laugh','heart','star'];


describe('[Automation] Trello (API) | Stickers | API Endpoint: Add, Update, Get, Delete a Sticker on a Card',() => {
	beforeEach('PRC: El usuario deberia tener creado un tablero, una lista y una carta',() => {
		trelloStickerPage.createList(data.key,data.token,nameList,data.idBoards,200).then(idList => {
			trelloStickerPage.createCard(data.key,data.token,idList,nameCard,200).then(idCard => {
				Cypress.env('idCard',idCard);
			});
		});
	});

	it('24020 | TC1: Validar que se agrega un Sticker a la carta exitosamente',() => {
		trelloStickerPage.addStickerCard(Cypress.env('idCard'),data.key,data.token,idSticker[0],randomstop,randomsleft,zIndex,200);
	});
	it('24020 | TC2: Validar que se actualizar un Sticker a la carta exitosamente',() => {
		trelloStickerPage.addStickerCard(Cypress.env('idCard'),data.key,data.token,idSticker[0],randomstop,randomsleft,zIndex,200);
		trelloStickerPage.addStickerCard(Cypress.env('idCard'),data.key,data.token,idSticker[1],randomstop,randomsleft,zIndex,200);
	});
	it('24020 | TC3: Validar que se obtenga un Sticker a la carta exitosamente',() => {
		trelloStickerPage.getStickerCard(Cypress.env('idCard'),data.key,data.token,200);
	});
	it('24020 | TC4: Validar que se borre un Sticker a la carta exitosamente',() => {
		trelloStickerPage.addStickerCard(Cypress.env('idCard'),data.key,data.token,idSticker[2],randomstop,randomsleft,zIndex,200).then(id => {
			trelloStickerPage.deleteStickerCard(Cypress.env('idCard'),data.key,data.token,id,200);
		});


	});

});
