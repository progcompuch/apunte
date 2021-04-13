---
title : "Comandos de Terminal de Linux"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "anexos"
weight: 045
---

Una _Shell_ o _Terminal_ en la práctica es una interfaz de usuario de texto que permite la ejecución de comandos y programas de tipo script.

En sistemas Linux modernos, puedes interactuar con la _Shell_ usando un emulador de terminal. En varias distribuciones actuales, el emulador de terminal por defecto es `bash`. Sin embargo, en Kali Linux la shell usada por defecto es `zsh`.

## Abrir una ventana de terminal

Cuando abres una venta del terminal (en Kali linux puedes hacerlo con `Ctrl+Alt+T`), esta parte posicionada en una carpeta específica. En general, esa carpeta es la carpeta `$HOME` de tu usuario (Algo así como `/home/_nombreusuario_`). Desde esta ruta, puedes:
  * Ejecutar comandos
  * Moverte entre carpetas

## Ejecutar Comandos

Las shell tienen dos tipos de comandos que pueden ejecutar:

* **Comandos internos**, los cuales son "keywords especiales" de la shell y permiten ejecutar acciones que no están asociadas a un programa en el computador
    * _Ejemplos_:
        * `echo HOLA` escribe `HOLA` en la terminal.
        * `cd hola` ingresa a la carpeta `hola`.
* **Comandos externos** o aplicaciones, los cuales corresponden a aplicaciones guardadas en rutas del computador específicas (las cuales están definidas en la variable `$PATH`). Si el programa no está guardado en una ruta específica, hay que escribir la ruta completa.

Para ejecutar un comando externo (programa), debo escribir la _ruta absoluta_ (se explica más adelante este concepto) de la ubicación del programa, o escribir una _ruta relativa_ si es que el programa no se encuentra en la misma carpeta en la que estoy.

