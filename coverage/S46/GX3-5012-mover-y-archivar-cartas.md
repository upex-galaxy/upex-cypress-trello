Descripción
Como usuario de Trello 
Quiero mover o eliminar mis tarjetas de una lista 
Para  organizarme mejor

✅ACCEPTANCE CRITERIA

Backgound:
given: usuario tiene 2 o más listas creadas 

and: crea tarjetas en una lista

Mover todas las tarjetas de una lista
POST /1/lists/{id}/moveAllCards
Mover todas las tarjetas de una lista a otra

request:
Path parameters:
tipo: string

El {id} requerido es de la lista donde se encuentran las tarjetas

Query Parameters:
tipo: string

-idBoard(Requerido)
el idBoard requerido es sobre a dónde se van a mover las tarjetas

-idList (requerido)
tipo: string
El idList es el id de la lista a la cual se desean mover las tarjetas

Ejemplo
curl --request POST \ --url 'https://api.trello.com/1/lists/{id}/moveAllCards?idBoard=5abbe4b7ddc1b351ef961414&idList=5abbe4b7ddc1b351ef961414&key=APIKey&token=APIToken'

Archivar todas las tarjetas de una lista
POST /1/lists/{id}/archiveAllCards

Request:
PATH PARAMETERS
-{id} REQUIRED
tipo: string
el id requerido es de la lista donde se encuentran las tarjetas

Example:
curl --requestPOST \ --url 'https://api.trello.com/1/lists/{id}/archiveAllCards?key=APIKey&token=APIToken'