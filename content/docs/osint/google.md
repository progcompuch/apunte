---
title : "Google Hacking"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "osint"
weight: 020

---

Todos sabemos cómo hacer búsquedas en Google (o cualquier otro motor de búsqueda similar):
simplemente ingresamos las palabras relevantes en el campo de búsqueda y dejamos que el algoritmo haga su
trabajo. Sin embargo internet es muy (MUY) grande, y muchas veces obtenemos resultados que coinciden con
nuestra búsqueda, pero no nos son útiles. Esto hace que el proceso de investigación sea más lento y menos
eficiente.

Afortunadamente la gran mayoría de los motores de búsqueda implementan algún tipo de búsqueda avanzada, que nos
permite filtrar muchos de los falsos positivos que encontramos normalmente. Aquí estudiaremos la implementación
de Google, ya que suele ser la más efectiva, pero también existen sistemas parecidos de búsqueda para
DuckDuckGo, Bing y otros.

## Google Dorks

[Google Hacking](https://en.wikipedia.org/wiki/Google_hacking), o también llamado _Google Dorks_, es una
forma de realizar búsquedas en Google que nos permite filtrar ciertas palabras, imponer restricciones de
tipos de archivos o de fuentes, realizar la búsqueda solo en el título, URL o cuerpo, entre muchas otras cosas.
Esto se hace mediante la inclusión de ciertos flags o caracteres en la búsqueda. Pueden encontrar una
lista completa de flags [aquí](https://gbhackers.com/latest-google-dorks-list/).

Las más útiles en general son las siguientes:
* **Exclusión**: Se pueden excluir todos los resultados que contengan cierto término de la forma `-<keyword>`.

* **Resultado Literal**: Si quieren buscar por un término literal (excluyendo palabras parecidas, sinónimos, etc),
  utilizan las comillas dobles `"<keyword>"`

* **Tipo de Archivo**: Si están buscando algún tipo de archivo en específico, como PDF,
  utilizan `filetype:<type>`.

* **Fuente**: Si están buscando resultados exclusivamente de un sitio en particular usan `site:<URL>`.

La flag de exclusión se puede combinar con otras flags, como para excluir todos los resultados de un
sitio en particular `-site:<URL>`.

## Ejemplo

Queremos buscar información sobre inyecciones SQL, por lo que hacemos lo siguiente:

![SQLi search](../google-search1.png)

Pero nosotros queremos solo resultados de OWASP, por lo que agregamos la flag `site:owasp.org` y obtenemos
lo que queremos (ignorando el AD):

![SQLi search from OWASP](../google-search2.png)

Finalmente, los documentos académicos usualmente están en formato PDF, por lo que buscamos solo resultados
que cumplan esa condición con `filetype:pdf`:

![SQLi search in PDF format](../google-search3.png)
