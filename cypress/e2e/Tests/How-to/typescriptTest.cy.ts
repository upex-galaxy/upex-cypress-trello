import { homePage } from '@pages/typescript.Page';

describe('test typescript page', () => {
	beforeEach(() => {
		cy.visit('https://www.typescriptlang.org/');
	});

	it('Should find the wanted doc', () => {
		homePage.searchFor('Functions');

		homePage.get.suggestionListBox().should('be.visible');

		homePage.selectSuggestion(2);
	});
});
