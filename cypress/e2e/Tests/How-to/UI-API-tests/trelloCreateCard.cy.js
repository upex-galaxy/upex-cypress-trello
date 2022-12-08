describe('Open Trello API test', () => {

    let api = Cypress.env()
    before(()=>{
        window.localStorage.setItem('jwt', api.tokensss)
        cy.visit("https://trello.com/")
    })
    beforeEach(() => {
        cy.log(api.key)
        cy.log(api.token)
        const request = api.baseUrl + api.endpoint.getToken
        cy.log(request)
        cy.api({
            url: request + api.token,
            qs: {
                key: api.key,
                token: api.token
            }
        }).then((response)=>{
            expect(response.status).to.equal(200)
        })

    });

    it('create card', () => {
        expect(1).eq(1)
    });
    
    
});