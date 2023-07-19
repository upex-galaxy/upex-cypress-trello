import { cards } from '@pages/cardsPage';

describe.skip('GX2-3306 | Trello (API) | Cards | Create, Modify, Move and Delete cards', () => {
	let cardID;
	let data;
	before('Fixture', () => {
		cy.fixture('/data/cards').then(dato => {
			data = dato;
		});
	});
	beforeEach('User have access to Trello and 3 Lists are displayed (Backlog-Active-Done) ', () => {
		cards.getBacklogList().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('BACKLOG');
		});
		cards.getActiveList().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('ACTIVE');
		});
		cards.getDoneList().then(response => {
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('DONE');
		});
	});

	it('3307 | TC1: Validate create a Card in BACKLOG list, be located at the bottom and contain the name entered ', () => {
		let arrayCards = [];
		cards.createCard().then(response => {
			expect(response).to.be.an('object');
			expect(response.body.idList).to.include(data.backlogList);
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
			expect(response.body.idList).to.eql(data.doneList);
			expect(response.body.name).to.be.equal('Modify Card');
			expect(response.body.desc).to.eql('Adding description');
			expect(response.body.cover).to.include({ color: 'green' });
		});
	});
	it('3307 | TC4: Validate drag and drop a card to "DONE list"', () => {
		cards.moveCardDone().then(response => {
			expect(response).to.be.an('object');
			expect(response.body.idList).to.eql(data.activeList);
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
