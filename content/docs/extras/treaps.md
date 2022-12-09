---
title: Treaps
lead: ''
date: 2022-12-04T02:48:45.000+00:00
images: []
weight: 1
menu:
  docs:
    parent: extras
---

# Introducción

¿Que cosa es un *treap*? El nombre viene de la mezcla de dos cosas, *tree* (árboles binarios de busqueda) + *heap*, y es por que esta estructura incorpora características de ambas. Antes de entrar en detalle en los treaps, hagamos un pequeño repaso sobre árboles binarios de busqueda.

## Árboles binarios de busqueda 

Un árbol binario de busqueda, es, como lo dice su nombre, un árbol binario donde cada nodo del árbol cumple las siguientes dos propiedades:

* Cada nodo del árbol tiene un valor que llamaremos **llave**
* Para cada nodo, todas las llaves guardadas en su subárbol izquierdo tienen valor $<$ al de su propia llave, y todas las llaves guardadas en el subárbol derecho tienen valor $>$

Un ejemplo de un árbol binario de busqueda:

<center> <img class="invertible" src="../ABB1.png" width="450"/> </center>

Del ejemplo debemos destacar un par de cosas: 

1) No estamos pidiendo que el árbol sea **completo**, es decir, que cada nodo tenga dos hijos o ninguno. Está bien si un nodo tiene un solo hijo. 
2) A pesar de que en el ejemplo se usen números enteros como llaves, esto es solo para ilustrar y las llaves no necesariamente deben ser números enteros. Solo necesitaremos que las llaves sean valores que tengan alguna idea de "ordén". Por ejemplo, podrémos usar llaves que sean strings, pares de números, etc. En el resto de este documento asumiremos que las llaves si son números enteros, pero insistimos en que no necesariamente lo tienen que ser siempre.
3) En este modelo **no permitimos** que hayan valores repetidos en el árbol.

Algunos de ustedes quizás recuerden los árboles binarios de busqueda de algún ramo de programación. Quizás recuerden que la gracia de estos era que es fácil hacer un programa que decide si un valor se encuentra en el árbol o no:

```cpp
struct tree {
  tree *left, *right; // Los hijos izquierdo y derecho
  int key; // El valor llave

  tree(int x) {
    key = x;
    left = right = NULL;
  }
};

// Decide si x se encuentra en el árbol
bool search(tree *T, int x) {
  if(T == NULL) return false; // Un árbol vacío no tienen nada
  if(T->key == x) return true; // Encontramos x

  // Si es menor que la llave, debe estar en el subárbol izquierdo
  if(x < T->key) return search(T->left, x);

  // Y si no, en el derecho
  return search(T->right, x);
}
```

También es bastante simple crear un programa que inserta valores en el árbol, encontrando la posición hoja correcta donde va:

```cpp
// Inserta x en el árbol y devuelve el árbol actualizado
tree* insert(tree *T, int x) {
  // Si el árbol era vacío, devolvemos el árbol con solo x
  if(T == NULL) return new tree(x); 

  if(T->key == x) return T; // x ya se encontraba en el árbol

  // Si x es menor que la llave del árbol, 
  // lo insertamos a la izquierda.
  if(x < T->key) T->left = insert(T->left, x); 

  // Y si no, a la derecha
  else T->right = insert(T->right, x);

  // Devolvemos el árbol actualizado
  return T;
}
```

¿Cual es la complejidad de estos algoritmos? Bueno, en el peor caso de ambas funciones debemos bajar por todo el árbol hasta una hoja, por lo que en el peor caso esto toma la altura del árbol pasos. Si llamamos $H(T)$ a la altura del árbol (del inglés *height*), podemos escribir que estos algoritmos toman tiempo $O(H(T))$. 

... ¿Ok, y que tan grande puede ser $H(T)$? Bueno, si insertamos $N$ valores, todos en ordén, resulta que el árbol resultante tiene $H(T) = N$. Por ejemplo, si insertamos los valores del $1$ al $5$ en orden, el árbol resultante se ve así:

<center> <img class="invertible" src="../ABB2.png" width="250"/> </center>

Es decir que, en el peor caso esta estructura no es mejor que buscar e insertar en un arreglo :confused:. Existen métodos para mantener $H(T)$ bajo, por ejemplo, los árboles **AVL** agregan una invariante adicional que asegura que el árbol mantiene una profundidad $H(T) = O(\\log N)$. Pero, ¿Refleja esto el caso promedio del árbol? Resulta que no, en el caso que ingresamos $n$ valores en un orden aleatorio, la áltura del árbol resultante tendrá un valor de $O(\\log n)$ en esperanza. Hablaremos de este tipo de árboles como un **árbol binario aleatorio**, cuando ingresamos los valores en un orden aleatorio en un árbol binario de busqueda.

Vamos a dar primero una demostración de un resultado más debil:

### Teorema: 
La profundidad esperada de cualquier nodo en un árbol binario aleatorio es $O(\\log n)$.
#### Demostración

Como vamos a ingresar $n$ valores al árbol y solo nos importa su orden, podemos pensar que estamos ingresando los valores $\\{1, 2, \\dots n\\}$. También, por simplicidad, vamos a referirnos indistintamente a el valor $x$ y al nodo que contiene a $x$ de la misma forma. Vamos a necesitar un lema:

#### Lema:
Para un par de valores $1 \\leq x < y \\leq n$, $x$ será ancestro de $y$ si y solamente si $x$ es el primer valor en llegar del rango $[x, y]$.  El caso que $x > y$ es análogo pidiendo que $x$ sea el primero en llegar del rango $[y, x]$. 

Demostraremos solamente el caso $x < y$, por que el otro de nuevo es análogo. Cuando $x$ llega primero, cualquier valor de $[x+1, y]$ va a querer insertarse en el subárbol derecho de $x$ y será descendiente de $x$. Si llegará $z$ tal que $x < z < y$ primero, $x$ se insertará en el subárbol izquierdo e $y$ en el subárbol derecho, por lo que $x$ no podrá ser ancestro de $y$. Y, finalmente, en el caso que $y$ llegará primero claramente $x$ no podrá ser ancestro de $y$ si es que llega después.

$\\blacksquare$

Con esto, podemos decir que la probabilidad de que $x$ sea ancestro de $y$ es exactamente $\\frac{1}{(1+|x-y|)}$, que es el tamaño del rango $[x, y]$. Denotando $P(y)$ por la profundidad de $y$, vemos que esto es equivalente a la cantidad de ancestros que tenga $y$ y luego expresamos:

$$
\\begin{align*}
  P(y) &= \\sum_{x=1}^{y-1} \\mathbf{1}_{y \\text{ es ancestro de } x} + \\sum_{x=y+1}^{n} \\mathbf{1}_{y \\text{ es ancestro de } x} \\\\
  \\Rightarrow \\mathbb{E}(P(y)) &= \\sum_{x=1}^{y-1} \\mathbb{E}(\\mathbf{1}_{y \\text{ es ancestro de } x}) + \\sum_{x=y+1}^{n} \\mathbb{E}(\\mathbf{1}_{y \\text{ es ancestro de } x}) \\\\
  \\Rightarrow \\mathbb{E}(P(y)) &= \\sum_{x=1}^{y-1} \\mathbb{P}(y \\text{ es ancestro de } x) + \\sum_{x=y+1}^{n} \\mathbb{P}(y \\text{ es ancestro de } x) \\\\
  \\Rightarrow \\mathbb{E}(P(y)) &= \\sum_{x=1}^{y-1} \\frac{1}{1+(y-x)} + \\sum_{x=y+1}^{n} \\frac{1}{1+(x-y)} \\\\[1.5em]
  \\Rightarrow \\mathbb{E}(P(y)) &\\leq H_{y-1} + H_{n-y+1} \\leq 2H_n = O(\\log n)
