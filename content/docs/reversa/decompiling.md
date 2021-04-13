---
title : "Decompilación"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "reversa"
weight: 020
---

Con decompilación nos referiremos a la acción de tomar un programa compilado, ya sea a código binario o
bytecode, y devolverlo a una forma legible para humanos. Esto puede ser código Assembler, o algo un poco
más sofisticado, como C, Java, Python, .Net, PHP, entre otros. Hacer esto de manera manual se puede volver prohibitivamente costoso
y difícil, pero afortunadamente existen algunas herramientas que ayudan en el proceso, y muchas veces logran
obtener un código casi idéntico al original. Esto claramente irá variando caso a caso, pero de todas formas
analizar un código en C poco legible, o incluso en Assembler, es mucho más fácil que hacerlo para
código binario.

## Decompilación de Binarios

La decompilación de binarios puede tomar 2 formas:

* **Decompilación Estática**: Toma como entrada el código binario y retorna uno o más archivos con código
decompilado. Esto sirve para analizar el código de manera estática, como también para realizar cambios al
  código y ver cómo se comporta.

* **Decompilación en Tiempo de Ejecución**: Se ejecuta el código de una forma especial, que permite ver las
instrucciones y datos utilizados durante la ejecución en formato Assembler. Funciona de manera similar a un
  debugger, teniendo la capacidad de iterar por las instrucciones una a una y definir _break points_.
  Adicionalmente, permite leer y modificar directamente los registros de la CPU y la memoria del proceso.

