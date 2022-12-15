---
title: "Operadores de bits"
type: docs
menu:
    apunte:
        identifier: "apunte-introduccion_a_cpp-operadores_de_bits"
        parent: "apunte-introduccion_a_cpp"
weight: 50 # El menú lateral ordena artículos por su peso
---
### Números binarios

Probablemente te sea familiar el concepto de los números binarios, son números que están compuestos solamente por unos y ceros, cada dígito es llamado un bit, y dependiendo de la posición de este dígito es una distinta potencia de 2:

<center> <img class="invertible" src="img/bitwise-binarioadecimal.png" width="450"/> </center>

Hay bastantes problemas que requieren que revises los bits de un número y trabajes sobre ellos y esto es bastante fácil si sabes como hacerlo:

```c++
int number;
cin>>number;
vector<int> bits;
while (number != 0){
    bits.push_back(number%2);
    number/=2;
}
```
El código anterior lee un número y guarda sus bits en un vector. El módulo 2 revisa el último bit y dividirlo por 2 representa moverse al siguiente bit. Luego volver del vector al número es igual de fácil:

```c++
int pot = 1;
int number = 0;
for (int i=0;i<bits.size();i++){
    number += pot * bits[i];
    pot *= 2;
}
```

Aquí nos movemos bit por bit y a medida que cambiamos el bit cambiamos la potencia que representa.

El computador usa este sistema para guardar los números de forma interna y C++ nos permite trabajar directamente con ellos.

### Operadores bitwise

C++ nos permite usar operadores que trabajan sobre los bits de un número, estos son sumamente rápidos ya que el computador está diseñado para trabajar con ellos y saber usarlos bien puede ser una herramienta muy útil en ciertos problemas.

La mayoría de los operadores bitwise funcionan como operadores lógicos así que probablemente les resulten familiares.

| Operador | Sintaxis | a    | bits de a | b    | bits de b | resultado | bits del resultado |
| -------- | -------- | ---- | --------- | ---- | --------- | --------- | ------------------ |
| AND      | a & b    | 5    | 0101      | 3    | 0011      | 1         | 0001               |
| OR       | a \| b   | 5    | 0101      | 3    | 0011      | 7         | 0111               |
| XOR      | a ^ b    | 5    | 0101      | 3    | 0011      | 6         | 0110               |

Los operadores unarios son los más interesantes:

1. NOT al operarse sobre todos los bits del número va a convertir todos los ceros del principio en unos, esto siempre resulta en en ~a = -a-1 por temas de como interpretan los bits el computador.
2. Se puede notar que LEFT SHIFT y RIGHT SHIFT son solamente formas de multiplicar y dividir por potencias de dos rápidamente, aunque usualmente los compiladores optimizan las operaciones de este tipo internamente es bueno saberla por si queremos aplicarlas directamente nosotros. También es importante recordar que la división y el RIGHT SHIFT simplemente trunca el último dígito, o sea que es equivalente a la división piso; el LEFT SHIFT hace algo similar si el número se pasa de la cantidad de bits que tiene el número asignado, los bits que se pasan simplemente se truncan.

| Operador    | Sintaxis | Ejemplo | a    | bits de a | resultado | bits del resultado |
| ----------- | -------- | ------- | ---- | --------- | --------- | ------------------ |
| NOT         | ~a       | ~a      | 19   | 10011     | -20       | 111...01100        |
| LEFT SHIFT  | a << x   | a << 2  | 19   | 10011     | 76        | 1001100            |
| RIGHT SHIFT | a >> x   | a >> 2  | 19   | 10011     | 4         | 100                |

Con estos operadores podemos mejorar el código que mostramos al principio:

```c++
int number;
cin>>number;
vector<int> bits;
while (number != 0){
    bits.push_back(number&1);
    number>>=1;
}
```
El operador ```&1``` hace un AND con puros ceros excepto en la primera posición en donde va a ser 1 solamente si el primer bit también es 1. Luego el shift es equivalente a dividir por 2.

### Números como vectores booleanos

Resulta que con esto podemos usar los números como arreglos de booleanos y, como dije al principio, las operaciones bitwise son bastante rápidas, por lo tanto son bastante útiles para cuando necesitamos iterar por subconjuntos de un arreglo. Para dar un ejemplo, digamos que tenemos un vector *a* con *n* números y queremos probar todas las sumas posibles de los subconjuntos, si *n* es pequeño podemos hacer lo siguiente

```c++
for (int mask=0;mask < (1 << n);++mask){
    int suma = 0;
    for (int i=0;i<n;i++){
        if ( (1<<i) & (mask) != 0 ){
            suma += a[i];
        }
    }
    cout<<suma<<'\n';
}
```

Lo que hace este código es usar mask como un arreglo de booleanos, este va pasar por todos los números en [ 0 , 2<sup>n</sup> ) que son todos los subconjuntos posibles del arreglo, luego usamos un for para pasar por todos los elementos y comprobamos si el bit *i* está prendido haciendo un AND entre la máscara y 2<sup>i</sup> (que es solo un 1 en el bit *i* ), esto nos va a dar cero solamente si el bit *i* está apagado, por lo tanto solo van a ser sumados los elementos que estén prendidos en mask. Por supuesto que esto es solo un ejemplo ya que la suma es solo una pequeña cosa que podemos hacer con cualquier subconjunto del arreglo.

Lo más importante de recordar es que a pesar de que esto es muy rápido, sigue siendo pasar por todos los subconjuntos de un arreglo, esto es complejidad O(2<sup>n</sup>) aunque usemos los operadores bitwise, además mask está limitado por las capacidades del computador que solo le permite tener 32 bits a un int, aunque si usamos un long long podemos hacer lo mismo para tener 64 bits.

### Problemas

[UVa OJ 11933 - Splitting Numbers](https://onlinejudge.org/index.php?option=com_onlinejudge&amp;Itemid=8&amp;category=24&amp;page=show_problem&amp;problem=3084)

[UVa OJ 10264 - The Most Potent Corner](https://onlinejudge.org/index.php?option=com_onlinejudge&amp;Itemid=8&amp;category=24&amp;page=show_problem&amp;problem=1205)                                     
