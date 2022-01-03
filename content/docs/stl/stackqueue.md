---
title: Stack y Queue
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 204
menu:
  docs:
    parent: stl

---

En esta sección vamos a ver un par de estructuras que nos permiten organizar nuestros datos de una forma muy específica, las cuales pueden no parecer muy útiles en un principio pero aparecen frecuentemente en los distintos algoritmos que se verán más adelante así que es importante entenderlas, saber como funcionan y como usarlas.

### Stack

El stack es una estructura LIFO (Last In, First Out), lo que significa que cuando sacamos un elemento de esta vamos a obtener el último elemento que pusimos en él. La mejor forma de ver esto es como si fuera una pila de cartas donde vamos apilandolas y cuando sacamos una, sacamos la de arriba (la última que pusimos).

<center> <img class="invertible" src="../stack.png" width="40%"/> </center>

Si quisieramos representar este proceso de poner cartas y sacarlas podríamos hacerlo de la siguiente forma:

```c++
int n;
cin>>n; // leemos el numero de cartas

stack<int> cartas; // inicializamos un stack

for (int i=0;i<n;i++){
	int carta;
	cin>>carta;
	cartas.push(carta); // apilamos la carta
}

cout<<"Hay "<<cartas.size()<<" cartas en la pila\n";

// mientras hayan cartas en la pila...
while (!cartas.empty()){

	// revisamos la de arriba
	cout<<cartas.top()<<'\n';
	
	//y la sacamos
	cartas.pop();
}
```

### Queue

La queue es una estructura FIFO (First In, First Out), o sea, cuando saquemos un elemento vamos a obtener el elemento más viejo que pusimos. La mejor forma de ver esto es como si fuera una cola de gente donde la gente se pone en fila y se van sacando a medida que van llegando.

<center> <img class="invertible" src="../queue.png" width="40%"/> </center>

Si quisieramos representar este proceso de poner la gente en fila se podría hacer de la siguiente forma:

```c++
int n;
cin>>n; // leemos el numero de personas

queue<string> cola; // inicializamos una queue

for (int i=0;i<n;i++){
	string persona;
	cin>>persona;
	cola.push(persona); // agregamos a la persona a la cola
}

cout<<"Hay "<<cola.size()<<" personas en la fila\n";

// mientras hayan personas en la fila...
while (!cola.empty()){

	// revisamos la de arriba
	cout<<cola.front()<<'\n';
	
	//y la sacamos
	cartas.pop();
}

```

Podemos notar que tienen funciones similares pero por eso mismo a veces es fácil confundirse, entones tener claras las diferencias de como funcionan es lo más importante, además de la función para sacar el elemento que en stack es **top** y en queue es **front**.

### Problemas

[UVa OJ 10172 - The Lonesome Cargo Distributor](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=1113)
               
