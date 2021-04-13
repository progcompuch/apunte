---
title : "Intro a Criptografía Moderna"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "cripto-moderna"
weight: 010
---


## Motivación

Debido tanto al _tecnooptimismo_ de sus creadores como a las limitaciones tecnológicas de la época, la Internet se pensó inicialmente como una red pública, en la que potencialmente cualquier par de computadores pudiese comunicarse de forma fácil y directa, sin importar en qué lugar geográfico se encontrasen o si compartían proveedor de Internet. Eran tiempos más simples, en los que la información que fluía por ahí no era necesariamente muy importante, o al menos la gente que podía ser capaz de interceptarla y leerla era muy poca. 

Sin embargo, a medida ha aumentado la cantidad de usuarios de la Internet y la cantidad de cosas que se puede hacer en ella, y a medida cada vez más gobiernos, delincuentes informáticos y grandes empresas quieren saber qué estas haciendo en cada momento, se ha vuelto indispensable contar con la capacidad de poder decidir quién puede y quién no puede acceder a ciertas comunicaciones que ocurren en estos espacios. Por ejemplo, hoy resultaría completamente inaceptable pensar que los números de la tarjeta de crédito que usas para pagar Netflix pudiesen ser vistos por cualquier persona o máquina que resulte estar por ahí cuando envías tu formulario. 

Para lograr el objetivo anterior contamos con una herramienta matemática muy útil: la criptografía. El principio es sencillo. La información se _cifra_ antes de enviar por el canal público, de modo que el receptor pueda _descifrarla_ usando información privada y que es de común acuerdo con el emisor del mensaje. 

Si bien los avances criptográficos de los últimos años entregan un nivel alto de protección _en teoría_, _en la práctica_ suelen haber errores de implementación graves que podrían permitir exfiltrar la información sensible. De estos errores se aprovechan entidades que desean descifrar mensajes sin autorización, obteniendo así la información sensible que buscan, y muchas veces sin que las partes que se comunicaban por el canal se enteren de esta intrusión.

En el contexto de los **CTFs**, la resolución de problemas de criptografía moderna suele requerir conocer las primitivas criptográficas utilizadas y algunos conceptos matemáticos que las sustentan. Si bien en general esto le entrega una dificultad particular a esta categoría de problemas al no existir herramientas que automaticen su resolución, también los vuelve más interesantes y suelen contar con un mayor puntaje en comparación a otros problemas.

En la unidad anterior hablamos un poco de la "criptografía clásica", la cual suele trabajar con mensajes alfabéticos simples y suele ser muy fácil de romper con ayuda de un computador y algunos algoritmos bastante simples de implementar. La criptografía moderna limita los ataques vistos en el caso de la criptografía clásica, aprovechándose la existencia de problemas matemáticos muy difíciles de resolver _a la mala_, en algunos casos incluso con una gran capacidad de cómputo.

Como este curso no intenta ser extensivo ni formal en lo que a criptografía se refiere, nos enfocaremos en tres puntos principales: Criptografía simétrica, criptografía asimétrica y _hashing_. En el caso de las dos primeras áreas, veremos tanto algoritmos para mantener su confidencialidad y demostrar su autenticidad, mientras que en la tercera área nos enfocaremos en los algoritmos utilizados para la validación de contraseñas en sistemas informáticos.


## Bibliografía útil


Gran parte de las explicaciones teóricas de esta unidad se basan en las del libro **Serious Cryptography** de Jean-Phillipe Aumasson. Por lo que si necesitan más información, pueden revisarlo.

También pueden utilizar el libro **Practical Cryptography in Python** como apoyo para la parte de programacion.
