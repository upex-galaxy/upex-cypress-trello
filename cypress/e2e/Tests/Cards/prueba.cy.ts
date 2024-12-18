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

interface ApiResponse {
    idBoards: string[];
	id: string;
	fullName: string;
	status: string;
}

describe('GX3-5811 | Trello (API) | Members | API Endpoint: Get the Members of a Board', () => {
	let fixtureData: UserData;
	let idBoard: string = '';
	const trelloAPI = new TrelloAPI();

	before(function() {
		cy.fixture('data/GX3-5811-boardMembers').then((data: UserData) => {
			fixtureData = data;

			const token = Cypress.env('TRELLO_TOKEN') as string;
			const key = Cypress.env('TRELLO_KEY') as string;

			if (!token || !key) {
				throw new Error('Las variables de entorno TRELLO_TOKEN o TRELLO_KEY no están definidas.');
			}

			fixtureData.auth.token = token;
			fixtureData.auth.key = key;

			trelloAPI.setCredentials(fixtureData.auth, AuthType.oauth);
		}).then(() => {
			const urlUser = trelloAPI.buildUrl(
				'{{protocol}}://{{host}}/{{basePath}}members/{{myUser}}?key={{myKey}}&token={{myToken}}',
				{
					protocol: fixtureData.url.protocol,
					host: fixtureData.url.host,
					basePath: fixtureData.url.basePath,
					myUser: fixtureData.data.idUser,
					myKey: fixtureData.auth.key,
					myToken: fixtureData.auth.token,
				}
			);

			const requestData = {
				url: urlUser,
				data: {
					method: 'GET',
				},
			};

			// Autenticación y solicitud
			trelloAPI.authenticate(requestData).then((authHeader: string) => {
				cy.request({
					method: 'GET',
					url: urlUser,
					headers: {
						'authorization': authHeader,
					},
				}).then((response) => {
					// Verificar el tipo de contenido
					expect(response.headers['content-type']).to.include('application/json');
					// Verificar el código de estado
					expect(response.status).to.equal(200);

					const responseData: ApiResponse = response.body as ApiResponse; // Tipar la respuesta

					// Verificar que se devolvió un usuario
					expect(responseData).to.be.an('object');
					expect(responseData).to.have.property('id');
					expect(responseData).to.have.property('fullName');
					expect(responseData).to.have.property('status');
					cy.log(`id user: ${responseData.id}\nFull name: ${responseData.fullName}\nStatus: ${responseData.status}`);

					// Verificar que el usuario está conectado
					expect(responseData.status, 'Propiedad status -> ').to.not.equal('disconnected');

					// Verificar que hay tableros
					expect(responseData).to.have.property('idBoards');
					const arrBoards: string[] = responseData.idBoards; // Ahora es de tipo string[]

					expect(arrBoards.length).to.be.above(0);

					if (arrBoards.length > 0) {
						idBoard = arrBoards[0]; // Guardar el primer idBoard
						cy.window().then((win) => {
							win.localStorage.setItem('idBoard', idBoard); // Almacenar en localStorage
						});
					}
				});
			});
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