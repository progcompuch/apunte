---
title : "Criptografía Asimétrica"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "cripto-moderna"
weight: 040
---

![Criptografía de llave pública](../public_key_crypto.png)

La **criptografía asimétrica** o **criptografía de llave pública** se diferencia de la criptografía simétrica en que se usan llaves distintas para cifrar y descifrar mensajes, lo que hace posible publicar la llave de cifrado  con el objetivo de que otras personas puedan enviarnos mensajes que solo nosotros podremos descifrar, usando la llave de descifrado. Algo similar ocurre con la criptografía asimétrica usada para firmas digitales. Se usa una llave para "demostrar" que un mensaje fue enviado por nosotros mientras se publica la otra para que cualquiera pueda comprobar que la firma es válida.

En general, estos sistemas usan propiedades aritméticas para crear problemas matemáticos que son muy difíciles de resolver con información limitada, pero que conociendo un parámetro secreto puedes resolver de forma fácil.

## RSA

### Cifrado

Fue el primer esquema de cifrado de llave pública. Se destaca por el uso de aritmética modular, definiendo los siguientes parámetros:

* $n$ es un número formado por la multiplicación de dos números primos obtenidos al azar $p$ y $q$.
* $Z_n^*$ es un grupo multiplicativo de enteros módulo $n$.
* $x$ es nuestro __mensaje en texto plano__, codificado como un número perteneciente a $Z_n^*$. Debido a lo anterior, el tamaño de nuestro mensaje se encuentra limitado por la magnitud de $n$ (o sea, mientras más grande queramos que sea el mensaje a cifrar, más grande debe ser n).
* $e$ es nuestro __exponente público__ y corresponde a un número menor que $(p-1)(q-1)$.
* $d$ es el inverso multiplicativo de e en el grupo $Z_n^*$, o sea, $d = 1/e \mod n$.
* $y$ es nuestro __mensaje cifrado__ y se calcula como $x^e \mod n$.

La __Llave pública__ en RSA es el par de elementos $(n, e)$, mientras que la __llave privada__ es el valor $d$.

La gracia de saber que $n=pq$ es que esto nos permite calcular $d$ de forma eficiente, usando el [algoritmo euclidiano extendido](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm):

$extended\_gcd(a,b) = ax + by$ 

En el algoritmo anterior, el valor de $d$ es igual al valor de $a$ al ejecutar $extended\_gcd(e, (p-1)(q-1))$.

Les recomendamos leer el capítulo 10 del libro *Serious Cryptography* para entender por qué ocurre esto.

#### Cifrado y descifrado en RSA

Para cifrar un mensaje en RSA, basta con calcular $y = x^e$, mientras que para descifrar el mensaje, basta con calcular $y^d$, ya que como $d$ es el inverso de $e$, $y^d = x^{e^d} = x^{ed} = x$.

En varias implementaciones, se suele fijar el valor de $e$ a un número pequeño, como por ejemplo $2^16+1$ *(65537), aunque también podría usarse $3$ o $17$ si se usa el padding adecuado (ver sección siguiente para más detalles).

#### Problemas de seguridad en RSA

Una mala implementación de RSA puede generar problemas de seguridad que permitirían incluso descifrar un mensaje. A continuación mencionamos algunos de ellos:
* **$n$ muy pequeño**: En general, se suele usar un $n$ de tamaño 2048 bits o más para que el nivel de seguridad del valor cifrado sea similar a un cifrado con llave simétrica de 112 bits. En la práctica, un $n$ de tamaño 300 bits o menos, éste es fácilmente factorizable en un computador de uso personal.
* **$e$ muy pequeño y mensajes sin padding**: Si $e$ es un valor muy pequeño, $x < n^d$ y el mensaje cifrado $y$ no tiene `padding`, es posible calcular la raíz $e$ésima de $y$ para calcular $x$.
* **Mala generación de números primos**: Es muy importante que los números primos $p$ y $q$ se generen de forma aleatoria. En caso que esto no sea así, se corre el riesgo de encontrarlos, y con esto poder derivar el valor secreto $d$.
* **Problemas de maleabilidad en valores cifrados**: Supongamos que ciframos con la misma llave pública dos valores pequeños $x_1$ y $x_2$, obteniéndose $y_1$ e $y_2$ respectivamente. Si $y_1y_2 < n$, una persona externa podría calcular el valor cifrado de $x_1x_2$ simplemente multiplicando los valores cifrados de $x_1$ y $x_2$. Para evitar este problema, se suele aplicar un `padding` especial a todos los valores cifrados con RSA, de forma que su representación numérica corresponda a un número grande.
* **Computación Cuántica** El problema de factorización en el cual se basa la seguridad de RSA es resolvible en tiempo polinomial con computadores cuánticos usando el [algoritmo de Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm). Afortunadamente, todavía no se conoce públicamente la existencia de un computador cuántico con la capacidad de factorizar números del tamaño de los usados en RSA.


