---
title : "Intro a OSINT"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "osint"
weight: 010

---

_Open Source Intelligence_ (OSINT) es una metodología para recolectar y analizar información mediante fuentes
de tipo _open source_. Es decir, cualquier información que esté disponible públicamente.
Esto se puede hacer de manera manual, pero, dependiendo del ámbito de la búsqueda, existen herramientas
para automatizar el proceso de cierta forma. Este tema rara vez aparece en competencias de CTF, pero de todas
formas se pueden encontrar con challenges de este tipo.

La información obtenida mediante este método incluye:
* Datos personales (nombre, rut, email, dirección, etc)
* Personas, empresas o entidades relacionadas
* Dominios, subdominios, IPs
* Nombres de usuario
* Dispositivos
* Y muchas otras cosas

Para poder realizar el proceso de OSINT de manera efectiva, primero se necesita un punto de partida:
algún tipo de información que nos indique el contexto de la búsqueda, y por donde es posible comenzar
a buscar. Por ejemplo, el challenge puede contener simplemente el nombre de una persona, y para resolverlo
deberán utilizar todas las herramientas disponibles hasta encontrar la flag. Otras veces también se explicita
el dato que deben encontrar, como la ubicación de esta persona en una hora específica,
con lo cual disminuye el rango de opciones.

En algunos casos puede ser necesario realizar búsquedas en redes sociales, ya sea las clásicas (Facebook,
Twitter, Instagram, Linkedin, etc) o en otras más rebuscadas y poco conocidas.
La forma de buscar dependerá fuertemente de la red social en específico que están viendo, y usualmente
el proceso tendrá que ser hecho de manera manual.
