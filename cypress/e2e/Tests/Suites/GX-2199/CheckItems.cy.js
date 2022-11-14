let cardID

const idList = "6364269f928df6014eaa5100"
const key = "758fea8ed9020b2875ed85a8c1761382" 
const token = "f47a56559167839adb4cbd12762502a49289c91e9c8b8ca8d14a2cd19484ca50"

describe("Ejemplo para demostrar cómo probar una API", () =>
{
    it("TC1: REQUEST from GET Method to the Trello API to GET a List.", () =>
    {
        cy.api({ 
            method: "GET",
            url: "https://api.trello.com/1/lists/" + idList,  
            qs: { 
                key: key,
                token: token,
            }
        })
            .then((response) =>
            {
                expect(response).to.be.an("object")
                expect(response.status).to.eql(200)
                
        })
    })
    it("TC2: REQUEST from POST Method to theTrello API to CREATE a Card.", () =>
    {
        cy.api ({
            method: 'POST',
            url: "https://api.trello.com/1/cards",
            qs: { 
                key: key,
                token: token,
                idList: idList,
                name: "Card CheckList" 
            }
        })
        .then((response) =>
        {
            expect(response).to.be.an("object")
            expect(response.status).to.eql(200)
            expect(response.body.name).to.eql("Card CheckList")
            cardID = response.body.id
        })
    })
    it("TC3: REQUEST from POST Method Create a Checklist in the card", () =>
    {
        cy.api ({
            method: 'POST',
            url: `https://api.trello.com/1/cards/${cardID}/checklists`, 
            qs: { 
                key: key,
                token: token,
                name: "checkLista",

                
            }
        })
        .then((response) =>
        {
            expect(response).to.be.an("object")
            checklistsID = response.body.id
            
        })
    })
    it("TC4: REQUEST from POST Method Create a CheckItem in the Checklist.", () =>
    {
        
        cy.api ({
            method: 'POST',
            url: `https://api.trello.com/1/checklists/${checklistsID}/checkItems`, 
            qs: { 
                key: key,
                token: token,
                name: "imagen",

                
            }
        })
        .then((response) =>
        {
            expect(response).to.be.an("object")
            CheckItemID = response.body.id
            
        })
    
})
it("TC5: REQUEST from PUT Method to the Trello API to EDIT a CheckItem.", () =>
    {
        cy.api({
            method: 'PUT',
            url: `https://api.trello.com/1/cards/${cardID}/checkItem/${CheckItemID}`, 
            qs: { 
                key: key,
                token: token,
                name: "Imagen editada", // Editamos el nombre de la Card (esto e
            },
        })
        .then(({body}) =>
        {
            expect(body).to.be.an("object") 
        })
    })
    it("TC6: REQUEST from DELETE Method to the TRELLO API to DELETE A Checklist", () =>
    {
        const key = "758fea8ed9020b2875ed85a8c1761382" 
        const token = "f47a56559167839adb4cbd12762502a49289c91e9c8b8ca8d14a2cd19484ca50" 
        
        cy.api({
            method: 'DELETE',
            url: `https://api.trello.com/1/cards/${cardID}/checkItem/${CheckItemID}`, 
            qs: { 
                key: key,
                token: token
            }
        })
        .then((response) =>
        {
            expect(response.body.limits).to.be.empty
            expect(response.status).to.eql(200)
        })
    })
    it("TC7: REQUEST of DELETE Method to the TRELLO API to DELETE A CARD", () =>
    {
        
        const key = "758fea8ed9020b2875ed85a8c1761382" 
        const token = "f47a56559167839adb4cbd12762502a49289c91e9c8b8ca8d14a2cd19484ca50" 
        
        cy.api({
            method: 'DELETE',
            url: "https://api.trello.com/1/cards/" + cardID, 
            qs: { 
                key: key,
                token: token
            }
        })
        .then((response) =>
        {
            expect(response.body.limits).to.be.empty
            expect(response.status).to.eql(200)
        })
    })
})