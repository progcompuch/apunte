---
title: Programación Dinámica
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 302
menu:
  docs:
    parent: paradigmas

---

La programación dinámica es quizás el tema más importante a aprender para programación competitiva. En general, toda competencia tiene al menos 1 problema que se puede resolver utilizando programación dinámica además de otros problemas donde la programación dinámica es útil para resolver algo pequeño que puede ayudar para la solución. Debido a esto creemos que la gente nueva debería entrenar en específico la programación dinámica, además de los otros temas en general.
## Motivación

Partimos con el problema típico: Hay una escalera de $n$ escalones ($0\leq n\leq 10^6$) y tenemos que subirla. Los movimientos que tenemos permitidos hacer son
-   En un paso subir un escalón.
-   En un paso subir dos escalones.

¿De cuántas formas distintas podemos subir los $n$ escalones? (Módulo algún número $m$ que es parte del input)

Solución: Definimos $f(x)$ como el número de formas de subir $x$ escalones. Nos damos cuenta de que $f(x)$ es igual a la suma de
-   El número de formas de subir $x$ escalones donde el último movimiento hecho fue uno donde subimos un escalón. Esto es igual al número de formas de subir $x - 1$ escalones. $f(x - 1)$.
-   El número de formas de subir $x$ escalones donde el último movimiento hecho fue uno donde subimos dos escalones. Esto es igual al número de formas de subir $x - 2$ escalones. $f(x - 2)$.

Este análisis funciona para $x\geq 2$, necesitamos otra forma de calcular $f$ para $x = 1$ y $x = 0$. Podemos simplemente hacerlo a mano:
-   $f(1) = 1$, solo hay una forma de subir $1$ escalón (utilizando un paso de una subida).
-   $f(0) = 1$, hay una sola forma de subir $0$ escalones (ya subimos $0$ escalones, por lo que no hacer nada es la única forma).

A estos los llamamos casos base.

Y queda 
-   $f(x) = f(x - 1) + f(x - 2)$ $\forall x\geq 2$ $-$ caso recursivo.
-   $f(1) = 1$.
-   $f(0) = 1$.

Ahora podemos programar la función $f$ y el main: (naive, y recuerden que el $ \%$ $m$ es solo porque piden así la solución)
```c++
int m;
ll f(int x){
    if (x <= 1)
        return 1LL % m; // El LL es para decir que es la constante 1 en versión long long
    return (f(x - 1) + f(x - 2)) % m;
}
int main(){
    ios::sync_with_stdio(0); cin.tie(0);
    int n;
    cin >> n >> m;
    cout << f(n) << '\n';
    return 0;
}
```
Tristemente esto no funciona para $x\geq 50$, se demora demasiado en calcularlo. Si llamamos $g(n)$ al número de operaciones que requiere calcular $f(n)$, ¿Cuál es la complejidad de $g$? o ¿Cuántas operaciones toma calcular $f$?

-   Fíjense que para $n = 0$ o $n = 1$, la complejidad temporal de $g(n)$ es $1$ que es lo mismo que $f(n)$.
-   Para $n\geq 2$ la complejidad temporal es igual a $1$ más calcular $f(n - 1)$ más calcular $f(n - 2)$ y queda $g(n) = f(n - 1) + f(n - 2) + 1$ 

Podemos concluir que $g(n) \geq f(n)$ y pues para $n\geq 50$ $f(n)$ ya es un número demasiado grande. Dibujamos el árbol de llamadas a $f(5)$

<center> <img class="invertible" src="../arbol_f(5).png" width="450"/> </center>
Hacemos demasiadas llamadas para solo calcular $f(5)$. La raíz del problema es que por una rama calculamos $f(3)$ pero por otra volvemos a calcular $f(3)$. En el dibujo está en negro las ramas que necesitan calcularse y en rojo los puntos donde deberíamos retornar de inmediato, sea por caso base o porque ya deberíamos conocer el valor.


Una forma de aprovecharse de los valores ya calculados es la siguiente:
-   Declaramos un vector global _F que inicializa en $-1$. La idea es que _F[$x$] guarde la respuesta $f(x)$, y que si _F[$x$] es $-1$ entonces debemos calcular $f(x)$, guardarlo en _F[$x$] y retornar _F[$x$].
-   En el main se cambia el tamaño de _F a $n + 1$ y se guardan los casos base _F[$0$] = _F[$1$] = $1$.

