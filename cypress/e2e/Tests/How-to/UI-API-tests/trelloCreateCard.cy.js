describe('Open Trello API test', () => {

    const api = Cypress.env('api')
    const gmail = Cypress.env('gmail')
    before(()=>{
        cy.visit("https://trello.com/login")
        cy.url().should("contain","trello")

        cy.get("#googleButton").click()
        cy.origin("https://google.com",{args: {gmail}}, ({gmail})=>{
            cy.get("#identifierId").type(gmail.user)
            cy.get("[type='button']").click({force:true})
        })
        
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


Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	return false
})
// Comando predeterminado para que no aparezcan los Fetch en el log del Test Runner:
const origLog = Cypress.log
Cypress.log = function (opts, ...other) {
	if (opts.displayName === 'xhr'|| opts.displayName === 'fetch' && opts.url.startsWith('https://')) {
		return
	}
	return origLog(opts, ...other)
} 