La [página en Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) menciona con mayor detalle los ataques posibles a RSA, sin embargo, la comprensión de algunos de estos problemas requieren recordar hartos contenidos de teoría de números.

#### Padding en cifrado RSA: OAEP

![OAEP](../oaep.jpg)

El diagrama anterior, obtenido del libro **Serious Cryptography**, muestra en términos generales el uso de padding en RSA. Uno de los algoritmos de padding más usados en RSA es OAEP, el cual funciona de la siguiente forma:

![OAEP](../oaep_2.jpg)

* Se genera $M = H || 000 ... 001 || K$ ($||$ significa concatenar), donde $H$ es una constante conocida, seguida de tantos bytes $00$ como sea necesario para que el tamaño de $M$ en bytes sea el mismo que el de $n$, seguido de un byte $01$. Finalmente, se coloca el mensaje original $K$.
* La función $Hash1$ recibe de entrada un valor de largo igual al de $H$ y devuelve un valor de largo igual al de $M$. Llamaremos a este valor $A$
* La función $Hash2$ recibe de entrada un valor de largo igual al de $M$ y devuelve un valor de largo igual al de $H$. Llamaremos a este valor $B$
* El valor paddeado $P$ se construye de la siguiente forma: $P = 00 || B || A$. Este es el valor que se cifra con RSA finalmente.

El proceso de descifrado requerirá seguir los pasos anteriores en orden inverso, con el objetivo de obtener el verdadero texto plano.

### Firmas

En el caso de RSA, para un documento M, se define su firma $S = M^d \mod n$, donde M es el mensaje a firmar. Para verificar la firma, es necesario calcular $S^e \mod n$ y comparar este valor con el documento recibido. 

Hay que tener en consideración que, al igual que en el caso de cifrado RSA, el tamaño del mensaje a cifrar está limitado por el tamaño de $n$.

#### Potenciales ataques a las firmas RSA

* **Firma de mensajes "triviales"**: Si no se usa una función de padding, y existe la posibilidad de querer firmar un mensaje como $0$, $1$ o $n-1$. En todos estos casos, $x^d$ es igual a $x$, por lo que no es necesario conocer $d$ para generar la firma del mensaje.
* **Blinding Attack**: Si no se usa una función de padding y se quiere obtener la firma de un mensaje $M$ sin que la persona que firma el mensaje se entere que lo firmó, se le puede pasar un mensaje $R^eM$ para firmarlo. La firma de este mensaje corresponderá a $(R^eM)^d = R^{ed}M^d = RM^d$. Este valor se puede dividir por R de forma de obtener $M^d$, que es la firma del mensaje M.

#### Padding en firmas RSA

A continuación se mencionan dos algoritmos de padding que suelen usarse en RSA:

##### PSS

Lamentablemente, no hay demostración de que OAEP es un método de padding seguro para firmas RSA. Sin embargo, existe otro algoritmo de padding para este caso, denominado PSS.

