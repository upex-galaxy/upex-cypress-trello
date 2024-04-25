/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UpdateSticker, DeleteSticker,AddSticker,ApiSticker } from '@pages/APIStickers.page';
import data from '../../../fixtures/data/GX3-3144_stickersOnCardData.json';
import {faker}from '@faker-js/faker';

const {key} = data;
const {token} = data;
const idList = '66228c917bf9a7fda9f9403d';
const idCard = '6622904b2d086ade25bce1a7';
const idSticker= '662ad1ca3c2061960b4b5fed';


describe('API Trello board ',() => {
	// before(); //Función que se ejecuta antes de todos los tests
	// beforeEach(); //Función que se ejecuta antes de cada test
	// after(); //Función que se ejecuta despues de todos los tests
	// afterEach(); //Función que se ejecuta despues de cada test
	beforeEach('Precondition',() => {
		// conseguir el idBoard con un GET
		// Realizar el POST de la creación de la List, para guardar el idList
		// Realizar el POST de la creación de la Card, para guardar el idCard
		// Crear un sticker, para guardar el idSticker
		cy.request({
			method: 'GET',
			url: `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`
		}).then(responseGetBoard => {
			expect(responseGetBoard.status).to.eql(200);
			const idBoard = responseGetBoard.body[1].id;
			const nameList = faker.person.firstName();
			cy.request({
				method:'POST',
				url:`https://api.trello.com/1/lists?name=${nameList}&idBoard=${idBoard}&key=${key}&token=${token}`
			}).then(responsePostList => {
				expect(responsePostList.status).to.eql(200);
				const idList = responsePostList.body.id;
			});
		});

	});

	it('TC01:create a card in Trello',() => {
		ApiSticker.createNewCard(idList,key,token,).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Soy La master QA');
		});
	});
	it('TC02: Validate that a sticker can be added to a card', () => {
		AddSticker.addStickerToCard(idCard, key, token).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.image).to.eql('taco-money');
			expect(response.body.zIndex).to.eql(1);

		});
	});

	it('TC03:update sticker on card', () => {
		UpdateSticker.updateStickerOnCard(idCard, idSticker, key, token).then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.image).to.eql('taco-money');
			expect(response.body.left).to.eql(6);
			expect(response.body.zIndex).to.eql(1);
		});

	});

	it('TC04: Delete Sticker from Card', () => {
		DeleteSticker.deleteStickerCard(idCard, idSticker, key,token);}
	);

	afterEach('Postcondition',() => {
		// Borrar el sticker
		// Borrar la card
		// Borrar la List
	});

});


