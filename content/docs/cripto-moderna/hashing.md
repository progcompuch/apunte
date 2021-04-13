---
title : "Hashing"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "cripto-moderna"
weight: 020
---

Las funciones de _hash_ son utilizadas como un bloque fundamental en muchos otros componentes criptográficos, tales como firmas digitales, cifrado de llave pública, verificación de integridad de archivos, autentificación de mensajes, contraseñas, entre otros. 

![Función de hash](../hash.jpg)

Como muestra la imagen anterior (del libro _Serious Cryptography_), una función de hash recibe un mensaje de longitud arbitraria, y devuelve un valor de tamaño fijo (generalmente entre 256 y 512 bits). Al mismo tiempo, una "buena función de hash" para usos criptográficos es una función que cumple las siguientes características:

* Un cambio chico en el mensaje provoca un cambio muy grande en el valor devuelto por la función de hash.
* Dado un valor devuelto por la función de hash a partir de un mensaje $M$, es demasiado dificil encontrar un valor que produzca ese valor sin conocer $M$.
* Si bien es obvio que existen colisiones (es decir, dos mensajes distintos entre sí $M_1$ y $M_2$ tales que $H(M_1) == H(M_2)$), encontrar dos mensajes que colisionen debe ser demasiado difícil.

## Ejemplos de Funciones de hash

A continuación se nombrarán algunas funciones de hash usadas ampliamente
### MD5

MD5 es un algoritmo de hashing basado en una [construcción Merkle-Damgård](https://en.wikipedia.org/wiki/Merkle%E2%80%93Damg%C3%A5rd_construction) que produce un valor de 128 bits, usando bloques de 512 bits en sus procedimientos internos. Este algoritmo fue creado el año 1992, y ya el 1996 se conocían problemas en él. El año 2004 un grupo de investigadores mostró que MD5 no es resistente a colisiones, además de publicar un método práctico para crear datos con el mismo hash pero distinto contenido (ataques de colisión), lo que hizo que se deprecara como hash seguro. Más información sobre la función de hash se puede encontrar en [Wikipedia](https://en.wikipedia.org/wiki/MD5)

**Ataques conocidos**: [Ataque de exensión de longitud (a partir de su construcción)](https://en.wikipedia.org/wiki/Length_extension_attack),  [Ataques de Colisión](https://en.wikipedia.org/wiki/Collision_attack)

### SHA-1

SHA-1 es una función criptográfica creada el año 1995 y basada al igual que MD5 en una construcción Merkle-Damgård. Esta función produce un valor de salida 160 bits. El año 2011 fue deprecada por el NIST por problemas similares a los encontrados en MD5. Hoy en día, los ataques de prefijo elegido en SHA1 son prácticos. Más información y descripción de ataques en [Wikipedia](https://en.wikipedia.org/wiki/SHA-1). Al año actual (2021), es factible para una organización con hartos recursos económicos (cientos de miles de dólares) ejecutar un ataque de colisión de hashes.



### SHA-2

SHA-2 es una función criptográfica creada el año 2001 por la NSA. Usa la misma primitiva que MD5 y SHA-1 (Merkle-Damgård) pero posee seis variaciones distintas de largo de salida: SHA-224, SHA-256, SHA-384, SHA-512, SHA-512/224 y SHA-512-256. Al momento, no se conocen ataques prácticos a este hash. Más información se puede obtener en [Wikipedia](https://en.wikipedia.org/wiki/SHA-2).

### SHA-3

SHA-3 es una función criptográfica creada el año 2015 por el NIST. Es internamente diferente a las funciones ya mencionadas porque utiliza una [construcción de esponja](https://en.wikipedia.org/wiki/Sponge_function). Su existencia y estandarización permite que en caso que a futuro se encuentren problemas en la primitiva de SHA-2 (todavía considerada segura), exista una alternativa de uso de fácil modificación que no debiese ser afectada por este problema.

### Funciones de derivación de llaves (KDF)

Es una categoría de funciones de hash que deriva una o más llaves secretas a partir de una llave principal, usando una función pseudoaleatoria. Estas funciones suelen tener la característica de que sus valores de salida son lentos de verificar (del orden de segundos) debido a que la cantidad de veces que se ejecutan es configurable", lo que mitiga el riesgo de un ataque de fuerza bruta para detectar la preimagen de un valor dado. La capacidad de configurar las iteraciones también prepara a la función para el futuro, de forma de poder subir este número arbitrariamente a medida las capacidades de los computadores aumentan.

Otra medida de mitigación de estas funciones es que requieren para funcionar un valor extra no secreto denominado **salt**. El valor **salt** es aleatorio y se usa para la generación y verificación del hash con una función KDF. De esta forma, se limita el riesgo de amenazas tales como [rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table).

A continuación se mencionan algunas funciones de tipo KDF:

* [PBKDF1 y PBKDF2](https://en.wikipedia.org/wiki/PBKDF2)
* [Argon2](https://en.wikipedia.org/wiki/Argon2)