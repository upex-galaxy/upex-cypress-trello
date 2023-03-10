Feature: Update Cards Cover

    Background: Tener acceso a la api de Trello
        Given una card creada dentro de una lista
        And la card no tiene un cover seleccionado aún

    Scenario Outline: 1086 | TC1: Validar que el usuario con acceso a API, agrega un cover para la card
        When usuario envía el request de Update a Card con el siguiente parámetro: '<datos>' en '<parámetro1>' '<parámetro2>'
        Then '<resultado>' agrega '<datos>' en el parámetro: '<parámetro1>' '<parámetro2>' el cover a la card
        Examples:
            | datos                                     | parámetro1           | parámetro2             | resultado    |
            | pink                                      | color                |                        | se           |
            | yellow                                    | color                |                        | se           |
            | lime                                      | color                |                        | se           |
            | black                                     | color                |                        | se           |
            | red                                       | color                |                        | se           |
            | purple                                    | color                |                        | se           |
            | sky                                       | color                |                        | se           |
            | green                                     | color                |                        | se           |
            | que contiene números                      | color                |                        | no se        |
            | que está fuera de la documentación        | color                |                        | no se        |
            | dark                                      | brightness           |                        | se           |
            | light                                     | brightness           |                        | se           |
            | null                                      | brightness           |                        | no se        |
            | que contiene números                      | brightness           |                        | no se        |
            | que está fuera de la documentación        | brightness           |                        | no se        |
            | una url de Unsplash                       | idUploadedBackground |                        | se           |
            | que url que no sea de Unsplash            | idUploadedBackground |                        | no se        |
            | un ID válido                              | idAttachment         |                        | se           |
            | un ID de 23 caracteres                    | idAttachment         |                        | no se        |
            | un ID de 25 caracteres                    | idAttachment         |                        | no se        |
            | un ID que contenga letras después de la f | idAttachment         |                        | no se        |
            | normal                                    | size                 |                        | se           |
            | full                                      | size                 |                        | se           |
            | null                                      | size                 |                        | se           |
            | null                                      | idUploadedBackground | , idAttachment         | el color se  |
            | null                                      | color                | , idAttachment         | la imagen se |
            | null                                      | color                | , idUploadedBackground | la imagen se |

    Scenario: 1086 | TC2: Validar que el usuario actualiza el cover de la card
        Given la card ya tiene un cover seleccionado
        When el usuario selecciona otro cover
        Then el cover de la card debe ser actualizado con la nueva imagen/attachment/color.

    Scenario: 1086 | TC3: Validar que el usuario remueve el cover de la card
        Given la card ya tiene un cover seleccionado
        When usuario hace click sobre el botón "Cover"
        And selecciona la opción de "Remove Cover"
        Then el cover de la card debe ser removido de la misma
        And la card ya no debe tener un cover visible.