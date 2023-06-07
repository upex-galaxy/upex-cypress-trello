import { moveAndArchive } from '@pages/moveAndArchive';

let data;
describe('GX2-3408 |Trello (API) | Cards | API Endpoint: mover y archivar todas las tarjetas de una lista', () => {
	before('User must have 2 or more lists and cards in a list created', () => {
		cy.fixture('/data/moveAndArchive').then(dato => {
			data = dato;
		});
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
				expect(response.body[i].idList).to.eql(data.listB);
			}
		});
	});
	it('3409 | TC2: Validate move all the cards from "LIST B" to  "LIST C".', () => {
		moveAndArchive.moveCardsToListC().then(response => {
			for (let i = 0; i < response.body.length; i++) {
				expect(response.body[i].idList).to.eql(data.listC);
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
