---
title: Caminos y Ciclos Eulerianos
lead: ''
date: 2022-03-19T08:48:45.000+00:00
images: []
weight: 603
menu:
  docs:
    parent: grafos

---

## Introducción

Un camino euleriano es un camino que ocupa todas las **aristas** de un grafo sin repetirlas. Además, este camino será un **ciclo** euleriano
si también es un ciclo (empieza y termina en el mismo nodo). Primero asumiremos un grafo no dirigido y al final hablaremos de grafos 
dirigidos. Permitiremos que sea un multigrafo (con aristas repetidas entre un par de nodos).

A continuación un camino euleriano. Nota que los nodos de inicio y fin están marcados, y las aristas están enumeradas:
<center> 
<img class="invertible" src="../camino_euleriano.png" width="300"/> 
</center>
Y un ciclo euleriano se ve así:
<center> 
<img class="invertible" src="../ciclo_euleriano.png" width="300"/>
</center>

Ten cuidado de no confundir un camino euleriano (cada arista se visita una vez) con uno hamiltoniano (cada nodo se visita una vez).

## Condiciones
### Conectividad
Para que puedan existir caminos o ciclos eulerianos, obviamente necesitamos que el grafo sea _suficientemente conexo_. Esto significa
que todas las aristas estén en la misma componente conexa (pero podrían haber nodos aislados fuera de ésta).

### Grados de los vértices
#### Ciclo euleriano
Para que exista un ciclo euleriano, todos los vértices deben tener grado par (donde el grado de un vértice es la cantidad de vecinos o aristas que salen de él).
Es simple notar que esta condición es necesaria, puesto que cada vez que en el camino entramos a un nodo $u$, también tenemos que salir de él. Es decir: 

\begin{align*}
	(\text{veces que entramos a $u$})+(\text{veces que salimos de $u$}) &= \text{grado}(u) \newline
	2 \cdot (\text{veces que entramos a $u$}) &= \text{grado}(u) \newline
	&\implies \text{grado}(u) \text{ es par}.
\end{align*}

Si un vértice tuviera grado impar, podríamos entrar pero no salir de él. O salir de él pero no volver a entrar, si empezamos en él.

#### Camino euleriano no cíclico
Al ser un camino no cíclico, existen dos nodos en los que no se cumple la propiedad de salir y entrar la misma cantidad de veces: el inicial y el final.

En el nodo inicial del camino salimos al inicio pero no compensamos esa salida con una entrada, y en el final entramos pero no compensamos con una salida puesto
que el camino termina ahí y no es necesario salir. Así, para que exista un camino euleriano no cíclico tienen que haber exactamente dos vértices
de grado impar.

Veamos que estas condiciones no son solo necesarias si no que también suficientes. Es decir, demostraremos que si se cumplen las condiciones de las paridades, entonces existe un camino o ciclo euleriano:
{{% details "Demostración semi formal" %}}

**Teorema**: Un grafo $G=(V,E)$ suficientemente conexo con todos los grados de vértices pares tiene un ciclo euleriano.

**Demostración**: Por inducción fuerte.

Si $|V| = 2$, simplemente tomamos repetidamente las aristas entre los dos nodos (recuerda que permitimos aristas múltiples). Como hay una cantidad par de aristas, terminaremos en el mismo nodo que empezamos.

En el caso $|V| > 2$, escogemos un nodo $u$ inicial. Recorremos el grafo escogiendo aristas hasta volver a $u$. Sabemos que volveremos ya que no podemos quedarnos atrapados en otro nodo, porque como los grados
son pares si podemos entrar a un nodo también podemos salir.

Este procedimiento genera un ciclo, no necesariamente euleriano ya que podría no ocupar todas las aristas del grafo. Sea $G' = (V, E')$ el grafo resultante al remover todas las aristas del ciclo encontrado, ya que
cada vértice fue visitado una cantidad par de veces, todos los vértices de $G'$ siguen teniendo grado par. Así, para cada componente de $G'$, que tienen tamaño menor a $|V|$, por la hipótesis inductiva podemos encontrar
un ciclo euleriano en todas ellas.

Como el grafo era originalmente conexo, todos estos ciclos eulerianos comparten algún nodo con nuestro ciclo original, así que los podemos unir formando un solo ciclo euleriano que usa todas las aristas.

**Teorema**: Un grafo $G=(V,E)$ suficientemente conexo con dos vértices de grado impar y todos los demás de grado par tiene un camino euleriano.