\\end{align*}
$$

Donde $H_n$ corresponde al $n$-esimo número ármonico. Concluímos que la profundidad esperada es $O(\\log n)$.

$\\square$

Este resultado nos dice que en promedio, las operaciones en árboles binarios aleatorios nos tomarán tiempo en $O(\\log n)$, pero no nos da seguridad respecto al peor caso. Podemos obtener un resultado aún más fuerte de que la altura de un árbol binario aleatorio es efectivamente $O(\\log n)$, dejaremos la demostración aparte para los interesados.

{{% details "Demostración profundidad" %}}
Vamos a nombrar $X_n$ la variable aleatoria resultante de tomar un árbol binario aleatorio y luego obtener su altura. Si fijamos la identidad de la raíz del árbol en $[1, n]$, el subárbol izquierdo será un árbol de $r-1$ valores y el derecho uno de $n-r$ valores. Esto nos permite escribir la esperanza condicional como:

$$
\\mathbb{E}(X_n \\mid r) = \\max(1+X_{r-1}, 1+X_{n-r}) = 1 + \\max(X_{r-1}, X_{n-r})
$$

Notar que la raíz de un árbol binario aleatorio es exactamente el valor que llega primero, así que la raíz será el valor $i \\in [1, n]$ con probabilidad $\\frac{1}{n}$. Con esto podemos expresar

$$
\\mathbb{E}(X_n) = \\sum_{i=1}^{n} \\mathbb{E}(X_n \\mid r = i)\\mathbb{P}(r = i) 
= 1 + \\frac{1}{n} \\sum_{i=1}^{n} \\mathbb{E}(\\max(X_{i-1}, X_{i-r}))
$$

Lamentablemente, esta expresión no es amena a ser trabajada para demostrar que la altura sea $O(\\log n)$ (por lo menos, no de una forma que yo conozca). Vamos a usar un truco y definiremos $Y_n = 2^{X_n}$, la altura *exponencial* del árbol. Podemos repetir el análisis anterior y expresar:

$$
\\mathbb{E}(Y_n \\mid r) = 2^{1+\\max(X_{r-1}, X_{n-r})} = 2\\max(2^{X_{r-1}}, 2^{X_{n-r}}) = 2\\max(Y_{r-1}, Y_{n-r})
$$

Podemos acotar esta última expresión como $\\mathbb{E}(Y_n \\mid r) = 2\\max(Y_{r-1}, Y_{n-r}) \\leq 2(Y_{r-1} + Y_{n-r})$. Y luego, acotar el valor esperado de $Y_n$ como:

$$
\\mathbb{E}(Y_n) = \\sum_{i=1}^{n} \\mathbb{E}(Y_n \\mid r = i)\\mathbb{P}(r = i) 
\\leq \\frac{2}{n} \\sum_{i=1}^{n} \\mathbb{E}(Y_{i-1} + Y_{n-i}) = \\frac{4}{n} \\sum_{i=0}^{n-1} \\mathbb{E}(Y_i)
$$

¿Que pasa si repetimos está cota para el valor $\\mathbb{E}(Y_{n-1})$ ? Vemos que:

$$
\\newcommand{\\E}{\\mathbb{E}}
\\begin{align*}
\\mathbb{E}(Y_n) &\\leq \\frac{4}{n}\\sum_{i=0}^{n-1} \\mathbb{E}(Y_i) 
= \\frac{4}{n} \\left[ \\E(Y_{n-1}) + \\sum_{i=0}^{n-2} \\mathbb{E}(Y_i) \\right] \\\\
&\\leq \\frac{4}{n} \\left[ \\frac{4}{n-1} \\sum_{i=0}^{n-2}\\E(Y_i) + \\sum_{i=0}^{n-2} \\mathbb{E}(Y_i) \\right] 
= \\frac{4}{n} \\frac{n+3}{n-1} \\sum_{i=0}^{n-2} \\mathbb{E}(Y_i)
\\end{align*}
$$

Y si repetimos este procedimiento $n$ veces, podemos observar que:

$$
\\mathbb{E}(Y_n) \\leq 4\\frac{(n+3)!}{3! n!} \\mathbb{E}(Y_0) = 4 \\binom{n+3}{3} = O(n^3)
$$

