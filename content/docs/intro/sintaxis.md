---
title: Sintaxis, Variables, Tipos y Ciclos
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 101
menu:
  docs:
    parent: intro

---

Ahora que tienes las herramientas para programar, podemos empezar a entender las partes de un programa en C++. En esta sección se explican todos los conceptos previos necesarios para empezar a resolver problemas de programación, sientete libre de omitir esta parte si sabes como funciona la programación o has tenido experiencia programando antes.

## Sintaxis

Tal como en otros lenguajes de programación (como c, kotlin o python) vamos a identificar las instrucciones de nuestro código a partir de la manera en que están agrupadas las líneas de código. En python se agrupan según la indentación, es decir, si una serie de líneas están con la misma indentación es porque comparten nivel de prioridad. En el caso de C++ estos bloques se agruparán a partir del uso de corchetes ("{}").

<!-- imagen bonita -->

Las instrucciones de C++ se delimitan marcando el final con un punto y coma (";"), a diferencia de python donde bastaba hacer un salto de línea; esto significa que c++ ignora los saltos de línea, por lo que técnicamente podrías escribir varias instrucciones en una sola línea.

<!-- imagen bonita -->

En C++, a diferencia de python, debes especificar entre parentesis las condiciones de valor que usarás en tus "if"s y "while"s.

<!-- imagen bonita -->

Al principio puede que no sea tan intuitivo la sintaxis, ¡pero con la práctica no olvidarás poner tus punto y coma! Para comenzar a trabajar con C++ manipularemos distintos formatos de variables ¡y no todos se comportan de la misma manera! 

## Tipos de variables

### Númericos
Tenemos distintos tipos de números, los cuales cumplen funciones distintas. Hay que tener ojo con que pertenezcan al rango correspondiente, ya que en caso de superar uno de estos límites se genera un "overflow", o "underflow", lo que distorsiona el número y no nos da el valor deseado. Tenemos 3 tipos básicos:
  * *int*: Se usa para enteros (_integers_ en inglés) y cubren valores entre -2,147,483,648 y 2,147,483,647 (correspondiendo al 2<sup>31</sup>-1). Como regla general, se usa para valores entre el -2\*10<sup>10</sup> y 2\*10<sup>10</sup>. Tienen la desventaja de no poder almacenar valores decimales pero son útiles en la mayoría de las situaciones. La operación de estos siempre te dará resultado entero, por lo que hay que tener ojo con la division entera (3/2 = 1 bajo esta lógica).
  * *long long int*: Usualmente conocido simplemente como "_long long_", se usa en caso de que necesites un rango mayor que el int, el rango es de –9,223,372,036,854,775,808 a 9,223,372,036,854,775,807. Esto nos permite trabajar con números entre aproximadamente -10<sup>18</sup> y 10<sup>18</sup>.
  * *float*: Este tipo se usa para trabajar números con decimales. Por las limitaciones de la memoria este número contiene un valor aproximado hasta cierto decimal, pero no tiende a importar tanto pues generalmente se usa para calculos numericos no tan precisos, considerando el rango de decimales. Es importante mencionar que __en general no se usa mucho float, pues se usa las variables "double"__, que es un número decimal más preciso, y la precisión tiende a ser más relevante cuando necesitas usar decimales en programación competitiva.

### Cadenas
Se usan para registrar "palabras" o "caracteres". Puede incluir letras, números y simbolos, por lo que hay que tener cuidado a la hora de manipular números como variables de este tipo, pues no se comportan igual (no es lo mismo el número 2 que el caracter "2", podemos sumar números pero no caracteres). En esta categoría tenemos dos tipos:
  * *char*: La unidad mínima, almacenando un único caracter. Ej: "h", "2", "o", etc.
  * *string*: El tipo más usado de las cadenas, es un arreglo (es decir, una serie ordenada) de "char"s, con lo que puedes procesar varios caracteres seguidos. Para poder concatenar estas strings, es decir, pegar una al lado de la otra, podemos usar el operador '+'. Ejemplos de strings serían: "hola", "c++", "123", "h0l4", etc.
