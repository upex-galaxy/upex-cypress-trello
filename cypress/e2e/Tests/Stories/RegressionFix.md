**Se realizará corrección sobre los fallos encontrados en los test a ejecutar**

**Test results:**

 ```
 ✖  2 of 7 failed (20%)
 ```

```Tests/How-to/API-testing/Twitter.cy.js ✖```<br>
    **Error:** Test sin finalizar <br>
    **FIX:** Se deja comentado <br>

```Suites/GX-2042/Stickers.AddSticker.cy.js ✖```<br>
   **Error:** Con la actualización de Cypress 12 da error trabajar con .this()<br>
   **FIX:** Se elimino el .this() a las variables y se agrega un parametro en cy.addStickerInvalidImage que daba error <br>
