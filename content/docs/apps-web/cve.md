---
title : "Common Vulnerabilities and Exposures"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "apps-web"
weight: 070
---

Muchas veces ustedes se encontrarán con sistemas (web u otro tipo) que utilizan software con vulnerabilidades
conocidas (punto 9 del OWASP Top 10). Estas vulnerabilidades se catalogan como _Common Vulnerabilities and
Exposures_ (CVE), el cual es un sistema que intenta proveer información y documentación sobre
vulnerabilidades conocidas públicamente. Esto se suele documentar junto a su puntaje
[CVSS](https://www.first.org/cvss/v3.1/specification-document) (_Common Vulnerabilities Scoring System_).

## CVSS

Es un sistema abierto para comunicar las características y severidad de vulnerabilidades conocidas en software.
Produce un puntaje de 0 a 10 indicando la explotabilidad de la vulnerabilidad en cuestión.
Estos puntajes se categorizan de la siguiente manera:

* **Informative** (0.0): La vulnerabilidad no es explotable pero puede entregar información o recursos que
permiten o facilitan la explotación de otra vulnerabilidad. Ejemplo: revelar rutas absolutas de archivos
  en el servidor.

* **Low** (0.1 - 3.9): La vulnerabilidad es muy difícil de explotar, o los recursos ganados luego de explotarla
no son muy relevantes. Ejemplo: divulgación o enumeración de usuarios del sistema.

* **Medium** (4.0 - 6.9): No se requiere tanto esfuerzo para explotar la vulnerabilidad, pero los componentes
comprometidos no son críticos. Ejemplo: poder interceptar información no sensible ni privada de otros usuarios.

* **High** (7.0 - 8.9): Se puede comprometer un ámbito completo del sistema (confidencialidad, integridad
  o disponibilidad). Ejemplo: poder leer toda la información de todos los usuarios.

* **Critical** (9.0 - 10): Se compromete el sistema completo, permitiéndole al atacante leer y modificar
toda la información y componentes o denegar el servicio. Ejemplo: obtener acceso a la cuenta de administrador
  del sistema.

Este puntaje se calcula de manera pseudo objetiva, teniendo en cuenta métricas base, temporales y
ambientales.

### Métricas Base

Las métricas base intentan describir a la vulnerabilidad de manera aislada y teórica,
utilizando los siguientes datos:

* **Attack Vector** (Network, Adjacent, Local, Physical).

* **Attack Complexity** (Low, High).

* **Privileges Required** (None, Low, High).

* **User Interaction** (None, Required).

* **Scope** (Unchanged, Changed).

* **Confidentiality** (None, Low, High).

* **Integrity** (None, Low, High).

* **Availability** (None, Low, High).

### Métricas Temporales

Las métricas temporales incluyen factores sobre el estado de los exploits para la vulnerabilidad en cuestión
en la actualidad, los que varían en el tiempo:

* **Exploit Code Maturity** (Not defined, Unproven that exploit exists, Proof of concept code,
  Functional exploit exists, High).

* **Remediation Level** (Not Defined, Official fix, Temporary fix, Workaround, Unavailable).

* **Report Confidence** (Not Defined, Unknown, Reasonable, Confirmed).

### Métricas Ambientales

Finalmente, las métricas de tipo ambientales son específicas para los dueños del sistema afectado, e intentan
cuantificar la importancia de la vulnerabilidad en el entorno en el cual se encuentra.

* **Attack Vector** (Not Defined, Network, Adjacent Network, Local, Physical).

* **Attack Complexity** (Not Defined, Low, High).

* **Privileges Required** (Not Defined, None, Low, High).

* **User Interaction** (Not Defined, None, Required).

* **Scope** (Not Defined, Unchanged, Changed).

* **Confidentiality** (Not Defined, None, Low, High).

* **Integrity** (Not Defined, None, Low, High).

* **Availability** (Not Defined, None, Low, High).

* **Confidentiality Requirement** (Not Defined, Low, Medium, High).

* **Integrity Requirement** (Not Defined, Low, Medium, High).

* **Availability Requirement** (Not Defined, Low, Medium, High).

## Herramientas

La herramienta más conocida y utilizada para la explotación de CVEs es [Metasploit](https://github.com/rapid7/metasploit-framework),
el cual es un repositorio de vulnerabilidades parametrizadas, para facilitar su explotación.
Además está [searchsploit](https://www.exploit-db.com/searchsploit), que es un repositorio con descripciones
y pruebas de concepto para algunos CVE que no aparecen en Metasploit.

Sin embargo no todos los CVEs están en esas herramientas, y tendrán que buscarlos en internet.
Algunos sitios útiles son:
* [https://www.exploit-db.com/](https://www.exploit-db.com/)
* [https://vuldb.com/](https://vuldb.com/)
* [https://www.cvedetails.com/](https://www.cvedetails.com/vulnerability-list/vendor_id-16542/Laravel.html)
* [https://medium.com/](https://medium.com/)
* [https://github.com/](https://github.com/)

En estos podrán encontrar códigos, pruebas de concepto, y guías paso a paso sobre cómo funcionan algunas
vulnerabilidades.

## Ejemplo

Para iniciar Metasploit deben correr el siguiente comando como `root`:

    msfdb run

Luego pueden buscar dentro del repositorio de vulnerabilidades por palabras clave `search <keyword>`:

![Metasploit Search](../metasploit-search.png)

Finalmente, para elegir un exploit, pueden ejecutar `use <num>` con el número del exploit en la lista retornada
de la búsqueda.

Recuerden que **las vulnerabilidades varían entre versiones de cada software**, por lo que no necesariamente
podrán explotarlas siempre.

Pueden encontrar un tutorial bastante completo de Metasploit
[aquí](https://www.tutorialspoint.com/metasploit/index.htm).

Para buscar exploits en searchsploit, simplemente usar el comando `searchsploit <keyword>`:

![Searchsploit Searching](../searchsploit-searching.png)

Esto les retornará una lista de exploits con un nombre y una ruta al archivo con la descripción o prueba de concepto.
Si el archivo es `.rb` significa que existe un módulo de Metasploit implementado. Sino, tendrán que leer la
descripción e llevar a cabo la explotación de manera manual.

Los archivos están nombrados con un código numérico que los identifica. Si quieren ver el archivo,
pueden imprimir la ruta completa a este usando `searchsploit -p <code>`:

![Searchsploit Path](../searchsploit-path.png)
