import { trello } from "@pages/GX3-2958_trello-api-cards";

interface TrelloList {
  id: string;
  name: string;
}

describe('GX3-2958 | TX: [Automation] Trello (API) | Cards | API Endpoint: mover y archivar todas las tarjetas de una lista', () => {
  it('GX3-2958 | TC 01: Cambiar tarjetas de lista exitosamente', () => {
    trello.getList().then((result: TrelloList[]) => {
      const resultString: string = JSON.stringify(result);
      cy.log(resultString);
    });

    /*cy.api({
      method: 'GET',
      url: 'https://api.trello.com/1/boards/6592ed58a34878ef297261d5/lists?key=4b6c632cc1e7a202e9ad79f28f549d34&token=ATTAc47382028c4b75d1cc4df76132118d08134c919e95cbb01e15b9de168208314bCB6F74BD'
    }).then((response) => {

      const lists: { id: string, name: string }[] = response.body;

      cy.api({
        method: 'GET',
        url: 'https://api.trello.com/1/boards/6592ed58a34878ef297261d5/cards?key=4b6c632cc1e7a202e9ad79f28f549d34&token=ATTAc47382028c4b75d1cc4df76132118d08134c919e95cbb01e15b9de168208314bCB6F74BD'
      }).then((response) => {
        const cards: { id: string, idList: string }[] = response.body;

        const cardCountByList: Record<string, number> = {};
        cards.forEach((card) => {
          cardCountByList[card.idList] = (cardCountByList[card.idList] || 0) + 1;
        });

        let minCardCount = Infinity;
        let targetListId = '';
        lists.forEach((list) => {
          const cardCount = cardCountByList[list.id] || 0;
          if (cardCount < minCardCount) {
            minCardCount = cardCount;
            targetListId = list.id;
          }
        });

        cards.forEach((card) => {
          if (card.idList !== targetListId) {
            cy.api({
              method: 'PUT',
              url: `https://api.trello.com/1/cards/${card.id}?key=4b6c632cc1e7a202e9ad79f28f549d34&token=ATTAc47382028c4b75d1cc4df76132118d08134c919e95cbb01e15b9de168208314bCB6F74BD&idList=${targetListId}`
            }).then((response) => {
              expect(response.status).to.eq(200);
              
              expect(response.body.idList).to.eq(targetListId);
            });
          }
        });
      });
    });*/
  });
});