Como usuario de API de Trello

Quiero actualizar “CheckItems” de un “CheckList”

Para editar sus datos y poder organizar mejor mis tareas.

✅ACCEPTANCE CRITERIA

Feature: CheckItems

  Background:
    Given el usuario se encuentra logueado en la web de Trello
    And ya está creado
    *"un tablero"
    * "una lista"
    *"una carta"
    * "una checklist"
    * "un checkItem"

  Scenario 1: el usuario de la API actualiza un CheckItem
    When el usuario realiza una petición PUT para actualizar un CheckItem
    And modifica alguno de los parametros [name, state, pos]
    Then el usuaraio debería recibir un response con status 200
    And un body donde pueda visualizar los cambios realizados
