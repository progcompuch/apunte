---
title : "Conceptos Básicos"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "stego"
weight: 015

---

En términos generales, para poder comunicar un valor entre un emisor y un receptor, es necesario que ambas partes se comuniquen mediante un lenguaje en común. En el caso de computadores, esta información se encuentra "codificada" en algún formato. Hay formatos y representaciones de datos comunes y estandarizadas, mientras que hay otras más esotéricas. 

## Codificaciones

En los computadores que usamos todos los días, la mínima unidad de información posible de guardar es un **Bit**. La costumbre indica que ocho bits forman un **Byte** (B) u octeto. Además, 1024 bytes son un **Kibibyte** (KiB), 1024 kibibytes son un **mebibyte** (MiB), 1024 mebibytes son un **gibibyte** (GiB)

La información de un byte se puede suele de alguna de las formas siguientes:

### Binario

Con 8 dígitos entre 0 y 1 es posible representar cualquier byte en base binaria. Asumiendo que las cifras menos significativas están a la derecha, un número en representación binaria tendría la siguiente estructura:

```
2⁷ 2⁶ 2⁵ 2⁴ 2³ 2² 2¹ 2⁰
S  T  U  V  W  X  Y  Z
```

Recordando que las variables $[S..Z]$ corresponden a un valor en $[0..1]$, el número de arriba equivale al resultado de la fórmula $S2⁷ + T2⁶ + U2⁵ + V2⁴ + W2³ + X2² + Y2¹ + Z2⁰$

### Octal

Similar al caso anterior, pero ahora son 3 dígitos con valores entre $[0..7]$:

```
8² 8¹ 8⁰
X  Y  Z
```

El número anterior es igual a $X8² + Y8¹ + Z8⁰$.

### Hexadecimal

En este caso, cada dígito representa un número entre el $0$ y el $15$. Los dígitos asignados a los valores $10, 11, 12, 13, 14, 15$ son simbolizados con las letras $A, B, C, D, E, F$ respectivamente:

```
16¹ 16⁰
Y   Z
```

El número anterior es igual a $Y16¹ + Z16⁰$.


### Múltiples bytes

Para representar múltiples bytes seguidos en una codificación de las anteriores, basta con concatenarlos uno luego del otro, ya sea con un separador específico (espacio, coma, etc) o sin usar separadores, aprovechándose que el largo de cada byte en dígitos es constante en cada caso (8 en bytes, 3 en octal, 2 en hexadecimal).

### Codificaciones de texto

Para que la comunicación entre ambas partes tenga sentido, es necesario establecer un estándar de cómo representar cada símbolo que se desea utilizar. En CTFs y por simplicidad, el estándar que se suele utilizar es ASCII, en el cual cada caracter se define en 7 bits (aunque se sigue guardando en un número de 8 bits):

