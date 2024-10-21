---
title: "Puntos"
type: docs
menu:
  apunte:
    identifier: "apunte-geometria-puntos"
    parent: "apunte-geometria"
weight: 1 # El menú lateral ordena artículos por su peso
---

Geometría es uno de los tópicos donde puede ser más difícil programar algoritmos si no se tiene la experiencia, así que el foco de este artículo es mostrar formas cómodas de programar ejercicios de geometría.

Los códigos de este artículo están inspirados en el [repositorio KACTL.](https://github.com/kth-competitive-programming/kactl)

## Puntos

Al representar un punto, podríamos usar `std::pair` o bien `std::tuple` para dimensiones mayores. Pero esto llevaría a código más complicado de lo necesario: por ejemplo sumar dos puntos ya resultaría tedioso.

En programación competitiva es típico usar un `struct` que nos permita guardar la información del punto, así como también métodos adicionales que nos permitan operar de forma mucho más cómoda con ellos.

En esta sección mostraremos varias iteraciones del código, cada una más compleja y con más funcionalidad.

### Versiones básicas de Point

Comencemos con una `struct` sencilla:

```cpp
struct Point{
    int x, y;
    Point(int _x=0, int _y=0){
        x = _x;
        y = _y;
    }
};
```

Esta `struct` guarda simplemente las coordenadas `x` e `y`, y por defecto sus valores son cero. Tenemos dos constructores, el primero es sin argumentos, este asigna cero a las coordenadas, y el segundo recibe dos enteros, estos se asignan en orden a las coordenadas `x` e `y`.

{{% details "Ejemplo de uso" %}}

Hay distintas formas de inicializar un punto, las ya nombradas y dos más que podrían resultarles útiles:

```cpp
Point a = Point(); // se llaman con parámetros por defecto, a = {0, 0}
Point b = Point(1, 2) // b = {1, 2}.
Point c = {2,5}; // c = {2,5}, inicialización por copia.
Point d{2,5}; // d = {2,5}, inicialización directa.
```
Además una vez creado un punto podemos acceder a sus coordenadas de la siguente forma
```
cout << d.x << ' ' << d.y << endl; // Acceder a x e y
```

{{% /details %}}

Podemos simplificar un poco el constructor usando una [member initializer list](https://www.learncpp.com/cpp-tutorial/constructor-member-initializer-lists/). En este caso no hace tanta diferencia, pero queda más compacto (y es una buena práctica):

```cpp
struct Point{
    int x, y;
    Point(int _x=0, int _y=0) : x(_x), y(_y) {}
};
```

Ahora, nos gustaría permitir sumar, restar y usar otras operaciones entre puntos. Para esto, se puede hacer _operator overloading_. Por ejemplo, el método de la suma sería

```cpp
struct Point{
  int x, y;
  Point(int _x=0, int _y=0) : x(_x), y(_y) {}
  Point operator+(Point p) const {
    return Point(x+p.x, y+p.y);
  }
};
```

La explicación del código anterior es que estamos _enseñándole_ al struct usar el operador de suma. El parámetro `p` es el operando derecho de la suma, y
retornamos un nuevo punto que corresponde a la suma de las coordenadas de nuestro punto actual con las de `p`. Además, como buena práctica
marcamos la función como `const` lo que significa que no puede modificar los miembros del objeto (x e y).

Con este struct, ahora podemos realizar operaciones de este tipo:

```cpp
Point a = {1, 2};
Point b = {2, 3};
Point c = a+b; // c será {3, 5}
```

Con esta misma idea, podemos implementar otros operadores como la resta, multiplicación, división, menor, igualdad, entre otros. Otra mejora que podemos realizar
es la siguiente: nuestro `Point` hasta ahora solo guarda enteros. Podemos agregarle parámetros de tipo (templates) a la struct, de forma que pueda guardar cualquier tipo,
por ejemplo podríamos crear un `Point <double> p = {1.5, 2}` o un `Point <long long>`, etcétera.

### Código final

Juntando las ideas anteriores, quedamos con una struct bastante usable para los puntos, donde además agregamos métodos adicionales de utilidad:

```cpp
template <class T> // T es el parámetro de tipo
struct Point{
	T x, y; // ahora x, y son de tipo T
	Point(T _x=0, T _y=0) : x(_x), y(_y) {}
	// Suma y resta
	Point operator+(Point p) const { return Point(x+p.x, y+p.y); }
	Point operator-(Point p) const { return Point(x-p.x, y-p.y); }
	// Multiplicación y división coordenada a coordenada
	Point operator*(Point p) const { return Point(x*p.x, y*p.y); }
	Point operator/(Point p) const { return Point(x/p.x, y/p.y); }
	// Multiplicación y división por escalares
	Point operator*(T lambda) const { return Point(x*lambda, y*lambda); }
	Point operator/(T lambda) const { return Point(x/lambda, y/lambda); }
	// Menor e igualdad. Usamos tie que retorna una tupla (y por ende compara en orden de izq. a der.)
	bool operator<(Point p) const { return tie(x,y) < tie(p.x, p.y); }
	bool operator==(Point p) const { return tie(x,y) == tie(p.x, p.y); }
	// De acá en adelante los métodos interpretan al punto como un vector
	// dist2 retorna el largo al cuadrado. Siempre es mejor usarla al cuadrado cuando sea posible para evitar usar doubles
	T dist2() const { return x*x + y*y; }
	double dist() const { return sqrt((double)dist2()); }
	// dot retorna el producto punto con otro vector.
	T dot(Point p) const { return x*p.x + y*p.y; }
	// cross retorna el módulo producto cruz
	T cross(Point p) const { return x*p.y - y*p.x; }
	// unit retorna el vector normalizado (largo 1)
	Point unit() const { return *this/dist(); }
	// perp obtiene un vector perpendicular, es decir rota en +90 grados
	Point perp() const { return Point(-y, x); }
	// normal retorna un vector normal unitario (convencion normal a (0,0) = (inf,inf))
	Point normal() const { return perp().unit();  }
	// vector normal unitario (convencion normal a (0,0) = (0,0))
	// Point normal() const { return (*this == Point()) ? *this : perp().unit(); }

	// Además se puede hacer overload de operadores ">>" y "<<" para que poder leer/imprimir Point con cin/cout
	friend istream& operator>>(istream& is, Point &p){
		return is >> p.x >> p.y;
	}
	friend ostream& operator<<(ostream& os, const Point &p) {
		return os << "(" << p.x << "," << p.y << ")";
	}
};
```

{{% details "Ejemplo de uso" %}}

```cpp
int main(){
	Point <int> a, b;
	cin >> a >> b;
	cout << "La suma es: " << a+b << endl;
	cout << "La resta es: " << a-b << endl;
	cout << "La multiplicación es: " << a*b << endl;
	cout << "El producto punto es: " << a.dot(b) << endl;
	return 0;
}
```

Consola:

```bash
1 2
3 4
La suma es: (4,6)
La resta es: (-2,-2)
La multiplicación es: (3,8)
El producto punto es: 11
```

{{% /details %}}