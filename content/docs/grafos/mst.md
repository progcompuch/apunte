---
title: Minimum Spanning Tree (MST)
lead: ''
date: 2022-03-19T08:48:45.000+00:00
images: []
weight: 603
menu:
  docs:
    parent: grafos

---

### MST

El Minimum Spanning Tree o Árbol Recubridor Mínimo es un subconjunto de las aristas de un grafo que conectan a todos los vértices usando el menor peso posible.

<center> <img class="invertible" src="../mst.png" width="450"/> </center>

En este ejemplo podemos ver el grafo completo con las aristas grises y el subgrafo MST marcado en negro que deja a todos los vértices conectados usando la menor suma de los pesos de las aristas posible.

Esto es un árbol siempre que todas las aristas sean positivas [^1] ya que si no fuera un árbol, existe un ciclo y si existe un ciclo, podemos eliminar la arista más pesada del ciclo y el grafo sigue conectado con menor peso.

Los algoritmos que vamos a enseñar para encontrar los algoritmos son bastante simples y pueden parecer poco formales, pero funcionan y existen pruebas de que funcionan si les interesa buscar.
 
### Algoritmo de Kruskal

El algoritmo basado

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

Este algoritmo no es popular debido a lo enredado que es trabajar con pares de pares. En comparación, Kruskal es mucho más simple de leer.

[^1]: Si las aristas pueden ser negativas, se puede hacer todo el procedimiento para encontrar el MST normalmente y luego agregar todas las aristas negativas que sobraron. Deja de ser un árbol claramente pero tiene menor peso conectando todos los vértices. Mientras entiendas el procedimiento no tendrás problemas para resolver un problema que necesita usar MST.