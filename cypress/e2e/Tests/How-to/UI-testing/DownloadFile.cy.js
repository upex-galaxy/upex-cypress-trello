describe('Cypress Downloadfile Testing', () => {
    // it('Medium Size file', () => {
    //     Cypress.config('defaultCommandTimeout', 10000);
    //     cy.visit('http://proof.ovh.net/files/')
    //     cy.downloadFile(
    //         'https://proof.ovh.net/files/100Mb.dat',
    //         'mydownloads',
    //         '100Mio.dat',
    //     )
    // })
    it('Small Size test', () => {
        Cypress.config('defaultCommandTimeout', 10000);
        cy.downloadFile(
            'https://proof.ovh.net/files/10Mb.dat',
            'mydownloads',
            '10Mio.dat'
        )
    })
    it('PDF test', () => {
        cy.downloadFile(
            'http://www.africau.edu/images/default/sample.pdf',
            'mydownloads',
            'sample.pdf'
        )
    })
    it('Image Size test', () => {
        cy.downloadFile(
            'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            'mydownloads',
            'example.jpg'
        )
    })
})