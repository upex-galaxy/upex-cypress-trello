import { AuthType, TrelloAPI, type UserData } from '@pages/GX3-5811-boardMembers.Page';

describe('GX3-5811 | Trello (API) | Members | API Endpoint: Get the Members of a Board', () => {
	let fixtureData: UserData;
	const trelloAPI = new TrelloAPI();

	beforeEach(function() {
		cy.fixture('data/GX3-5811-boardMembers').then((data: UserData) => {
			fixtureData = data;

			trelloAPI.setCredentials(fixtureData.auth, AuthType.oauth);
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

		cy.log(URL_MEMBERS_BOARD);

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

	it('GX3-5812 | TC02: Validar No obtener miembros del tablero cuando el IDBOARD es inexistente.', () => {

	});

	it('GX3-5812 | TC03: Validar No obtener miembros del tablero cuando el IDBOARD es null.', () => {

	});

	it('GX3-5812 | TC04: Validar obtener detalles de un miembro del tablero exitosamente.', () => {

	});

	it('GX3-5812 | TC05: Validar No obtener detalles de un miembro del tablero cuando el IDMEMBER es inexistente.', () => {

	});

	it('GX3-5812 | TC06: Validar No obtener detalles de un miembro del tablero cuando el IDMEMBER es null.', () => {

	});
});