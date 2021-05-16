---
title: Introducción a la Programación
lead: ''
date: 2021-05-15T14:00:45.000+00:00
images: []
weight: "24"
menu:
  docs:
    parent: intro
    weight: 1

---
En esta sección se explican todos los conceptos previos necesarios para empezar a resolver problemas de programación. Sientete libre de omitir esta parte si sabes como funciona la programación o has tenido experiencia programado antes.

## Conceptos Básicos

La programación está definida a partir de pequeños bloques de código, una serie de instrucciones que se ejecutan una detrás de la otra. La manera en que se ejecutan estas instrucciones se define como un "_algoritmo_", lo que nos describe la forma en que se resuelve un problema, es decir la lógica que se utilizó para resolver el problema, pero no necesariamente de su implementación. Mientras que la lógica tras la resolución de un problema puede ser la misma, no necesariamente va a estar implementada de la misma manera, esa es la diferencia con el "_programa_" es decir, el código ya escrito, listo para ser interpretado, pues mientras que pueden representar el mismo algoritmo, el código puede estar escrito en lenguajes de programación distinto (tales como c++, kotlin o python) o usar una cantidad de valores distintos.

A la hora de programar, debemos crear una serie de instrucciones, las cuales deben usar cierta información dada para obtener un resultado (al que llamamos input), por ejemplo, si queremos calcular el perimetro de un cuadrado tenemos que multiplicar por 4 el lado de un cuadrado: en este caso el "input" de nuestro programa será el largo de un lado del cuadrado, tenemos que multiplicar por 4 y luego entregar dicho resultado (es decir, el "output"). 

Aquí identificamos tres instrucciones: leer un número, multiplicarlo por 4, y entregar el perímetro. Aquellos valores que cambian, como en este caso lo es el lado del cuadrado, serán nuestras *variables*, valores que el programa almacena en un espacio definido y que tienen un nombre asociado. A esta le podemos poner "lado", para que así retornemos 4*lado, por ejemplo. Estas variables tienen distintos tipos, y se comportan diferente en cada lenguaje de programación, pero en este caso describiremos los principalmente usados en programación competitiva en c++.

### Tipos de variables

* **Números**: Tenemos distintos tipos de números, los cuales cumplen funciones distintas. Hay que tener ojo con que pertenezcan al rango correspondiente, ya que en caso de superar uno de estos límites se genera un "overflow", o "underflow", lo que distorsiona el número y no nos da el valor deseado. Tenemos 3 tipos básicos:
  * *int*: Se usa para enteros (_integers_ en inglés) y cubren valores entre -2,147,483,648 y 2,147,483,647 (correspondiendo al 2<sup>31</sup>-1). Como regla general, se usa para valores entre el -2\*10<sup>10</sup> y 2\*10<sup>10</sup>. Tienen la desventaja de no poder almacenar valores decimales pero son útiles en la mayoría de las situaciones. La operación de estos siempre te dará resultado entero, por lo que hay que tener ojo con la division entera (3/2 = 1 bajo esta lógica).
  * *long long int*: Usualmente conocido simplemente como "_long long_", se usa en caso de que necesites un rango mayor que el int, el rango es de –9, 223, 372, 036, 854, 775, 808 a 9, 223, 372, 036, 854, 775, 807. Esto nos permite trabajar con números entre -10<sup>18</sup> y 10<sup>18</sup>.
  * *float*: Este tipo se usa para trabajar números con decimales. Por las limitaciones de la memoria este número contiene un valor aproximado hasta cierto decimal, pero no tiende a importar tanto pues generalmente se usa para calculos numericos no tan precisos, considerando el rango de decimales.
  
* **Cadenas**: Se usan para registrar "palabras" o "caracteres". Puede incluir letras, números y simbolos, por lo que hay que tener cuidado a la hora de manipular números como variables de este tipo, pues no se comportan igual (no es lo mismo el número 2 que el caracter "2", podemos sumar números pero no caracteres). En esta categoría tenemos dos tipos:
  * *char*: La unidad mínima, almacenando un único caracter. Ej: "h", "2", "o", etc.
  * *string*: El tipo más usado de las cadenas, es un arreglo (es decir, una serie ordenada) de "char"s, con lo que puedes procesar varios caracteres seguidos. Ej: "hola", "c++", "123", "h0l4", etc.

* **Booleanos**: Es el tipo más pequeño, almacenando dos posibles valores, "_True_" (para verdadero) y "_False_" (para falso). Se guarda para registrar si cierta condición se cumple.
