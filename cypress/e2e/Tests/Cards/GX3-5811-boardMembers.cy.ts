import { AuthType, TrelloAPI, type Auth } from '@pages/GX3-5811-boardMembers.Page';

interface Url {
	protocol: string;
	host: string;
	basePath: string;
	userMember: string;
	boardsUser: string,
	membersBoard: string;
	memberData: string;
}

interface Data {
	idUser: string;
	idBoard: string;
	username: string;
}

interface UserData {
	auth: Auth;
	data: Data;
	url: Url;
}

interface ApiResponse {
	idBoards: string[];
	id: string;
	name: string;
	fullName: string;
	status: string;
}

describe('GX3-5811 | Trello (API) | Members | API Endpoint: Get the Members of a Board', () => {
	let fixtureData: UserData;
	let idBoard: string = '';
	let arrBoards: string[] = [];
	let authHeader: string = '';

	const trelloAPI = new TrelloAPI();

	beforeEach('PRC: El usuario tiene que tener boards con miembros', function() {
		cy.fixture('data/GX3-5811-boardMembers').then((data: UserData) => {
			fixtureData = data;

			const token = Cypress.env('TRELLO_TOKEN') as string;
			const key = Cypress.env('TRELLO_KEY') as string;

			if (!token || !key) {
				throw new Error('Las variables de entorno TRELLO_TOKEN o TRELLO_KEY no están definidas.');
			}

			fixtureData.auth.token = token;
			fixtureData.auth.key = key;

			trelloAPI.setCredentials(fixtureData.auth, AuthType.bearer);
		}).then(() => {
			const urlUser = trelloAPI.buildUrl(fixtureData.url.userMember,
				{
					protocol: fixtureData.url.protocol,
					host: fixtureData.url.host,
					basePath: fixtureData.url.basePath,
					username: fixtureData.data.username,
					myKey: fixtureData.auth.key,
					myToken: fixtureData.auth.token,
				}
			);

			//cy.log(urlUser);

			const requestData = {
				url: urlUser,
				data: {
					method: 'GET',
				},
			};

			trelloAPI.authenticate(requestData).then((header: string) => {
				authHeader = header;

				cy.api({
					method: 'GET',
					url: urlUser,
					headers: {
						'authorization': authHeader,
					},
					failOnStatusCode: false
				}).then((response) => {
					expect(response.headers['content-type']).to.include('application/json');
					expect(response.status).to.equal(200);

					/*cy.log('User');
					cy.log(urlUser);
					// eslint-disable-next-line
					cy.log(response.body);*/

					const responseData: ApiResponse = response.body as ApiResponse;

					// Verificar que se devolvió un usuario
					expect(responseData).to.be.an('object');
					expect(responseData).to.have.property('id');

					// Verificar que hay tableros
					expect(responseData).to.have.property('idBoards');
					arrBoards = responseData.idBoards;

					expect(arrBoards.length).to.be.above(0);

					if (arrBoards.length > 0) {
						idBoard = arrBoards[0];
						fixtureData.data.idBoard=idBoard;

						/*arrBoards.forEach(element => {
							idBoard = element;
							cy.window().then((win) => {
								win.localStorage.setItem('idBoard', idBoard);
							});
						});*/
					}
				});
			});
		});/*.then(() => {
			// Obtener información del tablero usando el idBoard
			const urlBoard = trelloAPI.buildUrl(
				fixtureData.url.membersBoard, // URL para obtener miembros del tablero
				{
					protocol: fixtureData.url.protocol,
					host: fixtureData.url.host,
					basePath: fixtureData.url.basePath,
					idBoard: idBoard,
					myKey: fixtureData.auth.key,
					myToken: fixtureData.auth.token,
				}
			);

			// Realiza la solicitud para obtener la información del tablero
			cy.api({
				method: 'GET',
				url: urlBoard,
				headers: {
					'authorization': authHeader, // Reutiliza el header de autenticación
				},
			}).then((response) => {
				cy.log('Board');
				cy.log(urlBoard);
				// eslint-disable-next-line
				cy.log(response.body);

				// Verificar el tipo de contenido
				expect(response.headers['content-type']).to.include('application/json');
				// Verificar el código de estado
				expect(response.status).to.equal(200);

				const boardData: ApiResponse[] = response.body as ApiResponse[]; // Tipar la respuesta como array

				// Verificar que se devolvió la información del tablero
				expect(boardData).to.be.an('array').that.is.not.empty; // Asegurarse de que es un array y no está vacío
				expect(boardData[0]).to.have.property('id');
				expect(boardData[0]).to.have.property('fullName'); // Asegúrate de que la propiedad que estás verificando sea correcta

				// Aquí se registra la información del tablero
				cy.log(`id Board: ${boardData[0].id}\nName of board: ${boardData[0].fullName}`);
			});
		});*/
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