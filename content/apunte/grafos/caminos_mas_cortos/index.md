---
title: "Caminos más cortos"
type: docs
menu:
    apunte:
        identifier: "apunte-grafos-caminos_mas_cortos"
        parent: "apunte-grafos"
weight: 50 # El menú lateral ordena artículos por su peso
---
### Camino más corto en un grafo

Con frecuencia encontraremos problemas en los que necesitamos encontrar el camino más corto para llegar desde un nodo hasta otro y dependiendo de las características del grafo tendremos que usar algoritmos distintos. Nota que en un grafo
pueden haber múltiples caminos más cortos (con el mismo peso).

### Grafos sin peso

Si las aristas del grafo no tienen peso, entonces su distancia es solo la cantidad de aristas por las que se pasa, luego podemos calcular la distancia desde un nodo cualquiera $u$ a todos los demás usando un solo [BFS](https://uchile.progcomp.cl/docs/grafos/busqueda/#bfs) ya que este recorre el grafo expandiéndose. Es decir, primero recorre el nodo con distancia cero (el inicial), luego los de distancia uno, luego los de dos, etcétera.

```c++
// n es la cantidad de nodos y s la fuente
int n,s;
// gr es la lista de adyacencia del grafo
vector<vector<int>> gr;

// Iniciamos un vector que tiene la distancia pero si no lo hemos calculado guarda un -1
vector<int> distancia(n, -1);

// Iniciamos la cola con la source
queue<int> bfs;
bfs.push(s);
distancia[s] = 0;

// Mientras la cola no esté vacía, tenemos nodos que revisar
while (!bfs.empty()) {
    // Sacamos el nodo que está en la cola
    int nodo = bfs.front();
    bfs.pop();
    
    // Revisamos sus vecinos
    for (int vecino: gr[nodo]) {
        // Si no lo hemos visitado, lo visitamos agregándolo a la cola
        if (distancia[vecino] == -1) {
        // Y calculamos su distancia como la distancia de la fuente más uno
            bfs.push(vecino);
            distancia[vecino] = distancia[nodo] + 1;
        }
    }
}
```

### Grafos con pesos positivos

Si las aristas tienen peso, pueden haber caminos que tengan más aristas pero que la suma de sus pesos sea menor.
Para esto usamos el algoritmo de [Dijkstra](https://cp-algorithms.com/graph/dijkstra.html), muy similar al BFS pero en vez de usar una cola normal, usamos un [`priority_queue`](https://uchile.progcomp.cl/docs/stl/priority_queue/) que nos de los nodos más cercanos primero y al asignar la distancia revisamos si es menor a la que tenemos actualmente:

```c++
// Definimos los pares así al inicio para facilidad de su uso en la priority_queue
typedef pair<int, int> ii;

...

// gr es la lista de adyacencia del grafo que ahora tiene pares (distancia, nodo)
vector<vector<ii>> gr;

// Iniciamos el vector de la misma forma
vector<int> distancia(n,-1);

// Iniciamos la pq con pares que guardaran (distancia,nodo)
// y cambiamos su configuración para que nos de los más pequeños primero
priority_queue<ii, vector<ii>, greater<ii>> pq;

// Metemos la fuente a la cola y asignamos su distancia
pq.push({0, s});
distancia[s] = 0;

// Mientras la cola no esté vacía, tenemos nodos que revisar
while (!pq.empty()) {

    // Sacamos el nodo que esté a menor distancia ahora mismo
    auto [nodo_d, nodo] = pq.top();
    pq.pop();

    // Si su distancia es mayor que la distancia que tenemos guardada
    // significa que esta distancia ya se actualizó y no nos sirve
    if (nodo_d > distancia[nodo])
        continue;
    
    // Revisamos sus vecinos
    for (auto [vecino_d, vecino]: gr[nodo]) {
        // Si no lo hemos visitado o su distancia es mayor que la podemos conseguir ahora lo cambiamos
        if (distancia[vecino] == -1 || distancia[vecino] > nodo_d + vecino_d) {
            distancia[vecino] = nodo_d + vecino_d;
            pq.push({distancia[vecino], vecino});
        }
    }
}
```

### Grafos con pesos negativos y ciclos negativos

Para grafos con pesos negativos se puede usar el algoritmo de [Bellman-Ford](https://cp-algorithms.com/graph/bellman_ford.html).

Si hay ciclos negativos alcanzables, el camino de menor peso tendrá peso $-\infty$. El algoritmo se puede modificar para [encontrar estos ciclos](https://cp-algorithms.com/graph/bellman_ford.html#the-case-of-a-negative-cycle).
