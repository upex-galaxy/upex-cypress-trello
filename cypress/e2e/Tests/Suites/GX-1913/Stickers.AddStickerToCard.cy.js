describe('✅{API} Trello | Stickers | API Endpoint: Add a Sticker to a Card', () => {
    let trelloAPI
    let stickerRandom
    before(() => {
        function getRandomStickers(min, max) {
            let sticker1 = max - min + 1;
            let sticker2 = Math.random() * sticker1;
            let result = Math.floor(sticker2) + min;
            return result;
        }
        let stickerNumber = getRandomStickers(1, 43);
        cy.fixture('DOM/Cards/trelloAPI.Page').then((MyApi) => { trelloAPI = MyApi });
        cy.fixture('DOM/Cards/stickersIDtrello.Page').then((Stick) => { stickerRandom = Stick[ stickerNumber ] });
    })

    it('US 1913 | TS 1914 | TC1:  Agregar un sticker dentro de una tarjeta previamente creada.', () => {
        cy.api(
            {
                method: 'GET',
                url: trelloAPI.get.board,
                qs: {
                    key: trelloAPI.key,
                    token: trelloAPI.token
                }
            })
            .then(({ body }) => {
                const IDboard = body[ 0 ].id
                cy.api({
                    method: 'GET',
                    url: `${trelloAPI.get.list}${IDboard}/lists?`,
                    qs: {
                        key: trelloAPI.key,
                        token: trelloAPI.token
                    }
                }).then(({ body }) => {
                    const IDlist = body[ 0 ].id
                    cy.api({
                        method: 'POST',
                        url: trelloAPI.get.card,
                        qs: {
                            idList: IDlist,
                            key: trelloAPI.key,
                            token: trelloAPI.token
                        }
                    }).then(({ body }) => {
                        const IDnewcard = body.id
                        cy.api({
                            method: 'POST',
                            url: `${trelloAPI.get.AddSticker}${IDnewcard}/stickers`,
                            qs: {
                                image: trelloAPI.image,
                                top: trelloAPI.top,
                                left: trelloAPI.left,
                                zIndex: trelloAPI.zIndex,
                                key: trelloAPI.key,
                                token: trelloAPI.token
                            }
                        }).then(({ body }) => {
                            const image = body.image
                            expect(image).equal(trelloAPI.image)
                        })
                    })
                })
            })
    })
    it('US 1913 | TS 1914 | TC2:  Agregar un sticker aleatorio dentro de una tarjeta previamente creada.', () => {
        cy.api(
            {
                method: 'GET',
                url: trelloAPI.get.board,
                qs: {
                    key: trelloAPI.key,
                    token: trelloAPI.token
                }
            })
            .then(({ body }) => {
                const IDboard = body[ 0 ].id
                cy.api({
                    method: 'GET',
                    url: `${trelloAPI.get.list}${IDboard}/lists?`,
                    qs: {
                        key: trelloAPI.key,
                        token: trelloAPI.token
                    }
                }).then(({ body }) => {
                    const IDlist = body[ 0 ].id
                    cy.api({
                        method: 'POST',
                        url: trelloAPI.get.card,
                        qs: {
                            idList: IDlist,
                            key: trelloAPI.key,
                            token: trelloAPI.token
                        }
                    }).then(({ body }) => {
                        const IDnewcard = body.id
                        cy.api({
                            method: 'POST',
                            url: `${trelloAPI.get.AddSticker}${IDnewcard}/stickers`,
                            qs: {
                                image: stickerRandom,
                                top: trelloAPI.top,
                                left: trelloAPI.left,
                                zIndex: trelloAPI.zIndex,
                                key: trelloAPI.key,
                                token: trelloAPI.token
                            }
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
                url: trelloAPI.get.board,
                qs: {
                    key: trelloAPI.key,
                    token: trelloAPI.token
                }
            })
            .then(({ body }) => {
                const IDboard = body[ 0 ].id
                cy.api({
                    method: 'GET',
                    url: `${trelloAPI.get.list}${IDboard}/lists?`,
                    qs: {
                        key: trelloAPI.key,
                        token: trelloAPI.token
                    }
                }).then(({ body }) => {
                    const IDlist = body[ 0 ].id
                    cy.api({
                        method: 'POST',
                        url: trelloAPI.get.card,
                        qs: {
                            idList: IDlist,
                            key: trelloAPI.key,
                            token: trelloAPI.token
                        }
                    }).then(({ body }) => {
                        const IDnewcard = body.id
                        cy.api({
                            method: 'POST',
                            url: `${trelloAPI.get.AddSticker}${IDnewcard}/stickers`,
                            qs: {
                                image: trelloAPI.customSticker,
                                top: trelloAPI.top,
                                left: trelloAPI.left,
                                zIndex: trelloAPI.zIndex,
                                key: trelloAPI.key,
                                token: trelloAPI.token
                            }
                        }).then(({ body }) => {
                            const image = body.image
                            expect(image).equal(trelloAPI.customSticker)
                        })
                    })
                })
            })
    })
    it('US 1913 | TS 1914 | TC4:  Validar fallo al intentar agregar en una tarjeta de un sticker inexistente', () => {
        cy.api(
            {
                method: 'GET',
                url: trelloAPI.get.board,
                qs: {
                    key: trelloAPI.key,
                    token: trelloAPI.token
                }
            })
            .then(({ body }) => {
                const IDboard = body[ 0 ].id
                cy.api({
                    method: 'GET',
                    url: `${trelloAPI.get.list}${IDboard}/lists?`,
                    qs: {
                        key: trelloAPI.key,
                        token: trelloAPI.token
                    }
                }).then(({ body }) => {
                    const IDlist = body[ 0 ].id
                    cy.api({
                        method: 'POST',
                        url: trelloAPI.get.card,
                        qs: {
                            idList: IDlist,
                            key: trelloAPI.key,
                            token: trelloAPI.token
                        }
                    }).then(({ body }) => {
                        const IDnewcard = body.id
                        cy.api({
                            method: 'POST',
                            url: `${trelloAPI.get.AddSticker}${IDnewcard}/stickers`,
                            failOnStatusCode: false,
                            qs: {
                                image: trelloAPI.invalidSticker,
                                top: trelloAPI.top,
                                left: trelloAPI.left,
                                zIndex: trelloAPI.zIndex,
                                key: trelloAPI.key,
                                token: trelloAPI.token
                            }

                        }).then(({ body }) => {
                            const failBody = body.message
                            expect(failBody).equal(trelloAPI.invalidSticker)
                        })
                    })
                })
            })
    })

})