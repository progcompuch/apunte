---
title : "Stego en texto, imágenes y audio"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "stego"
weight: 030

---

Este capítulo mostrará algunas técnicas de esteganografía en texto, imágenes y audio. También listaremos las herramientas y algoritmos necesarios para extraer la información, además de consejos y estrategias para casos no listados en este apunte.

## Stego en Texto

La esteganografía en texto consiste en esconder información dentro de un archivo de texto plano. Debido al tamaño de los archivos de texto en general, no es posible esconder mucha información extra en ellos.

### Ejemplos de técnicas

* **Espacios y tabs Extra**: Es posible esconder mensajes combinando tabs y espacios al final de cada línea del mensaje. Una forma de hacer esto sería considerar que los espacios son 0s y los tabs son 1s, codificando un mensaje en binario no detectable a simple vista. En este caso, sería necesario hacer un programa personalizado que procesara el texto.
  * Un ejemplo de aplicación que automatiza esto es [**StegSnow**](https://wiki.bi0s.in/steganography/stegsnow/), la cual permite esconder mensajes de texto al final de líneas de otros mensajes de texto.
* **Zero-Width Joiner y Zero-Width Non-Joiner**: Dos caracteres especiales de unicode usados en el idioma Persa, los cuales no se notan visualmente pero podrían ser usados para codificar 0s y 1s, al igual que en el ejemplo anterior.  
* [**Caracteres Unicode**](https://www.irongeek.com/i.php?page=security/unicode-steganography-homoglyph-encoder): Esta página permite esconder y extraer mensajes en un archivo de texto, usando tres técnicas distintas:
  * **Caracteres invisibles**: Escondidos al final del texto o entre espacios de palabras, corresponde a un rango de 128 caracteres Unicode que no se muestran pero cuentan como tales. Estos caracteres codifican un mensaje ASCII con sus últimos bytes.
  * **Caracteres Homoglifos**: Corresponden a caracteres Unicode muy parecidos visualmente a los caracteres del mensaje contenedor, pero que sin embargo equivalen a un código Unicode completamente distinto.
  * **_Butt Ugly Latin Wide_**: Similar al caso anterior, pero usando un conjunto más grande de caracteres homoglifos, los cuales no se parecen completamente a los caracteres reemplazados, pero mantienen la legibilidad. Esta técnica hace parecer al mensaje contenedor como una "nota de secuestro".

### Herramientas

* [CyberChef](https://gchq.github.io/CyberChef/)
  * En la ventana del texto de entrada, aparece la cantidad de caracteres y líneas. Revisar si cantidad reportada es igual a la cantidad visible.

### Recomendaciones para detectarlo

* **Revisar largo del texto y compararlo con largo visible**: Ya sea con Cyberchef, con un editor de texto normal, con un script o a mano, revisar el largo del texto entregado y buscar caracteres invisibles en él. En caso de existir, muy probablemente hay un mensaje escondido usando esteganografía.

## Stego en audio

Otro tipo de problemas esteganográficos esconden mensajes en archivos de audio (WAV, MP3, WMA, etc.). Acá mostraremos algunas técnicas que se suelen usar para esconder mensajes en ellos.

### Ejemplos de técnicas

* **Imágenes en espectrograma de frecuencia**: Existen programas que permiten esconder imágenes en el espectrograma de frecuencia de un audio existente. Las modificaciones en sonido del audio original no suelen ser muy notorias, en gran parte porque éstas se hacen sobre el umbral del sonido oíble por la mayoría de las personas.
* **Mensajes distintos en múltiples canales de audio**: Es posible que cada canal de audio tenga información distinta. A veces es necesario amplificar el canal o aplicarle filtros de audio para extraer la información.
* **Metadatos**: Es posible esconder información en los datos ID3 de un archivo de sonido. Estos datos suelen ser usados por los reproductores de sonido para contextualizar la canción (artista, álbum, portada, etc).
* **Transmisión de datos por audio (Modem, programas)**: A veces el audio suena muy aleatorio como para ser música o voz. En estos casos, es posible que corresponda a una codificación en sonido de un programa o documento.
* **Uso de programas conocidos para esconder información**: Programas como `steghide` permiten esconder y extraer información de una imagen, contando con una contraseña.

### Herramientas

* [**Sonic Visualizer**](https://sonicvisualiser.org/): Herramienta que permite anotar, analizar y visualizar archivos de audio. Útil en algunos problemas de esteganografía de CTF.
* [**Audacity**](https://www.audacityteam.org/): Editor de audio de código abierto que permite aislar pistas, editarlas, amplificarlas, entre otras utilidades.
* [**CyberChef**](https://gchq.github.io/CyberChef/#recipe=Extract_ID3()): En específico, la herramienta de revisión de etiquetas ID3.
* [**Steghide**](http://steghide.sourceforge.net/): Programa incluido en Kali Linux que permite esconder datos en imágenes y audios, extraíbles con una contraseña.
* [**Audiotap y WAV-PRG**](http://wav-prg.sourceforge.net/screenshots.html) Transforman audios WAV En archivos ejecutables de Commodore 64.
* [**SoX**](https://sox.sourceforge.net): Heramienta que permite convertir archivos de audio en otros formatos. Entre ellos, convierte un audio en un espectrograma de forma fácil.

### Recomendaciones para detectarlo

* **Escuchar audio detenidamente**: Ojalá cada canal de forma distinta y por separado.  Cualquier sonido extraño en un canal puede servir como indicio de la existencia de información oculta.
* **Revisar si el audio parece contener datos**: Cuando el audio es molesto de escuchar y bastante aleatorio, es posible que integre la codificación de un mensaje en algún formato especial, como por ejemplo modem o un programa de computador antiguo que usa cassettes para guardar datos.

## Stego en imágenes

Ocultar datos en imágenes es una de las técnicas más comunes de los problemas de esteganografía.

En el caso de imágenes rasterizadas, en general es posible encontrar que cada pixel de ella corresponde a una tupla de hasta 4 valores: $(R,G,B,A)$, donde $R$ (Rojo), $G$ (Verde), $B$ (Azul) y $A$ (Alpha o Transparencia) corresponden a enteros sin signo de 8 bits.

### Ejemplos de técnicas

* **Datos escondidos en canales de color específicos (R, G, B, A)**: Al revisar canal de color por separado una imágen, a veces es posible notar mensajes ocultos con información (flags, pistas, etc).
* **Datos escondidos en bytes de menor importancia**: Otras veces, se modifican los valores en bytes menos significantes de cada color para esconder un mensaje. Esto altera visiblemente muy poco el color con respecto a una imagen original, permitiendo luego recuperar un archivo binario arbitrario.
* **Uso de programas conocidos para esconder información**: Programas como `steghide` permiten esconder y extraer información de una imagen, contando con una contraseña.
* **Metadatos**: Es posible esconder información en los datos EXIF de una imagen. Estos datos suelen ser usados por las cámaras para contextualizar la foto tomada (día, hora, configuración del lente, ubicación geográfica, etc).

### Herramientas

* [**Steghide**](http://steghide.sourceforge.net/): Programa incluido en Kali Linux que permite esconder datos en imágenes y audios, extraíbles con una contraseña.
* [**Stegsolve**](https://github.com/Giotino/stegsolve) Programa que permite aplicar filtros a imágenes con el objetivo de extraer información de ellas.
* [**Cyberchef**](https://gchq.github.io/CyberChef): Cyberchef cuenta con hartos filtros para procesar y revisar imágenes.
* [**Stegonline**](https://stegonline.georgeom.net/checklist): Herramienta con opciones similares a stegsolve, además de un checklist para CTFs.
* [**Stegseek**](https://github.com/RickdeJager/stegseek): Permite ejecutar ataques de fuerza bruta sobre un archivo que contiene información extraíble por `Steghide`.

### Recomendaciones para detectarlo

* **Revisar detalles en imágenes**: A veces es posible notar detalles gráficos en imágenes. Estos detalles podrían indicar la existencia de un mensaje escondido con esteganografía.

## Stego en archivos varios

Las siguientes técnicas de esteganografía aplican a casi cualquier tipo de archivo.

### Ejemplos de técnicas

* **Datos extra al inicio, medio o final del archivo**: A veces se incluyen datos en bruto entre medio de un archivo, cuidando que a pesar del agregado, el archivo siga siendo utilizable o reproducible. En estos casos, conviene revisar el archivo byte a byte, buscando mensajes en texto plano o codificados (Base64, hexadecimal, etc). También es posible buscar dentro del archivo parte de una flag que ya se conozca (como el inicio, que en general es invariable).
* **Otros archivos pegados al final del archivo visible**: Otras veces se suele pegar un archivo al final de otro archivo reproducible (muchas veces, un archivo comprimido), lo cual no altera el funcionamiento del archivo original.

### Herramientas

* **Binwalk**: Utilidad integrada en Kali Linux que permite revisar un archivo completo, buscando por signos de otros archivos "pegados" al final del archivo visible. Posee flags que permiten extraer los archivos pegados de forma directa.
* **GNU `strings`**: Utilidad integrada con casi todos los sistemas operativos Unix que permite extraer solamente los bytes que representan cadenas de texto de un archivo binario.

### Recomendaciones para detectarlo

* **Revisar tamaño de archivos**: Si el tamaño de los archivos es muy grande para el que debiesen tener, es muy posible que haya información escondida esteganográficamente.
* **Cuidado con los falsos positivos**: A veces `binwalk` reporta archivos incrustados que en realidad no existen. Esto suele pasar harto en binarios grandes (en los cuales la probabilidad de un falso positivo aumenta) y en archivos de imágenes PNG (cuyos datos internos coinciden con firmas de otros archivos).