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
	it('2424 | HP | Validate create a chat completed by API', () => {
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
				/** Expect Result: 200, Todas las validaciones incluidas en la US*/
			});
		});
	});
	it('2424 | NG | Validate not create a chat completed by API with null role', () => {
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
				expect(response.status).to.eq(400, 'Status code should be 400');
				expect(response.body.error.message).to.contain('is not one of');
				/**Expect Result:  400, is not one of ['system', 'assistant', 'user'] - 'messages.0.role'*/
			});
		});
	});
	it('2424 | NG | Validate not create a chat completed by API with incomplete modal name', () => {
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
				expect(response.status).to.eq(404, 'Status code should be 404');
				expect(response.body.error.message).to.contain('does not exist');
				/**Expect Result:  404, The model gpt- does not exist.
				 *
				 * Cuando se coloca un modal incompleto o inexistente
				 */
			});
		});
	});
	it('2424 | HP | Validate create a chat completed by API with davinci modal and Prompt in body', () => {
		cy.fixture('data/chatGPT.json').then(the => {
			cy.api({
				failOnStatusCode: false,
				method: 'POST',
				url: the.url.completions,
				headers: {
					'Content-Type': contentType,
					Authorization: authorization,
				},
				body: {
					model: the.typeModel.modelDav,
					prompt: the.prompt,
					temperature: 0.5,
					max_tokens: 10,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				},
			}).then(response => {
				expect(response.status).to.eq(200, 'Status code should be 200');
				expect(response.body.choices[0]).to.have.property('text');
				expect(response.body.choices[0].text).to.contain('\n\n');
				/**Expect Result: 200,  Que el texto contenga \n\n*/
			});
		});
	});
	it('2424 | NG | Validate not creating an API completed chat when a Modal is not passed in the body', () => {
		cy.fixture('data/chatGPT.json').then(the => {
			cy.api({
				failOnStatusCode: false,
				method: 'POST',
				url: the.url.completions,
				headers: {
					'Content-Type': contentType,
					Authorization: authorization,
				},
				body: {
					//model: the.typeModel.modelDav,
					prompt: the.prompt,
					temperature: 0.5,
					max_tokens: 10,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				},
			}).then(response => {
				expect(response.status).to.eq(400, 'Status code should be 400');
				expect(response.body.error.message).to.contain('you must provide a model parameter');
				/** Expect Result: 400, you must provide a model parameter*/
			});
		});
	});
	it('2424 | NG | Not making a successful request with Davinci-Codex in url and no modal', () => {
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
					/*NOTA: Solo se prueba con (davinci-codex) en la ruta e indica que no existe, sin pasar modal*/
					messages: [{ role: 'user', content: 'Hello!' }],
				},
			}).then(response => {
				expect(response.status).to.eq(404, 'Status code should be 404');
				expect(response.body.error.message).to.contain('does not exist');
				/**Expect Result: 404, The model: davinci-codex does not exist
				 *
				 */
			});
		});
	});
	it('2424 | test test | Makes a successful request', () => {
		//Para hacer el Test de Prueba
		cy.fixture('data/chatGPT.json').then(the => {
			cy.api({
				failOnStatusCode: false,
				method: 'POST',
				url: the.url.engines_DCodex,
				headers: {
					'Content-Type': 'application/json',
					Authorization: authorization,
				},
				body: {
					model: 'gpt-3.5-turbo',
					messages: [{ role: 'user', content: 'Hello!' }],
				},
			}).then(response => {
				//expect(response.status).to.eq(200);
				//expect(response.body).to.have.property('choices');

				/*Details: Se identifica que no da un Status 200, es como que en el enpoint no se pudiera pasar 
			engines y model al mismo tiempo. Otra que se vio es que davinci-codex no existe ni entre los motores de la 
			lista que se indica en la US ni en la consulta(GET) a engines, eso si hay otros con la palabra davinci.
			Por eso se me ocurrio validarlo aparte sin model a ver que arrojaba. Revisar el test de arriba.*/
				expect(response.status).to.eq(400, 'Status code should be 400');
				expect(response.body.error.message).to.eql(response.body.error.message);
				/**Expect result: 400, Error: Cannot specify both model and engine*/
			});
		});
	});
	it('2424 | test test | API test request', () => {
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
				expect(response.status).to.eq(200, 'Status code should be 200');
				/*expect(response.body.data.length).to.eq(23);
				Details: Segun la tabla indicada en el workflow del requerimiento se esperaban en la lista
				23 model name. Actualmete se encuentran 50 algunos existente en la tabla y otros diferentes. */
				expect(response.body.data.length).to.eq(50);
				/*Expect result: 200, List All engine*/
			});
		});
	});
});
