export enum urlList {
	getList = '/lists/{idList}?key={key}&token={token}',
	archiveCardsInList = '/lists/{idList}/archiveAllCards?key={key}&token={token}',
	getCard = '/cards/{idList}?key={key}&token={token}',
	createCard = '/cards?idList={idList}&key={key}&token={token}',
	updateCard = '/cards/{idCard}?&key={key}&token={token}',
	deleteCard = '/cards/{idCard}?&key={key}&token={token}',
	addStickerToCard = '/cards/{idCard}/stickers?image={image}&top={top}&left={left}&zIndex={zIndex}&key={key}&token={token}',
	getSticker = '/cards/{idCard}/stickers/{idSticker}?key={key}&token={token}',
}
export enum method {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}
export function processUrl(endpointKey: urlList, params: { [key: string]: any }): string {
	let template = `https://api.trello.com/1${endpointKey}`;
	for (const key in params) {
		template = template.replace(`{${key}}`, params[key]);
	}
	return template;
}