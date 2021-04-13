---
title : "Criptografía Simétrica"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "cripto-moderna"
weight: 030
---

En esta sección hablaremos de tres tipos de cifrado: **One-time pad**, **cifradores de bloque** y **cifradores de flujo**.

## One-Time Pad

Corresponde a una técnica de cifrado que no puede ser rota si la llave no se reusa, en la cual un mensaje se cifra ejecutando la operación `xor` entre un valor aleatorio al menos del tamaño del mensaje y el mismo mensaje. Lamentablemente, este tipo de cifrado no es muy práctico, debido a la dificultad de conseguir una fuente de valores realmente aleatorios que pueda al mismo tiempo estar sincronizada entre las partes que desean comunicarse.

## Cifradores de bloque

Los cifadores de bloque permiten cifrar mensajes de un tamaño fijo (_conocido como $BlockSize$_) utilizando una llave de con otro tamaño fijo (_conocido como $KeySize$_). Si el mensaje es más largo que la llave, es necesario dividirlo en **bloques** del tamaño adecuado y usar un **modo de operación** que permita encadenar estos bloques.

El principio básico del proceso de Cifrado $E$ del cifrador de bloque consiste en ejecutar varias rondas de permutación y sustitución definidas sobre el bloque de texto plano $P$, de tal forma de obtener un nuevo bloque cifrado $C$. Las permutaciones y sustituciones son definidas por una llave $K$, la cual es entregada al cifrador de bloque como entrada, además de $C$. Para descifrar un bloque $C$ (proceso de descifrado $D$), se ejecutan operaciones inversas a las de $E$. Lo anterior se puede observar en la imagen siguiente, obtenida del libro **Serious Cryptography**.

![Esquema abstracto de los procesos de cifrado y descifrado](../cifrado.jpg)

Una característica importante para un buen cifrador, es que la salida $C$ no permita derivar nada ni de $K$ ni de $P$. Para esto, las salidas $C$ deben verse como datos aleatorios (es decir, no tener patrones).

El tamaño de la llave es importante para evitar ataques de fuerza bruta sobre el cifrador. Si la llave es pequeña no es una tarea imposible probar descifrar un bloque cifrado con todas las llaves posibles. Una llave de 16 bits requeriría del orden de 65 mil intentos para recorrer el espacio completo de llaves, mientras que una de 32 bits necesitaría 4 mil millones de intentos. Hoy en día es considerada segura una llave de largo 128 o más.

### Tipos de cifradores de bloque

Existen muchos diseños de cifradores de bloque. A continuación mencionaremos algunos de los más conocidos y usados.

#### DES

![Diagrama de especificación de DES](../des.png)

**Estandarizado** en el año 1977

**Largo de llave:** 56 bytes (+ 8 de paridad)

**Largo de bloque:** 64 bytes

**Rondas:** 16

**Data Encryption Standard** es un algoritmo de cifrado simétrico creado por IBM en los 70s. Se publicó como estándar el año 1977, con el tamaño de llave que conocemos. Este tamaño de llave hace que sea completamente factible un ataque de fuerza bruta en unos días, contando con la capacidad computacional adecuada o pagando por un servicio especializado.

