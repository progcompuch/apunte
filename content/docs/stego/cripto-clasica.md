---
title : "Criptografía Clásica"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "stego"
weight: 020

---

Los cifradores clásicos son aquellos que han tenido un uso histórico masivo, pero que hoy en día no se utilizan, en parte debido a lo fácil que resulta romperlos con ayuda de un computador.  Además, estos cifradores suelen trabajar solamente con letras del alfabeto inglés, lo que limita los tipos de mensajes que se pueden cifrar.

En general, al usar estos cifrados **se ignoran los espacios y signos de puntuación**, entregándose como mensaje cifrado un texto sin estos símbolos, los cuales generalmente se pueden recuperar interpretando el mensaje en texto plano.

## Cifradores de Sustitución

Corresponde a los cifradores en los que para cifrar mensajes, cada caracter de ellos es reemplazado por otro caracter según una función de sustitución específica, pero manteniendo su posición en el texto. Para descifrar los mensajes, basta con aplicar la función inversa a cada caracter.

### Cifrador César (Caesar Cipher)

![](../caesar.png)

En el cifrador César, la sustitución es definida por una llave $K$, equivalente a un número entre 1 y 26, o en su defecto, a una letra del alfabeto con el que se trabaja (el inglés). Para cifrar, es necesario interpretar cada letra como un número igual a la posición de esta en el abecedario. Luego, a este valor se le suma $K$ (o si $K$ es una letra, su posición en el abecedario). Si el valor de la suma es mayor a 26, se le resta 26 para obtener un número dentro del rango 1 y 26. Finalmente, este número es transformado en la letra del abecedario que se encuentra en esa posición.

El descifrado de un mensaje cifrado con César es similar a su cifrado, pero en vez de sumar se resta 26. Si el número resultante es menor a 1, se le suma 26 para obtener un número en el rango de entre 1 y 26.

#### Caso particular: ROT13

Existe un caso particular del cifrador César conocido como "ROT13", en el cual la llave es fija y de valor 13 (o "M"). Lo más útil de tener este valor como llave es que para el proceso de cifrado y descifrado se puede usar exactamente el mismo algoritmo. Dado que la llave es un valor fijo, se suele considerar más como una técnica de ofuscación que de cifrado, la cual es bastante popular por ejemplo en foros de discusión de internet para publicar _spoilers_.


#### Cómo romper Caesar

* **Fuerza bruta**: Calcular para cada llave posible el valor del texto descifrado con esa llave. Luego, seleccionar el valor de salida más coherente. Como son solo 26 llaves posibles, es fácil de realizar.

