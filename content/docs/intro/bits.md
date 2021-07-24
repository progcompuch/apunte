---
title: Operadores bitwise
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 105
menu:
  docs:
    parent: intro

---
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
2. Se puede notar que LEFT SHIFT y RIGHT SHIFT son solamente formas de multiplicar y dividir por potencias de dos rápidamente, aunque usualmente los compiladores optimizan las operaciones de este tipo internamente es bueno saberla por si queremos aplicarlas nosotros. También es importante recordar que la división y el RIGHT SHIFT simplemente trunca el último dígito, o sea que es equivalente a la división piso, y el LEFT SHIFT hace algo similar si el número se pasa de la cantidad de bits que tiene el número asignado, los bits que se pasan simplemente se truncan.

| Operador    | Sintaxis | Ejemplo | a    | bits de a | resultado | bits del resultado |
| ----------- | -------- | ------- | ---- | --------- | --------- | ------------------ |
| NOT         | ~a       | ~a      | 19   | 10011     | -20       | 111...01100        |
| LEFT SHIFT  | a << x   | a << 2  | 19   | 10011     | 76        | 1001100            |
| RIGHT SHIFT | a >> x   | a >> 2  | 19   | 10011     | 4         | 100                |

Ahora, ¿cómo nos puede servir esto para programación competitiva? Resulta que con esto podemos usar los números como arreglos de booleanos y, como dije al principio, las operaciones bitwise son bastante rápidas, por lo tanto son bastante útiles para cuando necesitamos iterar por subconjuntos de un arreglo. Para dar un ejemplo, digamos que tenemos un vector *a* con *n* números y queremos probar todas las sumas posibles de los subconjuntos, si *n* es pequeño podemos hacer lo siguiente

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

Lo que hace este código es usar mask como un arreglo de booleanos, este va pasa por todos los números en [ 0 , 2<sup>n</sup> ) que son todos los subconjuntos posibles del arreglo, luego usamos un for para pasar por todos los elementos y comprobamos si el bit *i* está prendido haciendo un AND entre la máscara y 2<sup>i</sup> (que es solo un 1 en el bit *i* ), esto nos va a dar cero solamente si el bit *i* está apagado, por lo tanto esto solo van a ser sumados los elementos que no estén prendidos en mask. Por supuesto que esto es solo un ejemplo ya que la suma es solo una pequeña cosa que podemos hacer con cualquier subconjunto del arreglo.

Lo más importante de recordar es que a pesar de que esto es muy rápido, sigue siendo pasar por todos los subconjuntos de un arreglo, esto es complejidad O(2<sup>n</sup>) aunque usemos los operadores bitwise, además mask está limitado por las capacidades del computador que solo le permite tener 32 bits a un int, aunque si usamos un long long podemos hacer lo mismo para tener 64 bits.
