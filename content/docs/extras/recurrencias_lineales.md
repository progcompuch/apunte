---
title: Recurrencias Lineales
lead: ''
date: 2022-12-04T02:48:45.000+00:00
images: []
weight: 301
menu:
  docs:
    parent: extras
---

## Introducción
Las recurrencias lineales se ven como secuencias que cumplen una ecuación del tipo:

$$
a_k = \\sum_{i\\geq 1} c_i(k)a_{k-i} + f(k)
$$

Es decir, secuencias donde cada valor depende de una función lineal de los valores anteriores, más alguna función de k.

Hay un sinfín de variedad de estas, la más clásica de todas siendo:

$$
f_k = f_{k-1} + f_{k-2}
$$

La secuencia de Fibonacci. Otra clase de secuencias que podemos expresar usando esta terminología es:
$$
T_n = 2T_{\\lceil n/2 \\rceil} + O(n)
$$

El tiempo que nos demoramos en ordenar un arreglo usando Quicksort. Dada la tremenda expresividad de este tipo de ecuaciones, se nos hace difícil poder resolverlas todas y nos vamos a restringir a una clase más acotada de ellas.

Vamos a decir que una recurrencia es a coeficientes constantes, si es que todos los $ c_i $ cumplen con ser una función constante, esto es, que $ c_i(k) = c_i $ para cada $ i $.

Y vamos a decir que tiene grado $ n $ si es que la parte lineal tiene exactamente $ n $ términos:

$$
a_k = \\sum_{i=1}^{n} c_i a_{k-i} + f(k)
$$

Finalmente, diremos que es homogénea si es que $ f(k) = 0 $. Vamos a estudiar primero como resolver recurrencias lineales homogéneas, a coeficientes constantes y de grado finito primero. Luego, veremos algunas clases de recurrencias no homogéneas que también podemos resolver.

#### Nota Importante sobre módulos

Los valores de estas secuencias crecen de forma extremadamente rápida (a velocidad exponencial!). Es por eso que los problemas que nos piden resolver este tipo de recurrencias por lo general las piden módulo un primo grande (nuestro amigo $10^9+7$). Es importante que cuando ustedes programen este tipo de soluciones se fijen en ese detalle, y no intenten programar lo aquí descrito de forma directa (probablemente un gran overflow y un wrong answer).

# Recurrencias lineales a coeficientes constantes y de grado finito

Nos enfocaremos en el caso de las recurrencias más resolubles, es decir, aquellas a coeficientes constantes de grado $n$. Es importante destacar que para poder resolver la recurrencia, necesitamos los primeros $n$ terminos de la secuencia:$a_0, a_1 \\dots a_{n-1}$. Esto pues no podemos utilizar la ecuación de recurrencia para determinar el valor de estos terminos, y sin ellos no hay suficiente información para determinar el resto.


## **Caso homogéneo**
Vamos a estudiar técnicas para resolver la recurrencia lineal "más simple" posible:

$$
a_k = \\sum_{i=1}^{n} c_i a_{k-i}
$$

La forma más común de atacar este tipo de ecuaciones es a través de estudiar el polinomio característico de la recurrencia, definido como:

$$
c(\\lambda) = \\lambda^n - \\sum_{i=1}^n c_i \\lambda^{n-i}
$$

Se puede ver que si $ \\lambda $ es raíz de este polinomio, entonces la secuencia $ a_k = \\lambda^k $ cumple con la recurrencia, y 
adicionalmente podemos recuperar todas las soluciones de la recurrencia si es que sabemos todas las raíces del polinomio. No 
ahondaremos en este método pues:

1) Requiere solucionar polinomios de potencialmente grado $>4$, que no podemos hacer de forma algebraica en todos los casos.
2) Aún cuando podemos obtener las raíces, no es fácil obtener la la solución a la recurrencia a partir de ellas, pues o bien
requiere usar números de punto flotante que no es estable númericamente, o requiere usar "magia oscura algebraica" que es mejor
aplicar mediante otros métodos.

