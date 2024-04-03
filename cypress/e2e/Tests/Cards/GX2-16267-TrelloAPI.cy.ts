interface TrelloData {
  listBacklog: string;
  listActive: string;
  listDone: string;
  nameCardA: string;
  descriptionCardA:string;
  nameCardB: string;
  descriptionCardB:string;
  idCardA: string;
  idCardB: string;
}
import { TrelloCardApi } from '@pages/GX2-16267-cards.Page';
import type { GetListByIdResponse, GetCardByIdResponse } from '../../../support/types/responseType';
import dataJson from '../../../fixtures/data/GX2-16267-Cards.json';
import { urlList } from 'cypress/support/types/urlData';
const data: TrelloData = dataJson as TrelloData;



describe('GX2-16267 | {API} Trello | Cards | Create Cards from a Board', () => {
	it('TC1: Check that BACKLOG list is visible on the board', () => {
		// URL "https://api.trello.com/1/lists/{idList}?key={key}&token={token}"
		TrelloCardApi.request('GET', urlList.getList,  data.listBacklog)
			.then(response => {
				const responseBody: GetListByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('BACKLOG');
				expect(responseBody.id).to.eq(data.listBacklog);
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
		TrelloCardApi.request('GET', urlList.getList, data.listActive)
			.then(response => {
				const responseBody: GetListByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('ACTIVE');
				expect(responseBody.id).to.eq(data.listActive);
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
		TrelloCardApi.request('GET', urlList.getList, data.listDone)
			.then(response => {
				const responseBody: GetListByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eq(200);
				expect(response.body.name).to.eq('DONE');
				expect(responseBody.id).to.eq(data.listDone);
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
			name: data.nameCardA,
			desc: data.descriptionCardA,
		};
		TrelloCardApi.request('POST',urlList.createCard, data.listBacklog, options)
			.then(response => {
				const responseBody: GetCardByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(data.listBacklog);
				expect(response.body.name).to.eql(options.name);
				expect(responseBody).to.have.property('id').that.is.a('string');
				expect(responseBody).to.have.property('closed').that.is.a('boolean');
				expect(responseBody).to.have.property('idList').that.is.a('string');
				data.idCardA = response.body.id;
			});
	});
	it('TC5: Check that the user can create Card B on the Active list', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const options = {
			name: data.nameCardB,
			desc: data.descriptionCardB,
		};
		TrelloCardApi.request('POST', urlList.createCard, data.listActive, options)
			.then(response => {
				const responseBody: GetCardByIdResponse = response.body;
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(data.listActive);
				expect(response.body.name).to.eql(options.name);
				expect(responseBody).to.have.property('id').that.is.a('string');
				expect(responseBody).to.have.property('closed').that.is.a('boolean');
				expect(responseBody).to.have.property('idList').that.is.a('string');
				data.idCardB = response.body.id;
			});
	});

	it('TC6: Check that the user can update Card A', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const updates = {
			name: 'Updated Card A',
			desc: 'This is the updated description for Card A',
		};
		TrelloCardApi.request('PUT', urlList.updateCard, data.idCardA, updates)
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
			idList: data.listActive,
		};
		TrelloCardApi.request('PUT', urlList.updateCard, data.idCardA, update)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(data.listActive);
			});
	});
	it('TC8: Check that the user can move Card A to Done List', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const update = {
			idList: data.listDone,
		};
		TrelloCardApi.request('PUT', urlList.updateCard, data.idCardA, update)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.idList).to.eql(data.listDone);
			});
	});
	it('TC9: Check that card A has status closed: false', () => {
		// URL "https://api.trello.com/1/cards/{idCard}?key={key}&token={token}"
		TrelloCardApi.request('GET', urlList.getCard, data.idCardA)
			.then(response => {
				expect(response.body.closed).to.eql(false);
			});
	});
	it('TC10: Check that the user can archive a card', () => {
		// URL "https://api.trello.com/1/cards/{idList}?key={key}&token={token}"
		const update = {
			closed: true,
		};
		TrelloCardApi.request('PUT', urlList.getCard, data.idCardA, update)
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
		TrelloCardApi.request('PUT', urlList.getCard, data.idCardA, update)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
				expect(response.body.closed).to.eql(false);
			});
	});
	it('TC12: Check that the user can delete a card', () => {
		// URL "https://api.trello.com/1/cards/{cardId}?key={key}&token={token}"
		TrelloCardApi.request('DELETE', urlList.deleteCard, data.idCardA)
			.then(response => {
				expect(response.body.id).to.not.exist;
			});
	});
	it('TC13: Check that the user can delete all cards from Active List', () => {
		// URL "https://api.trello.com/1/lists/{idList}/archiveAllCards?key={key}&token={token}"
		TrelloCardApi.request('POST', urlList.archiveCardsInList, data.listActive)
			.then(response => {
				expect(response).to.be.an('object');
				expect(response.status).to.eql(200);
			});
	});
});
