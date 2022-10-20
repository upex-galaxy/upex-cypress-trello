import 'cypress-plugin-api';

let trelloAPI


describe('✅{API} Trello | Stickers | API Endpoint: Add a Sticker to a Card', () => {


    before('✅{API} Trello | Stickers', () =>
    {
        cy.fixture('DOM/GX-1913/trelloAPI.Page').then((MyApi) => { trelloAPI = MyApi });
    })

    it('US 1913 | TS 1914 | TC1:  Agregar un sticker dentro de una tarjeta previamente creada.', () => {
        cy.api({
            method: 'GET',
            url: `https://api.trello.com/1/members/me/boards?fields=name,url&key=${trelloAPI.key}&token=${trelloAPI.token}`
        })
            .then(({ body }) => {
                const IDboard = body[ 0 ].id
                cy.api({
                    method: 'GET',
                    url: `https://api.trello.com/1/boards/${IDboard}/lists?key=${trelloAPI.key}&token=${trelloAPI.token}`
                }).then(({ body }) => {
                    const IDlist = body[ 0 ].id
                    cy.api({
                        method: 'POST',
                        url: `https://api.trello.com/1/cards?idList=${IDlist}&key=${trelloAPI.key}&token=${trelloAPI.token}`,
                    }).then(({ body }) => {
                        const IDnewcard = body.id
                        cy.api({
                            method: 'POST',
                            url: `https://api.trello.com/1/cards/${IDnewcard}/stickers?image=${trelloAPI.image}&top=${trelloAPI.top}&left=${trelloAPI.left}&zIndex=${trelloAPI.zIndex}&key=${trelloAPI.key}&token=${trelloAPI.token}`
                        }).then(({ body }) => {
                            const image = body.image
                            expect(image).equal("taco-love")
                        })
                    })
                })
            })
    })
})