Tomando la convención de que $X_0 = 0$ para que $Y_0 = 1$. Con esta cota para el crecimiento de $\\mathbb{E}(Y_n)$, podremos finalmente obtener una cota para el crecimiento de $\\mathbb{E}(X_n)$. Utilizamos la [desigualdad de Jensen](https://en.wikipedia.org/wiki/Jensen%27s_inequality) para afirmar que $2^{\\mathbb{E}(X_n)} \\leq \\mathbb{E}(2^{X_n}) = \\mathbb{E}(Y_n)$, y luego:

$$
2^{\\mathbb{E}(X_n)} = O(n^3) \\Rightarrow \\mathbb{E}(X_n) = O(\\log_2 n^3) = O(\\log n)
$$

Y de hecho, obtenemos este resultado con una constante bastante competitiva de $3$. Se puede demostrar adicionalmente que la varianza de $X_n$ cumple que $\\textbf{Var}(X_n) = O((\\log \\log n)^2)$ ([referencia](https://epubs.siam.org/doi/pdf/10.1137/S0097539792237541)), pero no lo demostraremos aquí.
{{% /details %}}

Armados con el resultado anterior, vemos que en el caso de que ingresemos valores a un árbol binario de busqueda en orden aleatorio, este tendrá una altura razonable con probabilidad muy alta :tada:.

... Ok, ¿y de que nos sirve esto? En la gran mayoría de los casos, sobretodo en programación competitiva, no podremos asegurar que los valores vayan a ser ingresados de forma aleatoria a la estructura. Aquí es donde va a entrar en juego la parte *heap* de la ecuación.

# Treaps

## Base

Un pequeño repaso sobre **heaps**. Un **heap** es un árbol binario que cumple las siguientes dos condiciones:

* Cada nodo del árbol tiene un valor que llamaremos **prioridad**
* Para cada nodo, todas las prioridades guardadas en su subárbol izquierdo y derecho tienen valor $<$ al de su propia prioridad.

Esta definición también se puede usar usando la desigualdad al otro lado, pero la estructura definida es totalmente análoga. Un ejemplo de un heap:

<center> <img class="invertible" src="../Heap1.png" width="450"/> </center>

Generalmente, se pide también que un heap seá un árbol binario completo, pero nosotros no lo requeriremos. Con esto, definiremos un **treap** como un árbol que tiene ambas las propiedades de un árbol binario de busqueda y un heap:

* Cada nodo del árbol tiene dos valores, una **llave** y una **prioridad**
* Para cada nodo, todas las llaves guardadas en su subárbol izquierdo tienen valor $<$ al de su propia llave, y todas las llaves guardadas en el subárbol derecho tienen valor $>$
* Para cada nodo, todas las prioridades guardadas en su subárbol izquierdo y derecho tienen valor $<$ al de su propia prioridad.

Aquí un ejemplo de un treap, donde escribimos las prioridades en color rojo y las llaves en color azul:
<center> <img class="invertible" src="../Treap1.png" width="450"/> </center>

Los treaps cumplen una propiedad interesante de la que haremos uso:

### Teorema
Si las prioridades en un treap **no se repiten**, entonces el treap tiene una sola posible estructura. Más aún, la estructura es equivalente a la que hubiera resultado si hubieramos ingresado los nodos en orden descendiente de prioridad.

#### Demostración
Llamemos $p_{\\min}$ al valor mínimo entre todas las prioridades del árbol, dado que todas las prioridades son distintas existe un único nodo que tenga prioridad $p_{\\min}$. Dado la propiedad **heap**, la raíz del treap solamente puede ser este nodo. Aplicando inductivamente el mismo resultado sobre el subárbol izquierdo y el subárbol derecho obtenemos que la estructura es única.

$\\square$

¿De que sirve esta propiedad? Bueno, si asignamos las prioridades de forma aleatoria, ¡el treap resultante cumplira las mismas propiedades que ya demostramos para árboles binarios aleatorios :tada:! Con esto podemos asegurar que al asignar las prioridades de forma aleatoria, independiente del orden en que ingresemos los valores al treap, este tendrá con alta probabilidad una altura logarítmica respecto a la cantidad $n$ de valores que hayamos ingresado.

Bueno, ¿Y como obtenemos números aleatorios? En un computador, usando algoritmos, no podemos :sweat: (y aún sin usar algoritmos, no podemos obtenerlos de forma rápida mediante ruido del ambiente u otra fuente aleatoria). Lo que podemos usar es alguna secuencia pseudo-aleatoria con suficiente entropía (i.e. suficientemente "aleatoria") para las prioridades. 

En **C++**, existe una implementación del algoritmo [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister) (¡el mismo usado por pokémon!) en la librería estándar. (¿Y por qué no usamos rand()? [Por que es pésimo](https://codeforces.com/blog/entry/61587), poco aleatorio y por si fuera poco lento). En este snippet de código vemos como usar Mersenne Twister en C++:

```cpp
// Numeros de 64 bits
typedef long long ll;

// Objeto que guarda el estado de la secuencia Mersenne Twister
mt19937_64 MT;

// Inicializa nuestro Mersenne Twister con la hora actual, que es 
// suficientemente aleatoria. Llamar al principio del main
void iniciar_MT() {
  MT = mt19937_64(chrono::system_clock::now().
    time_since_epoch().count());
}

ll random_number() {
  return MT();
}
```

Esto nos entregar numeros pseudo-aleatorios de $64$ bits. Un detalle importante es que nosotros necesitábamos valores que no se repitieran para nuestro treap, y esto no nos asegura que no se vayan a repetir. La verdad es que no podemos asegurar que los valores no se vayan a repetir, pero si se repiten "poco" no tendremos problemas. Y dado que el espacio tiene tamaño $2^{64}$, aplicando la [paradoja del cumpleaños](https://en.wikipedia.org/wiki/Birthday_problem) esperaríamos ver la primera colisión al insertar alrededor de $\\sqrt{2^{64}} = 2^{32}$ valores. Cabe decir que en contextos de programación competitiva, podemos asumir que no habrán repeticiones :wink:. 

En lo que sigue, vamos a explicar como hacer las operaciones fundamentales en treaps a alto nivel. Al final de está sección, incluiremos una implementación en C++. Necesitaremos antes dos algoritmos fundamentales:

### Merge
**Merge($T_1, T_2$)** recibe dos treaps $T_1$ y $T_2$ que cumplen la condición de que todas las llaves de $T_1$ son $<$ a las llaves de $T_2$, y los junta en un solo treap $T$ que contiene todos sus nodos. Ojo que esto **destruye** $T_1$ y $T_2$ en el proceso. Dibujamos los treaps de la siguiente forma, donde $r_i$ es la raíz, $L_i$ es el subárbol izquierdo y $R_i$ es el subárbol derecho de cada árbol, respectivamente. 

<center> <img class="invertible" src="../TreapsMerge1.png" width="600"/> </center>

Sabemos que la raíz del nuevo árbol deberá ser el nodo entre $r_1, r_2$ que tenga mayor prioridad. Supongamos que es el caso que $r_1$ tiene mayor prioridad que $r_2$, entonces la raíz del nuevo árbol será $r_1$:

<center> <img class="invertible" src="../TreapsMerge2.png" width="600"/> </center>

Donde separamos en el dibujo los valores que son menores a la llave de $r_1$ a la izquierda y a los valores mayores a la llave de $r_1$ a la derecha, usando el abuso de notación de referirnos a la llave de $r_1$ como $r_1$. Notemos que los valores menores a $r_1$ ya conforman un treap por que corresponden al subárbol $L_1$, entonces podemos mantenerlo como el subárbol izquierdo de $r_1$ sin problemas. Para el subárbol derecho, tenemos el problema de que tenemos dos treaps separados y si queremos usarlos como subárbol derecho debemos juntarnos en uno solo. 

Justamente, podemos llamar recursivamente a **Merge** con **Merge($R_1, T_2$)** para obtener el subárbol derecho que necesitamos, y con esto asignar los subárboles apropiados:

<center> <img class="invertible" src="../TreapsMerge3.png" width="600"/> </center>

Con lo que logramos fusionar los árboles. Esto requiere que tengamos casos base para la recursión, donde los casos base obvios son que un treap fusionado con un treap vacío resulta en el mismo treap. ¿Cual es la complejidad de este algoritmo? Bueno, con cada llamada recursiva estamos llamando el algoritmo de nuevo en un par de árboles donde al menos uno tiene una altura $1$ menor que la de su antecesor, por que la complejidad en el peor caso es $O(H(T_1) + H(T_2)) = O(\\log n)$ si en total $T_1$ y $T_2$ tienen $n$ valores.

### Split

**Split** recibe un treap $T$ y un valor $x$ y lo separa en dos treaps $T_1$ y $T_2$, tal que $T_1$ contiene todos los nodos con llaves $\\leq x$ y $T_2$ aquellos nodos con llaves $>x$. Ojo que esto **destruye** el treap $T$ original. ¿Como hacemos el split? Pongámonos en el caso que el valor de la raíz de $T$ es $\\leq x$, entonces sabemos que tanto el subárbol izquierdo de $T$ y su raíz serán parte de $T_1$. Visualicemos esto, usando azul para marcar aquellos valores que ya sabemos que van en $T_1$, y rojo para aquellos valores que aún no sabemos donde van:

<center> <img class="invertible" src="../TreapsSplit1.png" width="600"/> </center>

Para separar los valores de $R$ que aún no sabemos donde van, vamos a llamar recursivamente a **Split** con **Split($R, x$)** para separar los valores de $R$ en $R_1, R_2$ donde $R_1$ contiene los valores que son $\\leq x$ y $R_2$ los que son $>x$, y con esto construiremos $T_1$ y $T_2$ como corresponde:

<center> <img class="invertible" src="../TreapsSplit2.png" width="600"/> </center>

Como caso base consideraremos que el split de un treap vacío es, naturalmente, dos treaps vacíos. Con esto, como llamamos recursivamente **Split** sobre un árbol que en el peor caso tiene altura a lo más $1$ menor que $T$, vemos que la complejidad de este algoritmo es $O(H(T)) = O(\\log n)$. 

A partir de estas operaciones, podremos construir las operaciones básicas que esperamos de un árbol de busqueda: buscar, insertar y eliminar valores. En los algoritmos que siguen, llamaremos a $T$ el treap a trabajar y $L, R$ a sus subárboles izquierdo y derecho respectivamente.

### Busqueda
Dado que un treap es también un árbol binario de busqueda, podemos aplicar el mismo algoritmo de busqueda que usamos antes para este caso. La complejidad es la profundidad de $T$, que es $O(\\log n)$

### Inserción
Para insertar un valor $x$ en el treap, destacar que debemos verificar si $x$ se encuentra ya en el treap para evitar tener valores duplicados. Si $x$ no se encuentra en el treap $T$, podemos empaquetar el valor $x$ en un nodo $n$ con su prioridad aleatoria correspondiente y utilizar el siguiente algoritmo recursivo **Insert($T, n$)** para ingresarlo a $T$:

#### Insert($T, n$)
* Si $T$ es el treap vacío, entonces la inserción es lo mismo que asignar $T = n$.
* Si la prioridad de $n$ es mayor a la prioridad de la raíz de $T$, $n$ se convertirá en la raíz del treap. Llamamos a **Split($T, x$)** para separar $T$ en $T_1, T_2$ y asignamos $T_1$ como el subárbol izquierdo de $n$, $T_2$ como el derecho.
* Si no es el caso y la prioridad es menor, llamamos **Insert** en el subárbol que corresponda para $x$, es decir, **Insert($L, n$)** si es que $x$ es $<$ que la llave de $T$, e **Insert($R, n$)** en el caso contrario.

En el peor caso, este algoritmo baja por todo el treap para ingresar $x$ y hace solamente una llamada a **Split**, por lo que tiene complejidad $O(\\log n)$.

### Eliminación
Para eliminar un valor $x$ del treap, podemos utilizar un algoritmo recursivo similar al de inserción. Lo llamaremos **Erase($T, x$)** y funciona de la siguiente forma:

#### Erase($T, x$)
* Si $T$ es un treap vacío, podemos terminar pues $T$ no contiene a $x$.
* Si la raíz de $T$ tiene llave con valor $x$, debemos eliminarla del treap. La removemos, y para juntar sus hijos en un solo treap llamamos a **Merge($L, R$)**.
* Si no, bajamos al subárbol donde podríamos encontrar $x$ e intentamos de nuevo. Es decir, **Erase($L, x$)** si $x$ es $<$ que la llave de $T$, **Erase($R, x$)** si no.

Este algoritmo potencialmente puede bajar por todo el treap y hace una sola llamada a **Merge**, por lo que tendrá complejidad $O(\\log n)$.

### Implementación

Dejamos una implementación de todas las operaciones vistas hasta ahora, que serán el treap "base".

{{% details "Código" %}}
```cpp
typedef long long ll;

// Clase wrapper
class treap {
private:
  static mt19937_64 MT;

  static ll random_number() {
    return MT();
  }

  struct node {
    node *left, *right;
    ll key, priority;

    node(ll x) {
      left = right = NULL;
      key = x;
      priority = random_number();
    }    
  };

  node *root;

  // Guardamos en T el resultado
  void merge(node* &T, node* T1, node* T2) {
    // Si un árbol es vacío, retornamos el otro
    if(T1 == NULL) { T = T2; return; }
    if(T2 == NULL) { T = T1; return; }

    // Si T1 tiene mayor prioridad, su raíz será
    // la raíz del árbol fusionado
    if(T1->priority > T2->priority) {
      merge(T1->right, T1->right, T2);
      T = T1;
    }
    // En el otro caso, gana la raíz de T2
    else {
      merge(T2->left, T1, T2->left);
      T = T2;
    }

    return;
  }

  // Guardaremos en T1, T2 los resultados
  void split(node* T, ll x, node* &T1, node* &T2) {
    // El split del treap vacío son dos treaps vacíos
    if(T == NULL) {
      T1 = T2 = NULL;
      return;
    }

    // Si la llave de T es <= x, entonces la raíz
    // y todo el subárbol izquierdo van en T1
    if(T->key <= x) {
      split(T->right, x, T->right, T2);
      T1 = T;
    }

    // Si no, la raíz y el subárbol derecho van en T2
    else {
      split(T->left, x, T1, T->left);
      T2 = T;
    }

    return;
  }

  bool search(node* T, ll x) {
    if(T == NULL) return false; // Un treap vacío no tiene nada
    if(T->key == x) return true; // Encontramos x

    // Si es menor que la llave, debe estar en el subárbol izquierdo
    if(x < T->key) return search(T->left, x);

    // Y si no, en el derecho
    return search(T->right, x);
  }

  // Llamada recursiva para ingresar nodo n
  void insert(node* &T, node* n) {
    // Si T es vacío, la inserción es el nodo n
    if(T == NULL) {
      T = n;
      return;
    }

    // Si n tiene mayor prioridad que T, debe
    // ser la nueva raíz 
    if(n->priority > T->priority) {
      split(T, n->key, n->left, n->right);
      T = n;
    }

    // Si no, insertamos en el subárbol izquierdo
    // si es que tiene una llave menor a la de T
    else if(n->key < T->key) insert(T->left, n);
    // ... y en el caso contrario, en el subárbol derecho
    else insert(T->right, n);

    return;
  }

  void erase(node* &T, ll x) {
    // El treap vacío no contiene a x
    if(T == NULL) return;

    // Si la llave de T es x, debemos eliminar la raíz
    // y juntar sus subárboles
    if(T->key == x) {
      merge(T, T->left, T->right);
      return;
    }

    // Si no, buscamos x en el subárbol izquierdo cuando
    // es menor que la llave de T
    if(x < T->key) erase(T->left, x);
    // Y si no, intentamos en el subárbol derecho
    else erase(T->right, x);

    return;
  }

public:
  treap() { root = NULL; }
  treap(ll x) { root = new node(x); }

  // Fusiona O con T
  treap &merge(treap &O) {
    merge(root, root, O.root);
    return *this;
  }

  // Deja los valores <= x en T, 
  // devuelve los valores > x en otro treap
  treap split(ll x) {
    treap ans;
    split(root, x, root, ans.root);
    return ans;
  }

  // Busca x en el treap
  bool search(ll x) {
    return search(root, x);
  }

  // Inserta el valor x en el treap
  void insert(ll x) {
    // Si x ya se encuentra en el árbol, no ingresarlo
    if(search(root, x)) return;

    // Si no, procedemos a ingresarlo
    return insert(root, new node(x));
  }

  // Elimina x del treap 
  void erase(ll x) {
    return erase(root, x);
  }
};

mt19937_64 treap::MT(chrono::system_clock::now().
                    time_since_epoch().count());
```
{{% /details %}}  

### Llaves repetidas

Bueno, hasta ahora hemos pedido que las llaves no se repitan, ¿Que podemos hacer si queremos tener llaves repetidas en el treap? No podemos hacer algo simple como pedir que las llaves en el subárbol izquierdo sean $\\leq$ a la llave de la raíz para incluir el caso en que son $=$, por que entonces si ingresamos $n$ veces la misma llave obtendríamos algo así:

<center> <img class="invertible" src="../UnbalancedTreap.png" width="450"/> </center>

Una solución más práctica es agregar un contador a cada nodo de forma de representar cuantas veces se repite su llave, y al momento de ingresar o borrar valores del treap, si es que ya están presentes en el árbol incrementar o decrementar el contador según corresponda. Si el contador llega a $0$, borrar el valor. Por completitud, dejamos el código aquí:

{{% details "Código" %}}
```cpp
typedef long long ll;

// Clase wrapper
class treap {
private:
  static mt19937_64 MT;

  static ll random_number() {
    return MT();
  }

  struct node {
    node *left, *right;
    ll key, priority;
    int count;

    node(ll x) {
      left = right = NULL;
      key = x;
      priority = random_number();
      count = 1;
    }    
  };

  node *root;

  // Guardamos en T el resultado
  void merge(node* &T, node* T1, node* T2) {
    // Si un árbol es vacío, retornamos el otro
    if(T1 == NULL) { T = T2; return; }
    if(T2 == NULL) { T = T1; return; }

    // Si T1 tiene mayor prioridad, su raíz será
    // la raíz del árbol fusionado
    if(T1->priority > T2->priority) {
      merge(T1->right, T1->right, T2);
      T = T1;
    }
    // En el otro caso, gana la raíz de T2
    else {
      merge(T2->left, T1, T2->left);
      T = T2;
    }

    return;
  }

  // Guardaremos en T1, T2 los resultados
  void split(node* T, ll x, node* &T1, node* &T2) {
    // El split del treap vacío son dos treaps vacíos
    if(T == NULL) {
      T1 = T2 = NULL;
      return;
    }

    // Si la llave de T es <= x, entonces la raíz
    // y todo el subárbol izquierdo van en T1
    if(T->key <= x) {
      split(T->right, x, T->right, T2);
      T1 = T;
    }

    // Si no, la raíz y el subárbol derecho van en T2
    else {
      split(T->left, x, T1, T->left);
      T2 = T;
    }

    return;
  }

  bool search(node* T, ll x) {
    if(T == NULL) return false; // Un treap vacío no tiene nada
    if(T->key == x) return true; // Encontramos x

    // Si es menor que la llave, debe estar en el subárbol izquierdo
    if(x < T->key) return search(T->left, x);

    // Y si no, en el derecho
    return search(T->right, x);
  }

  // Search modificado para incrementar el count de x
  bool insert(node *T, ll x) {
    if(T == NULL) return false; // Un treap vacío no tiene nada
    if(T->key == x) {
      ++T->count;
      return true; // Encontramos x
    }

    // Si es menor que la llave, debe estar en el subárbol izquierdo
    if(x < T->key) return search(T->left, x);

    // Y si no, en el derecho
    return search(T->right, x);
  }

  // Llamada recursiva para ingresar nodo n
  void insert(node* &T, node* n) {
    // Si T es vacío, la inserción es el nodo n
    if(T == NULL) {
      T = n;
      return;
    }

    // Si n tiene mayor prioridad que T, debe
    // ser la nueva raíz 
    if(n->priority > T->priority) {
      split(T, n->key, n->left, n->right);
      T = n;
    }

    // Si no, insertamos en el subárbol izquierdo
    // si es que tiene una llave menor a la de T
    else if(n->key < T->key) insert(T->left, n);
    // ... y en el caso contrario, en el subárbol derecho
    else insert(T->right, n);

    return;
  }

  void erase(node* &T, ll x) {
    // El treap vacío no contiene a x
    if(T == NULL) return;

    // Si la llave de T es x, reducimos el count
    if(T->key == x) {
      --T->count;
      // Y si llega a 0, eliminamos el nodo
      if(T->count == 0) merge(T, T->left, T->right);
    }

    // Si no, buscamos x en el subárbol izquierdo cuando
    // es menor que la llave de T
    else if(x < T->key) erase(T->left, x);
    // Y si no, intentamos en el subárbol derecho
    else erase(T->right, x);

    return;
  }

public:
  treap() { root = NULL; }
  treap(ll x) { root = new node(x); }

  // Fusiona O con T
  // Requisito: llaves(T) < llaves(O)
  treap &merge(treap &O) {
    merge(root, root, O.root);
    return *this;
  }

  // Deja los valores <= x en T, 
  // devuelve los valores > x en otro treap
  treap split(ll x) {
    treap ans;
    split(root, x, root, ans.root);
    return ans;
  }

  // Busca x en el treap
  bool search(ll x) {
    return search(root, x);
  }

  // Inserta el valor x en el treap
  void insert(ll x) {
    // Si x ya se encuentra en el árbol,
    // no agregar un nuevo nodo
    if(insert(root, x)) return;

    // Si no, procedemos a ingresarlo
    return insert(root, new node(x));
  }

  // Elimina x del treap 
  void erase(ll x) {
    return erase(root, x);
  }
};

mt19937_64 treap::MT(chrono::system_clock::now().
                    time_since_epoch().count());
```
{{% /details %}}

## Extensiones

Ok, hasta ahora hemos creado un árbol binario de busqueda con garantías fuertes sobre su altura y desempeño $O(\\log n)$. ¿Que ventajas tiene sobre, digamos, un **set** de la librería estándar? Se pueden resumir en unos puntos:

1) Su implementación es relativamente simple, una vez que tenemos **Merge** y **Split** implementados podemos crear operaciones bastante más complejas a partir de ellos.
2) Dado que la implementación la estamos haciendo nosotros, podemos modificarla a nuestro gusto para agregar funcionalidad extra, a diferencia de **set** que no es tan fácil de modificar.

Por ejemplo, si agregamos un parametro **size** a los nodos del treap que guarden el tamaño de cada subárbol, podemos hacer consultas del tipo "¿Cual es la $k$-ésima llave en el treap?" y "¿Cuantas llaves son $<=$ al valor $x$?". Describiremos estos algoritmos, utilizando **Size($T$)** para referirnos al tamaño de $T$:

### Cuantiles

Hablaremos del $k$-ésimo cuantil como la $k$-ésima llave guardada en el treap, considerando que la llave más pequeña es la $0$-ésima. Como siempre, utilizamos un algoritmo recursivo:

#### Quantile($T, k$):
* Si el tamaño del subárbol izquierdo **Size($L$)** es $k$, significa que la llave de $T$ es justamente el $k$-ésimo valor del treap y la devolvemos.
* Si **Size($L$)** $ > k$, entonces la respuesta que buscamos se encuentra en el subárbol izquierdo y devolvemos **Quantile($L, k$)**
* En el caso contrario, debemos bajar al subárbol derecho a buscar la respuesta. Ojo que estamos saltándonos **Size($L$)** $ + 1$ llaves al hacer esto, correspondientes a las guardadas en el subárbol derecho más la raíz, por lo que debemos llamar a **Quantile($R, k - (\\textbf{Size}(L) + 1)$)**.

Claramente, este algoritmo solo tiene sentido cuando $k <$ **Size($T$)**. Como en el peor caso descendemos por todo el árbol, esto tiene complejidad $O(\\log n)$.

### Rango

Llamaremos al rango de un valor $x$ como la cantidad de llaves que son $\\leq$ a $x$ en el treap. Podemos hacer esto mediante otro algoritmo recursivo:

#### Rank($T, x$):
* Si $T$ es vacío, entonces **Rank($T, x$)** $= 0$.
* Si $x$ es menor que la llave de $T$, entonces todos las llaves menores a $x$ se van a encontrar en el subárbol izquierdo de $T$, y devolvemos **Rank($L, x$)**. 
* Si no es el caso, tanto la raíz como el subárbol izquierdo de $T$ tienen llaves con valores $<= x$,
y deben ser incluídos en la respuesta. Respondemos **Size($L$)** + 1 + **Rank($R, x$)**.

El algoritmo en el peor caso toma $O(\\log n)$ por el argumento de profundidad.

{{% details "Código" %}} 
```cpp
typedef long long ll;

// Clase wrapper
class treap {
private:
  static mt19937_64 MT;

  static ll random_number() {
    return MT();
  }

  struct node {
    node *left, *right;
    ll key, priority;
    // Tamaño del subárbol
    int sz;

    node(ll x) {
      left = right = NULL;
      key = x;
      priority = random_number();
      sz = 1;
    }    
  };

  // Función utilitaria para obtener el size
  int sz(node* T) { return T ? T->sz : 0; }

  // Mantiene las invariantes del treap
  // llamar cada vez que se altera la estructura del Treap
  void update(node* T) {
    T->sz = 1 + sz(T->left) + sz(T->right);
  }

  node *root;

  // Guardamos en T el resultado
  void merge(node* &T, node* T1, node* T2) {
    // Si un árbol es vacío, retornamos el otro
    if(T1 == NULL) { T = T2; return; }
    if(T2 == NULL) { T = T1; return; }

    // Si T1 tiene mayor prioridad, su raíz será
    // la raíz del árbol fusionado
    if(T1->priority > T2->priority) {
      merge(T1->right, T1->right, T2);
      T = T1;
    }
    // En el otro caso, gana la raíz de T2
    else {
      merge(T2->left, T1, T2->left);
      T = T2;
    }

    return update(T);
  }

  // Guardaremos en T1, T2 los resultados
  void split(node* T, ll x, node* &T1, node* &T2) {
    // El split del treap vacío son dos treaps vacíos
    if(T == NULL) {
      T1 = T2 = NULL;
      return;
    }

    // Si la llave de T es <= x, entonces la raíz
    // y todo el subárbol izquierdo van en T1
    if(T->key <= x) {
      split(T->right, x, T->right, T2);
      T1 = T;
    }

    // Si no, la raíz y el subárbol derecho van en T2
    else {
      split(T->left, x, T1, T->left);
      T2 = T;
    }

    return update(T);
  }

  bool search(node* T, ll x) {
    if(T == NULL) return false; // Un treap vacío no tiene nada
    if(T->key == x) return true; // Encontramos x

    // Si es menor que la llave, debe estar en el subárbol izquierdo
    if(x < T->key) return search(T->left, x);

    // Y si no, en el derecho
    return search(T->right, x);
  }

  // Llamada recursiva para ingresar nodo n
  void insert(node* &T, node* n) {
    // Si T es vacío, la inserción es el nodo n
    if(T == NULL) {
      T = n;
      return;
    }

    // Si n tiene mayor prioridad que T, debe
    // ser la nueva raíz 
    if(n->priority > T->priority) {
      split(T, n->key, n->left, n->right);
      T = n;
    }

    // Si no, insertamos en el subárbol izquierdo
    // si es que tiene una llave menor a la de T
    else if(n->key < T->key) insert(T->left, n);
    // ... y en el caso contrario, en el subárbol derecho
    else insert(T->right, n);

    return update(T);
  }

  void erase(node* &T, ll x) {
    // El treap vacío no contiene a x
    if(T == NULL) return;

    // Si la llave de T es x, debemos eliminar la raíz
    // y juntar sus subárboles
    if(T->key == x) {
      merge(T, T->left, T->right);
    }

    // Si no, buscamos x en el subárbol izquierdo cuando
    // es menor que la llave de T
    else if(x < T->key) erase(T->left, x);
    // Y si no, intentamos en el subárbol derecho
    else erase(T->right, x);

    return update(T);
  }

  ll quantile(node* T, ll k) {
    // Si el tamaño del subárbol izquierdo es k,
    // la respuesta es T->key
    if(sz(T->left) == k) return T->key;
    // Si k < el tamaño del subárbol izquierdo
    if(k < sz(T->left)) return quantile(T->left, k);
    // Y si no, en el derecho
    return quantile(T->right, k - (sz(T->left) + 1));
  }

  int rank(node *T, ll x) {
    // Un treap vacío no contiene nada
    if(T == NULL) return 0;
    // Si x < T->key, todas las llaves menores 
    // se encuentran en el subárbol izquierdo
    if(x < T->key) return rank(T->left, x);
    // Si no, incluímos la raíz y todo el subárbol
    // izquierdo en la respuesta
    return (sz(T->left) + 1) + rank(T->right, x);
  }

public:
  treap() { root = NULL; }
  treap(ll x) { root = new node(x); }

  // Fusiona O con T
  // Requisito: llaves(T) < llaves(O)
  treap &merge(treap &O) {
    merge(root, root, O.root);
    return *this;
  }

  // Deja los valores <= x en T, 
  // devuelve los valores > x en otro treap
  treap split(ll x) {
    treap ans;
    split(root, x, root, ans.root);
    return ans;
  }

  // Busca x en el treap
  bool search(ll x) {
    return search(root, x);
  }

  // Inserta el valor x en el treap
  void insert(ll x) {
    // Si x ya se encuentra en el árbol,
    // no agregar
    if(search(root, x)) return;

    // Si no, procedemos a ingresarlo
    return insert(root, new node(x));
  }

  // Elimina x del treap 
  void erase(ll x) {
    return erase(root, x);
  }

  int size() {
    return sz(root);
  }

  // Encuentra el k-esimo valor del treap
  ll quantile(int k) {
    return quantile(root, k);
  }

  // Calcula cuantos valores son <= x en el Treap
  int rank(ll x) {
    return rank(root, x);
  }
};

mt19937_64 treap::MT(chrono::system_clock::now().
                    time_since_epoch().count());
```
{{% /details %}}

¿Que otras cosas podemos hacer? También podemos guardar información extra de los subárboles, como la suma de los valores, el producto, la suma de los valores al cuadrado etc etc, y consultar por estos valores por rango.

## ¿ Treaps como mapas / arreglos ?

Hasta ahora hemos visto los **treaps** como implementanciones de la estructura **set**, que puede buscar, insertar y borrar llaves en $O(\\log n)$. Si a cada llave en el treap le asociamos un valor, obtenemos directamente la implementación de un **map**. En el caso de que las llaves sean enteros, podemos pensar en un **map** implementado como **treap** como una implementación un poco particular de un arreglo.

Lo interesante de este "arreglo" son algunas cosas:

1) Si guardamos solamente las posiciones del arreglo que han cambiado desde algún valor default, podemos trabajar con arreglos arbitrariamente grandes. Por ejemplo, podemos tener un arreglo de tamaño $10^{18}$, donde las posiciones inician en $0$, y guardamos en el **treap** solamente aquellos índices que se han modificado.
2) En cada nodo del treap podemos guardar metadatos sobre los subárboles, como por ejemplo la suma, el mínimo/máximo, el producto, etc. Y utilizando **Merge** y **Split**, podemos consultar esta información por rango (¡Como un **Segment Tree**!)

Aquí una idea de como implementar esto:

{{% details "Código" %}} 
```cpp
// Clase wrapper
class treap {
private:
  static mt19937_64 MT;

  static ll random_number() {
    return MT();
  }

  struct node {
    node *left, *right;
    ll key, priority;
    ll value, max_value;

    node(ll k, ll v = 0) {
      left = right = NULL;
      key = k;
      priority = random_number();
      max_value = value = v;
    }    
  };

  // Funciones utilitarias
  ll value(node* T) { return T ? T->value : -INF; }
  ll max_value(node* T) { return T ? T->max_value : -INF; }

  // Mantiene las invariantes del treap
  // llamar cada vez que se altera la estructura del Treap
  void update(node* T) {
    T->max_value = 
    max({T->value, max_value(T->left), max_value(T->right)});
  }

  node *root;

  // Guardamos en T el resultado
  void merge(node* &T, node* T1, node* T2) {
    // Si un árbol es vacío, retornamos el otro
    if(T1 == NULL) { T = T2; return; }
    if(T2 == NULL) { T = T1; return; }

    // Si T1 tiene mayor prioridad, su raíz será
    // la raíz del árbol fusionado
    if(T1->priority > T2->priority) {
      merge(T1->right, T1->right, T2);
      T = T1;
    }
    // En el otro caso, gana la raíz de T2
    else {
      merge(T2->left, T1, T2->left);
      T = T2;
    }

    return update(T);
  }

  // Merge triple de utilidad
  void merge(node* &T, node* T1, node* T2, node* T3) {
    merge(T, T1, T2);
    merge(T, T, T3);
  }

  // Guardaremos en T1, T2 los resultados
  void split(node* T, ll x, node* &T1, node* &T2) {
    // El split del treap vacío son dos treaps vacíos
    if(T == NULL) {
      T1 = T2 = NULL;
      return;
    }

    // Si la llave de T es <= x, entonces la raíz
    // y todo el subárbol izquierdo van en T1
    if(T->key <= x) {
      split(T->right, x, T->right, T2);
      T1 = T;
    }

    // Si no, la raíz y el subárbol derecho van en T2
    else {
      split(T->left, x, T1, T->left);
      T2 = T;
    }

    return update(T);
  }

  // Split triple T1 < x, x <= T2 <= y, T3 > y
  void split(node* T, ll x, ll y,
            node* &T1, node* &T2, node* &T3) {
    // Ahora T2 contiene los valores >= x
    split(T, x-1, T1, T2); 
    // Y con esto T2 contiene los valores en [x, y]
    split(T2, y, T2, T3);
  }

  bool search(node* T, ll x) {
    if(T == NULL) return false; // Un treap vacío no tiene nada
    if(T->key == x) return true; // Encontramos x

    // Si es menor que la llave, debe estar en el subárbol izquierdo
    if(x < T->key) return search(T->left, x);

    // Y si no, en el derecho
    return search(T->right, x);
  }

  // Llamada recursiva para ingresar nodo n
  void insert(node* &T, node* n) {
    // Si T es vacío, la inserción es el nodo n
    if(T == NULL) {
      T = n;
      return;
    }

    // Si n tiene mayor prioridad que T, debe
    // ser la nueva raíz 
    if(n->priority > T->priority) {
      split(T, n->key, n->left, n->right);
      T = n;
    }

    // Si no, insertamos en el subárbol izquierdo
    // si es que tiene una llave menor a la de T
    else if(n->key < T->key) insert(T->left, n);
    // ... y en el caso contrario, en el subárbol derecho
    else insert(T->right, n);

    return update(T);
  }

  void erase(node* &T, ll x) {
    // El treap vacío no contiene a x
    if(T == NULL) return;

    // Si la llave de T es x, debemos eliminar la raíz
    // y juntar sus subárboles
    if(T->key == x) {
      merge(T, T->left, T->right);
    }

    // Si no, buscamos x en el subárbol izquierdo cuando
    // es menor que la llave de T
    else if(x < T->key) erase(T->left, x);
    // Y si no, intentamos en el subárbol derecho
    else erase(T->right, x);

    return update(T);
  }

  // Guarda el valor v en el nodo con llave k
  // Retorna true si k estaba en el treap
  bool set(node* T, ll k, ll v) {
    if(T == NULL) return false; // Un treap vacío no tiene nada

    bool found;
    // Si la llave es k, la encontramos
    if(T->key == k) {
      T->value = k;
      found = true; // Encontramos k
    }
    // Si es menor que la llave, debe estar en el subárbol izquierdo
    else if(k < T->key) found = set(T->left, k, v);
    // Y si no, en el derecho
    else found = set(T->right, k, v);

    if(found) update(T);
    return found;
  }

  // Encuentra el nodo con llave k,
  // NULL si no existe
  node* find(node* T, ll k) {
    // Si T es vacío, k no está en el árbol
    if(T == NULL) return NULL;

    // Encontramos la respuesta
    if(T->key == k) return T;

    // Si k < T->key, buscamos en el subárbol izquierdo
    if(k < T->key) return find(T->left, k);
    // Si no, en el derecho
    return find(T->right, k);
  }

public:
  treap() { root = NULL; }
  treap(ll x) { root = new node(x); }

  // Fusiona O con T
  // Requisito: llaves(T) < llaves(O)
  treap &merge(treap &O) {
    merge(root, root, O.root);
    return *this;
  }

  // Deja los valores <= x en T, 
  // devuelve los valores > x en otro treap
  treap split(ll x) {
    treap ans;
    split(root, x, root, ans.root);
    return ans;
  }

  // Busca x en el treap
  bool search(ll x) {
    return search(root, x);
  }

  // Inserta el valor x en el treap
  void insert(ll x) {
    // Si x ya se encuentra en el árbol,
    // no agregar
    if(search(root, x)) return;

    // Si no, procedemos a ingresarlo
    return insert(root, new node(x));
  }

  // Elimina x del treap 
  void erase(ll x) {
    return erase(root, x);
  }

  // Guarda el valor v en la llave k
  void set(ll k, ll v) {
    // Si k ya se encuentra en el árbol, no crear un nodo
    if(set(root, k, v)) return;

    // Si no, procedemos a ingresarlo
    insert(root, new node(k, v));
  }

  // Devuelve el valor v guardado en la
  // llave k. Si no esta, lo crea con v = 0
  ll operator[](ll k) {
    node* n = find(root, k);
    if(n == NULL) {
      n = new node(k);
      insert(root, n);
    }
    return n->value;
  }

  // Retorna el máximo valor guardado en el treap T
  // en el rango de llaves [a, b]
  ll query(ll a, ll b) {
    node *T1, *T2, *T3;
    split(root, a, b, T1, T2, T3);

    ll ans = max_value(T2);

    merge(root, T1, T2, T3);
    return ans;
  }
};

mt19937_64 treap::MT(chrono::system_clock::now().
                    time_since_epoch().count());
```
{{% /details %}}  

## Implicit Treap

En el caso particular de que guardemos arreglos "enteros" (es decir, en un arreglo de tamaño $n$, guardamos todos los índices como llaves), podemos hacer algo aún mejor. Imaginemos queremos un arreglo donde vamos a:

1) Agregar valores en posiciones arbitrarias
2) Eliminar valores en posiciones arbitrarias
3) Tomar rangos del arreglo y cambiarlos de posición