* **Análisis de frecuencias**: En todos los idiomas, [es posible encontrar una proporción estandar de frecuencias para cada letra del alfabeto](https://en.wikipedia.org/wiki/Letter_frequency). En el caso del inglés, la letra más repetida es la $E$. Por lo tanto, en el caso de textos largos, podemos revisar cuál es el caracter con más repeticiones y asumir que equivale a la E. Luego, calculamos la llave que necesitaríamos para convertir ese caracter en una E. Finalmente, probamos la llave candidata y revisamos la obtención de un mensaje coherente. Este análisis también puede considerar las frecuencias de otras letras para aumentar la confianza en el resultado.


Este gráfico muestra las frecuencias relativas de las 26 letras del abecedario inglés:
![](../letter_frequency.png)

#### Herramientas

* [DCode.fr](https://www.dcode.fr/caesar-cipher) tiene una utilidad para romper Caesar por fuerza bruta, el cual calcula probabilidad de éxito con un análisis de frecuencias.


### Cifrador Vigenère

En el caso del cifrador [Vigenère](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher), creado en el año 1553 pero roto recién en el año 1863, la sustitución se hace con llaves alfanuméricas de largo arbitrario, aunque generalmente menor al largo del texto completo. El algoritmo de cifrado es el siguiente:

* Definimos la función $ToPos(Z)$, que toma una letra del abecedario inglés $Z$ y la transforma en un número equivalente a su posición en él. 
  * Ejemplos: $ToPos("a") = 1$, $ToPos("n") = 19$, $ToPos("z") = 26$
* Definimos la función $ToChar(N)$, que toma un número $N$ entre 1 y 26, y devuelve la letra del abecedario inglés en esa posición.
  * Ejemplos: $ToChar(1) = "a"$, $ToChar(19) = "n"$, $ToChar(26) = "z"$
* Dada una llave $K$ de largo $n$ y un texto de largo $N$, para cada caracter $P[i]$ del texto plano P, obtenemos $C[i]$ de la siguiente forma:
  * Definimos $C[i]$ como $ToChar((ToPos(P[i]) + K_i) \mod 26) + 1$

Esto hace notar que Caesar es un caso particular de Vigenère con una llave de largo 1.

#### Cómo romper Vigenère

Las técnicas de Caesar no sirven directamente en el caso de Vigenere, dado que el universo de llaves posibles no está acotado, y que un análisis de frecuencias por sí solo no nos revelará mucha información. Sin embargo, existen técnicas un poco más sofisticadas que nos ayudarán a obtener el mensaje cifrado o la llave utilizada.

* [**Examinación de Kasiski**](https://en.wikipedia.org/wiki/Kasiski_examination): Técnica de criptoanálisis que permite determinar un subconjunto de posibles largos de llave. Posteriormente, es posible hacer un análisis de frecuencia independiente para cada caracter de la llave, considerando solamente los caracteres del mensaje cifrado que utilizaron ese caracter al cifrarse.
* **Eliminación de la llave**: En caso que se conozca parte del texto plano, es posible determinar la llave utilizada de forma bastante directa. Recomendamos ver la explicación de la [página en Wikipedia](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) del cifrador Vigenère (sección _Cryptanalysis / Key Elimination_).

#### Herramientas

* [DCode.fr](https://www.dcode.fr/vigenere-cipher) tiene una utilidad que permite romper Vigenère con varias técnicas, algunas de ellas mencionadas acá.

### Sustitución monoalfabética

La sustitución monoalfabética considera utilizar una permutación del alfabeto inglés ordenado, y mapear cada letra del alfabeto original a la letra en la misma posición de la permutación. El descifrado es simplemente ejecutar el mapeo opuesto al utilizado en el cifrado. En este caso, la llave correspondería a la permutación completa del alfabeto. Por ejemplo, teniendo la siguiente permutación para el alfabeto ordenado

```
Original:    ABCDEFGHIJKLMNOPQRSTUVWXYZ
Permutación: QWERTYUIOPASDFGHJKLZXCVBNM
```

La versión cifrada del mensaje `HOLA MUNDO` correspondería a `IGSQ DXFRG`.

#### Ataques a la sustitución monoalfabética

El ataque más efectivo contra la sustitución monoalfabética es el mismo análisis de frecuencias realizado en Caesar, para luego ir probando con la modificación de otras letras de modo de obtener un mensaje coherente.

#### Herramientas

* [DCode.fr](https://www.dcode.fr/monoalphabetic-substitution) tiene una herramienta interactiva para realizar sustitución monoalfabética, la cual configura el estado inicial de la sustitución usando análisis de frecuencia, pero permite modificar las sustituciones manualmente, viendo en tiempo real el resultado de ellas.

## Cifradores de Transposición

En los cifradores de transposición, el texto cifrado corresponde a una permutación de los caracteres del texto plano, la cual se "descifra" conociendo el orden deben leerse los caracteres para extraer la información cifrada. Hay harta información sobre algunos cifradores de transposición famosos en [Wikipedia](https://en.wikipedia.org/wiki/Transposition_cipher), así como también técnicas para resolverlos.

### Herramientas

DCode tiene herramientas para los siguientes cifradores de transposición:
* [Transposición por fila/columna](https://www.dcode.fr/transposition-cipher)
* [Transposición columnar](https://www.dcode.fr/columnar-transposition-cipher)
* [Transposición Doble](https://www.dcode.fr/double-transposition-cipher)


 