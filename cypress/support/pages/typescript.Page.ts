class HomeTsPage {
	// todo: Definir las variables:
	get = {
		searchbar: () => cy.get('#search-box-top'),
		suggestionListBox: () => cy.get('[role="listbox"]'),
		//Within suggestionListBox:
		suggestions: () => cy.get('a:not([class*=logo])'),
	};
	// todo: Complex Getter:
	getSuggestions() {
		this.get.suggestionListBox().within(() => {
			return this.get.suggestions().its('length');
		});
	}
	getSuggestionsNum(): Promise<number> {
		return new Promise(resolve => {
			this.get.suggestionListBox().within(() => {
				this.get.suggestions().then($items => {
					const suggestions = $items.length;
					resolve(suggestions);
				});
			});
		});
	}
	//todo: Dibujar las Acciones:
	selectSuggestion(option: number) {
		return this.get.suggestionListBox().within(() => {
			this.get.suggestions().eq(option).click({ force: true });
		});
	}
	searchFor(text: string) {
		return this.get.searchbar().type(text);
	}
}

export const homePage = new HomeTsPage();
