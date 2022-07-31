---
title: Camino más corto en un grafo
lead: ''
date: 2022-03-19T08:48:45.000+00:00
images: []
weight: 604
menu:
  docs:
    parent: grafos

---

### Camino más corto en un grafo

Con frecuencia encontraremos problemas en los que necesitamos encontrar el camino más corto para llegar desde un nodo hasta otro y dependiendo de las características del grafo tendremos que usar algoritmos distintos.

### Grafos sin peso

Si las aristas del grafo no tienen peso entonces su distancia es solo la cantidad de aristas por las que se pasa, entonces podemos calcular la distancia desde un nodo cualquiera $u$ a todos los demás usando un solo [BFS](https://uchile.progcomp.cl/docs/grafos/busqueda/#bfs) ya que este llega pasando por los nodos en orden de distancia:

```c++
// n es la cantidad de nodos y s la fuente
int n,s;
// gr es la lista de adyacencia del grafo
vector< vector<int> > gr;

// Iniciamos un vector que tiene la distancia pero si no lo hemos calculado guarda un -1
vector<int> distancia(n,-1);

// Iniciamos la cola con la source
queue<int> bfs;
bfs.push(s);
distancia[s] = 0;

// Mientras la cola no esté vacía, tenemos nodos que revisar
while (!bfs.empty()){
	// Sacamos el nodo que está en la cola
	int nodo = bfs.front();
	bfs.pop();
	
	// Revisamos sus vecinos
	for (int vecino:gr[nodo]){
		// Si no lo hemos visitado, lo visitamos agregándolo a la cola
		if (distancia[vecino] == -1){
      // Y calculamos su distancia como la distancia de la fuente más uno
			bfs.push(vecino);
			distancia[vecino] = distancia[nodo] + 1;
		}
	}
}
```

### Grafos con pesos positivos

Si las aristas tienen peso, pueden haber caminos que tengan más aristas pero que la suma de sus pesos sea menor.
Para esto usamos el algoritmo de Dijkstra, muy similar al BFS pero en vez de usar una cola normal, usamos un [`priority_queue`](https://uchile.progcomp.cl/docs/stl/priority_queue/) que nos de los nodos más cercanos primero y al asignar la distancia revisamos si es menor a la que tenemos actualmente:

```c++
// Definimos los pares así al inicio para facilidad de su uso en la priority_queue
typedef pair<int,int> ii;

...

// gr es la lista de adyacencia del grafo que ahora tiene pares con la distancia
vector< vector<ii> > gr;

// Iniciamos el vector de la misma forma
vector<int> distancia(n,-1);

// Iniciamos la pq con pares que guardaran (distancia,nodo)
// y cambiamos su configuración para que nos de los más pequeños primero
priority_queue< ii,vector<ii>,greater<ii> > pq;

// Metemos la fuente a la cola y asignamos su distancia
pq.push(ii(0,s));
distancia[s] = 0;

// Mientras la cola no esté vacía, tenemos nodos que revisar
while (!pq.empty()){

	// Sacamos el nodo que esté a menor distancia ahora mismo
	int nodo = pq.top().first;
  int nodo_d = pq.top().second();
	bfs.pop();

  // Si su distancia es mayor que la distancia que tenemos guardada
  // significa que esta distancia ya se actualizó y no nos sirve
  if (nodo_d > distancia[nodo]) continue;
	
	// Revisamos sus vecinos
	for (ii arista:gr[nodo]){
    int vecino = arista.first;
    int vecino_d = arista.second;
		// Si no lo hemos visitado o su distancia es mayor que la podemos conseguir ahora lo cambiamos
		if (distancia[vecino] == -1 || distancia[vecino] > nodo_d + vecino_d){
      distancia[vecino] = nodo_d + vecino_d;
      pq.push(ii(vecino,nodo_d + vecino_d));
		}
	}
}
```

### Grafos con ciclos negativos

[Bellman-Ford](https://cp-algorithms.com/graph/bellman_ford.html)