Veremos 3 métodos de resolver esta ecuación:

### DP

Es una aplicación directa de DP generar la solución de estas recurrencias. Usamos:

* $\\text{DP}[k] = a_k \\ \\text{para } k < n $
* $\\text{DP}[k] = \\sum_{i=1}^n c_i \\text{DP}[k-i] $

Obtenemos una complejidad de $O(NK)$ en tiempo, y $O(K)$ en memoria para obtener la secuencia hasta un $K$ fijo. Esta es la solución más básica y menos optimizada, pero tambien la más fácil de programar. Igual es importante destacar que está es la solución más fácil de extender, pues también sirve para el caso de coeficientes no constantes y recurrencias no homogéneas.

{{% details "Código" %}}
```cpp
typedef long long ll;
// Trabajar con números de 64 bits 

const ll MOD = 1e9+7;

% A los casos base, C los coeficientes
ll calcular_ak(vector<ll> &a, vector<ll> &c, int K) {
  assert(a.size() == c.size()); 
  // Necesitamos tantos casos base como el grado de la recurrencia

  int N = a.size();
  if(K < N) return a[K];

  vector<ll> DP(K+1);
  for(int k = 0; k < N; ++k) DP[k] = a[k];

  for(int k = N; k <= K; ++k) {
    DP[k] = 0;
    for(int i = 1; i <= N; ++i) {
      DP[k] += c[i-1]*DP[k-i];
      DP[k] %= MOD;
    }
  }

  return DP[K];
}
```
{{% /details %}}

### Matrices

Podemos expresar la recurrencia de forma matricial: 

$$
\\begin{pmatrix}
c_1 & c_2 & \\cdots & c_n\\\\
1 & 0 & \\cdots & 0 \\\\
0 & 1 & \\cdots & 0 \\\\
\\vdots & \\ddots & \\ddots & \\vdots \\\\
0 & \\cdots & 1 & 0
\\end{pmatrix}
\\begin{pmatrix}
a_{k-1} \\\\
a_{k-2} \\\\
\\vdots \\\\[1.5em]
a_{k-n}
\\end{pmatrix} =
\\begin{pmatrix}
a_{k} \\\\
a_{k-1} \\\\
\\vdots \\\\[1.5em]
a_{k-(n-1)}
\\end{pmatrix}
$$

Llamando $\\mathbf{C}$ a esta matriz, y definiendo $\\mathbf{a_k} = (a_{k+(n-1)} \\dots a_{k+1}, a_{k})^t$, podemos escribir de forma más sucinta:

$$
\\mathbf{C}\\mathbf{a_{k-1}} = \\mathbf{a_k}
$$

Que tiene una solución bastante simple para el $k$-ésimo termino:

$$
  \\mathbf{a_k} = \\mathbf{C^{k}}\\mathbf{a_{0}}
$$

Con lo que podemos rescatar el $k$-ésimo termino de la secuencia elevando la matriz a $k$, y obteniendo $a_k$ a partir de $\\mathbf{a_k}$. ¿Cuanto tiempo nos toma calcular esta potencia de matriz? Multiplicar dos matrices de tamaño $N \\times N$ nos toma tiempo $O(N^3)$, y utilizando exponenciación rápida podemos calcular la $k$-ésima potencia utilizando $O(\\log(K))$ multiplicaciones. En total, utilizamos $O(N^3 \\log(K))$ tiempo.

Esta solución nos será útil solo para alrededor de $N \\leq 500$, pero lo importante es que nos permite acceder a valores mucho más grandes de $K$. Valores como $K = 10^{18}$ no son en absoluto un problema para esta técnica.

