---
title: Búsqueda en grafos (BFS y DFS)
lead: ''
date: 2022-03-19T08:48:45.000+00:00
images: []
weight: 602
menu:
  docs:
    parent: grafos

---

### Búsqueda en grafos

Ahora, sabemos que podemos modelar problemas con grafos y como guardarlos de forma eficiente pero no podemos hacer nada aún con ellos. Estos primeros algoritmos que veremos ahora son esenciales y se usan con demasiada frecuencia así que es importante entederlos bien.

Para estos dos algoritmos usaremos grafos guardados como listas de adyacencia. Ambos pueden ser implementados con matrices de adyacencia pero debido a la facilidad con la que podemos encontrar a los vecinos de cualquier vértice $i$ en las listas de adyacencia se prefiere este método (y en general se usa más la lista de adyacencia).

### BFS

La búsqueda por anchura o BFS (Breadth First Search en inglés) es un algoritmo de búsqueda en grafos que recorre todos los nodos del grafo de menor a mayor distancia. Se parte de la fuente $s$ (por source en inglés), se recorren todos sus vecinos, luego los vecinos de los vecinos y así hasta que no queden nodos sin visitar. Para esto usamos una cola de la siguiente manera:

```c++
// n es la cantidad de nodos y s la fuente
int n,s;
// gr es la lista de adyacencia del grafo
vector< vector<int> > gr;

// Iniciamos una lista que nos dice si hemos visitado el nodo o no
// Al principio no hemos visitado ninguno
vector<bool> visitado(n,false);

// Iniciamos la cola con la source
queue<int> bfs;
bfs.push(s);
visitado[s] = true;

// Mientras la cola no esté vacía, tenemos nodos que revisar
while (!bfs.empty()){
	// Sacamos el nodo que está en la cola
	int nodo = bfs.front();
	bfs.pop();
	
	// Revisamos sus vecinos
	for (int vecino:gr[nodo]){
		// Si no lo hemos visitado, lo visitamos agregándolo a la cola
		if (!visitado[vecino]){
			bfs.push(vecino);
			visitado[vecino] = true;
		}
	}
}
```

Con este código estamos recorriendo al grafo por "distancia" aunque esto solo considera la cantidad de aristas entre un nodo y otro, cuando las aristas tengan peso es otra historia, pero cuando no tienen peso este algoritmo de hecho es una forma perfecta de calcular la distancia de un nodo a otro, solo basta con inicializar la distancia de la source en $0$ y agregar esta linea cuando visitemos a un vecino:

```c++
distancia[vecino] = distancia[nodo] + 1;
```

### DFS

La búsqueda en profundidad o DFS (Depth First Search) es un algoritmo de búsqueda en grafos que recorre completamente una rama primero y después se devuelve a revisar las demás. La forma más fácil de implementar esto es con una función recursiva:
```c++
// La función recibe:
// El nodo que estamos visitando actualmente
// La lista de adyacencia del grafo
// La lista de nodos visitados
// Notar que los dos vectores son pasados por referencia para evitar copiarlos por cada llamada
// Para hacer esto basta con poner & antes del nombre
void dfs(int nodo, vector< vector<int> > &gr, vector<bool>& visitado){

	// Pasamos por todos los vecinos del nodo
	for (int vecino:gr[nodo]){
		// Checkeamos si no lo hemos visitado
		if (!visitado[vecino]){
			// Importante ponerlo visitado antes de llamarlo para evitar ciclos
			visitado[vecino] = true;
			// Llamamos a la función
			dfs(vecino,gr,visitado);
		}
	}
	
}

// Para llamarlo en main hay que asegurarse de poner la fuente visitada
visitado[s] = true;
dfs(s,gr,visitado);
```

Con este código recorremos cada camino lo más posible antes de continuar.
                                   