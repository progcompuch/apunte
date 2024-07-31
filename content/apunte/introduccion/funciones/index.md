---
title: "Funciones"
type: docs
menu:
    apunte:
        identifier: "apunte-introduccion-funciones"
        parent: "apunte-introduccion"
weight: 30 # El menú lateral ordena artículos por su peso
---
Las funciones permiten organizar de mejor manera el código, haciendolo más legible y limpio, lo que facilita el debugging, además algunos algoritmos son más fáciles al pensarlos en funciones como el backtracking.

## Creando funciones

Para crear una función se escribe su nombre seguido por párentesis, después se abren llaves `{}` donde se define el cuerpo de la función:

```c++
void unaFuncion() {
  // Cuerpo de la función
  cout << "Se llamó esta función!\n";
}
```

Luego la función puede ser llamada usando su nombre: `unaFuncion()`.

Al ser llamada la función ejecutará su cuerpo hasta terminar o hasta encontrar la instrucción `return`, por ejemplo, en el siguiente código el segundo `cout` jamás se ejecuta:

```c++
#include <iostream>
using namespace std;

void imprimir() {
  cout << "primer cout\n";
  return;
  cout << "segundo cout\n"; // este cout nunca se ejecuta
}

int main() {
  imprimir();
  return 0;
}
```

## Parámetros
Dentro de los párentesis que siguen al nombre de la función se pueden declarar los parámetros separados por comas, al igual que las variables estos deben ir con su tipo:
```c++
void imprimirSuma(int a, int b) {
    cout << a + b << '\n';
}
```

Luego se puede llamar la función pasando sus argumentos, por ej. `imprimirSuma(5,6)`.

Los parámetros pueden tener valores por defecto, al hacerlo se convierten en parámetros opcionales, la sintáxis es igual a inicializar una variable:
```c++
#include <iostream>
#include <string>
using namespace std;

void saludar(string nombre, string saludo = "Hola,") { // el segundo parámetro es opcional
  cout << saludo << ' ' << nombre << '\n';
}

int main() {
  saludar("Diego Salas");
  saludar("", "Ohayou,");
  return 0;
}
```
<!-- Falta nombre con lore -->

Los parámetros opcionales siempre deben definirse después de todos los parámetros obligatorios.

## Valor de retorno
Para que la función retorne un valor, el tipo de este se declara antes del nombre de la misma, luego usando `return` la función devuelve un valor. Por ejemplo, la siguiente función toma 2 enteros y retona su división con decimales:
```c++
float divisionNormal(int num1, int num2) {
    return (float) num1 / (float) num2;
}
```
{{< alert icon="💡" text="En C++ la división entre enteros es entera (truncada a la unidad), para obtener decimales se deben usar floats o transformar (<i>castear</i>) los operandos a float." />}}

Si la función no debe retornar nada se utiliza la keyword `void` en vez del tipo de retorno.

## Parámetros por Referencia
Hasta ahora hemos pasado los parámetros de las funciones por copia, esto significa que cualquier modificación que se realize a los parámetros no afecta a los valores originales con los que llamó a la función. Esto produce comportamientos como el siguiente:
```c++
#include <iostream>
using namespace std;

void funcion(int a) {
  a = 5;
}

int main() {
  int b = 2;
  funcion(b);
  cout << b << '\n'; // imprime 2
}
```

Para lograr lo contrario, los parámetros se pueden pasar por referencia añadiendo `&` antes de su nombre <code><i>tipo</i> &<i>nombre</i></code>, esto permite modificar el valor original que se usó en la llamada a la función. Repitiendo el ejemplo anterior, pero ahora pasando $a$ por referencia, se puede ver que el valor original pasado a la función $b$ se ve modificado:
```c++
#include <iostream>
using namespace std;

void funcion(int &a) {
  a = 5;
}

int main() {
  int b = 2;
  funcion(b);
  cout << b << '\n'; // imprime 5
}
```

{{< alert icon="💡" text="No confundir <b>&</b> en la declaración de una variable o parámetro con el operador de dirección <b>&</b>" />}}

Esta técnica también es útil cuando se quiere pasar a una función estructuras muy grandes, esto ya que pasarlos por copia se puede volver lento, normalmente la operación copia es a lo menos O(n), donde n es la cantidad de datos de la estructura, en cambio pasar por referencia es siempre O(1).

## Recursividad
Una función puede llamarse a sí misma, al hacerlo se dice recursiva, de una forma similar a una definición matemática por recurrencia, por ejemplo con la sucesión de Fibonacci:
```c++
int fibonacci(int n) {
  if (n <= 0) { // Caso base
    return 0;
  } else if (n == 1) { // Case base
    return 1;
  } else { // Caso recurrente
    return fibonacci(n-1) + fibonacci(n-2);
  }
}
```
Esta definición de la sucesión de Fibonacci no es la más óptima, una mejor versión se discutirá más adelante.

Aunque los jueces utilizan opciones que permiten muchas llamadas recursivas, esto no es necesariamente cierto si pruebas un programa recursivo en tú máquina local, donde sin cambiar las configuraciones unas $10^6$ llamadas podrían comenzar a dar problemas. Además hacer recursión es más lento que hacer ciclos, por lo que puede resultar conveniente pasar la recursión a ciclos, el ejemplo de Fibonacci se puede hacer así:
```c++
int fibonacci(int n) {
  int anterior1 = 0, anterior2 = 1, suma = 0;
  for (int i = 0; i < n;  ++i) {
    suma = anterior1 + anterior2;
    anterior2 = anterior1;
    anterior1 = suma;
  }
  return suma;
}
```

## Lambdas
Desde C++11 se pueden definir lambdas, o funciones sin nombre, y como implementar rápido los algoritmos es importante en programación competitiva, usarlas en funciones como `min`, `max` y `sort` resulta útil.

Su sintáxis es <code>[<i>capturas</i>] (<i>parámetros</i>) {<i>cuerpo</i>}</code>, dentro de los corchetes van las capturas, por simplicidad solo utilizaremos `[&]`, esto porque la captura `&` hace que la lambda se comporte igual a las lambdas de la mayoría de lenguajes (como Python y JavaScript). La lista de parámetros y cuerpo son idénticos a los de una función normal, un ejemplo:
```c++
#include <iostream>
using namespace std;

int main() {
  auto lambdaSuma = [&] (int a, int b) { return a + b; };
  cout << lambdaSuma(5, 6) << '\n';
  return 0;
}
```
{{< alert icon="👉" text="Las lambdas no necesitan llevar su tipo de retorno, ya que el compilador lo deduce de los <code>return</code>." />}}

## Función `main` y el Flujo del Programa
Como ya habrán visto, la función `main` es el punto de partida de los programas en C++. Esta función retorna un `int`, cuyo valor es el código de termino del programa y cualquier valor distinto de `0` se considera un código de error.

Algunos jueces esperan que el programa termine con código `0` (_sin error_), por ello es importante agregar `return 0;` al final de `main`, lo mismo aplica si se termina tempranamente la ejecución del programa, como con la función `exit`:

```c++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n == 0) {
        cout << "Caso borde, no es necesario ejecutar lo que sige\n";
        exit(0); // terminamos temprano con código 0
    }
    /* Resto del algoritmo */
    return 0;
}
```
