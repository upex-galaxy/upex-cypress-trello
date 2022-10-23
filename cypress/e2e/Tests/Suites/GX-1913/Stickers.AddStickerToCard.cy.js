describe('✅{API} Trello | Stickers | API Endpoint: Add a Sticker to a Card', () => {

    let trelloAPI
    let stickerList

    function getRandomStickers(min, max) {
        let sticker1 = max - min + 1;
        let sticker2 = Math.random() * sticker1;
        let result = Math.floor(sticker2) + min;
        return result;
    }

    let stickerNumber = getRandomStickers(1, 43);



    before(() => {

        cy.fixture('DOM/GX-1913/trelloAPI.Page').then((MyApi) => { trelloAPI = MyApi });
        cy.fixture('DOM/GX-1913/stickersIDtrello.Page').then((Stick) => { stickerList = Stick });
    })
    xit('probando sticker random', () => {
        cy.log(stickerList)
        cy.log(stickerNumber)
    })

    it('US 1913 | TS 1914 | TC1:  Agregar un sticker dentro de una tarjeta previamente creada.', () => {
        cy.api(
            {
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
    it.skip('US 1913 | TS 1914 | TC2:  Agregar un sticker aleatorio dentro de una tarjeta previamente creada.', () => {
        cy.api(
            {
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
                            url: `https://api.trello.com/1/cards/${IDnewcard}/stickers?image=${stickerRandom}&top=${trelloAPI.top}&left=${trelloAPI.left}&zIndex=${trelloAPI.zIndex}&key=${trelloAPI.key}&token=${trelloAPI.token}`
                        }).then(({ body }) => {
                            const image = body.image
                            expect(image).equal(stickerRandom)
                        })
                    })
                })
            })
    })
    it('US 1913 | TS 1914 | TC3:  Agregar un sticker personalizado dentro de una tarjeta previamente creada.', () => {
        cy.api(
            {
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
                            url: `https://api.trello.com/1/cards/${IDnewcard}/stickers?image=63531133c44f770179beb787&top=${trelloAPI.top}&left=${trelloAPI.left}&zIndex=${trelloAPI.zIndex}&key=${trelloAPI.key}&token=${trelloAPI.token}`

                        }).then(({ body }) => {
                            const image = body.image
                            expect(image).equal(trelloAPI.customSticker)
                        })
                    })
                })
            })
    })
})