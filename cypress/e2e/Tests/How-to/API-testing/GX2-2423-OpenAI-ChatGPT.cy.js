describe('✅OpenAI | ChatGPT | API: Create chat completion response', () => {
	let contentType;
	let authorization;
	//let model;
	let messages;
	beforeEach('Precondition', () => {
		cy.fixture('data/chatGPT.json').then(the => {
			contentType = the.headers.ContentType;
			authorization = the.headers.Authorization;
			//model = the.model;
			messages = the.messages;
		});
	});
	it('2424 | Validate create a chat completed by API', () => {
		cy.fixture('data/chatGPT.json').then(the => {
			cy.api({
				method: 'POST',
				url: the.url.chat,
				headers: {
					'Content-Type': contentType,
					Authorization: authorization,
				},
				body: {
					model: the.typeModel.modelGPT,
					messages: messages,
				},
			}).then(response => {
				expect(response.status).to.eq(200, 'Status code should be 200');
				expect(response.body).to.have.property('id').exist;
				//expect(response.body.id).to.be.a('string').and.contain('-').and.exist;

				expect(response.body).to.have.property('object').and.have.include('chat.completion');
				expect(response.body).to.have.property('choices').and.to.be.an('array').and.to.have.lengthOf(1);
				expect(response.body.choices[0]).to.have.property('index');

				expect(response.body.choices[0].message).to.have.property('content');
				expect(response.body.choices[0].message).to.have.property('role');

				//expect(response.body.choices[0].message).to.have.property('role').to.include('assistant');
				//expect(response.body.choices[0].message).to.have.property('role').and.to.have.property('content');
				expect(response.body.choices[0]).to.have.property('finish_reason');

				expect(response.body.usage).to.be.a('object').and.to.have.property('prompt_tokens');
				expect(response.body.usage).to.have.property('completion_tokens');
				expect(response.body.usage).to.have.property('total_tokens');
			});
		});
	});
	it('2424 | Validate not create a chat completed by API with null role', () => {
		cy.fixture('data/chatGPT.json').then(the => {
			cy.api({
				failOnStatusCode: false,
				method: 'POST',
				url: the.url.chat,
				headers: {
					'Content-Type': contentType,
					Authorization: authorization,
				},
				body: {
					model: the.typeModel.modelGPT,
					messages: [{ role: '', content: 'Hello, I want to know how to create a Test in Postman!' }],
				},
			}).then(response => {
				expect(response.status).to.eq(400);
				expect(response.body.error.message).to.contain('is not one of');
			});
		});
	});
	it('2424 | Validate not create a chat completed by API with incomplete modal name', () => {
		cy.fixture('data/chatGPT.json').then(the => {
			cy.api({
				failOnStatusCode: false,
				method: 'POST',
				url: the.url.chat,
				headers: {
					'Content-Type': contentType,
					Authorization: authorization,
				},
				body: {
					model: the.typeModel.modalInvalid,
					messages: messages,
				},
			}).then(response => {
				expect(response.status).to.eq(404);
				expect(response.body.error.message).to.contain('does not exist');
			});
		});
	});
	it('2424 | Not making a successful request with modal Davinci-Codex does not exist', () => {
		//Para hacer el Test de Prueba
		cy.fixture('data/chatGPT.json').then(the => {
			cy.api({
				failOnStatusCode: false,
				method: 'POST',
				url: the.url.engines_DCodex,
				headers: {
					'Content-Type': contentType,
					Authorization: authorization,
				},
				body: {
					//model: the.typeModel.model,
					/*NOTA: No se paso model por que ya se esta pasando en la url como (davinci-codex)*/
					messages: [{ role: 'user', content: 'Hello!' }],
				},
			}).then(response => {
				expect(response.status).to.eq(404);
				expect(response.body.error.message).to.contain('does not exist');
			});
		});
	});
	it('2424 | API test request', () => {
		//Para hacer el Test de Prueba
		cy.fixture('data/chatGPT.json').then(the => {
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
