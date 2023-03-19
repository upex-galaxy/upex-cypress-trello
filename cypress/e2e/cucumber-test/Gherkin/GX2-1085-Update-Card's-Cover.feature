Feature: Update Cards Cover

    Background: Tener acceso a la api de Trello
        Given una card creada dentro de una lista
        And con una imagen como attachment

    Scenario Outline: 1086 | TC1: Validar que el usuario con acceso a API, <resultado> agrega un cover <parámetro1> para la card
        Given la card no tiene un cover seleccionado aún
        When usuario envía el request de Update a Card con un parámetro: '<datos>' en '<parámetro1>'
        Then '<resultado>' agrega '<datos>' en el parámetro: '<parámetro1>' el cover a la card
        Examples:
            | datos                                     | parámetro1   | resultado |
            | pink                                      | color        | se        |
            | yellow                                    | color        | se        |
            | lime                                      | color        | se        |
            | black                                     | color        | se        |
            | red                                       | color        | se        |
            | purple                                    | color        | se        |
            | sky                                       | color        | se        |
            | green                                     | color        | se        |
            | que contiene números                      | color        | no se     |
            | que contiene caracteres especiales        | color        | no se     |
            | dark                                      | brightness   | se        |
            | light                                     | brightness   | se        |
            | que contiene números                      | brightness   | no se     |
            | que contiene caracteres especiales        | brightness   | no se     |
            | una url de Unsplash                       | url          | se        |
            | una url que no sea de Unsplash            | url          | no se     |
            | un ID válido                              | idAttachment | se        |
            | un ID de 23 caracteres                    | idAttachment | no se     |
            | un ID de 25 caracteres                    | idAttachment | no se     |
            | un ID que contenga letras después de la f | idAttachment | no se     |
            | normal                                    | size         | se        |
            | full                                      | size         | se        |
            | fuera de la documentación                 | size         | se        |

    Scenario Outline: 1086 | TC2: Validar que el usuario actualiza el cover de la card en el parámetro: <datos>
        Given la card ya tiene un cover seleccionado
        When el usuario actualiza <datos>
        Then el cover de la card debe ser actualizado con la nueva imagen/attachment/color.
        Examples:
            | datos        |
            | color        |
            | imagen       |
            | idAttachment |

    Scenario: 1086 | TC3: Validar que el usuario remueve el cover de la card
        Given la card ya tiene un cover seleccionado
        When usuario hace click sobre el botón "Cover"
        And selecciona la opción de "Remove Cover"
        Then el cover de la card debe ser removido de la misma
        And la card ya no debe tener un cover visible.