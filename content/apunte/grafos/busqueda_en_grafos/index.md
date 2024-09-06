---
title: "Búsqueda en grafos (BFS y DFS)"
type: docs
menu:
    apunte:
        identifier: "apunte-grafos-busqueda_en_grafos"
        parent: "apunte-grafos"
weight: 20 # El menú lateral ordena artículos por su peso
---
### Búsqueda en grafos

Ahora, sabemos que podemos modelar problemas con grafos y cómo guardarlos de forma eficiente pero no podemos hacer nada aún con ellos. Estos primeros algoritmos que veremos ahora son esenciales y se usan con demasiada frecuencia así que es importante entenderlos bien.

Para estos dos algoritmos (y en general) usaremos listas de adyacencia, dado que de esta manera es mucho más eficiente listar los vecinos de un nodo.

<center> <img class="invertible" src="img/bfs_dfs.png" width="450"/> </center>

### Breadth-first search (BFS)

La búsqueda por anchura o BFS (Breadth-first search en inglés) es un algoritmo de búsqueda en grafos que recorre todos los nodos del grafo de menor a mayor distancia. Se parte de la fuente $s$ (por source en inglés), se recorren todos sus vecinos, luego los vecinos de los vecinos y así hasta que no queden nodos sin visitar. Para esto usamos una cola de la siguiente manera:

```c++
// n es la cantidad de nodos y s la fuente
int n, s;
// gr es la lista de adyacencia del grafo
vector <vector<int>> gr;

// Iniciamos una lista que nos dice si hemos visitado el nodo o no
// Al principio no hemos visitado ninguno
vector <bool> visitado(n, false);

// Iniciamos la cola con la source
queue <int> bfs;
bfs.push(s);
visitado[s] = true;

// Mientras la cola no esté vacía, tenemos nodos que revisar
while(!bfs.empty()){
	// Sacamos el nodo que está en la cola
	int nodo = bfs.front();
	bfs.pop();
	
	// Revisamos sus vecinos
	for(int vecino : gr[nodo]){
		// Si no lo hemos visitado, lo visitamos agregándolo a la cola
		if(!visitado[vecino]){
			bfs.push(vecino);
			visitado[vecino] = true;
		}
	}
}
```

Con este código estamos recorriendo al grafo por "distancia" aunque esto solo considera la cantidad de aristas entre un nodo y otro, cuando las aristas tengan peso es otra historia, pero cuando no tienen peso este algoritmo de hecho es una forma perfecta de calcular la distancia de un nodo a otro, solo basta con inicializar la distancia de la source en $0$ y agregar esta linea cuando visitemos a un vecino:

Con esto, visitaremos el grafo en orden de distancias al nodo inicial, asumiendo que las aristas no tienen pesos. Aprovechando esta propiedad, podemos además computar las distancias mínimas de todos los nodos hasta el nodo inicial, basta con crear un vector `distancia`, inicializar la distancia del nodo inicial en $0$ y agregar esta línea cuando visitemos a un vecino:

```c++
distancia[vecino] = distancia[nodo] + 1;
```

### Depth-first search (DFS)

La búsqueda en profundidad o DFS (Depth First Search) es un algoritmo de búsqueda en grafos que recorre completamente una rama primero y después se devuelve a revisar las demás. La forma más fácil de implementar esto es con una función recursiva:

```c++
// La función recibe:
// nodo: El nodo que estamos visitando actualmente
// gr: La lista de adyacencia del grafo
// visitado: La lista de nodos visitados
// Notar que los dos vectores son pasados por referencia para evitar copiarlos
// por cada llamada, para hacer esto basta con poner & antes del nombre. 
// Otra opción es declararlos de forma global si siempre se usará el mismo grafo.
void dfs(int nodo, vector <vector<int>> &gr, vector <bool> &visitado){
	visitado[nodo] = true;
	// Pasamos por todos los vecinos del nodo
	for (int vecino : gr[nodo]){
		// Checkeamos si no lo hemos visitado
		if (!visitado[vecino]){
			// Importante ponerlo visitado antes de llamarlo para evitar ciclos
			visitado[vecino] = true;
			// Llamamos a la función
			dfs(vecino, gr, visitado);
		}
	}
	
}

// Luego, en el main u otra función podemos llamar al DFS desde un nodo "s" de esta manera
dfs(s, gr, visitado);
```

