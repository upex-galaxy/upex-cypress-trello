import { TrelloCardApi } from '@pages/GX2-16267-cards.Page';
import type { GetListByIdResponse, GetCardByIdResponse } from '../../../support/types/responseType';
const listBacklog = '654a353c5b36a089e49656b5';
const listActive = '6556516a7ecd359fc7ea7ea3';
const listDone = '6556516dc2003862888d3238';

let idCardA: string;
let idCardB;


describe('GX2-16267 | {API} Trello | Cards | Create Cards from a Board', () => {
	it('TC1: Check that BACKLOG list is visible on the board', () => {
		// URL "https://api.trello.com/1/lists/{idList}?key={key}&token={token}"
		TrelloCardApi.getById('GET', 'lists',  listBacklog)
			.then(response => {
				const responseBody: GetListByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('BACKLOG');
				expect(responseBody.id).to.eq(listBacklog);
				expect(responseBody).to.have.property('id').that.is.a('string');
				expect(responseBody).to.have.property('name').that.is.a('string');
				expect(responseBody).to.have.property('closed').that.is.a('boolean');
				expect(responseBody).to.have.property('color').that.is.oneOf([null, 'string']);
				expect(responseBody).to.have.property('idBoard').that.is.a('string');
				expect(responseBody).to.have.property('pos').that.is.a('number');
			});
	});
	it('TC2: Check that ACTIVE list is visible on the board', () => {
		// URL "https://api.trello.com/1/lists/{idList}?key={key}&token={token}"
		TrelloCardApi.getById('GET','lists', listActive)
			.then(response => {
				const responseBody: GetListByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('ACTIVE');
				expect(responseBody.id).to.eq(listActive);
				expect(responseBody).to.have.property('id').that.is.a('string');
				expect(responseBody).to.have.property('name').that.is.a('string');
				expect(responseBody).to.have.property('closed').that.is.a('boolean');
				expect(responseBody).to.have.property('color').that.is.oneOf([null, 'string']);
				expect(responseBody).to.have.property('idBoard').that.is.a('string');
				expect(responseBody).to.have.property('pos').that.is.a('number');
			});
	});
	it('TC3: Check that DONE list is visible on the board', () => {
		// URL "https://api.trello.com/1/lists/{idList}?key={key}&token={token}"
		TrelloCardApi.getById('GET', 'lists', listDone)
			.then(response => {
				const responseBody: GetListByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('DONE');
				expect(responseBody.id).to.eq(listDone);
				expect(responseBody).to.have.property('id').that.is.a('string');
				expect(responseBody).to.have.property('name').that.is.a('string');
				expect(responseBody).to.have.property('closed').that.is.a('boolean');
				expect(responseBody).to.have.property('color').that.is.oneOf([null, 'string']);
				expect(responseBody).to.have.property('idBoard').that.is.a('string');
				expect(responseBody).to.have.property('pos').that.is.a('number');
			});
	});
	it('TC4: Check that the user can create Card A on the Backlog list', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const options = {
			idList: listBacklog,
			name: 'Card A',
			desc: 'This is the description for Card A',
		};
		TrelloCardApi.createCardOnList('POST', 'cards', options)
			.then(response => {
				const responseBody: GetCardByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listBacklog);
				expect(response.body.name).to.eql(options.name);
				expect(responseBody).to.have.property('id').that.is.a('string');
				expect(responseBody).to.have.property('closed').that.is.a('boolean');
				expect(responseBody).to.have.property('idList').that.is.a('string');
				idCardA = response.body.id;
			});
	});
	it('TC5: Check that the user can create Card B on the Active list', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const options = {
			idList: listActive,
			name: 'Card B',
			desc: 'This is the description for Card B',
		};
		TrelloCardApi.createCardOnList('POST', 'cards', options)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listActive);
				expect(response.body.name).to.eql(options.name);
				idCardB = response.body.id;
			});
	});

	it('TC6: Check that the user can update Card A', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const updates = {
			name: 'Updated Card A',
			desc: 'This is the updated description for Card A',
		};
		TrelloCardApi.updateCard('PUT', '/cards/', idCardA, updates)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.name).to.eql(updates.name);
				expect(response.body.desc).to.eql(updates.desc);

			});
	});
	it('TC7: Check that the user can move Card A to Backlog List', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const update = {
			idList: listActive,
		};
		TrelloCardApi.updateCard('PUT', '/cards/', idCardA, update)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listActive);
			});
	});
	it('TC8: Check that the user can move Card A to Done List', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const update = {
			idList: listDone,
		};
		TrelloCardApi.updateCard('PUT', '/cards/', idCardA, update)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(listDone);
			});
	});
	it('TC9: Check that card A has status closed: false', () => {
		// URL "https://api.trello.com/1/cards/{idCard}?key={key}&token={token}"
		TrelloCardApi.getById('GET', 'cards', idCardA)
			.then(response => {
				expect(response.body.closed).to.eql(false);
			});
	});
	it('TC10: Check that the user can archive a card', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const update = {
			closed: true,
		};
		TrelloCardApi.updateCard('PUT', '/cards/', idCardA, update)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.closed).to.eql(true);
			});
	});
	it('TC11: Check that the user can recover an archived card', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const update = {
			closed: false,
		};
		TrelloCardApi.updateCard('PUT', '/cards/', idCardA, update)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.closed).to.eql(false);
			});
	});
	it('TC12: Check that the user can delete a card', () => {
		// URL "https://api.trello.com/1/cards/{cardId}?key={key}&token={token}"
		TrelloCardApi.deleteCard('DELETE', '/cards/', idCardA)
			.then(response => {
				expect(response.body.id).to.not.exist;
			});
	});
	it.only('TC13: Check that the user can delete all cards from Active List', () => {
		// URL "https://api.trello.com/1/lists/{idList}/archiveAllCards?key={key}&token={token}"
		TrelloCardApi.deleteList('POST', 'lists', listBacklog)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
});
