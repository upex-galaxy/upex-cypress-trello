import TrelloCardApi from '../../../support/pages/TrelloAPI.Page';
const listBacklog = '654a353c5b36a089e49656b5';
const listActive = '6556516a7ecd359fc7ea7ea3';
const listDone = '6556516dc2003862888d3238';

let idCardA;
let idCardB;


describe('GX2-16267 | {API} Trello | Cards | Create Cards from a Board', () => {
	const trelloCardApi = new TrelloCardApi('https://api.trello.com');
	it('TC1: Check that BACKLOG list is visible on the board', () => {
		// URL "https://api.trello.com/1/lists/{idList}?key={key}&token={token}"
		trelloCardApi.getListById(listBacklog)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('BACKLOG');
			});
	});
	it('TC2: Check that ACTIVE list is visible on the board', () => {
		// URL "https://api.trello.com/1/lists/{idList}?key={key}&token={token}"
		trelloCardApi.getListById(listActive)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('ACTIVE');
			});
	});
	it('TC3: Check that DONE list is visible on the board', () => {
		// URL "https://api.trello.com/1/lists/{idList}?key={key}&token={token}"
		trelloCardApi.getListById(listDone)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('DONE');
			});
	});
	it('TC4: Check that the user can create Card A on the Backlog list', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const cardName = 'Card A';
		trelloCardApi.createCardOnList(listBacklog, cardName)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listBacklog);
				expect(response.body.name).to.eql(cardName);
				idCardA = response.body.id;
			});
	});
	it('TC5: Check that the user can create Card B on the Active list', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const cardName = 'Card B';
		trelloCardApi.createCardOnList(listActive, cardName)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listActive);
				expect(response.body.name).to.eql(cardName);
				idCardB = response.body.id;
			});
	});

	it('TC6: Check that the user can update Card A', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const updates = {
			name: 'Updated Card A',
			desc: 'This is the description for Card A',
		};
		trelloCardApi.updateCard(idCardA, updates)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(updates.name);
				expect(response.body.desc).to.eql(updates.desc);

			});
	});
	it('TC7: Check that the user can move Card A to Backlog List', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		trelloCardApi.updateCard(idCardA, {idList:listBacklog})
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listBacklog);
			});
	});
	it('TC8: Check that the user can move Card A to Done List', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		trelloCardApi.updateCard(idCardA, {idList:listDone})
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listDone);
			});
	});
	it('TC9: Check that card A has status closed: false', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		trelloCardApi.getCardById(idCardA)
			.then(response => {
				expect(response.body.closed).to.eql(false);
			});
	});
	it('TC10: Check that the user can archive a card', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		trelloCardApi.updateCard(idCardA, {closed:true})
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.closed).to.eql(true);
			});
	});
	it('TC11: Check that the user can recover an archived card', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		trelloCardApi.updateCard(idCardA, {closed:false})
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.closed).to.eql(false);
			});
	});
	it('TC12: Check that the user can delete a card', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		trelloCardApi.deleteCardById(idCardA)
			.then(response => {
				expect(response.body.id).to.not.exist;
			});
	});
	it('TC13: Check that the user can delete all cards from Active List', () => {
		// URL "https://api.trello.com/1/lists/{idList}/archiveAllCards?key={key}&token={token}"
		trelloCardApi.deleteAllCardsFromList(listActive)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
});
