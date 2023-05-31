import { moveAndArchive } from '@pages/moveAndArchive';

const listA = '6476665fc6132f819210b657';
const listB = '647666649a8212d12e69047c';
const listC = '64766667bbbddd634d45201f';
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
	it('3409 | TC1: Validate move all the cards from "LIST A" to  "LIST B"', () => {
		moveAndArchive.moveCardsToListB().then(response => {
			for (let i = 0; i < response.body.length; i++) {
				expect(response.body[i].idList).to.eql(listB);
			}
		});
	});
	it('3409 | TC2: Validate move all the cards from "LIST B" to  "LIST C".', () => {
		moveAndArchive.moveCardsToListC().then(response => {
			for (let i = 0; i < response.body.length; i++) {
				expect(response.body[i].idList).to.eql(listC);
			}
		});
	});
	it('3409 | TC3: Validate Archive all the cards from "LIST C".', () => {
		moveAndArchive.archiveAllCards().then(response => {
			expect(response.body).to.be.empty;
			expect(response.status).to.eql(200);
		});
	});
});
