export class apiSticker{
	static createNewCard ( idList: string, key:string,token: string, ){
		
		return cy.api({
			method: 'POST',
			url: `https://api.trello.com/1/cards?idList=${idList}&key=${key}&token=${token}`,
			qs:{
			   idList: idList,
				key: key,
				token: token,
				name:'Soy La master QA'
			

			}
		}).then(response=>{
			return response;
		})

		
	}



	
}
export class addSticker{
	static addStickerToCard(idCard:string, key: string, token: string){
		return cy.api({
			method: 'POST',
			url:`https://api.trello.com/1/cards/${idCard}/stickers?key=${key}&token=${token}`,
				qs:{
			    image: 'taco-alert',
				top: 1,
				left: 6,
				zIndex: 1, 
				rotate: 1,
				key: key,
				token: token,
			}
		}).then(response=>{
			return response;
		})

		}}
