import { method } from "cypress/types/bluebird";

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
			    image:'taco-money',
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

export class updateSticker{
	static updateStickerOnCard(idCard:string, idSticker: string, key: string, token: string){
		return cy.api({
			method: 'PUT',
			url: `https://api.trello.com/1/cards/${idCard}/stickers/${idSticker}?key=${key}&token=${token}`,
			qs:{
				image:'taco-money',
				top: -3,
				left: 6,
				zIndex: 1, 
				rotate: 1,
				key: key,
				token: token,
			}
		}).then(response =>{
			return response; 
		})
	}
}
export class deleteSticker{
	static deleteStickerCard(idCard: string, idSticker: string, key: string, token: string){
		return cy.api({
			method: 'DELETE',
			url: `https://api.trello.com/1/cards/${idCard}/stickers/${idSticker}?key=${key}&token=${token}`,
			qs:{
			image:'taco-money',
			top: -3,
			left: 6,
			zIndex: 1, 
			rotate: 1,
			key: key,
			token: token,
			}

			
		})

	
	}
}