{{% details "Código" %}}
**Código para multiplicar mátrices**
```cpp
typedef long long ll;
const ll MOD = 1e9+7;

struct matrix {
  vector<vector<ll>> data;
  int n, m;

  matrix(int n, int m) : n(n), m(m) {
    data.resize(n, vector<ll>(m, 0));
  }

  vector<ll> &operator[](int i) {
    return data[i];
  }

  ll access(int i, int j) const {
    return data[i][j];
  }
};

matrix operator*(const matrix &A, const matrix &B) {
  assert(A.m == B.n); // Verificar que las dimensiones calcen
  matrix C(A.n, B.m);

  for(int i = 0; i < A.n; ++i) {
    for(int k = 0; k < A.m; ++k) {
      for(int j = 0; j < B.m; ++j) {
        C[i][j] += A.access(i, k)*B.access(k, j);
        C[i][j] %= MOD;
      }
    }
  }

  return C;
}

vector<ll> operator*(const matrix &A, const vector<ll> &x) {
  assert(A.m == x.size());
  vector<ll> y(A.n, 0);

  for(int i = 0; i < A.n; ++i) {
    for(int j = 0; j < A.m; ++j) {
      y[i] += A.access(i, j)*x[j];
      y[i] %= MOD;
    }
  }

  return y;
}
```

**Ahora, código para obtener la secuencia**
```cpp
matrix exponenciacion_rapida(matrix &A, ll n) {
  assert(A.n == A.m); // Solo podemos elevar matrices cuadradas
  matrix ans(A.n, A.n);
  for(int i = 0; i < A.n; ++i) ans[i][i] = 1;
  // ans es ahora la matriz identidad, o A^0

  for(int bit = 1; bit <= n; bit <<= 1) {
    if((bit&n) != 0) ans = A*ans; // Si el k-esimo bit está prendido, multiplicar por A^2^k
    A = A*A; // Conseguir la siguiente potencia binaria de A
  }

  return ans;
}

ll calcular_ak(vector<ll> &a, vector<ll> &c, ll K) {
  assert(a.size() == c.size()); 
  // Necesitamos tantos casos base como el grado de la recurrencia
  
  int N = a.size();
  if(K < N) return a[K];

  matrix C(N, N);
  C[0] = c;

  for(int i = 1; i < N; ++i) C[i][i-1] = 1;

  vector<ll> x = a;
  reverse(x.begin(), x.end());

  vector<ll> y = exponenciacion_rapida(C, K)*x;
  return y.back();
}
```
{{% /details %}}

### El método Kitamasa

Los dos métodos anteriores nos permiten atacar recurrencias donde o bien ambos $n$ y $k$ son pequeños, o $n$ es extremadamente pequeño y $k$ puede ser tan grande como deseemos. Vamos a estudiar un último método que nos permitirá resolver recurrencias cuando $n$ es un poco más grande y no es posible aplicar el metodo matricial. 

Una gracia del método matricial es que nos permite calcular $a_k$ usando solamente los primeros $n$ términos, es decir $a_k = \\sum_{i=0}^{n-1} d_i(k) a_i$. Podemos intentar lograr esto aplicando la recurrencia repetidas veces. Por ejemplo, para la recurrencia $a_k = 2a_{k-1} + a_{k-2}$ vemos que:

$$
\\begin{matrix}
a_5 & = & 2a_4 + a_3 \\\\
a_5 & = & 2(2a_3 + a_2) + a_3   & = & 5a_3 + 2a_2 \\\\
a_5 & = & 5(2a_2 + a_1) + 2a_2  & = & 12a_2 + 5a_1 \\\\
a_5 & = & 12(2a_1 + a_0) + 5a_1 & = & 29a_1 + 12a_0
\\end{matrix}
$$

En este caso $d_1 = 29$ y $d_0 = 12$. Podemos repensar este método como ir restando $q(a_k - \\sum_{i=1}^n c_i a_{k-i}) = 0$ en cada paso para anular el termino lider, algo así como:

