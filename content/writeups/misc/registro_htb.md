---
title: "Registro en Hack The Box"
description: "Writeup del registro en Hack The Box"
date: 2020-10-06T08:49:55+00:00
draft: false
menu:
  writeups:
    parent: "misc"
images: []
---

La página de registro no nos deja simplemente ingresar las credenciales que queremos:

![pantallazo registro](../registro.png)

## Abrir el inspector del navegador

No hay mucho que podamos hacer desde la misma página. Pero la gente suele dejar comentarios en el HTML o Javascript de una página (incluso en _producción_), así que siempre es bueno ver si es que pillamos algo interesante.

En la consola nos encontramos este mensaje:

![pantallazo consola](../consola.png)

Las líneas blancas no se ven tan bien entre medio, pero abajo hay algo interesante:

"This page loads an interesting javascript file. See if you can find it :)"

"Esta página carga un archivo javascript interesante. Ve si puedes encontrarlo :)"

## El archivo oculto

Tenemos varias opciones para encontarlo. Podemos abrir el código fuente de la página (click derecho -> ver código fuente), podemos buscarlo en el mismo inspector, donde se ve el código fuente en un formato más bonito, o podemos ver la pestaña de red, para ver los recursos que se cargan.

De cualquiera de las tres formas encontramos el archivo `https://www.hackthebox.eu/js/inviteapi.min.js`, que es un archivo de javascript ofuscado.

## Entendiendo el código

Para entender el código, podemos usar herramientas como http://jsnice.org/. Pegamos el código y podemos ver lo que hace:

```js
'use strict';
/**
 * @return {undefined}
 */
function makeInviteCode() {
  $.ajax({
    type : "POST",
    dataType : "json",
    url : "/api/invite/how/to/generate",
    success : function(a) {
      console.log(a);
    },
    error : function(a) {
      console.log(a);
    }
  });
}
;
```

Si no han hecho cosas web antes es posible que no entiendan bien lo que hace. Pero esto no importa. Podemos simplemente buscar "json post online" (o algo similar), y encontraremos una herramienta que nos sirva.

En mi caso encontré https://reqbin.com/. Veamos cómo nos va:

![pantallazo POST request](../post.png)

Con eso nos dan otro mensaje codificado. Esta vez fueron bien amables y nos dijeron que era rot13. Tras hacer la rotación, recibimos un mensaje que dice:

In order to generate the invite code, make a POST request to \/api\/invite\/generate.

Usamos la misma página anterior, y obtenemos otro código, de nuevo encodeado. Esta vez no nos dicen cómo, pero "se ve" que es base64. Con eso obtenemos el código.

### ¿Cómo que "se ve" que es base64?

Es un poco difícil de explicar, pero viene de haber visto cosas en base64 antes :( Base64 es una de las codificaciones más usadas, así que siempre vale la pena probar, aunque no tengamos la seguridad de que la estén usando.