Las herramientas más utilizadas son [Ghidra](https://ghidra-sre.org/) para la decompilación estática, y
[radare2](https://rada.re/n/radare2.html) para la decompilación en tiempo real.

A modo de ejemplo ocuparemos una implementación de Fibonacci en C, la cual la decompilaremos luego usando
Ghidra y radare2.

```
#include <stdio.h>
#include <stdlib.h>

int fibonacci(int n) {
        if (n == 1 || n == 2) {
                return 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
}

void main(int argc, char *argv[]) {
        int n = atoi(argv[1]);
        int f = fibonacci(n);
        printf("%d\n", f);
}
```

La compilamos:

```
gcc -o fibonacci fibonacci.c
```

Y vemos que funciona como esperamos:

![C Exec](../c-exec.png)

### Radare2

Radare2 nos permite ejecutar el código, y al mismo tiempo decompilarlo a Assembler. Este tiene muchas opciones
y funcionalidades, y se puede volver bastante complejo de usar, por lo que es recomendable revisar la
[documentación](https://book.rada.re/index.html) y tutoriales como
[este](https://www.megabeets.net/a-journey-into-radare-2-part-1/).

Empezaremos por lanzar radare2 en modo debug para analizar el ejecutable. Notar que es necesario entregarle
un argumento a fibonacci, sino fallará. Una vez dentro de radare2, realizamos un análisis básico del binario.

![Radare2 Launch](../radare2-launch.png)

Luego, listamos las funciones definidas para entender mejor la estructura interna. Vemos 2 que nos podrían
interesar: _main_ y _sym.fibonacci_.

![Radare2 Functions](../radare2-functions.png)

Definimos un _break point_ en la función _main_ y dejamos correr el proceso. Para ver el código decompilado
(o desensamblado), ejecutamos `pdf` (por Print Disassembled Function). Esto nos muestra 3 columnas:
la dirección de memoria de la instrucción, la instrucción en hexadecimal, y la instrucción desensamblada
en formato Assembler.

![Radare2 Main](../radare2-main.png)

Observamos que aparecen algunas cosas interesantes, como las llamadas a funciones y el string utilizado
para formatear e imprimir el resultado. Ahora definimos un _break point_ en la dirección de memoria en donde
se llama a la función _sym.fibonacci_, y continuamos con la ejecución.

![Radare2 Break](../radare2-break.png)

Para entrar a la función, ejecutamos solo una instrucción (la llamada a la función) usando el comando `ds`.

![Radare2 Fibonacci](../radare2-fibonacci.png)

Finalmente, pueden ver un diagrama de flujos usando el comando `VV`. Esto les puede ayudar a entender
los distintos caminos de ejecución que puede tomar el proceso y qué sucede en cada uno.

![Radare2 Diagram](../radare2-diagram.png)

### Ghidra

Para decompilar el ejecutable, primero abrimos Ghidra y creamos un proyecto cualquiera.

![Ghidra Project](../ghidra-project.png)

Luego hacemos click en la herramienta _CodeBrowser_ (En _Tool Chest_ es el dragón verde) e importamos el archivo.
Debería aparecer un popup preguntando si desean analizarlo, y dicen que sí. Aparecerá mucha información, más
de la que se espera para un código tan simple. Esta corresponde a las librerías utilizadas (_stdio_ y _stdlib_),
al igual que algunas otras definiciones.

![Ghidra UI](../ghidra-ui.png)

A la izquierda está en panel de _Symbol Tree_, con un dropdown llamado _Functions_. Si seleccionan la función
fibonacci podrán ver el código decompilado de la función que definimos. Es bastante parecido al código
original, pero se ven claras diferencias y es menos legible.

![Ghidra Decompiled](../ghidra-decompiled.png)

## Decompilación de Bytecode

El bytecode es una especie de código compilado, pero no a lenguaje de máquina, sino que a un lenguaje intermedio
pensado para ser ejecutado en un ambiente virtualizado. Luego, el bytecode es análogo a un lenguaje
Assembler para la máquina virtual que lo corre.
Se utiliza mucho para transformar lenguajes interpretados en algo un poco más eficiente de ejecutar,
pero sin tener que implementar un compilador completo.
Este bytecode usualmente no difiere mucho del código original, y puede ser decompilado directamente,
casi sin alteraciones. Esto suele ser mucho más fácil de analizar que los binarios decompilados, ya que se
obtiene inmediatamente código en un lenguaje de alto nivel.

### Java

En el caso de Java, el código se compila para ser ejecutado en la Java Virtual Machine (JVM).
El bytecode se encuentra en los archivos `.class` generados al hacer la compilación, los cuales también
pueden ser obtenidos desde un archivo empaquetado `.jar`. Estos pueden ser decompilados directamente
con [JD-GUI](https://java-decompiler.github.io/).

Como ejemplo crearemos un ejecutable `.jar` y realizaremos el proceso para decompilarlo. El código será un
simple Hello World en el archivo `HelloWorld.java`.

```
public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("Hello World!");
	}
}
```

Necesitaremos un manifesto para crear el `.jar` correctamente. Para eso debemos tener el archivo
`MANIFEST.MF` con el contenido:

```
Main-Class: HelloWorld
```

Luego compilamos y empaquetamos el código:

![Java Compiling](../java-compiling.png)

Al ejecutar el archivo `HelloWorld.jar` verificamos que efectivamente hace lo que queremos:

![Java Exec](../java-exec.png)

Para decompilar el código simplemente abrimos el archivo `HelloWorld.jar` con el decompilador JD-GUI, lo que
nos muestra un código Java casi idéntico al original.

![Java Decompiled](../java-decompiled.png)

### Python

Si bien Python es un lenguaje interpretado, también tiene una forma compilada. Estos son los archivos `.pyc`
o `.pyo` que aparecen a veces dentro de `__pycache__`.
Para decompilar el bytecode de Python, se puede utilizar librerías de Python:
[decompyle3](https://github.com/rocky/python-decompile3) para Python3.7 en adelante
(aún no hay soporte para Python3.9), y [uncompyle6](https://pypi.org/project/uncompyle6/)
para versiones anteriores. Se usan en la terminal de manera muy simple:

```
decompyle3 <archivo pyc o pyo>
uncompyle6 <archivo pyc o pyo>
```

Como ejemplo ocuparemos un script para calcular PI usando la fórmula de Leibniz y Python2.7.

```python
import sys

def Leibniz(n):
    s = 0.0
    k = 1.0
    for i in range(n):
        if i % 2 == 0:
            s += 4 / k
        else:
            s -= 4 / k
        k += 2
    return s

n = int(sys.argv[1])
pi = Leibniz(n)
print 'PI = ', pi
```

Al ejecutarlo vemos que nos retorna una aproximación de PI que depende del número de iteraciones que definamos.

![Python Aprox](../python-exec.png)

Compilamos el código a bytecode, el cual aparecerá en un nuevo archivo `pi.pyc`.

```
python -m compileall pi.py
```

Finalmente decompilamos el archivo usando uncompyle6 y obtenemos un código casi exactamente igual al original:

![Python Uncompiled](../python-uncompiled.png)
