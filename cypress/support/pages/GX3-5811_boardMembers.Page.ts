export interface ApiResponse {
	id: string;
}

export class Api5811 {
	public getUserId(_strHeader: string, _urlMember: string): Cypress.Chainable<string> {
		return cy.api({
			method: 'GET',
			url: _urlMember,
			headers: {
				'authorization': _strHeader,
			},
			failOnStatusCode: false
		}).then((response) => {
			expect(response.headers['content-type']).to.include('application/json');
			expect(response.status).to.equal(200);

			const responseData: ApiResponse = response.body as ApiResponse;

			expect(responseData).to.be.an('object');
			expect(responseData).to.have.property('id');

			return responseData.id;
		});
	}


	public createBoard(_strHeader: string, _urlBoard: string): Cypress.Chainable<string> {
		return cy.api({
			method: 'POST',
			url: _urlBoard,
			headers: {
				'authorization': _strHeader,
			},
			failOnStatusCode: false
		}).then((response) => {
			expect(response.headers['content-type']).to.include('application/json');
			expect(response.status).to.equal(200);

			const responseData: ApiResponse = response.body as ApiResponse;

			expect(responseData).to.be.an('object');
			expect(responseData).to.have.property('id');

			return responseData.id;
		});
	};

	public assignMemberToBoard(_strHeader: string, _urlMemberToBoard: string) {
		cy.api({
			method: 'PUT',
			url: _urlMemberToBoard,
			headers: {
				'authorization': _strHeader,
			},
			failOnStatusCode: false
		}).then((response) => {
			if (response.status !== 200) {
				this.assignMemberToBoard(_strHeader, _urlMemberToBoard.replace('observer', 'admin'));
			}
		});
	}

	public deleteBoard(_strHeader: string, _urlBoard: string) {
		cy.api({
			method: 'DELETE',
			url: _urlBoard,
			headers: {
				'authorization': _strHeader,
			},
			failOnStatusCode: false
		}).then((response) => {
			expect(response.headers['content-type']).to.include('application/json');
			expect(response.status).to.equal(200);
		});
	}
}