$$
\\begin{matrix}
a_5 & = & 2a_4 + a_3 & - & 2(a_4 - 2a_3 - a_2)    & = & 5a_3 + 2a_2\\\\
a_5 & = & 5a_3 + 2a_2 & - & 5(a_3 - 2a_2 - a_1)   & = & 12a_2 + 5a_1 \\\\
a_5 & = & 12a_2 + 5a_1 & - & 12(a_2 - 2a_1 - a_0) & = & 29a_1 + 12a_0 \\\\
\\end{matrix}
$$

Si miramos un buen rato, este proceso puede recordarnos a otro algoritmo... ¡de hecho, este proceso es equivalente al proceso de división de polinomios!

Para formalizar esta relación con polinomios, utilizaremos un poco de magia algebraica. Definiremos una aplicación lineal sobre polinomios mediante $G(x^i) = a_i$. El problema de calcular $a_k$ se reduce, entonces, al problema de calcular $G(x^k)$. ¿Que utilidad tiene $G$? Notar que $G$ cumple una relación interesante con el polinomio característico de la recurrencia:

$$ \\begin{align*}
c(x) &= x^n - \\sum_{i=1}^n c_i x^{n-i} \\\\[1.2em]
G(c) &= a_n - \\sum_{i=1}^n c_i a_{n-i} = 0
\\end{align*}
$$

Aún más, dado que la recurrencia se cumple en todos los índices mayores que $n$, podemos afirmar que para $d>0$ se cumple:

$$
G(x^dc) = a_{n+d} - \\sum_{i=1}^nc_ia_{(n+d)-i} = 0
$$

Y luego, por extensión, tenemos que para cualquier polinomio $p$: 

$$\\begin{align*}
p(x) &= \\sum_{j=0}^{m} p_j x^j \\\\
G(pc) &= \\sum_{j=0}^m p_jG(x^jc) = 0
\\end{align*}$$

Aquí entra el gran truco: gracias al algoritmo de Euclides, sabemos que existen polinomios $q(x)$ y $r(x)$, de grado $k-n$ y $<n$ respectivamente, tal que podemos escribir:

$$
  x^k = q(x)c(x) + r(x)
$$

¡Y la gracia es que podemos aplicar $G$ a esta ecuación!

$$
  G(x^k) = G(qc + r) = G(qc) + G(r) = G(r)
$$

Escrito de forma más formal, se cumple la ecuación:

$$
  G(x^k) = G(x^k \\text{ mod } c)
$$

Cabe destacar que como $x^k \\text{ mod } c$ tiene grado $<n$, para calcular $G(r)$ solamente necesitamos aquellos valores de $a_i$ con $i<n$, y estos corresponden a los casos base de nuestra recurrencia. Entonces, el problema se reduce a calcular $x^k \\text{ mod } c$. ¿Como podemos hacer esto de forma eficiente? Si aplicamos el algoritmo de Euclides de forma directa, el calculo tomaría alrededor de $k-n$ pasos donde en cada paso tenemos que restar un multiplo de $c$, es decir que en complejidad tomaría $O(N(K-N)) = O(NK)$ pasos. Esto no mejora en nada respecto al primer método.

La gracia es hacer este calculo de forma más inteligente. Aplicando el algoritmo de exponenciación rápida, podemos calcular $x^k \\text{ mod } c$ a partir de $x \\text{ mod } c, \\ x^2 \\text{ mod } c, \\ x^4 \\text{ mod } c \\dots$. Necesitaremos $O(\\log(K))$ de estos polinomios, y en cada paso tendremos que obtener el módulo $c$ de un polinomio de grado a lo más $2N$. Aplicando el algoritmo de Euclides de forma directa, esto nos toma en el peor caso tiempo $O(N(2N-N)) = O(N^2)$ pasos, ¡que nos lleva a un algoritmo final con complejidad $O(N^2 \\log(K))$ pasos!

Para concluir, vamos a describir el algoritmo a grandes rasgos:

