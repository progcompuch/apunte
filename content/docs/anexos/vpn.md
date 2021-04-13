---
title : "Configuración de VPN"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "anexos"
weight: 030
---

Para poder tener acceso a la máquina que se usará en los CTF y tareas, necesitan conectarse por VPN a la red de la Universidad. A continuación se enumeran los pasos necesarios para hacer esto.

* Inicien sesión en la máquina Kali que se usará en el curso
* Descargar perfil OpenVPN del CEC desde [acá](https://www.cec.uchile.cl/download/OPENVPN/CEC-fcfm.ovpn).
* Abrir un terminal en la carpeta en que descargaron el archivo y ejecutar `sudo openvpn CEC-fcfm.ovpn`. Colocar como datos de inicio de sesión los datos de la cuenta del CEC (sin incluir @ing.uchile.cl).