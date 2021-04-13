---
title : "Remote Code Execution"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "apps-web"
weight: 050
---

El Remote Code Execution (RCE) se refiere a la ejecución de comandos de sistema, o de algún lenguaje instalado, sin tener acceso a una
terminal ni algún otro canal permitido para ejecutar comandos. El alcance de este ataque depende del sistema
operativo, frameworks, lenguajes y filtros que se tenga instalados en el servidor.

Similar a las inyecciones SQL de segundo orden, **la ejecución de comandos remotos pueden y suelen requerir
múltiples pasos**.

## Formas de RCE

Existen muchas formas de explotar esta vulnerabilidad, pero las más comunes son:
* **Subir archivos ejecutables**: Por ejemplo PHP, que al ser visualizados en el navegador, el servidor ejecuta
  su código.

* **Inyección de comandos**: Similarmente a las inyecciones SQL, a veces se utiliza variables controladas por el
  usuario en la ejecución de comandos de sistema, sin ser sanitizadas primero.

* **SQLi**: Muchos sistemas administradores de bases de datos permiten la ejecución de comandos de sistema,
  por lo que al lograr SQLi también se puede lograr RCE.

* **Buffer Overflows**: De vez en cuando un servidor web ejecuta un proceso que tiene un mal manejo de memoria.
  Esto muchas veces puede ser explotado para controlar a nivel de bytes las instrucciones que lleva
  a cabo el servidor.

* **Deserialización**: La serialización es una forma de codificar un objeto para poder almacenarlo o transmitirlo por
  la red. Si un servidor recibe un objeto serializado, muy probablemente intentará deserializarlo (proceso inverso).
  Esto puede ser aprovechado modificando el objeto serializado para controlar sus métodos o atributos.

* **Type Confusion**: Este tipo de vulnerabilidades surgen solo en lenguajes que son capaces de comparar variables
de distinto tipo (por ejemplo PHP). Luego, esto puede ser utilizado para "confundir" al servidor y ejecutar
  ramas del código que no son normalmente accesibles.

Una vez que se logra explotar exitosamente el RCE, el atacante hereda los permisos del usuario que maneja el
sistema explotado, usualmente `www-data`. Si este usuario puede leer y escribir en un directorio, el atacante
también podrá hacerlo. Si tiene permisos de `root`, el atacante también los tendrá.

Este es el primero paso para tomar control de un servidor. Una vez que se tiene control de la ejecución de
comandos, se puede intentar escalar privilegios (ganar privilegios elevado) o realizar movimientos laterales
(obtener privilegios de otros usuarios no elevados).

## Ejemplos

Para ilustrar esto, veamos un caso de inyección de comandos. Asumamos que tenemos un endpoint en un servidor PHP,
hecho específicamente para crear archivos, en donde su nombre y su contenido se entregan por parámetros POST.
El código que se encarga de esto podría ser algo como:

    $filename = $_POST['filename'];
    $content = $_POST['content'];
    system("echo '$content' > $filename");

Esto puede ser muy fácilmente escapado y explotado con el caracter `;` en el nombre del archivo. Por ejemplo,
si definimos el nombre del archivo como `file; rm -rf /`, el servidor estaría almacenando el contenido enviado
en el archivo `file`, para luego terminar ese comando y eliminar todo dentro del directorio `/`.

Otro ejemplo es un servidor al cual se puede subir archivos y luego visualizarlos. Existen muchos archivos,
llamados _webshells_, los cuales están hechos con este propósito. Varían dependiendo del lenguaje utilizado
en el servidor, y solo funcionan para lenguajes ejecutados en el lado del servidor.
[Aquí](https://github.com/tennc/webshell) pueden encontrar un repositorio con webshells para
muchos lenguajes diferentes.
