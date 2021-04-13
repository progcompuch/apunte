---
title : "Proxy"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "anexos"
weight: 040
---

Para poder realizar el análisis web de manera efectiva es necesario instalar un proxy que sea capaz de interceptar,
modificar y reenviar todos los requests hacia el servidor, al igual que sus respuestas respectivas.
En este caso utilizaremos el navegador FireFox, e instalaremos el plugin FoxyProxy para administrar la conexión
al proxy, el cual será Burp Suite Community Edition.

## FoxyProxy

Primero es necesario instalar el plugin. Para eso, ingresar a la tienda de extensiones de FireFox y buscar
por FoxyProxy, o simplemente ingresar a este [link](https://addons.mozilla.org/es/firefox/addon/foxyproxy-standard/).
Instalar el plugin haciendo click en `Agregar a Firefox` y luego otorgándole los permisos que solicite.

![Instalar FoxyProxy](../foxyproxy-install.png)

Una vez instalado, hacer click en el ícono del plugin arriba a la derecha. Esto abrirá unas opciones, de las
cuales se debe hacer click en `Options`.

![FoxyProxy Options](../foxyproxy-options.png)

Dentro de `Options`, hacer click en `Add` para empezar a crear las configuraciones del proxy.

![FoxyProxy Add](../foxyproxy-add.png)

Finalmente, llenar los campos de la siguiente manera: `Title: Burp`, `Proxy Type: HTTP`,
`Proxy IP Address: 127.0.0.1`, `Port: 8080`. Luego guardar.

![FoxyProxy Settings](../foxyproxy-settings.png)

Para empezar a redirigir la comunicación a través del proxy, hacer click en el ícono del plugin y seleccionar
la opción `Burp`.

![FoxyProxy Activate](../foxyproxy-activate.png)

## Burp Suite

Ahora configuraremos Burp Suite para que puedan interceptar el tráfico. Si están usando Kali Linux ya lo deberían
tener instalado. De no ser así, descárguenlo de este [link](https://portswigger.net/burp/communitydownload).

Lo que necesitamos hacer es instalar el certificado de firma de Burp en FireFox para poder interceptar
y modificar comunicaciones HTTPS. Esto es necesario, ya que Burp recibe mensajes encriptado,
y luego debe poder desencriptarlos para leerlos. Además, en caso de que el mensaje sea modificado, debe poder
volver a encriptarlos. Para realizar esto, el navegador establece una comunicación cifrada con Burp, y a su vez
Burp establece una comunicación encriptada con el servidor. El navegador necesita tener instalado el certificado
para poder confiar en Burp antes de establecer la conexión.

Para descargar el certificado, abrir Burp. Aparecerá una ventana de configuración, simplemente hagan click
en `Next` y luego `Start Burp`. Una vez terminado el proceso, en FireFox activar FoxyProxy e ingresar a la URL
[http://burp/](http://burp/). Haciendo click en `CA Certificate` se descarga el certificado.

![Burp Certificate](../burp-certificate.png)

Luego, ingresar a las [preferencias](about:preferences) de FireFox y buscar por la opción `certificates`.

![Firefox Preferences](../firefox-preferences.png)

Para instalar el certificado, hacer click en `View Certificates`, y en la pestaña `Authorities`
importar el certificado. Deberán seleccionar el archivo recientemente descargado (probablemente en
su directorio `Downloads`).

![Firefox Import](../firefox-import.png)

Una vez hecho esto, ya está todo listo para comenzar a usar Burp Suite.