![](https://www.asciitable.com/index/asciifull.gif)

Con lo anterior, es posible representar una gran cantidad de textos en inglés. Sin embargo, a veces se requieren caracteres extendidos, para lo cual se usa otra codificación denominada ISO-8859-1. Esta usa los 8 bits del byte y permite escribir en otros lenguajes, como por ejemplo, español.

![](https://www.asciitable.com/index/extend.gif)


### Textos Escapados

En algunas ocasiones, introducir un texto "tal cual" como lo usamos generalmente suele traer problemas, en especial porque algunos caracteres pueden encontrarse reservados en el contexto en el que queremos usarlos. A continuación mostramos algunas formas comunes de "escapar textos".

* **Percent-Encoding**: También conocido como [codificación de URLs](https://en.wikipedia.org/wiki/Percent-encoding#Percent-encoding_reserved_characters), codifica algunos caracteres "reservados" de las URL con su representación binaria en ASCII, precedida de un signo "%". Esta es la razón por la que cuando una URL tiene un espacio, suele transformarse en '%20' (el código hexadecimal del caracter espacio es 0x20). Para ver los casos en los que esto ocurre, revisar el link enlazado en este párrafo.

* **Binario en JSON**: Cuando un campo de texto en JSON contiene datos no representables con un caracter, se suelen codificar con la cadena de texto `/uWXYZ`, donde W, X, Y y Z son caracteres hexadecimales, los cuales representan la codificación de un caracter [UTF-8](https://www.ietf.org/rfc/rfc4627.txt).

### Codificaciones de texto a binario

Cuando queremos transmitir datos arbitrarios (generalmente binarios) por un medio que solamente acepta una cantidad limitada de caracteres, se suele usar alguna de las siguientes codificaciones:

* [**Base64**](https://en.wikipedia.org/wiki/Base64): Codifica bytes arbitrarios utilizando solo los caracteres ${A..Z,a..z,0..9,+,/,=}$ (el signo = solo al final, usado como padding.). Se suele utilizar para codificar archivos binarios en la web (imágenes y PDF, por ejemplo). Se representa cada conjunto de 6 bits ($2^6 = 64$) con un caracter del alfabeto de Base64. También existen versiones URL-Friendly, donde se reemplaza el + y el / por - y _, respectivamente.
* [**Base32**](https://en.wikipedia.org/wiki/Base32): Mismo concepto que Base64, pero con menos caracteres, por lo que cada caracter codifica 5 bits solamente. El alfabeto completo es ${A..Z,2..7}$, con la posibilidad de usar = como padding al igual que en base64. También existen versiones con otros alfabetos, de las cuales varias se detallan en el enlace respectivo.
* [**Base58 y otras**](https://en.wikipedia.org/wiki/Binary-to-text_encoding#Base58): Base58 es muy parecido a Base64, pero sin los caracteres ${+,/,0,I,O,L}$. Usado fundamentalmente como codificación de direcciones públicas en Bitcoin. El enlace menciona otras codificaciones conocidas de texto a binario.


## Codificación en Lenguajes de Programación Esotéricos (Esolangs)

En algunos CTF se codifican mensajes utilizando [**lenguajes de programación esotéricos** (esolangs)](https://en.wikipedia.org/wiki/Esoteric_programming_language). A continuación mencionamos algunos conocidos:

* [**Brainf*ck**](https://en.wikipedia.org/wiki/Brainfuck): Lenguaje de programación minimalista que tiene solamente 8 comandos, representados por 8 caracteres: $[+;-;[;];>;<;.;,]$. En caso de ver un texto con esos símbolos, puede ser necesario correrlo con un intérprete del lenguaje, como [este](https://franklin.dyer.me/htmlpage/brainfuck.html). Otro enlace útil es [este](https://fatiherikli.github.io/brainfuck-visualizer/), el cual muestra paso a paso la interpretación de un programa en Brainf*ck.

* [**Piet**](https://www.bertnase.de/npiet/): Lenguaje de programación cuyos archivos interpretables son imágenes
* [**Whitespace**](https://naokikp.github.io/wsi/whitespace.html): El intérprete considera solamente los simbolos espacio, tab y enter en un archivo de texto, lo que es bastante útil para esconder programas dentro de un archivo aparentemente inofensivo.
* [**EmojiCode**](https://www.emojicode.org/): Un lenguaje de programación donde todas las instrucciones y keywords corresponden a emojis.

### Ofuscación de código

En otros casos, el CTF puede requerir desofuscar una línea de código, para lo cual se usan características propias de cada lenguaje para dificultar entender qué es lo que se está ejecutando, lo que afecta tanto a personas como a programas que detectan scripts maliciosos. A continuación mostramos algunos programas que ayudan a ofuscar código:

  * [Bashfuscator (Bash)](https://github.com/Bashfuscator/Bashfuscator)
  * [Invoke-Obfuscation (Powershell)](https://github.com/danielbohannon/Invoke-Obfuscation)
  * [obfuscator.io (Javascript)](https://www.obfuscator.io/)

Así como existen ofuscadores, también hay utilidades que permiten desofuscar código:

  * [de4js (Javascript)](https://lelinhtinh.github.io/de4js/) 
  * [jsnice](https://jsnice.org)

En otros casos más complejos, puede convenir usar un depurador de código e ir analizando lo que produce el script línea por línea.


## Algunas Codificaciones "esotéricas"

Hay una cantidad innumerable de formas de codificar datos en uso actualmente, muchas de las cuales pertenecen a nichos determinados. A continuación mencionamos unas pocas, solo para ejemplificar la variedad que se suele utilizar en problemas de CTF.

* [**DTMF**](https://en.wikipedia.org/wiki/Dual-tone_multi-frequency_signaling): Siglas de _Dual-tone Multi-frequency Signaling_, es el sistema de señales que usan los teléfonos fijos hasta el día de hoy. Se basa en la asignación de un tono específico a cada fila y columna de una matriz de 4x4, en la cual se colocan los números de marcado de estos teléfonos. Para determinar cuál es la tecla que se presiona, se calcula la fila y la columna del sonido que esta emite según su tono. A continuación, se muestra la matriz para calcular estos valores.

![](../dtmf.jpg)

* [**Numerales Cistercios**](https://en.wikipedia.org/wiki/Cistercian_numerals): Popularizados por un libro de difusión científica del 2001 titulado ["Las cifras de los Monjes"](https://en.wikipedia.org/wiki/The_Ciphers_of_the_Monks) y escrito por David A. King, corresponden a una forma de escribir números de entre el 0 y el 9999 con un solo glifo. La siguiente imagen (creada por el usuario de Wikipedia [Meteoorkip](https://commons.wikimedia.org/w/index.php?title=User:Meteoorkip&action=edit&redlink=1)) muestra como formar números con esta codificación, tomando una componente de cada fila para formar el valor de 4 dígitos decimales.

![Imagen por Meteoorkip en Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/6/67/Cistercian_digits_%28vertical%29.svg)

* [**Código morse**](): El código morse fue inventado por Samuel Morse como codificación para su uso en el Telégrafo, otro invento de la misma persona. Este código consiste en la codificación de letras en 3 diferentes señales: puntos (tonos cortos), rayas (tonos largos) y pausas (tiempo sin tonos). A continuación se muestran las codificaciones para cada letra.

![](../morse_code.svg)

## Herramientas para transformar codificaciones

A continuación se enumeran algunas herramientas útiles para decodificar algunas codificaciones conocidas. Su uso se verá a lo largo del ramo.

* [Cyberchef](https://gchq.github.io/CyberChef/)
* [Dcode](https://www.dcode.fr/en)
* [Cryptii](https://cryptii.com/)