El código queda así:
```c++
vector<ll> _F;
ll f(int x){
    if (_F[x] != -1) 
        return _F[x];
    return _F[x] = (f(x - 1) + f(x - 2)) % m;
}
int main(){
    ios::sync_with_stdio(0); cin.tie(0);
    int n;
    cin >> n >> m;
    _F.resize(n + 1, -1LL);
    _F[0] = _F[1] = 1LL % m;
    cout << f(n) << '\n';
    return 0;
}
```
Este programa es de orden lineal en $n$ (temporal y espacial). 

Otra forma de programarlo:
```c++
int m;
int main(){
    ios::sync_with_stdio(0); cin.tie(0);
    int n;
    cin >> n >> m;
    vector<ll> F(n + 1, 1LL % m);
    for (int x = 2; x <= n; x ++)
        F[x] = (F[x - 1] + F[x - 2]) % m;
    cout << F[n] << '\n';
    return 0;
}
```
Esta también funciona en orden lineal en $n$ (temporal y espacial) y es mucho más fácil de programar.

¿Cuál es la diferencia entre la primera forma presentada y las otras dos? Que la primera no utiliza programación dinámica y las otras dos sí. La programación dinámica es básicamente no volver a calcular lo que ya se calculó.

## Programación Dinámica

En general uno se enfrenta con un problema $f$ definido por una secuencia de parámetros $(p_1, p_2, ..., p_k)$. El conjunto de secuencias válidas de parámetros $\mathcal{P}$ para el problema tiene una relación de orden estricto parcial $\prec$ que viene implícito. Además, a una secuencia de parámetros les decimos estados. (Pueden interpretarlo también como el tamaño del problema).

La idea es (por ahora) buscar una relación de recurrencia para $f(P)$ ($P\in\mathcal{P}$) que siga $\prec$. Es decir, encontrar $g$ tal que $f(P) = g(f(P_1), f(P_2), ..., f(P_k))$ donde $P_i\prec P$. Para los $P$ en que la recurrencia no esté definida los llamamos casos base.

Lo importante del orden $\prec$ es que en algún momento llegaremos a un caso base pues el conjunto $\mathcal{P}$ será finito.

En el ejemplo de arriba (el de la escalera) el conjunto de estados es simplemente $\mathcal{P} =$ {$0, 1, 2, ..., n$}, el orden es el orden usual $<$, $f(x) = f(x - 1) + f(x - 2)$ y los casos base son $f(0) = f(1) = 1$.

Una vez tenemos esto, podemos utilizar programación dinámica y guardar para todos los estados $P$ el valor de $f(P)$ de alguna forma (usualmente usando un vector).