En un arreglo normal, todas estas operaciones tomarían tiempo $O(n)$ pues involucrarían cambiar $O(n)$ posiciones en el peor caso. En un treap normal, esto también tomaría tiempo $O(n)$ pues, de nuevo, tendríamos que modificar $O(n)$ llaves para mantener el arreglo.

Pero... si no tuvieramos que guardar las llaves, no tendríamos por que preocuparnos de actualizarlas. En la implementación de **Quantile** vimos como acceder a la $k$-ésima llave del **treap** **sin usar en absoluto las llaves**, usando solamente los **tamaños** como guía.

Y, naturalmente, si en el **treap** guardamos un arreglo, la $k$-ésima llave es la $k$-ésima posición de nuestro arreglo. Es decir, que si nos preocupamos de mantener la información de los tamaños de forma correcta, podemos deshacernos de las llaves por completo. Y si ya no tenemos llaves, ya no tenemos que preocuparnos de mantenerlas actualizadas, y podemos implementar las operaciones antes mencionadas usando **Split** y **Merge**. No es trivial olvidarse de las llaves, y sin ellas podemos entender intuitivamente las operaciones **Split** y **Merge** como:

1) **Split($T, k$)** toma un arreglo guardado en un treap $T$ y lo separa en dos treaps, que guardan los primeros $k$ índices y los últimos $n-k$ índices. 
2) **Merge($T_1, T_2$)** concatena los arreglos guardados en $T_1$ y $T_2$. 