Pueden encontrar una descripción bastante extensiva del algoritmo [en Wikipedia](https://en.wikipedia.org/wiki/Data_Encryption_Standard).

Existe una versión "fortificada" denominada **3DES** en la cual se aplica 3 veces el algoritmo DES a cada bloque, utilizando hasta 3 llaves ($K_1, K_2, K_3$) de 56 bits distintas, de la siguiente forma:

$$C = E_{K_3}(D_{K_2}(E_{K_1}(P)))$$
$$P = D_{K_1}(E_{K_2}(D_{K_3}(C)))$$


Sin embargo, esta versión es considerada insegura por el NIST desde el año 2017 debido a la existencia de ataques de colisión, como SWEET32. Más información sobre esta versión pueden encontrarla en [la página de Wikipedia](https://en.wikipedia.org/wiki/Triple_DES)

#### AES

![Rondas AES](../aes_rounds.jpg)


**Estandarizado** en el año 2000

**Largo de llave:** 128, 192 o 256 bits

**Largo de bloque:** 128 bits

**Rondas:** 10, 12 o 14


**Advanced Encryption Standard** es el cifrador de bloque por defecto hoy en día. Dependiendo del tamaño de la llave, consiste en entre 10 y 14 rondas de operaciones de substitución y permutación, tal como se muestra en la figura anterior (obtenida del libro **Serious Cryptography**)

Para mayor información sobre la utilidad de cada ronda, se les recomienda revisar el libro **Serious Cryptography** o la [página de Wikipedia](https://es.wikipedia.org/wiki/AES)


### Modos de Cifrado

Debido a que los cifradores de bloque pueden encargarse de cifrar datos de tamaño igual al tamaño del bloque, es necesario definir estrategias que permitan cifrar información de un largo mucho mayor. Acá entran en juego los "modos de cifrado", los cuales definen el algoritmo a usar para realizar el cifrado de la información completa. 

En todos los modos que se verán a continuación, se divide el texto completo en bloques de tamaño $BlockSize$. En caso que el texto completo no tenga un tamaño múltiplo de $BlockSize$, se agregan bytes al final de forma de rellenar (_padding_) y obtener un texto plano de un tamaño adecuado. Lo anterior genera un problema cuando el texto ya tiene un tamaño múltiplo de $BlockSize$, por lo que en esos casos es necesario agregar un bloque completo, solo con padding.

Algunos tipos de _padding_:

* **ANSI X9.23**: Se rellena con bytes `\x00` o algún byte al azar, salvo el último byte del bloque rellenado, que incluye como valor la cantidad de bytes usados para rellenar.
* **PKCS7**: Se rellena con n bytes con el valor $hex(n)$, con $n \in [1,BlockSize]$.

#### ECB

![Cifrado ECB](../ecb_enc.png)
![Descifrado ECB](../ecb_enc.png)

**Electronic Codebook** es el modo de cifrado más simple. Cada bloque se cifra por separado usando siempre la misma llave, concatenándose todo para generar el texto cifrado.

##### Filtración de información estructural

Si bien este modo es muy fácil de implementar, el mayor problema que posee es que es fácil encontrar patrones en los mensajes si los datos cifrados tienen una estructura que se repite bastante. Un muy buen ejemplo de lo anterior es esta imagen del [Pingüino Tux](https://isc.tamu.edu/~lewing/linux/), la cual si cifrásemos bloques de ella usando AES/ECB, podríamos ver ciertos patrones con bloques de colores parecidos que delinearían los bordes del pingüino.

![Tux](../tux.jpg)
![Tux ECB](../tux_ecb.jpg)

#### CBC

![Cifrado CBC](../cbc_enc.png)
![Descifrado CBC](../cbc_enc.png)

**Cipher Block Chaining** es un modo en el que el cifrado de cada bloque depende del resultado del cifrado del bloque anterior. Como caso especial, el primer bloque utiliza un valor público llamado _Vector de Inicialización_ `(IV)`. Es importante que este valor sea aleatorio en cada sesión de cifrado, con el objetivo de impedir algunos tipos de ataques.

El cambio anterior con respecto a ECB ayuda a que si ciframos exactamente la misma información en dos bloques distintos, el resultado cifrado no sea el mismo, evitando problemas como los vistos con la imagen del pingüino.

##### Padding Oracle Attack

Si contamos con feedback acerca del estado de un mensaje cifrado (específicamente, si el mensaje está bien formado o no), es posible ejecutar un ataque denominado [Padding Oracle Attack](https://en.wikipedia.org/wiki/Padding_oracle_attack). En el curso [CC5312 Seguridad Computacional](https://users.dcc.uchile.cl/~eriveros/cc5312/anexos/padding-oracle/) se explica cómo ejecutar este ataque.

##### Maleabilidad del mensaje cifrado si el IV no cambia

Si tanto el IV como la llave se mantienen en un servicio que permite elegir los mensajes a cifrar, es posible armar mensajes cifrados a medida sin necesidad de conocer la llave ni el IV. Veremos cómo hacer esto en las clases.

#### CTR

![Cifrado CTR](../ctr_enc.png)
![Descifrado CTR](../ctr_enc.png)


**Counter Mode** es un modo que permite paralelizar el cifrado y descifrado de un mensaje, dado que la parte que pasa por el cifrador de bloque es un valor predeterminado y predecible. Además, el descifrado se ejecuta con el algoritmo de cifrado del cifrador de bloque elegido.
## Cifradores de Flujo

Los cifradores de flujo intentan emular el uso de un cifrador de tipo **One-Time Pad**, pero usando un generador de números **pseudoaleatorio**. Estos generadores usan una semilla realmente aleatoria al inicializarse, la cual les permite generar una salida continua extensa que se comporta de forma similar a un flujo de datos realmente aleatoria. Posteriormente, es posible cifrar un stream de datos simplemente haciendo $XOR$ entre los datos y el flujo pseudoaleatorio. Con tal de que ambas partes conozcan la semilla, es posible asegurar la sincronización entre sus flujos aleatorios, con lo que se es posible comunicarse sin problemas y sin filtrar los mensajes.

### El _nonce_ en los cifradores de flujo

Partamos mencionando una potencial vulnerabilidad de los cifradores de flujo. Si se usa dos veces el mismo flujo pseudoaleatorio para dos conjuntos de datos (a partir del uso de la misma semilla), y luego se ejecuta la operación $XOR$ entre ambos textos cifrados, se obtendrá como resultado lo siguiente:

$$E(P_1) = P_1 \oplus S$$
$$E(P_2) = P_2 \oplus S$$
$$E(P_1) \oplus E(P_2) = (P_1 \oplus S) \oplus (P_2 \oplus S)$$
$$E(P_1) \oplus E(P_2) = (P_1 \oplus P_2)$$

Asumiendo que el texto plano tiene cierta estructura, luego no es difícil deducir qué valores corresponden a $P_1$ y $P_2$ a partir de $E(P_1) \oplus E(P_2)$.

Para evitar el problema anterior, los cifradores de flujo suelen recibir un parámetro extra, denominado _nonce_. Este campo puede ser considerado como público sin que esto signifique disminuir la seguridad del cifrador, pero **debe ser distinto** en cada ejecución del algoritmo, por lo que en algunas implementaciones corresponde simplemente a un contador que se incrementa en cada uso del cifrador. En caso que el nonce no siga una generación predecible, es necesario compartirlo entre ambas partes que desean comunicarse.

### RC4

![Generación Aleatoriedad RC4](../rc4.png)

**Tamaño de llave**: Entre 40 y 2048 bits.

**Tamaño del Nonce**: No lleva de forma oficial, aunque se suele agregar como parte de la llave.


También conocido como **ARCFOUR**, es un cifrador de flujo diseñado el año 1987 pero filtrado el año 1994. Se comenzó a utilizar como un producto propietario de RSA Security, hasta que en el año 1994 se filtró su especificación en un foro cypherpunk.

Al hacerse público su funcionamiento, se empezaron a encontrar varios errores y vulnerabilidades en el algoritmo. Un ejemplo de estos problemas es que los primeros bytes de salida del generador pseudoaleatorio permiten adivinar el estado interno del mismo, derivándose así información sobre la clave.

Si bien su diseño no considera el uso de un nonce, éste se suele agregar de alguna de las formas siguientes:

* Hasheando la semilla y el nonce y usando el valor hasheado como semilla. Esta es la forma recomendada.
* Concatenando la semilla con el nonce. Sin embargo, esto puede traer problemas de aleatoriedad debido a fallas propias de RC4.

Es posible encontrar más información sobre este cifrador (y sus problemas) [en wikipedia](https://en.wikipedia.org/wiki/RC4).

### ChaCha

![Ronda Chacha](../chacha.png)

**Tamaño de llave** 256 bits

**Tamaño del Nonce** 64 bits

ChaCha es una familia de cifradores de flujo basada en una variante de Salsa20. Estos cifradores definen un estado inicial compuesto por "palabras" de 32 bit dispuestas en una matriz de 4x4:

|      |      |      |      |
|------|------|------|------|
| (00) `expa` | (01) `nd 3` | (02) `2-by` | (03) `te k` |
| (04) `  K ` | (05) `  K ` | (06) `  K ` | (07) `  K ` |
| (08) `  K ` | (09) `  K ` | (10) `  K ` | (11) `  K ` |
| (12) `  P ` | (13) `  P ` | (14) `  N ` | (15) `  N ` |

Donde:
* (XX) representa el número del byte (se usa más abajo)
* `expand 32-byte k` es un texto en ASCII de 16 caracteres (4 `words` de 32 bits)
* `K` es la llave dividida en 8 bloques de 32 bits cada uno
* `P` (posición) es un contador que lleva cuenta de la cantidad de bloques cifrados.
* `N` corresponde a un _nonce_, es decir, un valor que no debe repetirse entre usos del sistema.

Si bien el cifrado es de tipo "flujo", los bytes de éste se generan de a bloques de tamaño 512 bits (16 bytes). Para generar el bloque de número $i$, se ejecutan los siguientes pasos:

* Se setean los bytes $P$ del estado `arr` en el valor binario de $i$
* Se ejecuta 10 veces la siguiente operación en pseudocódigo (denominada "doble ronda") sobre el estado:
```python
func double_round():
  QR(0, 4, 8, 12)
  QR(1, 5, 9, 13)
  QR(2, 6, 10, 14)
  QR(3, 7, 11, 15)

  QR(0, 5, 10, 15)
  QR(1, 6, 11, 12)
  QR(2, 7, 8, 13)
  QR(3, 4, 9, 14)
```

Acá `QR` o _"Quarter Round"_ se define de la siguiente forma:

```python
def QR(a, b, c, d):
    arr[a] += arr[b]; arr[d]^=arr[a]; arr[d] <<<= 16;
    arr[c] += arr[d]; arr[b]^=arr[c]; arr[b] <<<= 12;
    arr[a] += arr[b]; arr[d]^=arr[a]; arr[d] <<<= 8;
    arr[c] += arr[d]; arr[d]^=arr[c]; arr[d] <<<= 7; 
```

Y `x <<<= y` corresponde a una "rotación de y bits al valor x".

Finalmente, los valores correspondientes al estado luego de correr 10 veces la _double round_ son XOReados con los datos, devolviendo el valor cifrado.

El descifrado se ejecuta de la misma forma, dado que XOR es una operación que se cancela a sí misma al ejecutarse dos veces sobre el mismo texto.

## Más allá del cifrado 

Muchas veces, el cifrado no es suficiente para asegurar que una comunicación entre dos partes ocurre de forma segura. Un ejemplo: Si un mensaje cifrado no contiene metainformación acerca de cuándo fue mandado, un atacante podría reenviar mensajes de una persona a la otra, haciéndola pensar que se dijo nuevamente algo que en verdad no se dijo. Este ataque se denomina `Ataque de Repetición` (o Replay Attack), y se puede evitar agregando información secuencial al mensaje (por ejemplo, un contador monótono para cada participante).

Otro problema que puede ocurrir frente a una comunicación cifrada es que el mensaje sea alterado por un atacante antes de llegar al receptor. En el caso del cifrado de flujo, donde la modificación de un byte del texto cifrado altera solamente un byte del texto plano, una modificación de este estilo podría cambiar el significado del mensaje cifrado en una letra o símbolo. Para evitar este problema, es posible "autentificar" el mensaje a través de "message authentication codes" (MACs), los cuales permiten demostrar que el mensaje descifrado no ha sido intervenido de ninguna forma.

### MAC

**Message Authentication Code**

MAC es el nombre formal de este código extra que se agrega al mensaje cifrado para comprobar su autenticidad. Existen muchas formas de generar un MAC, a continuación nombramos algunas: 
* **HMAC** se genera a partir de una función de Hash.
* **GCM** se genera a partir del uso de un cifrador de bloque (Gallois-Counter mode).
* **Poly1305** utiliza polinomios y una función extra (AES, un generador como ChaCha20) para generar aleatoriedad a partir de una semilla. 

#### Enfoques de autentificación

La autentificación del mensaje se podría realizar en tres puntos distintos. A continuación se muestran diagramas sobre cada forma de autentificar:

##### **Encrypt-Then-MAC (EtM)**
![Encrypt Then MAC](../etm.png)

Corresponde a autentificar el mensaje ya cifrado. Es necesario usar una llave distintas para evitar ataques como [el que se menciona acá](https://en.wikipedia.org/wiki/CBC-MAC#Using_the_same_key_for_encryption_and_authentication)

##### **Encrypt-And-MAC (E&M)**
![Encrypt And MAC](../eam.png)

En este caso no hay problemas con usar la misma llave para ambos procesos.

##### **MAC-Then-Encrypt (MtE)**
![MAC then encrypt](../mte.png)

En este caso tampoco hay problemas con usar la misma llave para ambos procesos.


Más información sobre cada enfoque se puede encontrar en [Wikipedia](https://en.wikipedia.org/wiki/Authenticated_encryption#cite_note-14).

### Cifrar y autentificar a la vez

Existen ciertos algoritmos para cifrar datos que integran una rutina de autentificación en el proceso de cifrado. Mencionaremos brevemente dos de los más utilizados:

### AES-GCM (Bloque)

**Galois-Counter Mode** es un modo de cifrado de bloque que además autentifica el mensaje cifrado. Este modo permite autentificar datos anexos a $P$ que necesiten ser autentificados, pero no cifrados. A esta información adicional no cifrada se le suele denominar $A$.

![Galois-Counter Mode](../gcm.png)

Más información sobre el algoritmo de autentificación [en Wikipedia](https://en.wikipedia.org/wiki/Galois/Counter_Mode)

### ChaCha20-Poly1305 (Flujo)

**ChaCha20-Poly1305** corresponde al uso combinado del cifrador de flujo ChaCha20 y del MAC Poly1305. Su funcionamiento es explicado en el [RFC 8439](https://tools.ietf.org/html/rfc8439). Google seleccionó este algoritmo como reemplazo de RC4 en TLS/SSL. Este algoritmo suele preferirse sobre AES-GCM en hardware que no tiene procesadores optimizados para AES.

