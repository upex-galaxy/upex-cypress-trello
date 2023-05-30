import { cards } from '@pages/cardsPage';

const listA = '64763489c099ccfa084a821a';
const listB = '64752275edf99f729f6bb69e';
const listC = '64752277195322ca2ecb57f6';
let cardID;

describe('GX2-3306 | Trello (API) | Cards | Create, Modify, Move and Delete cards', () => {
	beforeEach('Preconditions: ', () => {
		cards.getListA().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('BACKLOG');
		});
		cards.getListB().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('ACTIVE');
		});
		cards.getListC().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('DONE');
		});
	});

	it('3307 | TC1: Validate create a Card in BACKLOG list, be located at the bottom and contain the name entered ', () => {
		let arrayCards = [];
		cards.createCard().then(response => {
			expect(response).to.be.an('object');
			expect(response.body.idList).to.include(listA);
			expect(response.status).to.eql(200);
			expect(response.body.name).to.include('Insert Card');
			cardID = Cypress.env('cardID', response.body.id);
		});
		cards.getListCards().then(response => {
			arrayCards.push(response.body);
			let lastArray = arrayCards[0];
			let lastArray1 = lastArray[lastArray.length - 1];
			expect(response.body[lastArray.length - 1]).to.eql(lastArray1);
		});
	});
	it('3307 | TC2: Validate update the card information', () => {
		cards.updateCard().then(response => {
			expect(response).to.be.an('object');
			expect(response.body.id).to.eql(cardID);
			expect(response.body.name).not.equal('Insert Card');
			expect(response.body.name).to.be.equal('Modify Card');
			expect(response.body.desc).to.eql('Adding description');
			expect(response.body.cover).to.include({ color: 'green' });
		});
	});
	it('3307 | TC3: Validate drag and drop a card to "ACTIVE list"', () => {
		cards.moveCardActive().then(response => {
			expect(response).to.be.an('object');
			expect(response.body.idList).to.eql(listB);
			expect(response.body.name).to.be.equal('Modify Card');
			expect(response.body.desc).to.eql('Adding description');
			expect(response.body.cover).to.include({ color: 'green' });
		});
	});
	it('3307 | TC4: Validate drag and drop a card to "DONE list"', () => {
		cards.moveCardDone().then(response => {
			expect(response).to.be.an('object');
			expect(response.body.idList).to.eql(listC);
			expect(response.body.name).to.be.equal('Modify Card');
			expect(response.body.desc).to.eql('Adding description');
			expect(response.body.cover).to.include({ color: 'green' });
		});
	});
	it('3307 | TC5: Validate delete a card', () => {
		cards.deleteCard().then(response => {
			expect(response.body.limits).to.be.empty;
			expect(response.status).to.eql(200);
		});
	});
});
