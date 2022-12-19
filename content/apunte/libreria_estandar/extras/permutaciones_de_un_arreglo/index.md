---
title: "Permutaciones de un vector"
type: docs
menu:
    apunte:
        identifier: "apunte-libreria_estandar-extras-permutaciones_de_un_arreglo"
        parent: "apunte-libreria_estandar-extras"
weight: 10 # El menú lateral ordena artículos por su peso
---
## Código
A veces necesitamos iterar por todas las permutaciones de un vector `A`. Una forma típica de programar algoritmos de fuerza bruta como este es con recursión (backtracking), pero con la función `next_permutation` de la librería estándar podemos escribirlo más simple:
```cpp
vector <Tipo> A;
// ...imaginemos que A tiene elementos
sort(A.begin(), A.end());
do{
    // procesamos la permutación actual
} while(next_permutation(A.begin(), A.end())); // avanzamos a la siguiente permutación
```

## Explicación
Diremos que una permutación es menor o mayor que otra si es lexicográficamente menor o mayor, respectivamente.
* Primero ordenamos `A`, de forma que corresponda a la menor permutación.
* En el ciclo procesamos cada permutación. La función `next_permutation` convierte `A` en la permutación que le sigue lexicográficamente, y retorna
falso si no tiene una permutación mayor, es decir, cuando `A` es la mayor permutación de todas. Por esto empezamos con la menor (la ordenada).

Si tenemos $n$ elementos distintos, la complejidad es $O(n \log n + n \cdot n!)$, pues hay $n!$ permutaciones y `next_permutation` toma tiempo lineal, y el $n \log n$ es por el `sort`. Si se repiten elementos podría ser un poco más rápido, ya que hay menos permutaciones posibles.

## Problemas para practicar
* [CSES 1622 - Creating Strings](https://cses.fi/problemset/task/1622)