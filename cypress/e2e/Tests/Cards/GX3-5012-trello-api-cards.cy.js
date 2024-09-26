import data from 'cypress/fixtures/data/GX3-5012-mover-y-archivar-cartas.json';
import { faker } from '@faker-js/faker';
const listname = [faker.animal.dog(),faker.animal.dog(),faker.animal.dog()];
const cardname =faker.animal.cat();

const createList = (name,IdBoards) => {
	return new Cypress.Promise(resolve => {
		cy.request({
			url:'/lists',
			method:'POST',
			qs:
            {
            	key: data.data.key,
            	token:data.data.token,
            	name:name,
            	idBoard:IdBoards
            }
		}).then(response => {
			expect(response.status).to.equal(200);
			resolve(response.body.id);

		});
	});
};

const createcard = (idList,name) => {
	new Cypress.Promise (resolve => {
		cy.request({
			url:'/cards',
			method:'POST',
			qs:{
				key:data.data.key,
				token:data.data.token,
				name:name,
				idList: idList,
			}
		}).then(response => {
			expect(response.status).to.equal(200);
			expect(response.body.name).to.equal(name);
		});
	});
};

const movallcards = (Idlist1,Idlist2,IdBoard) => {
	return new Cypress.Promise(resolve => {
		cy.request({
			url:`/lists/${Idlist1}/moveAllCards`,
			method:'POST',
			qs:{
				key:data.data.key,
				token:data.data.token,
				idBoard:IdBoard,
				idList: Idlist2,
			}
		}).then(response => {
			expect(response.status).to.equal(200);
			expect(response.body[0].idList).to.equal(Idlist2);
			resolve();
		});
	});
};

const archiveallcards = (Idlist1) => {
	new Cypress.Promise(resolve => {
		cy.request({
			url:`/lists/${Idlist1}/archiveAllCards`,
			method:'POST',
			qs:{
				key:data.data.key,
				token:data.data.token,
			}
		}).then(response => {
			expect(response.status).to.equal(200);
			resolve();
		});
	});

};

describe ('Trello (API) | Cards | API Endpoint: Mover y archivar todas las tarjetas de una lista', ( ) => {
	beforeEach('PRC: Configurar el espacio de trabajo en Trello', ( ) => {
		createList(listname[0],data.data.idBoards).then(idlist => {
			Cypress.env('IdList1',idlist);
			createcard(idlist,cardname);
			createcard(idlist,cardname);
			createcard(idlist,cardname);
		});
		createList(listname[1],data.data.idBoards).then(idlist2 => {
			Cypress.env('IdList2', idlist2);
		});
	});

	it('5017 | TC1: Validar que se pueda mover todas las tarjetas de una lista',() => {
		movallcards(Cypress.env('IdList1'),Cypress.env('IdList2'),data.data.idBoards);

	});
	it('5017 | TC2: Validar que se pueda archivar todas las tarjetas de una lista',() => {
		archiveallcards(Cypress.env('IdList1'));

	});
	it('5017 | TC3: Validar que se pueda mover todas las tarjetas de un tablero a otro',() => {
		createList(listname[2],data.data.idBoards2).then(idlist3 => {
			Cypress.env('IdList3', idlist3);
			movallcards(Cypress.env('IdList1'),Cypress.env('IdList3'),data.data.idBoards2);
		});
	});

});