Adicionalmente, mediante estrategias de updates lazy, podemos hacer operaciones por rango como sumarle $x$ a todos los valores en $[i, j]$, y en el caso particular de treaps dar vuelta un rango. La idea es que al igual que debemos preocuparnos de mantener las invariantes en el treap como el tamaño, al momento de accesar el valor de un nodo o de intentar cambiar su estructura debemos preocuparnos de hacer el update lazy y empujarlo a los hijos.

Dejamos el detalle en el siguiente código:
{{% details "Código" %}} 
```cpp
typedef long long ll;

// Clase wrapper
class implicit_treap {
private:
  static mt19937_64 MT;

  static ll random_number() {
    return MT();
  }

  struct node {
    node *left, *right;
    int sz;
    ll priority;
    ll value, sum_value;
    ll lazy_sum;
    bool lazy_flip;

    node(ll v = 0) {
      left = right = NULL;
      priority = random_number();
      sz = 1;
      sum_value = value = v;
      lazy_sum = 0;
      lazy_flip = false;
    }    
  };

  // Funciones utilitarias
  ll value(node* T) { return T ? T->value : 0; }
  ll sum_value(node* T) { return T ? T->sum_value : 0; }
  int sz(node* T) { return T ? T->sz : 0; }
  int key(node* T) { return sz(T->left); }

  // Mantiene las invariantes del treap
  // llamar cada vez que se altera la estructura del Treap
  void update(node* T) {
    T->sum_value = 
      T->value + sum_value(T->left) + sum_value(T->right);
    T->sz = 1 + sz(T->left) + sz(T->right);
  }

  void sum_push(node* T) {
    if(T->lazy_sum) {
      T->value += T->lazy_sum;
      T->sum_value += T->sz*T->lazy_sum;

      if(T->left) T->left->lazy_sum += T->lazy_sum;
      if(T->right) T->right->lazy_sum += T->lazy_sum;
    }
    T->lazy_sum = 0;
  }

  void flip_push(node* T) {
    if(T->lazy_flip) {
      swap(T->left, T->right);

      if(T->left) T->left->lazy_flip = !T->left->lazy_flip;
      if(T->right) T->right->lazy_flip = !T->right->lazy_flip;
    }
    T->lazy_flip = false;
  }

  void push(node* T) {
    sum_push(T);
    flip_push(T);
  }

  node *root;

  // Guardamos en T el resultado
  void merge(node* &T, node* T1, node* T2) {
    // Si un árbol es vacío, retornamos el otro
    if(T1 == NULL) { T = T2; return; }
    if(T2 == NULL) { T = T1; return; }

    // Hacer el update a ultimo minuto
    push(T1); push(T2);

    // Si T1 tiene mayor prioridad, su raíz será
    // la raíz del árbol fusionado
    if(T1->priority > T2->priority) {
      merge(T1->right, T1->right, T2);
      T = T1;
    }
    // En el otro caso, gana la raíz de T2
    else {
      merge(T2->left, T1, T2->left);
      T = T2;
    }

    return update(T);
  }

  // Merge triple de utilidad
  void merge(node* &T, node* T1, node* T2, node* T3) {
    merge(T, T1, T2);
    merge(T, T, T3);
  }

  // Guardaremos en T1, T2 los resultados
  void split(node* T, int k, node* &T1, node* &T2) {
    // El split del treap vacío son dos treaps vacíos
    if(T == NULL) {
      T1 = T2 = NULL;
      return;
    }

    // Update a ultimo minuto
    push(T);

    // Si key(T) < k, entonces la raíz
    // y todo el subárbol izquierdo van en T1
    if(key(T) <= k) {
      split(T->right, k - (key(T)+1), T->right, T2);
      T1 = T;
    }

    // Si no, la raíz y el subárbol derecho van en T2
    else {
      split(T->left, k, T1, T->left);
      T2 = T;
    }

    return update(T);
  }

  // Split triple T1 < i, i <= T2 <= j, T3 > j
  void split(node* T, int i, int j,
            node* &T1, node* &T2, node* &T3) {
    // Ahora T2 contiene los valores >= x
    split(T, i-1, T1, T2); 
    // Y con esto T2 contiene los valores en [x, y]
    split(T2, j-i, T2, T3);
  }

  // Guarda el valor v en la posicion k
  void set(node* T, int k, ll v) {
    push(T);

    if(key(T) == k) T->value = v;
    // Si es menor que la llave, debe estar en el subárbol izquierdo
    else if(k < key(T)) set(T->left, k, v);
    // Y si no, en el derecho
    else set(T->right, k - (key(T)+1), v);

    return update(T);
  }

  // Encuentra el nodo que guarda la posición k
  node* find(node* T, int k) {
    push(T);

    // Encontramos la respuesta
    if(key(T) == k) return T;

    // Si k < T->key, buscamos en el subárbol izquierdo
    if(k < key(T)) return find(T->left, k);
    // Si no, en el derecho
    return find(T->right, k - (key(T)+1));
  }

  // Función auxiliar para imprimir el treap
  void print(node* T) {
    if(T == NULL) return;

    push(T);

    print(T->left);
    cout << T->value << ' ';
    print(T->right);
  }

public:
  implicit_treap() { root = NULL; }
  implicit_treap(ll x) { root = new node(x); }

  int size() {
    return sz(root);
  }

  // Concatena T con O
  implicit_treap &merge(implicit_treap &O) {
    merge(root, root, O.root);
    return *this;
  }

  // Deja los valores <= x en T, 
  // devuelve los valores > x en otro treap
  implicit_treap split(int k) {
    implicit_treap ans;
    split(root, k, root, ans.root);
    return ans;
  }

  // Elimina el rango [i, j] del treap
  void erase(int i, int j) {
    node *T1, *T2, *T3;
    split(root, i, j, T1, T2, T3);
    merge(root, T1, T3);
  }

  // Elimina la posición k del treap
  void erase(int k) {
    return erase(k, k);
  }

  // Guarda el valor v en la posición k
  void set(int k, ll v) {
    set(root, k, v);
  }

  // Devuelve el valor v guardado en la posición k
  ll operator[](int k) {
    return find(root, k)->value;
  }

  // Retorna la suma de los valores guardado en T
  // en el rango de indices [i, j]
  ll query(int i, int j) {
    node *T1, *T2, *T3;
    split(root, i, j, T1, T2, T3);

    ll ans = sum_value(T2);

    merge(root, T1, T2, T3);
    return ans;
  }

  // Le suma x a todo el rango [i, j]
  void update(int i, int j, ll x) {
    node *T1, *T2, *T3;
    split(root, i, j, T1, T2, T3);

    T2->lazy_sum += x;

    merge(root, T1, T2, T3);
  }

  // Da vuelta el rango [i, j]
  void flip(int i, int j) {
    node *T1, *T2, *T3;
    split(root, i, j, T1, T2, T3);

    T2->lazy_flip = !T2->lazy_flip;

    merge(root, T1, T2, T3);
  }

  // Inserta x en T de tal forma que T[i] = x
  void insert(int i, ll x) {
    node* T;
    split(root, i-1, root, T);
    merge(root, root, new node(x), T);
  }

  // Agrega x al final de T
  void push_back(ll x) {
    merge(root, root, new node(x));
  }

  // Agrega x al principio de T
  void push_front(ll x) {
    merge(root, new node(x), root);
  }

  // Imprime todos los valores del treap en orden
  // i.e. [1, 2, 3] => 1 2 3 \\n
  void print() {
    print(root); 
    cout << endl;
  }
};

mt19937_64 implicit_treap::MT(chrono::system_clock::now().
                    time_since_epoch().count());
```
{{% /details %}}    