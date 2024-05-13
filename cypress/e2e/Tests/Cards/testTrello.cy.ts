/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DaniTestPage } from '@pages/daniTest.Page';
import {AccessData} from '../../../support/types/daniTestData';
import {faker} from '@faker-js/faker';
import type { ResponseBodyCards } from '../../../support/types/daniTestTypes';
describe('Iniciando con Cypress TS', () => {
	const {apiKey} = AccessData;
	const {apiToken} = AccessData;
	let idBoard: string = '';
	let idList: string = '';
	const name: string = faker.person.firstName();
	beforeEach(() => {
		cy.api({
			method: 'GET',
			url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`
		}).then(response => {
			idBoard = response.body[1].id;
			cy.api({
				method: 'POST',
				url: `https://api.trello.com/1/lists?name=${name}&idBoard=${idBoard}&key=${apiKey}&token=${apiToken}`
			}).then(response => {
				idList = response.body.id;
			});
		});

	});


	it('Agregar una carta al tablero', () => {
		DaniTestPage.addCard(name, idList,apiKey,apiToken).then(response => {
			const responseBody: ResponseBodyCards = response.body;
			expect(response.status).to.eq(200);
			expect(responseBody.id).to.be.a('string');
			// expect(responseBody.badges).to.be.an('object');
			// expect(responseBody.badges.attachmentsByType).to.be.an('object');
			// expect(responseBody.badges.attachmentsByType.trello).to.be.an('object');
			// expect(responseBody.badges.attachmentsByType.trello.board).to.be.a('number');
			// expect(responseBody.badges.attachmentsByType.trello.card).to.be.a('number');
			// expect(responseBody.badges.location).to.be.a('boolean');
			// expect(responseBody.badges.votes).to.be.a('number');
			// expect(responseBody.badges.viewingMemberVoted).to.be.a('boolean');
			// expect(responseBody.badges.subscribed).to.be.a('boolean');
			// expect(responseBody.badges.fogbugz).to.be.a('string');
			// expect(responseBody.badges.checkItems).to.be.a('number');
			// expect(responseBody.badges.checkItemsChecked).to.be.a('number');
			// expect(responseBody.badges.checkItemsEarliestDue).to.be.null;
			// expect(responseBody.badges.comments).to.be.a('number');
			// expect(responseBody.badges.attachments).to.be.a('number');
			// expect(responseBody.badges.description).to.be.a('boolean');
			// expect(responseBody.badges.due).to.be.null;
			// expect(responseBody.badges.dueComplete).to.be.a('boolean');
			// expect(responseBody.badges.start).to.be.null;
			// expect(responseBody.checkItemStates).to.be.an('array').that.is.empty;
			// expect(responseBody.closed).to.be.a('boolean');
			// expect(responseBody.dueComplete).to.be.a('boolean');
			// expect(responseBody.dateLastActivity).to.be.a('string');
			// expect(responseBody.desc).to.be.a('string');
			// expect(responseBody.descData).to.be.an('object');
			// expect(responseBody.descData.emoji).to.be.an('object');
			// expect(responseBody.due).to.be.null;
			// expect(responseBody.dueReminder).to.be.null;
			// expect(responseBody.email).to.be.null;
			// expect(responseBody.idBoard).to.be.a('string');
			// expect(responseBody.idChecklists).to.be.an('array').that.is.empty;
			// expect(responseBody.idList).to.be.a('string');
			// expect(responseBody.idMembers).to.be.an('array').that.is.empty;
			// expect(responseBody.idMembersVoted).to.be.an('array').that.is.empty;
			// expect(responseBody.idShort).to.be.a('number');
			// expect(responseBody.idAttachmentCover).to.be.null;
			// expect(responseBody.labels).to.be.an('array').that.is.empty;
			// expect(responseBody.idLabels).to.be.an('array').that.is.empty;
			// expect(responseBody.manualCoverAttachment).to.be.a('boolean');
			// expect(responseBody.name).to.be.a('string');
			// expect(responseBody.pos).to.be.a('number');
			// expect(responseBody.shortLink).to.be.a('string');
			// expect(responseBody.shortUrl).to.be.a('string');
			// expect(responseBody.start).to.be.null;
			// expect(responseBody.subscribed).to.be.a('boolean');
			// expect(responseBody.url).to.be.a('string');
			// expect(responseBody.cover).to.be.an('object');
			// expect(responseBody.cover.idAttachment).to.be.null;
			// expect(responseBody.cover.color).to.be.null;
			// expect(responseBody.cover.idUploadedBackground).to.be.null;
			// expect(responseBody.cover.size).to.be.a('string');
			// expect(responseBody.cover.brightness).to.be.a('string');
			// expect(responseBody.cover.idPlugin).to.be.null;
			// expect(responseBody.isTemplate).to.be.a('boolean');
			// expect(responseBody.cardRole).to.be.null;
			// expect(responseBody.attachments).to.be.an('array').that.is.empty;
			// expect(responseBody.stickers).to.be.an('array').that.is.empty;
			// expect(responseBody.limits).to.be.an('object').that.is.empty;

		});
	});
	afterEach(() => {
		cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/lists/${idList}/closed?key=${apiKey}&token=${apiToken}`,
			qs:{
				value: true
			}
		});
	});
});