La implementación de PSS es algo compleja, por lo que la enlazaremos solamente: [referencia](https://web.archive.org/web/20170810025803/http://grouper.ieee.org/groups/1363/P1363a/contributions/pss-submission.pdf).

##### FDH

Full Domain Hash es una forma más simple de paddear un documento, ya que considera simplemente calcular su hash con alguna función de hashing segura y luego firmar ese valor. Formalmente, no está demostrada su seguridad, pero en la práctica se considera una buena función de padding, debido a que su simplicidad disminuye considerablemente la posibilidad de error en implementación que sí posee PSS.


## Acuerdo de llaves Diffie-Hellman

En general se considera que Withfeld Diffie y Martin Hellman son los creadores del concepto de criptografía de llave pública. Ellos crearon también un esquema para acordar una llave compartida entre dos partes, denominado generalmente como `protocolo Diffie-Hellman`. Este protocolo requiere de los siguientes valores:

* Un número primo grande $p$ de forma de definir un grupo multiplicativo $Z_p^*$ sobre el cual trabajar.
* Un número generador $g$, perteneciente a $Z_p^*$. En general se suele usar $g = 2$.
* Cada parte que desea comunicarse debe elegir un número aleatorio en $Z_p^*$. Los denominaremos $a$ y $b$ para $Alicia$ y $Bob$ respectivamente.

En este caso, se consideran como llave pública los valores $g^a$ y $g^b$, y como llave privada los valores $a$ y $b$.

![Diffie Hellman según Serious Cryptography](../dh.jpg)

Para obtener el valor compartido que usarán como llave simétrica para comunicarse, primero Alicia envía a Bob el número $g^a$ y Bob envía a Alicia el número $g^b$. Si existiese una persona entre medio observando el intercambio, no tendría como deducir $a$ o $b$ a partir de $g^a$ o $g^b$ (al problema de obtener $x$ a partir de un $g^x \mod p$ se le conoce como de [el problema del logaritmo discreto](https://en.wikipedia.org/wiki/Discrete_logarithm) y se considera que no existe un método general de resolución para él). 

Finalmente, para calcular el secreto compartido, cada parte eleva el valor recibido por su número aleatorio secreto. De esta forma, Alicia obtendrá $g^{a^b} = g^{ab}$, mientras que Bob obtendrá $g^{b^a} = g^{ba} = g^{ab}$. Ahora, ambas partes pueden usar ese valor compartido para cifrar mensajes.

### Problemas de seguridad DH

![MITM en Diffie Hellman según Serious Cryptography](../dh_mitm.jpg)

* **Man-In-The-Middle Attack (Ataque de Entidad al medio de la comunicación)**: DH provee un mecanismo para negociar un valor secreto entre dos partes, pero no tiene en cuenta la necesidad de autentificar que la persona con la que hablas es quien dice ser. Nada evita que una tercera entidad que controle el canal de comunicación (Eva) pueda hacerse pasar por Bob frente a Alice, y por Alice frente a bob, generando dos números aleatorios $c$ y $d$ y sus respectivas llaves públicas $g^c$ y $g^d$. Eva recibiría tanto $g^a$ como $g^b$ y los guardaría, mientras envía $g^c$ y $g^d$ a Alicia y Bob respectivamente. El secreto compartido entre Alicia y Eva será $g^{ac}$ mientras que el secreto compartido entre Bob y Eva será $g^{bd}$. Cada vez que Alicia o Bob envíen un mensaje a Eva, ella podrá descifrarlo usando el secreto del emisor, y luego recifrarlo con el secreto del receptor. Para evitar este problema, se podría firmar la llave pública enviada a la contraparte utilizando algún otro metodo de criptografía de llave pública negociado con anterioridad.
* **Replay Attacks (Ataques de Repetición)**: Incluso si se pudiera autenticar el mensaje, no hay forma de demostrar si el mensaje que viene de Alicia fue emitido ahora o fue emitido hace tiempo, pero ahora Eva lo está reenviando. Una forma de evitar este problema es agregando interactividad al protocolo de generación del secreto compartido, por ejemplo, pidiendo recibir un "valor de confirmación" que utilice tanto la llave pública de Alicia como la de Bob en ese momento para su generación. 
* **Uso directo de $g^{ab}$ como secreto compartido**: Sabemos por lo visto que $g^ab$ es un número aleatorio del grupo $Z_p^*$. Sin embargo, esto no significa que sea un número aleatorio (en el sentido que la probabilidad de cada bit de ser 0 o 1 sea la misma), dado que el grupo que forma el generador $g$ podría tener algún sesgo en la codificación de los números generados. Para evitar esta posibilidad, se suele hashear el valor $g^{ab}$ con alguna función resistente a colisiones, como SHA3 o alguna KDF.

## Criptografía de Curvas Elípticas

La criptografía de curvas elípticas (ECC) utiliza la estructura algebráica de curvas elípticas sobre cuerpos finitos que puee ser usada tanto para negociación de llaves como para firmas digitales, y tiene la ventaja de que las llaves y firmas producidas en ella suelen ser mucho más pequeñas que las de Diffie-Hellman o RSA, manteniendo el nivel de seguridad. En este curso no trataremos con ellas, pero en caso de querer saber más, recomendamos leer el capítulo 12 del libro **Serious Cryptography**.



