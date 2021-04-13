---
title : "Shodan"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "osint"
weight: 060

---

[Shodan](https://www.shodan.io/) es un motor de búsqueda que permite encontrar tipos específicos de computadores o dispositivos
conectados a internet. Para esto implementa una variedad de filtros que ayudan en la búsqueda,
de forma de hacerla más rápida y efectiva. Dentro de estos resultados pueden encontrar servicios mal
configurados, los cuales no implementan medidas de seguridad y son accesibles para cualquier persona.

**Importante**: En Shodan pueden encontrar servicios privados a los cuales ustedes no tienen permiso de ingresar.
**No interactúen con estos servicios**, no intenten sacar información ni entren a revisar de qué se trata.
Pueden estar violando la privacidad de ciertas personas y luego caer en problemas legales.

## Ejemplo

En Shodan podemos buscar por casi cualquier tipo de dispositivo. En este ejemplo buscaremos termostatos
conectados a internet. Para eso ingresamos al sitio y buscamos la palabra `thermostat`.

![Shodan Thermostat Search](../shodan-thermostat.png)

Haciendo click en uno de los resultados cualquiera podemos ver la región a la cual pertenece, los puertos que
tiene abiertos y el servicio que ofrece en cada puerto.

![Shodan Result Details](../shodan-result-details.png)
