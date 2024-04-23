import { apiSticker } from "@pages/APIStickers.page";
import { addSticker } from "@pages/APIStickers.page";
import { updateSticker } from "@pages/APIStickers.page";

	const key = '60546f7606a6d9b65762f53b68d61aa2'
	const token= 'ATTAba481ff908481346282087e391a6df7c1cad1c2f00b5baa233765cec3e5b26b26CBAC466'
	const idList = '66228c917bf9a7fda9f9403d'
	const idCard = '6622c85faef1e64ad7dd77bb'
	const idSticker= '6626f81286a6d105a50a6291'

	describe('API Trello board ',()=>{
	    it('TC01:create a card in Trello',() => {
		apiSticker.createNewCard(idList,key,token,).then(response =>{
			expect(response.status).to.eql(200);
			expect(response.body.name).to.eql('Soy La master QA')
	})
	});
		it('TC02: Validate that a sticker can be added to a card', () =>{
			addSticker.addStickerToCard(idCard, key, token).then(response =>{
			expect(response.status).to.eql(200);
			expect(response.body.image).to.eql('taco-money')
			expect(response.body.zIndex).to.eql(1)

			})
		});

		it('TC03:update sticker on card', () =>{
			updateSticker.updateStickerOnCard(idCard, idSticker, key, token).then(response =>{
			expect(response.status).to.eql(200);
			expect(response.body.image).to.eql('taco-money')
			expect(response.body.left).to.eql(6)
			expect(response.body.zIndex).to.eql(1)
			})

		})

		it('TC03: Delete Sticker from Card', () =>{

		})

}) 


