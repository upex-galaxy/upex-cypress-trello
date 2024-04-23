import { apiSticker } from "@pages/APIStickers.page";
import { addSticker } from "@pages/APIStickers.page";
	const key = '60546f7606a6d9b65762f53b68d61aa2'
	const token= 'ATTAba481ff908481346282087e391a6df7c1cad1c2f00b5baa233765cec3e5b26b26CBAC466'
	const idList = '66228c917bf9a7fda9f9403d'
	const idCard = '6626f9d5d127d0db725f4dfe'
describe('Create Sticker on card',()=>{
	it('Validate response', () => {
		cy.request('https://trello.com/emoji').then(response => {
			expect(response.status).to.eql(200);
		
		
	})
})
});

describe('Create a Card',()=>{
	
	it('create a card in Trello',() => {
		apiSticker.createNewCard(idList,key,token,).then(response =>{
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Soy La master QA')
		})

		})
	it('Add sticker to a card', ()=>{	
		addSticker.addStickerToCard(idCard,key,token)
	})

	}) 
