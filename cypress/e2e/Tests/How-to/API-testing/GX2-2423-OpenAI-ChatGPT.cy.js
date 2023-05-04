describe('✅OpenAI | ChatGPT | API: Create chat completion response', () => {
	let contentType;
	let authorization;
	beforeEach('Precondition', () => {
		cy.fixture('data/chatGPT.json').then(the => {
			contentType = the.headers.ContentType;
			authorization = the.headers.Authorization;
		});
	});
	it('2424 | API test request', () => {
		//Para hacer el Test de Prueba
		cy.fixture('data/chatGPT.json').then(the => {
			/*const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${the.OpenAI_API_KEY}`,
			};*/
			cy.api({
				method: 'GET',
				url: the.url.engines,
				headers: {
					'Content-Type': contentType,
					Authorization: authorization,
				},
			}).then(response => {
				expect(response.status).to.eq(200);
				expect(response.body.data.length).to.eq(50);
			});
		});
	});
});
