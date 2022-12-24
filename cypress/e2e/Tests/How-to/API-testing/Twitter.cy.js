describe('Twitter API requests', () => {
	// const token = Cypress.env('twitterAPI').BearerToken
	// const oauth = Cypress.env('twitterAPI').OAuth

	it('getting started', () => {
        cy.log("Ely termina tu test")
		// cy.api({
		// 	url: 'https://api.twitter.com/2/tweets/search/recent',
		// 	qs: {
		// 		query: 'from:twitterdev',
		// 	},
		// 	auth: {
		// 		// bearer: token,
		// 	},
		// })
		// cy.api({
		// 	method: 'POST',
		// 	url: 'https://api.twitter.com/2/tweets',
		// 	headers: [
		// 		{
		// 			name: 'content-type',
		// 			value: 'application/json',
		// 		},
		// 	],
		// 	body: {
		// 		text: 'Hello World!',
		// 	},
			// headers:{
			//     Authorization: {
			//         type: "OAuth 1.0",
			//         oauth_signature_method: "HMAC-SHA1",
			//         oauth_consumer_key: oauth.key,
			//         oauth_consumer_secret: oauth.secret,
			//         oauth_token: oauth.accessToken,
			//         oauth_token_secret: oauth.secretToken
			//     }
			// }
	})
})


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
