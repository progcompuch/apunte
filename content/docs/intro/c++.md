---
title: Entendiendo C++
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 101
menu:
  docs:
    parent: intro

---
Para partir programando, primero debemos entender en qué formato se programa. Para los programas en c++ solo requieres crear un archivo de texto cualquiera, en el editor de texto que elijas (funciona hasta en un block de notas), cuyo nombre termine con la extención ".cpp" (del inglés "cee plus plus"). Este archivo contendrá la serie de instrucciones que se ejecutarán paso a paso.
Lo primero que se ejecuta en un archivo cpp será una función a la que llamamos "main", cuya notación es:

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

Este paso de compilación dependerá mucho de las herramientas que uses, y como se haga dependerá tanto del sistema operativo que usas como de los programas que estás usando. Por ejemplo, si lo haces con las herramientas más basicas estarías usando una terminal abierta en la misma carpeta donde se encuentre tu archivo .cpp, y ejecutando "g++ miPrograma.cpp" si estás en una distribución de linux.

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

Para marcar comentarios que aclaren el código, o si desear probar un programa sin que se ejecute una línea, puedes "comentar una línea", que es anteponerle dos slashes ("//) para que nuestra máquina ignore el contenido que le siga a esos caracteres.
