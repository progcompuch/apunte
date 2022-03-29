---
title: Pair y Tuple
lead: ''
date: 2022-3-28T08:48:45.000+00:00
images: []
weight: 206
menu:
  docs:
    parent: stl
---

Hasta ahora, solo hemos podido guardar 1 solo valor en los vectores, queues, stacks, etc. Esto puede no llegar a ser un mayor problema, ya que siempre se pueden crear múltiples vectores, pero, y si queremos ordenar un vector, pero aún así conocer la posición inicial que tenian los valores?, necesitamos una forma de mantener el valor y el índice juntos, y es aquí donde los `pair` entran al juego.

## Pair
Los `pair` permiten mantener 2 datos, de tipos distintos, juntos. Se pueden crear usando la función `make_pair`:
```c++
pair<int, string> p = make_pair(123, "El Blaz es pura energy");
```
O usando una *initializer list*:
```c++
pair<int, string> p = {123, "El Blaz es pura energy");
```

### Indexado
Para acceder a los valores de un `pair` se usan sus atributos (propiedades) `first` y `second`:

```c++
pair<int, string> p = {123, "El Blaz es pura energy"};
cout << p.first  << '\n'; // imprime: 123
cout << p.second << '\n'; // imprime: El Blaz es pura energy
```

### Comparación
Los pares se comparan lexicográficamente, es decir, si los `first` de ambos pares son iguales, entonces se comparan los `second`:

```c++
pair<int,string> p1 = {1, "a"};
pair<int,string> p2 = {2, "a"};
pair<int,string> p3 = {1, "b"};

// Los siguientes cout imprimen '1' (verdadero)
cout << p1 < p2 << '\n';
cout << p1 < p2 << '\n';
cout << p2 >= p3 << '\n';
```

Notar que para poder compararlos, deben ser del mismo tipo tanto los `first` como los `second`

## Tuple
En algunos casos necesitaremos guardar incluso más valores, y para eso se puede usar el tuple, que permite mantener juntos cuantos valores queramos, de cualquier tipo, a costa de perder legibilidad:
```c++
tuple<int,string,int> t = {1, "irtimdmitri", 2};
```

### Indexado
Para acceder a los valores de un `tuple` se debe usar la función `get<index>`:
```c++
tuple<int,string,int> t = {1, "irtimdmitri", 2};

cout << get<0>(t) << '\n';
cout << get<1>(t) << '\n';
cout << get<2>(t) << '\n';
```

### Comparación
Al igual que los pairs, las tuplas se comparan por orden lexicográfico:
```c++
tuple<int,string,int> t1 = {1,"a",1};
tuple<int,string,int> t2 = {2,"a",1};
tuple<int,string,int> t3 = {1,"b",1};
tuple<int,string,int> t4 = {1,"b",2};

// los siguientes cout imprimen '1' (verdadero)
cout << t1 < t2 << '\n';
cout << t1 < t3 << '\n';
cout << t1 < t4 << '\n';
cout << t3 < t4 << '\n';
cout << t2 >= t3 << '\n';
```


## Desempaquetado
Hay formas más concisas de obtener los valores de un `pair` o `tuple`, veremos 2 formas:

### tie
La función `tie` permite desempaquetar los valores, de esta forma:
```c++
tuple<int,string,char> t = {1, "abc", 'a'};

int a;
string b;
char c;

tie(a,b,c) = t;

cout << a << ' ' << b << ' ' << c << '\n';
```

### Structured Binding
El structured binding es una adición de C++17, que permite desempaquetar los valores sin siquiera escribir el tipo de cada uno:
```c++
tuple<int,string,char> t = {1, "abc", 'a'};

auto [a,b,c] = t;
cout << a << ' ' << b << ' ' << c << '\n';
```

