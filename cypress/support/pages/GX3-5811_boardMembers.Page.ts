export interface ApiResponse {
	id: string;
}

export class Api5811 {
	public getUserId(strHeader: string, urlMember: string): Cypress.Chainable<string> {
		return cy.api({
			method: 'GET',
			url: urlMember,
			headers: {
				'authorization': strHeader,
			},
			failOnStatusCode: false
		}).then((response) => {
			expect(response.headers['content-type']).to.include('application/json');
			expect(response.status).to.equal(200);

			const responseData: ApiResponse = response.body as ApiResponse;

			expect(responseData).to.be.an('object');
			expect(responseData).to.have.property('id');
			expect(responseData).to.have.property('idOrganizations');

			return responseData.id;
		});
	}


	public createBoard(strHeader: string, urlBoard: string): Cypress.Chainable<string> {
		return cy.api({
			method: 'POST',
			url: urlBoard,
			headers: {
				'authorization': strHeader,
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

	public assignMemberToBoard(strHeader: string, urlMemberToBoard: string) {
		cy.api({
			method: 'PUT',
			url: urlMemberToBoard,
			headers: {
				'authorization': strHeader,
			},
			failOnStatusCode: false
		}).then((response) => {
			if (response.status !== 200) {
				this.assignMemberToBoard(strHeader, urlMemberToBoard.replace('observer', 'admin'));
			}
		});
	}

	public deleteBoard(strHeader: string, urlBoard: string) {
		cy.api({
			method: 'DELETE',
			url: urlBoard,
			headers: {
				'authorization': strHeader,
			},
			failOnStatusCode: false
		}).then((response) => {
			expect(response.headers['content-type']).to.include('application/json');
			expect(response.status).to.equal(200);
		});
	}
}