Es relevante destacar que para distingir entre estos dos tipos la notación en C++ es encerrar el caracter usando la comilla simple (') y rodear la string usando las comillas dobles ("), por lo que no sería equivalente escribir la string "i" que el caracter 'i'.

### Booleanos
Es el tipo más pequeño, almacenando dos posibles valores, `true` (para verdadero) y `False` (para falso). Se guarda para registrar si cierta condición se cumple.

## Haciendo un programa

Lo primero que se ejecuta en un archivo cpp será una función a la que llamamos "main" (que es necesaria para que el programa funcione) cuya notación es:

```c++
int main(){

}
```

Todo lo que esté dentro de los corchetes se irá ejecutanto línea por línea. Para que este programa imprima algo en pantalla, podemos usar el termino "std::cout", y para ingresarle un valor usamos los simbolos "<<", como un flujo de derecha a izquierda. Por ejemplo, en el caso de que quisieramos hacer un clásico "Hola mundo" haríamos:

```c++
int main(){
	std::cout << "Hola Mundo\n";
}
```

Notemos que el flujo sigue el sentido del operador, y no funcionaría si se escribe en dirección contraria. Tambien podemos notar que al final de la string hay un "\n" que indica al programa el final de la línea a imprimir. Por último colocamos ";" para que nuestra máquina entienda ese caracter como el fin de la instrucción, es decir, esto acompaña a cada línea en el programa.

Ahora, podemos intentar "hacer funcionar" este código, es decir, correr el programa. Para esto, necesitamos compilar este código, pues c++ es un lenguaje compilado, lo que quiere decir que para que un programa funcione tenemos que pasar las líneas escritas de manera legible para un humano a líneas que un computador pueda entender y ejecutar.

Este paso de compilación dependerá mucho de las herramientas que uses, y como se haga dependerá tanto del sistema operativo que usas como de los programas que estás usando. Por ejemplo, si lo haces con las herramientas más basicas estarías usando una terminal abierta en la misma carpeta donde se encuentre tu archivo .cpp, y ejecutando "g++ miPrograma.cpp".

Intentar compilar el programa descrito anteriormente fallará pues no reconocerá el termino "cout"; necesita aprender a usarlo, y para esto escribimos antes del programa:
```c++
#include <iostream>
```

Que hace cargar una serie de instrucciones que permiten el paso de entrada y salida de información al programa (Input-Output STREAM). Nuestro programa quedará así:

```c++
#include <iostream>
int main(){
	std::cout << "Hola Mundo\n";
}
```

y al compilar nos creará un archivo ejecutable llamado "a.out", si usas el comando descrito anteriormente. Al ejecutarlo nos debería imprimir el string "Hola mundo" antes de quedar a la espera de más instrucciones.

Podemos notar que el termino "cout" viene acompañado de un prefijo "std::", el cual nos dice que tal instrucción origina de la librería estandar que importamos con el <iostream>. Esto se debe a que habiendo muchas librerías que incluir en nuestro código, queremos evitar la confusión entre funciones que provengan de diferentes librerías pero con el mismo nombre, es por esto que se le incluye una especie de "apellido" que lo permite distinguir a partir de su fuente original. Ahora, para evitar estar escribiendo "std" cada vez que queramos imprimir algo (que ocurre bastante seguido en la programación competitiva) vamos a incluir una línea adicional en nuestro programa, el cual le dirá a la computadora el origen de "cout":

```c++
using namespace std;
```

Ahora podremos escribir "cout" en remplazo de "std::cout" sin problemas. Podemos escribir múltiples líneas... o incluso darle más valores en una misma línea, algo como esto:
```c++
#include <iostream>
using namespace std;

int main(){
	cout << "Hola Mundo\n";
	cout << "Este es mi primer código en c++. " << "¿No es genial?\n";
	cout << "Así es, mi código número " << 1 << "\n";
}
```
Notemos que un mismo cout puede recibir multiples strings, y estas van a seguir el flujo que indiquen los símbolos "<<", imprimiendo una línea tras otra, por lo que es importante notar que si necesito un espacio entre dos valores a imprimir, como es el caso al final de algunas de las nuevas líneas, caso contrario concatenaría cada string una al lado de la otra. En el ejemplo también se muestra el uso de números, el cual la máquina interpreta antes de imprimir por lo que no tiene problemas a la hora de mezclar con las strings.

Ahora veremos que si queremos leer información desde la terminal (como input del programa) tenemos que usar "cin", para lo cual debemos declarar las variables antes de recibirlas, y les asignamos su valor con esta línea, por ejemplo:

```c++
#include <iostream>
using namespace std;

int main(){
	int a;
	cin >> a;
	cout << "Hola! Me acabas de dar el número " << a << "\n";
}
```

## Operaciones aritmeticas

Otra cosa que puedes hacer en c++, tan como en los otros lenguajes de programación, es realizar operaciones aritmeticas. Podemos pedirles cálculos tales como sumas, restas, multiplicaciones y divisiones. Entonces, si tuvieramos un programa como:
```c++
#include <iostream>
using namespace std;

int main(){
	cout << 1+1 << "\n";
	cout << 3*3 << "\n";
	cout << 4/2 << "\n";
}
```
entonces nuestra máquina calcularía el resultado de la operación y luego entregaría una en cada línea. Un detalle a observar es que la separación se produce debido al uso de salto de líneas, no porque estas instrucciones estén en líneas distintas, por ejemplo podríamos escribir las mismas instrucciones en una sola línea, obteniendo el mismo resultado:
```c++
#include <iostream>
using namespace std;

int main(){
	cout << 1+1 << "\n" << 3*3 << "\n" << 4/2 << "\n";
}
```
Sin estos saltos de línea ("\n") el programa retornaría todos los dígitos de corrido ("292"). Aunque equivalentes en su resultado, en programación se usa con más frecuencia la alternativa a este representación al salto de línea, usando "endl", la cual se comporta diferente en cuanto al código pero en terminos prácticos no nos incumbe a la hora de programar. El código anterior retornaría lo mismo si tuviera:

```c++
#include <iostream>
using namespace std;

int main(){
	cout << 1+1 << endl << 3*3 << endl << 4/2 << endl;
}
```

Para marcar comentarios que aclaren el código, o si desear probar un programa sin que se ejecute una línea, puedes "comentar una línea", que es anteponerle dos slashes ("//") para que nuestra máquina ignore el contenido que le siga a esos caracteres.

## Variables
Para declarar variables se debe *siempre* indicar de qué tipo son, por ejemplo:
```c++
// Para poder usar strings
#include <string>
using namespace std;

int main() {
    int entero1;
    int entero2;
    string unaCadena;
    char unCaracter;
}
```
Una diferencia notable es que en C++ se puede declarar variables sin darles un valor inicial, hay que tener mucho cuidado con esto, ya que C++ no les da ningún valor por defecto y el valor "inicial" de una variable puede considerarse aleatorio.

Luego para darle un valor a una variable:
```c++
#include <iostream>
using namespace std;

int main() {
    int entero1;
    entero1 = 100;
    cout << entero1 << '\n';
    entero1 = 9;
    cout << entero1 << '\n';
}
```

También es posible declarar y asignar múltiples variables del mismo tipo, en la misma instrucción:
```c++

int main() {
    int entero1 = 1235, entero2 = 999;
}
```

## Input
Para recibir input desde la consola usamos la función `cin` "console input", que funciona muy similar a `cout`

```c++
// <iostream> incluye tanto cin como cout
#include <iostream>
using namespace std;

int main() {
    int entero1, entero2;
    cin >> entero 1;
    cout << "Ingresaste: " << entero1 << '\n';
}
```

Notar que ahora los ángulos salen de `cin` (consola) hacia la variable, en cout van en el otro sentido, ya que la información "va hacia" la consola.

`cin` tiene la gracia de que ignora espacios, saltos de línea y tabulaciones, de forma que no debes preocuparte mucho de como son ingresados los valores desde la consola, aunque en los problemas de programación competitiva, el input siempre sigue un patrón.

## If y else
Para usar if-else es muy similar a Python, pero con cosas extras, primero, la condición siempre debe ir entre paréntesis, y además en vez de demarcar el cuerpo con identación, utizamos llaves:
```c++
#include <iostream>
using namespace std;

int main() {
    int foo;
    cin >> foo;
    if (foo >= 50) {
        cout << "Mayor a cincuenta\n";
    } else if (foo < 5) {
        cout << "Muy chico\n";
    } else {
        cout << "Ninguna de las anteriores\n";
    }
}
```

## Ciclos "for" y "while"

Para definir ciclos, en C++ tienes un ciclo "for" muy parecido a los "while", donde defines el ciclo a partir de un inicio, la condición final, y los pasos. Por ejemplo, en un "while" haríamos algo como lo siguiente:

```c++
#include <iostream>
using namespace std;

int main() {
	int n=1;
	while(n<11){
		cout << n << " ";
		n++;
	}
	cout << "\n";
}
```
lo que imprime los números del 1 al 10, pues definimos la condición inicial (n=1), luego la condición final en el while (n<11) y por último ponemos el paso para que avance al final del while (n++). Esto sería equivalente al siguiente for:

```c++
#include <iostream>
using namespace std;

int main(){
	for(int n=1; n<11; n++){
		cout << n << " ";
	}
	cout << "\n";
}
```

Así que a la hora de crear un "for" tenemos que definir estas 3 condiciones entre paréntesis, siendo estas "for(inicial; final; paso)" y las instrucciones a ejecutar en cada ciclo definidas dentro de los corchetes "{}".
