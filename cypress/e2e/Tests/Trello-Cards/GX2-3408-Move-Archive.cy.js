import { moveAndArchive } from '@pages/moveAndArchive';
const key = '3a71d9fbbd711e00d79697c7d811cb27'; // Nuestra autenticación
const token = 'ATTA7f7562055ec5d05e60143f697462126328138cc8964faadab4d0665f4532b8c0998A5D23';
const listA = '6476665fc6132f819210b657';
const listB = '647666649a8212d12e69047c';
const listC = '64766667bbbddd634d45201f';
const card1 = '647666821d85b3c51110b6e2';
const card2 = '647666879118d09d55b1f7c3';
const card3 = '6476668cf653244c103f3ccc';
const board = '6475222592f14dbb1aeba0f5';
let cardID;
describe('GX2-3408 |Trello (API) | Cards | API Endpoint: mover y archivar todas las tarjetas de una lista', () => {
	before('User must have 2 or more lists and cards in a list created', () => {
		moveAndArchive.getListA().then(response => {
			expect(response.body.name).to.eql('LIST A');
		});
		moveAndArchive.getListB().then(response => {
			expect(response.body.name).to.eql('LIST B');
		});
		moveAndArchive.getListC().then(response => {
			expect(response.body.name).to.eql('LIST C');
			cardID = Cypress.env('cardID', response.body.id);
		});
		moveAndArchive.createCard1().then(response => {
			expect(response.body.name).to.eql('Card 1');
		});
		moveAndArchive.createCard2().then(response => {
			expect(response.body.name).to.eql('Card 2');
		});
		moveAndArchive.createCard3().then(response => {
			expect(response.body.name).to.eql('Card 3');
		});
	});
	it('3409 | TC1: Validate move all the cards from "LIST A" to  "LIST B".', () => {
		cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/lists/${listA}/moveAllCards`,
			body: {
				key: key,
				token: token,
				idList: listB,
				idBoard: board,
			},
		});
	});
	it('3409 | TC2: Validate move all the cards from "LIST B" to  "LIST C".', () => {
		cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/lists/${listB}/moveAllCards`,
			body: {
				key: key,
				token: token,
				idList: listC,
				idBoard: board,
			},
		});
	});
	it('3409 | TC3: Validate Archive all the cards from "LIST C".', () => {
		moveAndArchive.archiveAllCards().then(response => {
			expect(response.body).to.be.empty;
			expect(response.status).to.eql(200);
		});
	});
});
