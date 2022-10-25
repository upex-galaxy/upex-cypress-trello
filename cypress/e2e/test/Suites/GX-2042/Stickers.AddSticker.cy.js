describe("{API} Trello | Stickers | API Endpoint: Add a Sticker to a Card", () => {

    /* it("US GX-2042 | TS 2043 | TC1:  Validate add a sticker to a card with valid parameters", () => {
        cy.addSticker("check", 10, 24, 1)
    })
    
    it("US GX-2042 | TS 2043 | TC2:  Validate add a custom sticker to a card with valid parameters", () => {
        cy.addStickerCustom(10, 24, 1)
    }) */

    // it("US GX-2042 | TS 2043 | TC3:  Validate do not add sticker to a card with not existing image", () => {
    //     cy.addSticker("taco-caracol", 50, 75, 3)
    // })

    it("US GX-2042 | TS 2043 | TC4:  Validate do not add sticker to a card with non existing id", () => {
        cy.addStickerinvalidId("taco-love", 50, 75, 3)
    })

})