Hay dos formas populares de implementar una solución que utiliza búsqueda binaria.
-   top-down: Pedimos calcular $f(P)$, si no está calculado entonces usamos la relación de recurrencia para calcularlo, pidiendo calcular otros $f(P_i)$ en el proceso. Esto es recursivo. (Memoization)
-   bottom-up: Nos aprovechamos de la relación $\prec$ y calculamos en orden de $p$ (bajo $\prec$) el valor de $f(P)$ de forma iterativa (con un for recorremos los $P\in\mathcal{P}$) utilizando la recurrencia. Esto es iterativo pues al momento de calcular $f(P)$ ya tenemos calculado el valor de $f(P')$ para todo $P'\prec P$. (Tabulation)

En ambos casos la complejidad será $|\mathcal{P}|\cdot G$ que es el número de estados multiplicado por cuánto cuesta calcular para un estado asumiendo los otros calculados.

En el ejemplo de las escaleras, la primera solución que usa programación dinámica está en top-down mientras que la segunda en bottom-up. Además, tiene $n$ estados y calcular un estado asumiendo los demás es $O(1)$.

En general se prefiere la segunda (bottom-up) pues es más rápida (en casi todos los casos) además de que permite utilizar técnicas de optimización más avanzadas. De todas formas la top-down es buena cuando la relación de orden $\prec$ no es fácil de determinar.

El mayor desafio al enfrentarse con un problema de programación dinámica es encontrar los parámetros adecuados y encontrar la relación de recurrencia. Para esto pueden pensar en dividir un problema en subproblemas y utilizar la solución de los subproblemas para calcular la del problema más grande, de todas formas esto está sujeto a la experiencia del programador y a su creatividad. 

Hay problemas donde el conjunto de parámetros y la relación de recurrencia son tan raros o no estándar que simplemente no se nos ocurren por mucho que pensemos. Por esto la única forma de mejorar en programación dinámica es resolviendo muchos problemas y eso es justo lo que haremos ahora.


## Probemas de ejemplo

### El problema de la mochila
La forma de los parámetros en este problema es estándar, por esto es importante entenderlo bien.

**Problema**: En una casa hay $n$ objetos definidos por su peso y un beneficio (valor emocional, precio monetario, etc). El objeto $i-$ésimo tiene peso $w_i$ y beneficio $b_i$. Tienes una mochila de capacidad (en peso) $B$. La casa se está quemando y solo puedes escoger un subconjunto de objetos que quepan en la mochila (la suma de sus pesos sea menor o igual a $B$) donde el beneficio total es la suma de beneficios de cada objeto escogido. Lo que debes entregar es el beneficio total máximo que puedes lograr.

**Restricciones**: 
-   $0\leq n\leq 10^3$
-   $0\leq B\leq 10^4$
-   $0\leq w_i \leq B$
-   $0\leq b_i\leq 10^9$. 

Acá apaña la función $f(i, V)$ que es la solución considerando solo los primeros $i$ objetos (los objetos los ponemos en un orden cualquiera) con una mochila de capacidad $V$. ¿Cómo calculamos $f(i, v)$? Hay dos posibilidades:
-   Podemos llevarnos el objeto $i$. El máximo beneficio que podemos obtener si nos llevamos el objeto $i$ es $f(i - 1, V - w_i) + b_i$ que es básicamente lo mejor que podemos hacer con los primeros $i - 1$ objetos y una mochila de capacidad $V - w_i$ (para que quepa el objeto $i-$ésimo) y le sumamos el beneficio del objeto $i-$ésimo.
-   Podemos no llevarnos el objeto $i$. El máximo beneficio que podemos obtener si no nos lo llevamos es $f(i - 1, V)$, básicamente ignorar el objeto $i$.

Luego, $f(i, V)$ será el máximo de estas dos opciones

$f(i, V) = máx${$f(i - 1, V - w_i) + b_i, f(i - 1, V)$}.

Noten que eso solo tiene sentido si $V - w_i$ es no negativo. En caso de que sea negativo nos quedamos con el segundo término.

<center> <img class="invertible" src="../dp1_latex1.png" width="600"/> </center>

Estamos listos para programar. Primero la solución top-down:
```c++
vector<vector<ll> > _F;
vector<ll> w, b;
ll f(int i, ll V){
	if (_F[i][V] != -1)
		return _F[i][V];
	if (V - w[i] < 0)
		return _F[i][V] = f(i - 1, V);
	return _F[i][V] = max(f(i - 1, V - w[i]) + b[i], f(i - 1, V));
}

int main(){
	ios::sync_with_stdio(0); cin.tie(0);

	// lectura
	int n, B;
	cin >> n >> B;
	w.resize(n + 1); b.resize(n + 1);
	for (int i = 1; i <= n; i ++)
		cin >> w[i] >> b[i];

	// inicializar _F
	_F.resize(n + 1, vector<ll>(B + 1, -1));
	for (int k = 0; k <= B; k ++)
		_F[0][k] = 0;

	// imprimir solución
	cout << f(n, B) << '\n';
	return 0;
}
```

Ahora la solución bottom-up. El orden es el lexicográfico.

```c++
int main(){
	ios::sync_with_stdio(0); cin.tie(0);

	// lectura
	int n, B;
	cin >> n >> B;
	vector<ll> w(n + 1); b(n + 1);
	for (int i = 1; i <= n; i ++)
		cin >> w[i] >> b[i];

	// inicializar _F
	vector<vector<ll> >f(n + 1, vector<ll>(B + 1, 0));
	for (int i = 1; i <= n; i ++){
		for (int k = 0; k <= B; k ++){
			if (k - w[i] < 0)
				f[i][k] = f[i - 1][k];
			else
				f[i][k] = max(f[i - 1][k - w[i]] + b[i], f[i - 1][k]);
		}
	}

	// imprimir solución
	cout << f[n][B] << '\n';
	return 0;
}
```
El número de estados es $(n + 1)\cdot (B + 1)$ y calcular un estado toma tiempo $O(1)$. La compejidad queda $O(n\cdot B)$.

### Problema de las monedas, versión de minimización

**Problema**: Tienes $n$ tipos de monedas e infinitas de cada una. El valor de una moneda es $c_i$. Debes pagar un valor $C$ en el cajero y quieres usar la menor cantidad de monedas posibles para esto. Puedes asumir que siempre existen las monedas de valor $1$.

**Restricciones**: 
-   $0\leq n\leq 10^3$
-   $0\leq C\leq 10^4$
-   $0\leq c_i \leq C$

Acá apaña la función $f(V)$ que es la solución considerando que quieres pagar $V$. ¿Cómo calculamos $f(V)$? Hay $n$ posibilidades:
-   Posibilidad $i-$ésima: Usamos una moneda de tipo $i$. En este caso lo mejor que podemos hacer es $1 + f(V - c_i)$. Esto solo en el caso de que $V - c_i$ sea $\geq 0$.

Luego, $f(V)$ será el mínimo de estas opciones

$f(V) = min_{0\leq i < n, V - c_i >= 0}${$1 + f(V - c_i$}.

Los casos bases los resumimos a que $f(0)$ se puede pagar usando $0$ monedas.

Estamos listos para programar. Primero la solución top-down:
```c++
vector<int> _F, c;
ll f(int V){
	if (_F[V] != -1)
		return _F[V];
	_F[V] = V;
	for (int i = 0; i < n; i ++)
		if (V - c[i] >= 0)
			_F[V] = min(_F[V], 1 + f(V - c[i]));
	return _F[V];
}

int main(){
	ios::sync_with_stdio(0); cin.tie(0);

	// lectura
	int n, C;
	cin >> n >> C;
	c.resize(n);
	for (int i = 0; i < n; i ++)
		cin >> c[i];

	// inicializar _F
	_F.resize(C + 1, -1);
	_F[0] = 0;

	// imprimir solución
	cout << f(C) << '\n';
	return 0;
}
```

Ahora la solución bottom-up. El orden es el usual en naturales.

```c++
int main(){
	ios::sync_with_stdio(0); cin.tie(0);

	// lectura
	int n, C;
	cin >> n >> C;
	vector<int> c(n);
	for (int i = 0; i < n; i ++)
		cin >> c[i];

	// inicializar f
	vector<int>f(C + 1, 0);
	for (int v = 1; v <= C; v ++){
		f[v] = v;
		for (int i = 0; i < n; i ++)
			if (v - c[i] >= 0)
				f[v] = min(f[v], 1 + f[v - c[i]]);
	}

	// imprimir solución
	cout << f[C] << '\n';
	return 0;
}
```
El número de estados es $C + 1$ y calcular un estado toma tiempo $O(n)$. La complejidad queda $O(C\cdot n)$.
### Coming soon ...

## Problemas

[CSES 1634 - Minimizing Coins](https://cses.fi/problemset/task/1634)

[SPOJ KNAPSACK - The Knapsack Problem](https://www.spoj.com/problems/KNAPSACK/)                                     

[CODEFORCES 118D - Caesar's Legions](https://vjudge.net/problem/CodeForces-118D/origin)

[CODEFORCES 489C - Given Length and Sum of Digits...](https://codeforces.com/problemset/problem/489/C)

[CODEFORCES 1288C - Two Arrays](https://codeforces.com/problemset/problem/1288/C)

[CODEFORCES 545C - Woodcutters](https://codeforces.com/problemset/problem/545/C)

[CODEFORCES 1513C - Add One](https://codeforces.com/problemset/problem/1513/C)

[Kattis wordclouds - Word Clouds Revisited](https://open.kattis.com/problems/wordclouds)
