interface Auth {
  key: string;
  token: string;
  verificacion: string;
  user: string;
}

interface Data {
  idBoard: string;
}

interface Url {
  protocol: string;
  host: string;
  basePath: string;
  membersBoard: string; // La URL con placeholders
}

interface UserData {
  auth: Auth;
  data: Data;
  url: Url;
}

var strConnUser: string;
var strConnKey: string;
var strConnToken: string;

describe('GX3-5811 | Trello (API) | Members | API Endpoint: Get the Members of a Board', () => {
	let fixtureData: UserData;

	beforeEach(function() {
		cy.fixture('data/GX3-5811-boardMembers').then((data: UserData) => {
			fixtureData = data;

			strConnUser = fixtureData.auth.user;
			strConnKey = fixtureData.auth.key;
			strConnToken = fixtureData.auth.token;
		});
	});

	it('GX3-5812 | TC01: Validar obtener miembros del tablero exitosamente.', () => {
		const URL_MEMBERS_BOARD = fixtureData.url.membersBoard
			.replace('{{protocol}}', fixtureData.url.protocol)
			.replace('{{host}}', fixtureData.url.host)
			.replace('{{basePath}}', fixtureData.url.basePath)
			.replace('{{idBoard}}', fixtureData.data.idBoard)
			.replace('{{myKey}}', strConnKey)
			.replace('{{myToken}}', strConnToken);

		cy.request({
			method: 'GET',
			url: URL_MEMBERS_BOARD,
			headers: {
				'authorization': `Bearer ${strConnToken}`
			}
		}).then((response) => {
			expect(response.status).to.eq(200);

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