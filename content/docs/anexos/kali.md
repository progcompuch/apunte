---
title : "Kali Linux"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "anexos"
weight: 030
---

Para facilitar tanto al equipo docente como a los estudiantes la solución de problemas relacionados con el ambiente de trabajo durante el transcurso de las actividades del curso, requerimos que utilicen **Kali Linux** para resolver las tareas y los ejercicios propuestos. A continuación, les explicamos dos formas en las que pueden usar Kali Linux en su computador sin tener que hacer cambios importantes o irreversibles a su configuración actual.

## Instalación en Máquina Virtual (Virtualbox)

Recomendamos este método para personas con computadores con 8GB o más de RAM, además de al menos 25 GB libres en el disco duro.

* Primero, instala [VirtualBox](https://www.virtualbox.org/wiki/Downloads) en tu computador. Las instrucciones para hacer esto varían según tu sistema operativo.
* Mientras tanto, baja la imagen de máquina virtual oficial de Kali Linux desde [acá](https://images.kali.org/virtual-images/kali-linux-2021.1-vbox-amd64.ova) (Enlace viene de [esta página](https://www.offensive-security.com/kali-linux-vm-vmware-virtualbox-image-download))
* Después de instalar VirtualBox, es recomendable instalar el pack de extensiones. Está disponible en el mismo link de descarga de VirtualBox, en la sección VirtualBox Oracle VM VirtualBox Extension Pack. Esto es principalmente para que la máquina virtual use la resolución de pantalla de la ventana en la que está, y no tengamos solo un cuadro pequeño para ver.  
* Una vez esté instalado el programa y haya terminado de bajar la imagen, haz doble click en la segunda. Si el doble click no te sirve, ve a "File" y luego a "Import Appliance" en el menú superior, de forma de seleccionar el archivo descargado.

![](../virtualbox_1.jpg)

* Luego, en el cuaddro para importar la máquina, hacer click en "Import" y aceptar la licencia asociada. El proceso de importación demorará unos minutos.

* Una vez importada, la máquina se puede correr haciendo doble click en ella. El usuario y la contraseña son `kali` y `kali` respectivamente.

## Instalación en un pendrive persistente

Este procedimiento es un poco más largo y complejo que el de la máquina virtual, pero debiesen obtener un rendimiento mucho mejor. Además, no usarán espacio de su disco principal, ya que correrán todo el sistema operativo Kali desde un pendrive. Lo anterior también les da la ventaja de poder mantener su sesión de Kali entre distintos computadores.

Les recomendamos usar un pendrive USB 3, con 8 GB de espacio o más. Lamentablemente, el pendrive que usen para esto no podrán usarlo para otras cosas, pero a futuro pueden formatearlo y recuperar su anterior utilidad.

Las instrucciones detalladas para crear un pendrive persistente se encuentran [en este tutorial oficial](https://www.kali.org/docs/usb/usb-persistence/).

