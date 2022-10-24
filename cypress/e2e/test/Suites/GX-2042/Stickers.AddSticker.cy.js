describe("{API} Trello | Stickers | API Endpoint: Add a Sticker to a Card", () => {

    it("US GX-2042 | TS 2043 | TC1:  Validate add a sticker to a card with valid parameters", () => {
        cy.addToSticker("check", 10, 24, 1)
    })

})