describe("test",()=>{

    it("set variable",()=>{

        const key = Cypress.env('key', "1234")
        cy.log(key) // "1234"

        .then(()=>{
            expect(key).to.eq("1234")
        })

        // Variable ya predefinida en Config:
        const token = Cypress.env('token', "abcd")

        cy.log(Cypress.env())
        cy.log(token)

        .then(()=>{
            expect(Cypress.env()).to.include({token: "abcd"})
        })

    })
})