**Demostración**: Sean $u$ y $v$ los dos vértices de grado impar. Agregaremos una arista ficticia $(u,v)$ y tendremos $G' = (V, E \cup \\{u ,v\\})$. Ahora todos los vértices en $G'$ tienen grado par
y por el teorema anterior, hay un ciclo euleriano.

Encontramos este ciclo y removemos la arista ficticia, convirtiéndose en un camino euleriano de $G$.

{{% /details %}}

## Implementación

Primero veremos cómo encontrar un **ciclo** euleriano. La idea consiste en hacer un DFS pero en vez de marcar los nodos como visitados (e impedir que se repitan) marcaremos las aristas como visitadas. Así, el DFS
recorrerá todas las aristas del grafo. Para lograr obtener los nodos visitados en el orden válido, cada vez que se retorne de una llamada recursiva agregaremos el nodo actual a la respuesta, consiguiendo unir los ciclos.

{{% details "Código ciclo euleriano" %}}
```cpp
#include <bits/stdc++.h>
using namespace std;

vector <pair<int,int>> edges;
vector <vector <int>> adj;
vector <int> ans; // El ciclo euleriano quedará acá
vector <bool> used;

void dfs(int u){
	while(adj[u].size() > 0){
		int e = adj[u].back();
		adj[u].pop_back(); // Borramos la arista para que no se vuelva a usar
		if(used[e]) continue; // Si ya fue usada (desde el otro lado, la inversa) la ignoramos
		used[e] = 1;
 		// El XOR es para encontrar el que es distinto. Los dos que son iguales se cancelan entre si.
		// Es lo mismo que (edges[i].first == u ? edges[i].second : edges[i].first)
		dfs(edges[e].first ^ edges[e].second ^ u);
		ans.push_back(u);
	}
}

int main(){
	/*
		Leer el input. A diferencia de una lista de adyacencia común,
		en la lista de adyacencia de un nodo no guardaremos los índices
		de los otros nodos, si no que guardaremos los índices de las aristas,
		y las aristas están en 'edges'
		Input de ejemplo:
		n m
		u1 v1
		u2 v2
		...
		um vm
	*/
	int n, m;
	cin >> n >> m;
	adj.resize(n);
	used.assign(m, false);
	for(int i=0, u, v; i<m; i++){
		cin >> u >> v;
		u--; v--; // borrar si ya vienen indexados de cero
		edges.emplace_back(u,v);
		adj[u].push_back(i);
		adj[v].push_back(i); // quitar si el grafo es dirigido
	}
	for(int i=0; i<n; i++){
		if(adj[i].size() % 2 != 0){
			// Hay un nodo de grado impar. No existe ciclo euleriano
			cout << "IMPOSSIBLE\n";
			return 0;
		}
	}
	ans.push_back(0);
	dfs(0);
	if(ans.size() != m+1){
		// El ciclo encontrado no usa todas las aristas. El grafo no tiene todas las aristas en la misma
		// componente conexa.
		cout << "IMPOSSIBLE\n";
		return 0;
	}
	for(int x : ans){
		cout << x+1 << ' ';
	}
	cout << '\n';
	return 0;
}
```
{{% /details %}}

Si quisiéramos encontrar un **camino** euleriano, debemos encontrar los dos vértices $u$ y $v$ de grado impar, agregar la arista ficticia $(u,v)$, encontrar un ciclo euleriano (ahora tienen grado par)
y luego quitar la arista ficticia (encontrar la rotación del ciclo tal que $u$ queda al inicio y $v$ al final).

## Grafos dirigidos

En un grafo dirigido hay que ser un poco más cuidadosos con las condiciones. Ahora:
* Si el grado de entrada es igual al grado de salida en todos los nodos, y además las aristas forman una componente fuertemente conexa, hay ciclo euleriano.
* Si el grado de entrada es igual al de salida en todos los nodos, y existe un nodo tal que $(\text{grado salida})-(\text{grado entrada}) = 1$, y otro nodo tal que $(\text{grado entrada})-(\text{grado salida}) = 1$, y además agregando ambas aristas entre estos dos nodos se forma una componente fuertemente conexa,
entonces hay un camino euleriano no cíclico que empieza en el primero de estos y termina en el segundo.

También en el código anterior no tenemos que agregar la arista $(v, u)$ si nos entregan una arista $(u, v)$ (marcado con un comentario).