### Aplicaciones

#### Contar componentes conexas

Nota que el DFS y BFS recorren solo la componente conexa del nodo inicial. Podemos usar esto para contar la cantidad de componentes conexas del grafo:
```c++
int componentes = 0;
for(int i=0; i<n; i++){
	// Si el nodo i no ha sido visitado, pertenece a una componente
	// conexa que no hemos recorrido, así que la recorremos
	// y sumamos 1 al contador.
	if(!visitado[i]){
		dfs(i, gr, visitado);
		componentes++;
	}
}
```
Nota que cada componente se contará una sola vez, ya que al llamar a DFS en ella se marcarán todos sus nodos como visitados.

#### Grafos bipartitos

Un grafo bipartito es un grafo que cumple que se pueden dividir todos los nodos en dos conjuntos tal que los nodos de un conjunto solo están conectados con los nodos del otro conjunto, o sea, no existe ninguna arista que conecte dos nodos del mismo conjunto.

<center> <img class="invertible" src="img/bipartito.png" width="450"/> </center>

Otra forma clásica de formularlo es que se puede colorear el grafo con dos colores, escogiendo un color para cada nodo de forma que no hayan vecinos del mismo color.

Un algoritmo clásico es el "bipartite check", que consiste en chequear si un grafo es bipartito o no. Podemos notar que cualquier nodo que escojamos tiene que pertenecer a alguno de los dos conjuntos así que basta con revisar para cada nodo que todos sus vecinos sean del otro tipo, luego los vecinos de los vecinos tienen que ser del primer tipo de nuevo y así. Esto lo podemos hacer con DFS o BFS. El siguiente código es una forma de hacerlo con BFS:

```c++
vector <bool> visitado(n, false);

// Iniciamos asumiendo que es bipartito
bool bipartito = true;

// Aquí guardamos el número del conjunto para cada nodo
// Como son solo dos usaremos 1 y 2
vector <int> conjunto(n);

// Pasamos por todos los nodos
for(int i=0; i<n; i++){

	// Si no hemos visitado este nodo hay que checkear su componente conexa.
	// Esto no sería necesario si el grafo fuera conexo,
	// en ese caso bastaría con un BFS desde un nodo cualquiera
	if (!visitado[i]){
		// Inicializamos la fuente con i
		int s = i;
		queue <int> bfs;
		bfs.push(s);
		visitado[s] = true;
		
		// Le asignamos un conjunto, digamos sin pérdida de
		// generalidad que este nodo está en el conjunto 1.
		conjunto[s] = 1;
		
		// Parte el BFS
		while(!bfs.empty()){
			int nodo = bfs.front();
			bfs.pop();
			for(int vecino : gr[nodo]){
			
				// Si no ha sido visitado...
				if(!visitado[vecino]){
					bfs.push(vecino);
					visitado[vecino] = true;
					
					// Le asignamos el conjunto opuesto
					if(conjunto[nodo] == 1){
						conjunto[vecino] = 2;
					}
					else{
						conjunto[vecino] = 1;
					}
					
				// Si ya lo visitamos...
				}
				else{
					// Y tienen el mismo conjunto asignado...
					if(conjunto[nodo] == conjunto[vecino]){
						// ¡No es bipartito!
						bipartito = false;
					}
				}
			}
		}
	}
}

if(bipartito){
	cout << "Es bipartito\n";
}
else{
	cout << "No es bipartito\n";
}

```

El primer for es para chequear cada componente conexa, en el caso de que el grafo no sea conexo. Este algoritmo solo funciona con un grafo no dirigido.
