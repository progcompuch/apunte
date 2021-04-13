---
title : "Have I Been Pwned"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "osint"
weight: 050

---

[Have I Been Pwned](https://haveibeenpwned.com/) es un sitio web que recopila contraseñas filtradas, asociadas a
un correo. Luego, los usuarios pueden ingresar su correo, y el sitio responde si se ha encontrado
contraseñas para ese correo, y de dónde salieron. Esto puede ser particularmente importante, pues la gran
mayoría de las personas reutilizan sus contraseñas en muchos lugares diferentes, de vez en cuando con alguna
variación mínima.

El sitio también permite buscar de manera segura si una contraseña particular ha sido filtrada en algún momento.
Esto funciona calculando el Hash de la contraseña de manera local, y luego enviando una parte de este Hash
al servidor. El servidor responde con todos los hashes que coinciden con el valor enviado, los cuales son
comparados localmente con el Hash completo de la contraseña. De esta forma, en ningún momento se envía
la contraseña (ni su Hash completo) al servidor, dejando que el cliente haga las comparaciones localmente.

**Nota**: Que un correo aparezca comprometido no significa que actualmente lo esté. Quiere decir que en algún
momento alguna contraseña asociada a ese correo se filtró.

## Ejemplo

Queremos verificar si un correo ha sido comprometido, por lo que ingresamos a
[Have I Been Pwned](https://haveibeenpwned.com/) y hacemos la búsqueda.

![Búsqueda en HaveIBeenPwned](../haveibeenpwned-search.png)

Si no se encuentra _breaches_ relacionados, el sitio nos lo indica en verde.

![No Comprometido](../haveibeenpwned-safe.png)

En cambio, si efectivamente ha habido filtraciones de contraseñas asociadas al correo, se mostrará en rojo.

![Comprometido](../haveibeenpwned-pwned.png)

Más abajo podemos revisar específicamente dónde y cuándo se produjo la filtración. Esto nos ayuda a determinar
si la contraseña filtrada fue una antigua o actual, y nos muestra específicamente qué datos fueron comprometidos.

![Breaches](../haveibeenpwned-breaches.png)