1) Calcular los polinomios $r_d(x) = [x^{2^d} \\text{ mod } c]$ para todos los $d \\geq 1$ tales que $2^d \\leq k$. Complejidad $O(N^2\\log(K))$.
2) A partir de la descomposición binaria de $k = \\sum b_d 2^d$, multiplicar los $r_d(x)$ y aplicar$\\text{ mod } c$ para aquellos $d$ donde $b_d = 1$, para obtener $r(x) = [x^k \\text{ mod } c]$. Complejidad $O(N^2\\log(K))$
3) Calcular $G(r)$ para obtener $a_k$. Complejidad $O(N)$.

Y utilizando todo esto obtenemos un algoritmo de complejidad $O(N^2\\log(K))$ para calcular $a_k$. Como último detalle, este algoritmo puede mejorarse aún más a una complejidad de $O(N\\log(N)\\log(K))$ utilizando técnicas avanzadas de polinomios. Se pueden encontrar más detalles [aquí](https://www.pc-arg.com/media/attachment/fft.pdf).

{{% details "Código" %}}
**Código para polinomios**
```cpp
typedef long long ll;
const ll MOD = 1e9+7;

struct poly {
  vector<ll> coef; // vector de coeficientes
  int n; // El grado del polinomio

  poly() : n(-1) {} // Usaremos grado -1 para el polinomio "vacío"
  poly(vector<ll> &&A) : coef(A), n(A.size()-1) {}
  poly(int n) : n(n) {
    coef.resize(n+1, 0);
  }

  ll &operator[](int k) {
    return coef[k];
  }

  ll access(int k) const {
    return coef[k];
  }

  // Asegura que el coeficiente principal no es 0
  void fit() {
    while(!coef.empty() && coef.back() == 0) {
      coef.pop_back();
    }

    n = coef.size()-1;
  }

  ll eval(ll x) {
    ll ans = 0, y = 1;

    for(int i = 0; i <= n; ++i) {
      ans += coef[i]*y;
      ans %= MOD;
      y = y*x%MOD;
    }

    return ans;
  }
};

poly operator*(const poly &a, const poly &b) {
  poly c(a.n + b.n);

  for(int i = 0; i <= a.n; ++i) {
    for(int j = 0; j <= b.n; ++j) {
      c[i+j] += a.access(i)*b.access(j);
      c[i+j] %= MOD;
    }
  }

  c.fit();
  return c;
}

// Calcula b tal que a*b = 1 modulo MOD
// https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
ll modinv(ll a) { 
  ll r0 = a, r1 = MOD;
  ll s0 = 1, s1 = 0;

  while(r1 != 0) {
    ll q = r0/r1;
    ll r = r0 - q*r1; r0 = r1; r1 = r;
    ll s = s0 - q*s1; s0 = s1; s1 = s;
  }

  return (s0+MOD)%MOD;
}

// Modulo usando el algoritmo de Euclides para polinomios
poly operator%(const poly &a, const poly &b) {
  if(a.n < b.n) return a; // Si el grado es menor, el resto es a

  poly r = a;

  ll b_lead = b.access(b.n), inv_b_lead = modinv(b_lead);
  for(int k = a.n; k >= b.n; --k) {
    ll scale_factor = (r[k]*inv_b_lead)%MOD;
    for(int i = 0; i <= b.n; ++i) {
      r[k-i] -= scale_factor*b.access(b.n-i);
      r[k-i] %= MOD;
      if(r[k-i] < 0) r[k-i] += MOD;
    }
  }

  r.fit();
  return r;
}
```
**Código para obtener la secuencia**
```cpp
poly exponenciacion_rapida(poly &p, poly &mod, ll n) {
  // ans inicia como el polinomio unidad i.e. ans(x) = 1
  poly ans(0); ans[0] = 1; 
  for(int bit = 1; bit <= n; bit <<= 1) {
    if((bit&n) != 0) ans = (p*ans)%mod; // Si el k-esimo bit está prendido, multiplicar por p^2^k
    p = p*p%mod; // Conseguir la siguiente potencia binaria de p
  }

  return ans;
}

ll G(const vector<ll> &a, const poly &p) {
  ll ans = 0;

  for(int k = 0; k <= p.n; ++k) {
    ans += a[k]*p.access(k);
    ans %= MOD;
  }

  return ans;
}

ll calcular_ak(vector<ll> &a, vector<ll> &c, ll K) {
  assert(a.size() == c.size()); 
  // Necesitamos tantos casos base como el grado de la recurrencia

  int N = a.size();
  if(K < N) return a[K];

  poly p(N); // Creamos el polinomio característico de la recurrencia

  p[N] = 1;
  for(int i = 1; i <= N; ++i) p[N-i] = MOD-c[i-1];

  poly x(1); x[1] = 1; // El polinomio base x
  return G(a, exponenciacion_rapida(x, p, K)); // Calcular G(x^k mod p)
}
```
{{% /details %}}

## **Caso no Homogéneo**

Hasta ahora tenemos una gran estructura para lidiar con el caso homogéneo de las recurrencias, pero no sabemos nada respecto a enfrentar recurrencias que no son homogéneas. Veremos dos casos donde es posible reducir estas recurrencias a otras equivalentes que si son homogéneas, que nos permitirá usar todos los métodos ya explicados.

### Caso $f(k) = b$ constante
Estás son las recurrencias lineales no homogéneas más simples posibles. Se ven de la forma:

$$
a_k = \\sum_{i=1}^{n} c_i a_{k-i} + b
$$

Usando un truco parecido al del método Kitamasa, podemos restar un $0$ conveniente de la forma $0 = -a_{k-1} + \\sum_{i=1}^n c_ia_{(k-1)-i} + b$. Para facilitar la notación, diremos que $c_0 = -1$ para poder escribir esta expresión como $0 = \\sum_{i=0}^n c_ia_{(k-1)-i} + b$ y lo restaremos:

$$
\\begin{align*}
a_k &= \\sum_{i=1}^{n} c_i a_{k-i} + b - \\left[\\sum_{i=0}^n c_ia_{(k-1)-i} + b\\right] \\\\
    &= \\sum_{i=1}^{n} c_i a_{k-i} - \\sum_{i=0}^n c_ia_{(k-1)-i}
\\end{align*}
$$

Con lo que anulamos $b$ y obtenemos una recurrencia lineal homógenea para $a$. Agrupando terminos, y tomando la convención de que $c_{n+1} = 0$, podemos reescribir esta recurrencia como:

$$
  \\hat{c}_i = c_i - c_{i-1} \\\\
  a_k = \\sum_{i=1}^{n+1} \\hat{c}_i a_{k-i}
$$

Notar que mediante este proceso, creamos una recurrencia homogénea de grado $n+1$ a partir de una no homogénea de grado $n$, por lo que necesitaremos calcular un caso base adicional para resolver esta recurrencia. Podemos calcular a partir de los casos base originales y utilizando la recurrencia original.

{{% details "Código" %}}
```cpp
typedef long long ll;
const ll MOD = 1e9+7;

void convert(int &n, vector<ll> &a, vector<ll> &c, ll b) {
  assert(a.size() == n && c.size() == n);

  // Agregamos un caso base adicional
  a.push_back(b);
  for(int i = 1; i <= n; ++i) {
    a[n] += c[i-1]*a[n-i];
    a[n] %= MOD;
  }

  // Computamos los nuevos coeficientes c_i
  c.push_back(0);
  for(int i = n; i >= 1; --i) {
    c[i] -= c[i-1];
    if(c[i] < 0) c[i] += MOD;
  }

  c[0] = (c[0]+1)%MOD;

  ++n;
  return;
}
```
{{% /details %}}

### Caso $f(k) = p(k)$ polinomio

Podemos generalizar la técnica anterior para polinomios arbitrarios de la forma $p(k) = \\sum_{j=0}^m p_j k^j$. En este caso queremos resolver la recurrencia:

$$
a_k = \\sum_{i=1}^{n} c_i a_{k-i} + p(k)
$$

Vamos a aplicar iterativamente el truco de restar un $0$ conveniente. Usaremos el hecho de que $q(x) = p(x) - p(x-1)$ es un polinomio de grado $m-1$. Utilizaremos la notación $[x^j]p(x)$ para referirnos al coeficiente que acompaña a $x^j$ en el polinomio $p(x)$, y vemos que:

$$
\\begin{matrix}
  [x^m]p(x-1) = [x^m]p(x) \\Rightarrow [x^m]q(x) = 0 \\\\[1.5em]
  [x^{m-1}]q(x) = [x^{m-1}](p(x) - p(x-1)) = m[x^m]p(x) + [x^{m-1}]p(x) - [x^{m-1}]p(x) = m[x^m]p(x) \\neq 0
\\end{matrix}
$$

Entonces, cuando restamos nuestro $0$ conveniente $0 = \\sum_{i=0}^n c_ia_{(k-1)-i} + p(k)$, tenemos que: 

$$
\\begin{align*}
a_k &= \\sum_{i=1}^{n} c_i a_{k-i} + p(k) - \\left[\\sum_{i=0}^n c_ia_{(k-1)-i} + p(k-1)\\right] \\\\
    &= \\sum_{i=1}^{n} c_i a_{k-i} - \\sum_{i=0}^n c_ia_{(k-1)-i} + \\left[p(k) - p(k-1)\\right] \\\\
    &= \\sum_{i=1}^{n+1} (c_i-c_{i-1}) a_{k-i} + q(k) 
\\end{align*}
$$

Ojo que aquí también estamos usando la convención de que $c_0 = -1$ y $c_{n+1} = 0$. Con este procedimiento, obtenemos una recurrencia lineal no homogénea de grado $n+1$ *con un polinomio $q$ de grado $m-1$*. Es decir que podemos reducir el grado del polinomio en $1$ aumentando el grado de la recurrencia en $1$. Si repetimos este proceso en total $m+1$ veces, obtendremos una recurrencia lineal de grado $n+m+1$ donde el polinomio se anula **por completo**, osea, homogénea. Al finalizar, obtendremos coeficientes $\\hat{c}_i$ tal que:

$$
  a_k = \\sum_{i=1}^{n+m+1} \\hat{c}_i a_{k-i}
$$

Tomando la convención de que $c_i = 0$ para $i < 0$, podemos escribir una formula explícita para los $\\hat{c}_i$:

$$
  \\hat{c}\_i = \\sum_{j=0}^{m+1} (-1)^j \\binom{m+1}{j}c\_j
$$

De nuevo, es importante recalcar que para poder resolver esta recurrencia con los métodos que conocemos para recurrencias lineales homogéneas, necesitaremos $m+1$ valores adicionales de la secuencia como base, que podemos obtener utilizando la recurrencia original.

{{% details "Código" %}}
```cpp
typedef long long ll;
const ll MOD = 1e9+7;

void convert(int &n, vector<ll> &a, vector<ll> &c, poly &p) {
  assert(a.size() == n && c.size() == n);

  int m = p.n;
  // Debemos agregar m+1 casos base
  for(int k = n; k <= n+m; ++k) {
    a.push_back(p.eval(k));

    for(int i = 1; i <= n; ++i) {
      a[k] += c[i-1]*a[k-i];
      a[k] %= MOD;
    }
  }

  // Computamos los nuevos coeficientes c_i
  for(int k = n; k <= n+m; ++k) {
    c.push_back(0);
    
    for(int i = k; i >= 1; --i) {
      c[i] -= c[i-1];
      if(c[i] < 0) c[i] += MOD;
    }

    c[0] = (c[0]+1)%MOD;
  }

  n += m+1;
  return;
}
```
{{% /details %}}


