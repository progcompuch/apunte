---
title : "Inyecciones"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "apps-web"
weight: 040
---

En términos generales, una inyección (punto 1 del OWASP Top 10) es un ataque que intenta confundir al servidor
de forma que interprete datos como si fueran código. Esto tiene un potencial muy grande de explotación, aunque
usualmente está restringido por factores como filtros, configuraciones de seguridad y tecnologías usadas.

Estos ataques suelen conllevar a filtración de información, pero también puede ser posible crear,
modificar y eliminar datos, ejecutar comandos de sistema, enviar requests a otros servidores, y realizar
una denegación de servicio (DoS) por la utilización de demasiados recursos. En general ocurren porque el
servidor no sanitiza correctamente datos controlados por el usuario, para luego utilizarlos directamente en un
sistema separado con el cual debe interactuar por medio de una API o algo similar.

## SQL

Las inyecciones SQL (o SQLi) son el ataque más conocido en general. Como lo dice el nombre, este se refiere a la
inyección de comandos SQL en una consulta. Si no conocen SQL, o necesitan refrescar su memoria, los invito a
ver el [tutorial de w3schools](https://www.w3schools.com/sql/default.asp).

Un ejemplo de esta inyección sería un formulario de login que toma los parámetros entregados por el
usuario y los usa directamente en la consulta:

    SELECT username FROM users WHERE username = '$username' AND password = SHA256('$password');

Luego esto puede ser aprovechado para ingresar de manera autenticada, sin tener credenciales. La forma de hacerlo
es ingresando el usuario `' or 1=1; -- - `. Reemplazando esto en la consulta anterior, nos queda:

    SELECT username FROM users WHERE username = '' or 1=1; -- - ' AND password = SHA256('$password');

Esto selecciona a los usuarios que cumplan con `username = ''` o que `1=1`. El resto del comando está comentado
por `-- -`. Ya que todos los usuarios cumplen con esta condición, el atacante se autentica ingresa de manera
autenticada como el primer usuario que aparezca en la respuesta.

Las inyecciones se dividen en 2 tipos:
* **Non Blind**: En donde las respuestas a las consultas se retornan directamente al atacante, y por lo tanto puede
robarse toda la información muy rápidamente.

* **Blind**: Las respuestas a las consultas no se muestran en ninguna parte, por lo que se debe utilizar otras técnicas
para obtener la información. Esto usualmente significa consultar caracter por caracter (el nombre de usuario
  empieza con a?), y distinguir las respuestas en base al comportamiento del servidor.
  Estos nuevamente se dividen en 2:

  * **Boolean Based**: El servidor realiza una acción dependiendo de si la consulta fue exitosa o no. Por ejemplo,
  lanzar un error, autenticar a un usuario, ejecutar un proceso, etc.

  * **Time Based**: Esta técnica se basa en el tiempo de respuesta del servidor. La forma de utilizarla es hacer una
  consulta que intencionalmente haga esperar al servidor en ciertos casos. Por ejemplo, si el nombre de usuario
    empieza con a, espera 5 segundos y retorna, sino retorna inmediatamente.

La herramienta [sqlmap](https://github.com/sqlmapproject/sqlmap) se utiliza mucho para hacer un análisis
automatizado de este tipo de inyecciones. Envía un conjunto de requests estándar, el cual se adapta a la
información recolectada y otros parámetros, con lo cual puede detectar la gran mayoría de las inyecciones
simples. Muchas veces esta herramienta sola no es suficiente, por lo que deberán crear scripts de _tamper_
específicos para su situación, o realizar en análisis de otra forma.

## Otros Tipos

Existen muchos otros tipos de inyecciones que no veremos en este curso, pero es bueno que sepan que existen.

* **NoSQL**: Similar a las SQLi, pero en sistemas NoSQL. Esto tiene diferencias de sintaxis y añade comandos y
funciones no disponibles en SQL.

* **XML**: El Extensible Markup Language (XML) se utiliza en muchos lados y es notorio por sus riesgos de seguridad,
ya que tiene hartas funcionalidades explotables. Algunas categorías de inyección XML son:
  * Tag Injection
  * XML eXternal Entities (XXE)
  * XML Entity Expansion (XEE)
  * XPath

* **Lightweight Directory Access Protocol** (LDAP): Este es una especie de motor de búsqueda dentro de directorios
  y archivos, y de vez en cuando se utiliza para procesar consultas web.

## Técnicas Avanzadas

Existen técnicas avanzadas de inyección que se escapan del ámbito del curso. Si se interesan, a continuación
pueden encontrar un pequeño resumen.

### Out Of Band (OOB)

Muchas veces el sistema que está siendo analizado es efectivamente vulnerable a inyecciones, pero no es posible
obtener los resultados, ni siquiera con métodos ciegos. En estos casos se puede intentar una inyección fuera
de banda o _Out Of Band_ (OOB). El objetivo es obtener los resultados a la consulta por medio de un canal
diferente al cual se realizó la inyección.

Por ejemplo, supongamos que además de la inyección, es posible
enviar un request a otro servidor. Luego, la información podría ser filtrada al enviarla a una URL controlada
por el atacante, como `https://hacker.com?data=<data>`. Esta técnica se puede combinar con inyecciones de tipo
Blind y Non Blind.

### Second Order

De vez en cuando sucede que una inyección no se ejecuta al momento de enviar el payload, sino que este queda
almacenado. Luego al acceder a este más adelante, se logra la inyección. Se llaman inyecciones de segundo
orden porque se explotan por medio de 2 requests:
1. Se envía el payload, el cual queda almacenado.
2. Se intenta acceder a los datos almacenados, en donde se realiza la inyección.

Estas vulnerabilidades surgen porque los desarrolladores usualmente consideran los valores controlados
por el usuario inseguros, pero una vez que ya se almacenan en la base de datos son confiables.
Esto no necesariamente es así, ya que un valor almacenado en la base de datos puede haber sido
alterado por un usuario. Es decir, ningún valor es confiable, y las consultas a la base de datos
siempre se deben hacer de manera segura sin importar de dónde provengan los datos.

Para ilustrar esto, imaginemos un sitio vulnerable a inyecciones SQL de segundo orden,
en donde nos registramos con el usuario `user' or '1'='1`. Esto no causa una inyección, pues los formularios
de registro y de login están bien sanitizados.
Luego, ingresamos al portal y vemos nuestro perfil, en donde el servidor realiza la consulta:

    SELECT data FROM users WHERE username = '$username';

Reemplazando la variable por nuestro usuario obtenemos:

    SELECT data FROM users WHERE username = 'user' or '1'='1';

Es decir, estamos seleccionando el campo `data` de todos los usuarios en la base de datos. Esta técnica
también puede ser combinada con inyecciones de tipo Blind y Non Blind.
