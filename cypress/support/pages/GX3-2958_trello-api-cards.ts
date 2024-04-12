interface TrelloList {
  id: string;
  name: string;
}

class Trello {
  public static getList(): Cypress.Chainable<TrelloList[]> {
      return cy.api({
          method: 'GET',
          url: 'https://api.trello.com/1/boards/6592ed58a34878ef297261d5/lists?key=4b6c632cc1e7a202e9ad79f28f549d34&token=ATTAc47382028c4b75d1cc4df76132118d08134c919e95cbb01e15b9de168208314bCB6F74BD'
      }).then((response) => {
          const lists: TrelloList[] = response.body;

          return lists;
      });
  }
}

export const trello = Trello;