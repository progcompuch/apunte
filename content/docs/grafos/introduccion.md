---
title: Introducción
lead: ''
date: 2022-03-19T08:48:45.000+00:00
images: []
weight: 601
menu:
  docs:
    parent: grafos

---

### ¿Qué son los grafos?

Los grafos son un tipo específico de estructura que nos sirve para modelar muchos problemas distintos. Estos se representan como un conjunto de puntos $V$ (llamados vértices o nodos) conectados por un conjunto de líneas $E$ (llamadas aristas o arcos). Las aristas pueden ser no-dirigidas (se pueden recorrer en ambas direcciones) o dirigidas y pueden tener peso o no.

<center> <img class="invertible" src="../grafo.png" width="40%"/> </center>

El área de grafos ha sido muy estudiada y se han desarrollado múltiples algoritmos para trabajar con ellos. Además, en programación competitiva es un tema que se repite con alta frecuencia.

### Guardar un grafo

Esta estructura puede ser representa de múltiples formas, pero las dos más comunes que veremos serán:

1. Lista de adyacencia: La idea aquí es guardar para cada nodo, una lista de nodos a los que este está conectado. Para esto usamos un vector de vectores en donde el $i$-ésimo vector representa los nodos a los que el nodo $i$ está conectado. Si las aristas tienen peso se puede usar un vector de pares para cada nodo donde se guarda el nodo al que está conectado y el peso.

```c++
// Asumiendo que n es la cantidad de nodos
vector< vector<int> > gr(n);
// Vamos a leer m aristas y agregarlas al grafo
while (m--){
	int u,v;
	cin>>u>>v;
	// Agregamos v a la lista de conexiones de u...
	gr[u].push_back(v);
	// y agregamos u a la lista de v
	gr[v].push_back(u);
	// si el grafo no es bidireccional basta con quitar esta segunda línea
}
```

2.Matriz de adyacencia: Aquí tendremos una matriz donde la fila y la columna nos indican de que nodos estamos hablando y el valor nos dirá si están conectados o no. Para esto usamos un vector de vectores $G$ de tamaño $n$ x $n$ y el valor $G_{i,j}$ será $0$ si los nodos $i$ y $j$ están desconectados y $1$ en otro caso. Si tenemos aristas con peso, basta con guardar el peso en las posiciones $G_{i,j}$ y algún valor específico en otro caso (asegurarse de que este valor no pueda ser un peso nunca).

```c++
// Todos parten desconectados
vector< vector<int> > gr(n, vector<int>(n,0));

while (m--){
	cin>>u>>v;
	gr[u][v] = 1;
	gr[v][u] = 1;
}
```

### Resolviendo un problema de grafos

Un problema simple que podemos resolver es encontrar el nodo con el grado máximo en un grafo, el grado es la cantidad de aristas que salen de un nodo y encontrar esto en una lista de adyacencia es fácil ya que solo es el tamaño del vector:

```c++
// Partimos con la respuesta base del primer nodo
int ans = 0;

// Pasemos por todos los nodos
for (int i=1;i<n;i++){
	// Si el nodo tiene un grado mayor que la respuesta actual lo cambiamos
	if ( gr[i].size() > gr[ans].size() ){  
		ans = i;
	}
}
```

Si tenemos el grafo guardado como una matriz de adyacencia es un poco más difícil:

```c++
// Partimos sin respuesta ya que todavía tenemos que calcular el grado
int ans=-1,grado_ans=-1;

// Pasamos por todos los nodos
for (int i=0;i<n;i++){
	
	// Calculamos el grado contando cuantos 1 hay en la fila
	int grado_i = 0;
	for (int j=0;j<n;j++){
		if (gr[i][j]) grado_i++;
	}
	
	// Y hacemos el mismo checkeo que antes
	if (grado_i > grado_ans){
		ans = i;
		grado_ans = grado_i;
	}
}
```
                                      