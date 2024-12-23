import OAuth from 'oauth-1.0a';

export interface Auth {
    key: string;
    token: string;
}

export enum AuthType {
    oauth = 'OAuth',
    bearer = 'Bearer'
}

interface RequestData {
    url: string;
    data?: {
        method?: string;
        [key: string]: any;
    };
}

// código generado por Aurora
/* eslint-disable @typescript-eslint/naming-convention */
interface OAuthParams {
    oauth_consumer_key: string;
    oauth_nonce: string;
    oauth_signature?: string;
    oauth_signature_method: string;
    oauth_timestamp: string;
    oauth_token: string;
    oauth_version: string;
    [key: string]: any;
}
/* eslint-enable @typescript-eslint/naming-convention */

export class TrelloAPIAuth {
	private oauth: OAuth;

	private authMethod: AuthType = AuthType.bearer;

	private strConnKey: string = '';
	private strConnToken: string = '';

	constructor() {
		this.oauth = new OAuth({
			consumer: {
				key: 'TU_CONSUMER_KEY',
				secret: 'TU_CONSUMER_SECRET',
			},

			// código generado por Aurora
			/* eslint-disable @typescript-eslint/naming-convention */
			signature_method: 'HMAC-SHA1',
			hash_function: () => {
				return '';
			},
			/* eslint-enable @typescript-eslint/naming-convention */
		});
	}

	public buildUrl(_template: string, _replacements: Record<string, string | null>): string {
		let builtUrl = _template;

		for (const [key, value] of Object.entries(_replacements)) {
			// eslint-disable-next-line no-negated-condition
			builtUrl = builtUrl.replace(`{{${key}}}`, value !== null ? value : '');
		}

		return builtUrl;
	}

	public setCredentials(_auth: Auth, _method?: AuthType) {
		this.authMethod = _method ?? AuthType.bearer;

		switch (_method) {
			case AuthType.oauth:
				this.strConnKey = _auth.key;
				this.strConnToken = _auth.token;
				break;
			case AuthType.bearer:
			default:
				this.strConnToken = _auth.token;
				break;
		}
	}

	// código generado por Aurora, con mucha guía y corrección por mi parte.
	private authenticateWithOauth1(_requestData: RequestData): Cypress.Chainable<string> {
		if (!_requestData.url) {
			throw new Error('url no está definida en requestData.');
		}

		// Crear los parámetros de OAuth
		/* eslint-disable @typescript-eslint/naming-convention */
		const params: OAuthParams = {
			oauth_consumer_key: this.strConnKey,
			oauth_nonce: this.generateNonce(),
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
			oauth_token: this.strConnToken,
			oauth_version: '1.0',
			..._requestData.data, // Otros parámetros que necesiten ser incluidos
		};
		/* eslint-enable @typescript-eslint/naming-convention */

		// Crear el baseString
		const baseString = [
			'GET',
			encodeURIComponent(_requestData.url),
			encodeURIComponent(new URLSearchParams(params).toString())
		].join('&');

		return cy.task('generateSignature', {
			baseString: baseString,
			key: this.strConnKey,
		}).then((signature) => {
			const oauthSignature: string = signature as string;
			params.oauth_signature = oauthSignature;

			// Generar los datos de OAuth
			const oauthData = this.oauth.authorize({
				url: _requestData.url,
				method: 'GET',
				data: params,
			}, {
				key: this.strConnKey,
				secret: this.strConnToken,
			});

			// Crear el encabezado de autorización
			const authHeader = this.oauth.toHeader(oauthData);
			return authHeader['Authorization'];
		});
	}

	private generateNonce(): string {
		return Math.random().toString(36).substring(2);
	}

	private authenticateWithBearer(): Cypress.Chainable<any> {
		if (!this.strConnToken) {
			throw new Error('Bearer Token no está definido.');
		}

		const authHeader = `Bearer ${this.strConnToken}`;
		return cy.wrap(authHeader);
	}

	public authenticate(_requestData: RequestData): Cypress.Chainable<any> {
		switch (this.authMethod) {
			case AuthType.oauth:
				return this.authenticateWithOauth1(_requestData);
			case AuthType.bearer:
			default:
				return this.authenticateWithBearer();
		}
	}
}