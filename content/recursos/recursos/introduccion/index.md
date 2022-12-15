---
title: "Introducción"
type: docs
menu:
    recursos:
        identifier: "recursos-recursos-introduccion"
        parent: "recursos-recursos"
weight: 1 # El menú lateral ordena artículos por su peso
---
En este sitio encontrarás información general y también consejos para introducirse y practicar en la programación competitiva.

## ¿Qué es la programación competitiva?

La programación competitiva es un deporte mental, donde las personas que participan tratan de resolver la mayor cantidad de problemas de computación en el menor tiempo posible bajo ciertas restricciones en un lapso de tiempo.

En general, la resolución de uno de estos problemas consiste en dos etapas:
1. Diseño de una solución: Leer el enunciado, entenderlo y pensar un algoritmo que sea correcto (entregue una respuesta correcta al problema) y también eficiente (sea lo suficientemente rápido para superar las restricciones de tiempo).
2. Implementación: Programar la solución de la forma más rápida posible.

Existen problemas donde la primera etapa es más difícil y otros donde la segunda es más difícil. Podemos clasificar los problemas en distintos tópicos, algunos de los más importantes son:
- Implementación
- Fuerza bruta
- Programación dinámica
- Búsqueda binaria
- Matemáticas
- Grafos
- Strings
- Geometría

Algunas competencias, como la ICPC, se realizan en equipos de 3 personas donde solo hay un computador disponible para el equipo. Acá, los equipos deben ser estratégicos para optimizar el tiempo en el computador. Es decir, que siempre haya alguien programando una solución mientras el resto le ayuda o piensa en soluciones para otros problemas.

## Problema de ejemplo
### Enunciado
```
Tiempo límite: 1 segundo
Memoria límite: 32 MB
```

Tienes $n$ pelotas enumeradas $1, 2, \dots, n$, y la pelota $i$ tiene color $C_i$. Tienes bolsas de capacidad infinita, pero en la misma bolsa no pueden haber pelotas de colores distintos. ¿Cuál es la mínima cantidad de bolsas necesarias para guardar todas las pelotas?

**Formato de entrada (input):**
La entrada consiste en dos líneas:
* La primera tiene el número entero $n$ $(1 \leq n \leq 10^6)$, indicando la cantidad de pelotas.
* La segunda tiene $n$ números enteros $C_1, C_2, \dots, C_n$ $(1 \leq C_i \leq 10^9)$ separados por espacios, indicando el color de cada pelota.

**Formato de salida (output):**
Tu programa debe imprimir un solo número entero: la mínima cantidad de bolsas necesarias para guardar todas las pelotas.

**Entrada de ejemplo:**
```
8
2 5 2 2 3 5 1 9
```
**Respuesta correcta:**
```
5
```

### Solución
Como queremos minimizar las bolsas, si una bolsa tiene un color nos conviene que tenga todas las pelotas de ese color. Así, cada color es una bolsa, y la respuesta es la cantidad de colores distintos.

Es decir, este problema equivale a contar la cantidad de números distintos en un arreglo. Acá surgen varias preguntas:
- ¿Cómo diseñamos y programamos un algoritmo que cuente la cantidad de números distintos en un arreglo?
- ¿Cómo sabemos si el algoritmo es eficiente? Usualmente los problemas tienen un tiempo límite de un segundo, ¿cómo sabemos si el programa, para las restricciones de $n$ y los $C_i$, termina en menos de un segundo?

## Juez y veredictos
Para saber la correctitud de tu solución, existe el juez. El juez es un programa que conoce un montón de casos de prueba secretos y sus respuestas correctas, y ejecuta tu código con cada uno de ellos. Con esto, se genera un veredicto:
- **Accepted (AC):** Significa que el programa imprimió una respuesta correcta en todos los casos de prueba.
- **Wrong answer (WA):** La solución imprimió una respuesta incorrecta en algún caso.
- **Time limit exceeded (TLE):** El programa superó el tiempo límite de ejecución en algún caso de prueba.
- **Memory limite exceeded (MLE):** El programa superó la memoria límite en algún caso de prueba.
- **Compilation error:** El programa no compila.
- Existen otros veredictos, pero puede depender de cada juez. Los mencionados anteriormente son los más comunes y muy rara vez se ven otros.

Generalmente, solo se puede tener un veredicto al mismo tiempo. Es decir, si para un caso se imprime la respuesta incorrecta, no se chequeará la solución con el resto de los casos y el juez retornará `Wrong Answer`, independiente de que tal vez otro caso podría dar `Time Limit Exceeded`.