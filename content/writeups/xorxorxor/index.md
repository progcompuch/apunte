---
title: "xorxorxor"
description: "Writeup del problema xorxorxor"
date: 2020-10-06T08:49:55+00:00
draft: false
---

# XORXORXOR

Este problema es de Hack The Box, y fue diseñado por "r4j"

Este problema nos entrega dos archivos, uno que "tiene la flag":

`Flag: 134af6e1297bc4a96f6a87fe046684e8047084ee046d84c5282dd7ef292dc9`

Y otro archivo con un programa para "encriptar" y "desencriptar":

```py
#!/usr/bin/python3
#!/usr/bin/python3
import os
flag = open('flag.txt', 'r').read().strip().encode()

class XOR:
    def __init__(self):
        self.key = os.urandom(4)
    def encrypt(self, data: bytes) -> bytes:
        xored = b''
        for i in range(len(data)):
            xored += bytes([data[i] ^ self.key[i % len(self.key)]])
        return xored
    def decrypt(self, data: bytes) -> bytes:
        return self.encrypt(data)

def main():
    global flag
    crypto = XOR()
    print ('Flag:', crypto.encrypt(flag).hex())

if __name__ == '__main__':
    main()


```

Cuando nos entregan un programa o script, siempre es bueno partir analizando lo que hace:

- Lee una flag desde el archivo `flag.txt`.
- La "encripta" usando el método encrypt de la clase XOR.
- Imprime el string "Flag:" y la flag encriptada, pero pasada a hexadecimal.

Si vemos la clase XOR, podemos ver que la encriptación y decriptación funcionan igual. Esto es porque en la función encrypt se usa la operación XOR, que es el o exclusivo bit a bit. Esta operación es bit a bit, y un bit del resultado es 1 sólo cuando uno, y no ambos, operandos tiene un bit como 1 en esa posición. Por ejemplo:

```
    1001110
xor 1000101
  = 0001011
```

Lamentablemente, no sabemos con qué se está haciendo XOR. Peor aún, el programa lo generó automáticamente. Pero sí sabemos que es de 4 bytes, y se van codificando 4 bytes de la flag a la vez.

Una opción entonces es generar todas las combinaciones posibles de 4 bytes, y ver cuál nos da un formato de flag.

La opción más rápida es aprovechar que sabemos dos cosas: las flags en hackthebox empiezan con HTB{, y XOR cumple la siguiente propiedad:

`a xor b = c => a xor c = b`

En el mismo ejemplo anterior:

```
    0001011
xor 1001110
  = 1000101
```

O sea que si hacemos XOR de la flag con HTB{, podemos obtener la llave para desencriptar la flag. Para eso, usaremos dos herramientas, CyberChef y un XOR hexadecimal online (así nos ahorramos programarlo).

Pasamos HTB{ a hexadecimal, lo que nos da `48 54 42 7b`. Hacemos xor con los primeros 8 caracteres de la flag en hex, y nos da `5b1eb49a`, que debería ser nuestra llave. 

La usamos en la flag y obtenemos `4854427B72657033347433645F7830725F6E30745F73305F7333637572337D`. Ahora solo falta pasarla de hex a algo legible (con cyberchef), y obtenemos nuestra flag!