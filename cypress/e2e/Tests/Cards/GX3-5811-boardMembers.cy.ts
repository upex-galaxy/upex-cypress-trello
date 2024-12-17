import { AuthType, TrelloAPI, type Auth } from '@pages/GX3-5811-boardMembers.Page';

interface Url {
    protocol: string;
    host: string;
    basePath: string;
    membersBoard: string;
    memberData: string;
}

interface Data {
    idUser: string;
    idBoard: string;
}

interface UserData {
    auth: Auth;
    data: Data;
    url: Url;
}

interface ApiRespBoards {
    idBoards: string[];
}

describe('GX3-5811 | Trello (API) | Members | API Endpoint: Get the Members of a Board', () => {
	let fixtureData: UserData;

	const trelloAPI = new TrelloAPI();

	function validatePrecondition(): void {
		let URL_TEMPLATE = fixtureData.url.memberData;

		let replacements = {
			protocol: fixtureData.url.protocol,
			host: fixtureData.url.host,
			basePath: fixtureData.url.basePath,
			idUser: fixtureData.data.idUser,
			myKey: fixtureData.auth.key,
			myToken: fixtureData.auth.token
		};

		const URL_MEMBER_DATA = trelloAPI.buildUrl(URL_TEMPLATE, replacements);

		const requestData = {
			url: URL_MEMBER_DATA,
			data: {
				method: 'GET',
				idUser: fixtureData.data.idUser,
			},
		};

		trelloAPI.authenticate(requestData).then((authHeader: string) => {
			cy.api({
				method: 'GET',
				url: URL_MEMBER_DATA,
				headers: {
					'authorization': authHeader,
				},
				failOnStatusCode: false

			}).then((response) => {
				expect(response).to.be.an('Object');
				expect(response.status).to.eq(200);
				expect(response.statusText).to.not.equal('disconnected');
				expect(response.body).to.have.property('idBoards');

				const apiResponse = response.body as ApiRespBoards;

				let arrBoards: string[] = apiResponse.idBoards;

				expect(arrBoards).length.above(0);

				if (arrBoards.length > 0) {
					fixtureData.data.idBoard = arrBoards[0];
				}
			});
		});
	};

	before(function() {
		cy.fixture('data/GX3-5811-boardMembers').then((data: UserData) => {
			fixtureData = data;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const token = Cypress.env('TRELLO_TOKEN');

			if (!token) {
				throw new Error('La variable de ntorno TRELLO_TOKEN no está definida.');
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			fixtureData.auth.token = token;

			trelloAPI.setCredentials(fixtureData.auth, AuthType.oauth);

			validatePrecondition();
		});
	});

	it('GX3-5812 | TC01: Validar obtener miembros del tablero exitosamente.', () => {
		const URL_TEMPLATE = fixtureData.url.membersBoard;

		const replacements = {
			protocol: fixtureData.url.protocol,
			host: fixtureData.url.host,
			basePath: fixtureData.url.basePath,
			idBoard: fixtureData.data.idBoard,
			myKey: fixtureData.auth.key,
			myToken: fixtureData.auth.token,
		};

		const URL_MEMBERS_BOARD = trelloAPI.buildUrl(URL_TEMPLATE, replacements);

		const requestData = {
			url: URL_MEMBERS_BOARD,
			data: {
				method: 'GET',
				idBoard: fixtureData.data.idBoard,
			},
		};

		trelloAPI.authenticate(requestData).then((authHeader: string) => {
			cy.api({
				method: 'GET',
				url: URL_MEMBERS_BOARD,
				headers: {
					'authorization': authHeader,
				},
				failOnStatusCode: false
			}).then((response) => {
				expect(response.status).to.eq(200);
			});
		});
	});

	it('GX3-5812 | TC02: Validar No obtener miembros del tablero cuando el IDBOARD es inexistente.', () => {
		const URL_TEMPLATE = fixtureData.url.membersBoard;
		const ID_BOARD = 'inexistente';

		const replacements = {
			protocol: fixtureData.url.protocol,
			host: fixtureData.url.host,
			basePath: fixtureData.url.basePath,
			idBoard: ID_BOARD,
			myKey: fixtureData.auth.key,
			myToken: fixtureData.auth.token,
		};

		const URL_MEMBERS_BOARD = trelloAPI.buildUrl(URL_TEMPLATE, replacements);

		const requestData = {
			url: URL_MEMBERS_BOARD,
			data: {
				method: 'GET',
				idBoard: ID_BOARD,
			},
		};

		trelloAPI.authenticate(requestData).then((authHeader: string) => {
			cy.api({
				method: 'GET',
				url: URL_MEMBERS_BOARD,
				headers: {
					'authorization': authHeader,
				},
				failOnStatusCode: false
			}).then((response) => {
				expect(response.status).to.eq(400);
			});
		});
	});

	it('GX3-5812 | TC03: Validar No obtener miembros del tablero cuando el IDBOARD es null.', () => {
		const URL_TEMPLATE = fixtureData.url.membersBoard;
		const ID_BOARD = null;

		const replacements = {
			protocol: fixtureData.url.protocol,
			host: fixtureData.url.host,
			basePath: fixtureData.url.basePath,
			idBoard: ID_BOARD,
			myKey: fixtureData.auth.key,
			myToken: fixtureData.auth.token,
		};

		const URL_MEMBERS_BOARD = trelloAPI.buildUrl(URL_TEMPLATE, replacements);

		const requestData = {
			url: URL_MEMBERS_BOARD,
			data: {
				method: 'GET',
				idBoard: ID_BOARD,
			},
		};

		trelloAPI.authenticate(requestData).then((authHeader: string) => {
			cy.api({
				method: 'GET',
				url: URL_MEMBERS_BOARD,
				headers: {
					'authorization': authHeader,
				},
				failOnStatusCode: false
			}).then((response) => {
				expect(response.status).to.eq(400);
			});
		});
	});

	it('GX3-5812 | TC04: Validar obtener detalles de un miembro del tablero exitosamente.', () => {
		const URL_TEMPLATE = fixtureData.url.membersBoard;

		const replacements = {
			protocol: fixtureData.url.protocol,
			host: fixtureData.url.host,
			basePath: fixtureData.url.basePath,
			idBoard: fixtureData.data.idBoard,
			myKey: fixtureData.auth.key,
			myToken: fixtureData.auth.token,
		};

		const URL_MEMBERS_BOARD = trelloAPI.buildUrl(URL_TEMPLATE, replacements);

		const requestData = {
			url: URL_MEMBERS_BOARD,
			data: {
				method: 'GET',
				idBoard: fixtureData.data.idBoard,
			},
		};

		trelloAPI.authenticate(requestData).then((authHeader: string) => {
			cy.api({
				method: 'GET',
				url: URL_MEMBERS_BOARD,
				headers: {
					'authorization': authHeader,
				}
			}).then((response) => {
				expect(response.status).to.eq(200);
			});
		});
	});

	it('GX3-5812 | TC05: Validar No obtener detalles de un miembro del tablero cuando el IDMEMBER es inexistente.', () => {
		// Implementa la prueba aquí
	});

	it('GX3-5812 | TC06: Validar No obtener detalles de un miembro del tablero cuando el IDMEMBER es null.', () => {
		// Implementa la prueba aquí
	});
});