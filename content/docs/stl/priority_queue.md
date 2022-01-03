---
title: Priority Queue
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 205
menu:
  docs:
    parent: stl

---

### Priority Queue

La priority_queue es un contenedor de elementos que permite insertar y obtener el máximo elemento con complejidad $O( \log(n) \cdot k )$ donde $k$ es la complejidad de comparar dos elementos. Puede que esto suene como una estructura limitada que cumple una función muy específica, pero esto es algo que se ve repetido bastante en algoritmos y problemas.

Esta estructura internamente implementa un [heap](https://es.wikipedia.org/wiki/Mont%C3%ADculo_(inform%C3%A1tica)), no es necesaria entenderla a profundidad para usarla.

```c++
// se construye una priority queue vacía
priority_queue<int> pq;

// insertamos todos los números del 0 al 9
for (int i=0;i<10;i++) pq.push(i);

// mientras hayan elementos en la pq
while (!pq.empty()){

	// imprimo el más grande
	cout<<pq.top()<<endl;
	
	// y lo saco de la estructura
	pq.pop();
}

```

Se puede hacer que la estructura entregue los elementos al revés, de menor a mayor, y hay dos formas:

1. Cambiando el comparador de la estructura al construirlo
```c++
// se contruye la priority queue con un comparador especial
priority_queue< int , vector<int> , greater<int> > pq;
```

2. Invertir el orden al insertar y sacar los elementos:
```c++
priority_queue<int> pq;

// multiplicamos por -1 al insertar
for (int i=0;i<10;i++) pq.push(-i);

while (!pq.empty()){

	// imprimimos multiplicado por -1
	cout<<-1*pq.top()<<endl;
	
	pq.pop();
}

```

Este segundo método es popular por lo intuitivo que es pero genera problemas a la hora de debuggear y hay que ser cuidadoso, recomendamos usar el primer método.

### Problemas

[11995 - I Can Guess the Data Structure!](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=3146)

[10954 - Add All](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=1895)
               