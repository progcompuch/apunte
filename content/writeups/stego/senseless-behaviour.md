---
title: "Senseless Behaviour"
description: "Writeup del problema Senseless Behaviour"
date: 2020-10-06T08:49:55+00:00
menu:
  writeups:
    parent: "stego"
draft: false
---

Este problema es de Hack The Box, y fue diseñado por "sh3llf1sh"

En el desafío nos entregan un archivo de audio, llamado `meow.wav`. Si lo abrimos tenemos el audio de Nyan Cat, pero distorsionado.

Probamos ver algo con audacity o con binwalk, pero no pillamos nada. Vamos a probar con stegseek a ver si tenemos más suerte.

Podemos ver que hay algo "steghidden" corriendo `stegseek --seed meow.wav`. Se demora harto, pero sirve para confirmar si hay algo oculto. Después de saberlo, vamos a probar extraerlo con la lista rockyou, corriendo `stegseek --crack meow.wav /usr/share/wordlists/rockyou.txt`.

Obtenemos un archivo llamado `youfoundme`. Tiene un string muuy largo, podemos escribir `less meow.wav.out | tail` para ver cómo es. Parece ser algo codificado en base64. Probamos con `base64 --decode meow.wav.out > decoded.txt`. Y obtenemos otro que parece ser hexadecimal. Lo metemos a cyberchef y vemos que parte con PNG. Intentaremos pasarlo a una imagen.

Primero, con un editor de texto juntamos todas las líneas. Después, corremos `xxd -r -p decoded.txt > a.png` Y obtenemos una imagen!

Con stegsolve, en el canal rojo 0 vemos un mensaje oculto en braile. Con eso obtenemos la flag!