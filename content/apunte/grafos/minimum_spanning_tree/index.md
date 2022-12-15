---
title: "Minimum spanning tree"
type: docs
menu:
    apunte:
        identifier: "apunte-grafos-minimum_spanning_tree"
        parent: "apunte-grafos"
weight: 40 # El menú lateral ordena artículos por su peso
---
El Minimum Spanning Tree (MST) o Árbol Recubridor Mínimo es un subconjunto de las aristas de un grafo que conectan a todos los vértices usando el menor peso posible.

<center> <img class="invertible" src="../mst.png" width="450"/> </center>

En este ejemplo podemos ver el grafo completo con las aristas grises y el subgrafo MST marcado en negro que deja a todos los vértices conectados usando la menor suma de los pesos de las aristas posible.

Esto es un árbol siempre que todas las aristas sean positivas [^1] ya que si no fuera un árbol, existe un ciclo y si existe un ciclo, podemos eliminar la arista más pesada del ciclo y el grafo sigue conectado con menor peso.

Los algoritmos que vamos a enseñar para encontrar los algoritmos son bastante simples y pueden parecer poco formales, pero funcionan y existen pruebas de que funcionan si les interesa buscar.
 
### Algoritmo de Kruskal

El algoritmo de Kruskal ordena las aristas de menor a mayor peso y para cada arista revisa si está conectando dos componentes desconectadas usando un [Union Find](https://uchile.progcomp.cl/docs/ds/unionfind/) para determinar si dos nodos son parte del mismo conjunto.

```c++
typedef pair<int,int> ii;
typedef pair<int,ii> iii;
// Toma una lista de adyacencia con pares (vecino,peso)
// Retorna una lista de adyacencia con las aristas del MST
vector< vector<ii> > kruskal(vector< vector<ii> > &gr){
	int n = gr.size();
	vector< vector<ii> > ans(n);
	// Creamos una lista de aristas y agregamos todas las aristas del grafo
	vector<iii> edges;
	for (int i=0;i<n;i++){
		for (int j=0;j<gr[i].size();j++){
			edges.emplace_back(gr[i][j].second,i,gr[i][j].first);
		}
	}
	// Ordenamos las aristas por peso de menor a mayor
	sort(edges.begin(),edges.end());
	// Creamos nuestro Union Find
	ufset uf(n);
	for (int i=0;i<edges.size();i++){
		int repa = uf.findp(edges[i].second.first);
		int repb = uf.findp(edges[i].second.second);
		// Si la arista conecta dos nodos que están en conjuntos distintos
		if (repa != repb){
			// Agregamos la arista a la respuesta
			ans[edges[i].second.first].emplace_back(edges[i].second.second,edges[i].first);
			ans[edges[i].second.second].emplace_back(edges[i].second.first,edges[i].first);
			// Y unimos los dos conjuntos
			uf.uni(repa,repb);
		}
	}
	return ans;
}
```

### Algoritmo de Prim

El algoritmo de Prim toma un vértice cualquiera para empezar y marca a todos los demás como no visitados. Agrega todas las aristas del vértice a una [Priority Queue](https://uchile.progcomp.cl/docs/stl/priority_queue/) y sacamos la arista más pequeña que visite a un nodo nuevo, agregamos esta arista a nuestra respuesta, marcamos el nodo nuevo y agregamos las aristas que nos trae este nodo a la cola.

```c++
typedef pair<int,int> ii;
typedef pair<int,ii> iii;
// Toma una lista de adyacencia con pares (vecino,peso)
// Retorna una lista de adyacencia con las aristas del MST
vector< vector<ii> > prim(vector< vector<ii> > &gr){
    int n = gr.size();
    vector< vector<ii> > ans(n);
    vector<int> visitado(n,false);
    priority_queue< iii,vector<iii>,greater<iii> > pq;
    // Marcamos el nodo 0 como visitado y agregamos sus aristas
    visitado[0] = true;
    for (ii ve:gr[0]){
        pq.emplace(ve.second,0,ve.first);
    }
    // Recorremos la pq tomando las aristas más pequeñas primero
    while (!pq.empty()){
        iii enlace = pq.top();
        pq.pop();
        int peso = enlace.first;
        int nodo = enlace.second.first;
        int vecino = enlace.second.second;
        // Si el vecino de esta arista no ha sido visitado...
        if (!visitado[vecino]){
            // Agregamos la arista a la respuesta
            ans[nodo].emplace_back(vecino,peso);
            ans[vecino].emplace_back(nodo,peso);
            // Lo marcamos como visitado
            visitado[vecino] = true;
            // Agregamos todas sus aristas a la pq
            for (ii ve:gr[vecino]){
                pq.emplace(ve.second,vecino,ve.first);
            }
        }
    }
    // Retornamos el grafo construido
    return ans;
}
```

Este algoritmo no es popular debido a lo enredado que es de implementar en comparación con Kruskal.

### Minimax (y Maximin)

El problema del camino Minimax es encontrar el camino de un vértice a otro en el grafo tal que se minimice el peso de la arista más pesada del camino. El Maximin se define al revés, el camino que maximice el peso de la arista más liviana.

Un problema clásico de este tipo es que tenemos computadoras conectadas con cables con una capacidad $c$, entonces la velocidad máxima va a estar en el camino donde la arista más pequeña sea lo más grande posible, o sea, Maximin.

Los caminos para esta pregunta son los caminos del MST (en el caso del Maximin se usa el Maximum Spanning Tree que es fácil de construir ordenando las aristas al revés) entonces para calcular estas respuestas solo es necesario revisar la máxima arista del camino.

```c++
// Dado que tenemos el MST en gr
vector< vector<ii> >gr;
// Calculamos cuál es la máxima arista del nodo s a los demás
int s;
vector<int> cost(n,-1);
cost[s] = 0;
// Usamos un BFS para recorrer el grafo
queue<int> bfs;
bfs.push(s);
while (!bfs.empty()){
	int no = bfs.front();
	bfs.pop();
	for (ii ne:gr[no]){
		// Si no lo hemos visitado
		if (cost[ne.first] == -1){
			// Su costo va a ser el máximo entre el costo del nodo y esta nueva arista
			cost[ne.first] = max(ne.second,cost[no]);
			bfs.push(ne);
		}
	}
}
```

[^1]: Si las aristas pueden ser negativas, se puede hacer todo el procedimiento para encontrar el MST normalmente y luego agregar todas las aristas negativas que sobraron. Deja de ser un árbol claramente pero tiene menor peso conectando todos los vértices. Mientras entiendas el procedimiento no tendrás problemas para resolver un problema que necesita usar MST.