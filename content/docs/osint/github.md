---
title : "Búsqueda en Github"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "osint"
weight: 030

---

Github contiene una cantidad impresionantemente grande repositorios, código y datos. Muchas veces se puede
encontrar información privada dentro de estos, como contraseñas, por lo cual poder buscar dentro de
ellos es muy útil. Esto se hace con la [búsqueda avanzada de Github](https://github.com/search/advanced),
la cual retorna información sobre los repositorios públicos.

De manera similar a Google Dorks, Github tiene un sistema de flags en su búsqueda para filtrar los resultados.
Pueden encontrar documentación sobre esto [aquí](https://docs.github.com/en/github/searching-for-information-on-github/getting-started-with-searching-on-github).
En este caso, los flags disponibles están más enfocados a filtrar características importantes de un
repositorio (por ejemplo la cantidad de forks con `fork:<n>`). También se puede buscar repos cuyos archivos
cumplan ciertas características, como en su extensión (`extension:<ext>`).

## Ejemplo

Buscaremos repositorios que contengan la palabra `password` con el objetivo de encontrar alguna contraseña
olvidada que no debería estar ahí. Pero al igual que con las búsquedas en Google, queremos restringir
los resultados obtenidos para filtrar los falsos positivos. Para eso además incluimos las flags
`forks:0`, ya que un repositorio con forks probablemente está siendo revisado y la contraseña ya fue
encontrada, y `extension:txt`, pues buscamos contraseñas en texto plano.

![Github Passwords](../github-passwords.png)

Encontramos muchos resultados, los cuales deben ser revisados manualmente, o se puede restringir aún más
la búsqueda para acelerar el proceso.

