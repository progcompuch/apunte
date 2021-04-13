---
title : "The Harvester"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "osint"
weight: 040

---

TheHarvester es una herramienta utilizada para buscar subdominios, IPs y correos asociados a un dominio
particular. Esto se hace por medio de motores de búsqueda, como Google, Bing, DuckDuckGo, Github, Linkedin,
Twitter, etc. Pueden encontrar la herramienta [aquí](https://github.com/laramies/theHarvester).

Esto es muy útil para hacer análisis perimetrales de una empresa, en donde no se conoce todos los subdominios
que posee. También sirve para encontrar posibles usuarios, para luego realizar ataques de fuerza bruta,
o buscar más información sobre estas personas.

## Ejemplo

Queremos encontrar información relacionada al dominio `uchile.cl`. Utilizamos la flag `-d` para determinar el
dominio que será buscado y `-b` para especificar el motor de búsqueda. Google suele ser el más efectivo, por lo
que lo elegimos.

![theHarvester Query](../theharvester1.png)

Obtenemos los resultados y observamos que no se encontró IPs, pero sí se logró encontrar muchos emails y
subdominios, de los cuales la gran mayoría tiene una IP asignada.

![theHarvester Results](../theharvester2.png)