Si el programa se encuentra en la misma carpeta en la que estoy, debo ejecutarlo así: `./programa , donde _programa_ es el nombre del programa en la misma carpeta. (más adelante se explica por qué esto funciona).

Si el programa se encuentra en una ruta definida en el `$PATH`, puedo escribir su nombre solo.

## Variables

En la shell, es posible crear variables definiéndolas con `NOMBRE_VAR=$(valor)`, donde `NOMBRE_VAR` es el nombre de la variable y `valor` es el comando que genera el valor.

Para usar esa variable en otro comando, debo anteponerle el símbolo `$`

**Ejemplo**:

```bash
VAR=$(echo HOLA)
echo "$VAR mundo"
```

### Variables Predefinidas

El terminal tiene disponibles algunas variables útiles desde que inicia:
* `$PATH` es una lista de rutas absolutas, separadas por `:`, en las cuales se buscan los comandos externos si se ejecutan solo por su nombre. En general, rutas como `/usr/bin`, `/usr/local/bin`, `/usr/local/sbin`, entre otros.
* `$HOME` es la ruta a la carpeta personal del usuario. En general es `/home/<nombre_usuario>`.
* `$PWD` es la ruta en la que se está ubicado en ese momento.
## Rutas

Para saber en qué carpeta estoy en el terminal, puedo escribir el comando interno `pwd`.

Para moverme entre carpetas, puedo escribir `cd _ruta_`, donde _ruta_ es la ruta a la que me quiero mover. ¿Pero cómo escribo la ruta?

En los terminales existen dos formas de escribir rutas:

* **Rutas Relativas**: son las rutas que parten sin slash. Para usar estas rutas se considera el directorio actual (`$PWD`), al cual se le concatena la ruta relativa.
    * **Ejemplos**:
        * Si escribo `cd Downloads` apenas abra el terminal, me moveré a `/home/kali/Downloads`
        * Si escribo `cd home` apenas abra el terminal, probablemente me tire un error (porque en la carpeta `/home/kali` no existe la carpeta `home`).
* **Rutas Absolutas**: son las rutas que parten con un slash. Estas rutas se resuelven desde la raíz del disco.
    * **Ejemplos**:
        * Si escribo `cd /Downloads` apenas abra el terminal, probablemente me tire un error (porque no existe la carpeta `Downloads` en la raíz del sistema de archivos)
        * Si escribo `cd /home/kali/Downloads` apenas abra el terminal, me moveré a exactamente esa ruta.

### Carpetas especiales

En todas las carpetas de Linux hay 2 carpetas especiales:

* `.`, la cual apunta a sí misma. Esta carpeta se usa para ejecutar programas que están ubicados en la misma carpeta actual (`pwd`).
  * **Ejemplo**: `./comando` considerando que el programa `comando` se ubica en la carpeta actual.
* `..`, la cual apunta a la carpeta superior. Esta carpeta se usa para devolverse entre carpetas.

### Ejecutar como superusuario

No entraremos mucho en detalle en esta parte, pero en Linux existe un tipo de usuario con poderes ilimitados, el cual es conocido como _superusuario_. En general, suele llamarse _root_, pero también es posible asignar a usuarios distintos poderes similares a los del superusuario.

Cuando estos poderes están asignados (en Kali Linux están asignados por defecto al usuario _kali_), puedes ejecutar programas con estos poderes anteponiendo la palabra `sudo` al comando que quieres ejecutar. A veces para confirmar la ejecución, la terminal te pide la contraseña del usuario actual.

## Pasar parámetros a un comando

Cuando se ejecuta un comando, éste en general puede recibir parámetros o argumentos. La estructura de los parámetros es distinta para cada comando, sin embargo, en todos los casos ;os argumentos se separan por espacios. Las siguientes estructuras se suelen dar para definir argumentos de los comandos, las cuales no son excluyentes entre sí.

* **Argumentos posicionales**: es una cadena de texto limitada por espacios. Si se quiere entregar un argumento que contenga espacios, hay que envolver el texto en comillas. **Ejemplo**: `comando bla ble bli` recibe 3 argumentos: `bla`, `ble`, `bli`.
* **Flags de una letra**: Parámetro parte por un guion, seguido de una letra (mayúscula o minúscula). A veces al parámetro le sigue un valor (igual que antes, delimitado por espacios). Otras veces, el parámetro y su valor están unidos por un signo `=` A veces la opción no lleva nada después. **Ejemplos**: `comando -a -b ble`, `comando2 -c=bli`.
* **Flags de muchas letras**: Parámetro parte por dos guiones, seguido de texto (letras, números, guiones). Al igual que en el caso anterior, puede tener un valor asignado, el cual está separado del argumento por un espacio o un signo igual. Incluso en algunos casos, la opción de muchas letras parte solo con un guion. **Ejemplos**: `comando --flag-larga=bla`, `comando2 --flag-larga ble`.

## Entrada Estándar, Salida Estándar y Salida de Errores

Se conoce como _entrada estándar_ (`stdin`) en la terminal a el campo de texto por el cual uno escribe los comandos. Entonces, los comandos que usan la entrada estándar reciben los datos por defecto desde el mismo terminal.

Por otro lado, la _salida estándar_ (`stdout`) es la misma pantalla de terminal, es decir, por donde se muestran los valores de ejecución de nuestros comandos y los textos que se usan como argumentos de comandos como `cat` o `echo`.

Además, cuando un programa genera mensajes de error, estos mensajes suelen salir por la _salida de errores estándar_ (`stderr`). Por defecto, los errores son redirigidos a la pantalla del terminal, al igual que los mensajes de la salida estándar.

**Ejemplo** si uno ejecuta solamente el comando `cat` sin parámetros, el programa se quedará esperando entrada desde la _entrada estándar_. Esto significa que uno podrá escribir libremente texto, el cual será devuelto por la _salida estándar_ cada vez que presiones `enter`. Para detener la entrada de texto, hay que enviar la señal `EOF` (End of File), la cual se ejecuta con la combinación de teclas `Ctrl+D`.

## Concatenar comandos

Si se quieren concatenar las salidas de distintos comandos para hacerlas entradas de otros comandos, se usa el operador `pipe` (`|`). Por ejemplo, si quiero ejecutar `strings` sobre un archivo y luego pasar esa salida por un `grep`, lo hago de la siguiente forma:

```bash
strings archivo.bin | grep "CC5325"
```

El terminal mostrará solo la salida de `grep`.

## Leer y escribir archivos

Si quiero que **la entrada estándar** de un comando sea el contenido de un archivo, puedo usar el operador `menor-que` (`<`) al final del comando:

```bash
grep CC5325 < archivo.txt
```

Si quiero que **la salida estándar** de un comando se guarde en un archivo (sobreescribiéndolo si existe), puedo usar el operador `mayor-que` (`>`) al final del comando:

```bash
strings archivo.bin | grep "CC5325" > salida.txt
```

Si quiero que **la salida estándar** de un comando se guarde en un archivo (agregando texto al final si existe), puedo usar el operador `doble mayor-que` (`>>`) al final del comando:

```bash
strings archivo.bin | grep "CC5325" 2>> salida.txt
```

Si quiero que **la salida de error estándar** de un comando se guarde en un archivo (sobreescribiéndolo si existe), puedo usar el operador `mayor-que` con un `2` a la izquierda (`2>`) al final del comando:

Si quiero que **la salida de error estándar** de un comando se guarde en un archivo (agregando texto al final si existe), puedo usar el operador `doble mayor-que` con un `2` a la izquierda (`2>>`) al final del comando:

```bash
strings archivo.bin | grep "CC5325" 2>> salida.txt
```

## Redirigir Salidas y Entradas

Puedo redirigir juntas la salida estandar y la salida de error estándar a un mismo archivo con el operador `2>&1` al final del comando:

```bash
strings archivo.bin | grep "CC5325" 2>> salida.txt 2>&1
```

## Scripts de Shell

La `shell` incluye internamente un lenguaje de programación completo, con estructuras de control de flujo, iteraciones, definición de funciones, entre otros. Uno puede escribir código de script en el mismo terminal, o escribirlo en un archivo cuya primera línea sea similar a esta:

```bash
#! /bin/bash
```

Para ejecutar este archivo, hay que cambiar sus permisos para que se permita la ejecución (`chmod 755 archivo.sh`).

No entraremos en detalle de cómo crear scripts de shell acá, pero les recomendamos [esta referencia](https://www.tutorialspoint.com/unix/shell_scripting.htm).

## Comandos útiles

La siguiente lista de comandos útiles irá creciendo con el tiempo, según los comandos que veamos en el curso.

`man [comando]` - _Muestra información sobre el comando_ \
`cat [archivo]` - _Muestra el contenido de un archivo_ \
`grep` - _Buscar patrones en un texto_ \
`strings [archivo]` - _Muestra los caracteres ascii dentro de un archivo_ \
`whatis` - _Muestra en una linea el uso de un comando_ \
`unzip [archivo]` - _Descomprime un archivo .zip_ \
`file [archivo]` - _Dice que tipo de archivo es el archivo dado_ \
`xxd [archivo]` - _Muestra todo el contenido del archivo, pero en hexadecimal con su representación ascii a la derecha_
