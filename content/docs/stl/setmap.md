---
title: Sets, Maps y Multisets
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 203
menu:
  docs:
    parent: stl

---
### Set

Quizás te suene una estructura llamada "árbol de búsqueda binaria", sin entrar en detalles de su implementación esta estructura guarda un conjunto de números de forma ordenada y permite insertar, buscar y eliminar elementos con una complejidad de *O( log(n) \* k )* donde *n* es el tamaño del conjunto y *k* es la complejidad de comparar dos elementos. Ahora, la parte complicada de esto es la implementación pero C++ tiene la estructura set que está implementada como uno de estos árboles lo cual nos da todos los beneficios en términos de complejidad sin tener que implementar todo desde cero, pero usar esta estructura es bastante distinto a usar un vector así que es necesario aprender a usarla.

```c++
set<int> my_set; // Se inicializa un set
for (int i=0;i<5;i++){
	my_set.insert(i); // Se ingresan elementos al set
}
if (my_set.count(5) == 0){
	// Para saber si un elemento esta en el set podemos
	// simplemente revisar si la funcion count retorna 0
	cout<<"5 no esta en el set\n";
}
my_set.insert(4); //esto no hace nada ya que 4 ya esta en el set
my_set.erase(3); // borramos al 3 del set
my_set.clear(); //borra todos los elementos del set
```

Ahora, no podemos acceder directamente a posiciones del set como lo hacemos con un arreglo, los sets usan **iteradores** que funcionan como punteros a las distintas posiciones del set, para programación competitiva no usamos los punteros de forma avanzada, solo con tener claro que no son el valor en sí sino la dirección en memoria del valor debería bastar.

```c++
for (int i=0;i<5;i++) my_set.insert(i);

my_set.find(2);
// esto retorna un iterador apuntando al valor 2

if (my_set.find(5) == my_set.end()){
	// Esto es otra forma de revisar si un elemento no esta
	// en el arreglo, si el elemento no esta va a retornar
	// un iterador al final del set, donde no hay nada
	cout<<"5 no esta en el set\n";
}

for (auto it = my_set.begin() ; it != my_set.end() ; it++ ){
	// Con este for podemos recorrer los elementos del set
	// de forma ordenada ya que estan guardados de forma
	// ordenada, pero para obtener su valor tenemos que
	// acceder al iterador con el operador *
	cout<<(*it)<<'\n';
}

auto small_it = my_set.begin();
cout<<"El menor elemento del set es "<<(*small_it)<<'\n';
// Como estan ordenados podemos tomar el primer elemento del
// set y sabemos que este es el menor

auto large_it = my_set.end();
large_it--;
cout<<"El mayor elemento del set es "<<(*large_it)<<'\n';
// Para obtener el mayor elemento no basta con ver end
// ya que end es el final pero esta vacío, hay que retroceder
// una posición para encontrar el último elemento

my_set.erase(large_it);
// A erase tambien podemos entregarle un iterador, en este caso
// va a borrar el 4 que era el valor que tenia el iterador
```

Un par de detalles importantes:

- Es importante tener muy claro que la complejidad de las operaciones en el set no son constantes y dependen del elemento que esté en el set. Comparar dos números es constante y la complejidad de las operaciones solo va a ser *O( log(n) )*, pero si ponemos vectores en el set para comparar dos vectores el computador los compara elemento a elemento lo cual cambia la complejidad y es algo importante que tener en cuenta.

- Hacer ```it++``` y ```it--``` no es lo mismo que sumar y restar, C++ usa estos operadores para avanzar por el set, no se le puede sumar números a estos iteradores, cosas como ```it+=1``` no funcionan, no deberían compilar.

### Map

Los mapas son similares a los diccionarios de python, se asignan pares [ llave , valor ] en una estructura y en C++ estos están implementados de forma similar a los sets donde la complejidad de buscar elementos es *O( log(n) \* k )* y *k* ahora es la complejidad de comparar las llaves.

```c++
map<int,string> my_map; // un mapa con pares [ int , string ]

my_map[1] = "uno"; // agregar pares al map

my_map[2] = "dds"; 
my_map[2] = "dos"; // sobreescribir el valor de una llave

my_map.erase(1); // borra el par [1,"uno"]

// al igual que set, podemos usar iteradores con map
my_map.erase(my_map.find(2));

// creamos un mapa con las letras del alfabeto
for (int i=0;i<26;i++) my_map[i] = string(1,'a' + i);

for (auto it = my_map.begin() ; it != my_map.end() ; it++ ){
	// de la misma forma que recorremos el set podemos
	// recorrer el mapa, pero como este guarda un par
	// se accede de forma distinta
	cout<<(it->first)<<" : "<<(it->second)<<'\n';
	// first es la llave y second es el valor
	// el mapa esta ordenado con el valor de la llave
}
```

Un uso tipico de los mapas es cuando se necesita indexar strings que se pueden repetir.

```c++
int n;
string s;
vector<string> str;
map<string,int> string_idx;

// leyendo n strings
for (int i=0;i<n;i++){
	cin>>s;
	
	if (string_idx.find(s) == string_idx.end()){
		// si el string no esta en el mapa va a estar 
		// estar al final del arreglo porque lo
		// agregaremos ahora
		int idx = str.size();
		string_idx[s] = idx;
		str.push_back(s);
	} else {
		// si no, su indice esta en el mapa
		int idx = string_idx[s];
	}
}
```

### Multiset

Finalmente, tenemos el multiset, funciona igual que el set solo que ahora podemos tener valores repetidos y, por lo tanto, sus funciones trabajan de manera similar con un par de diferencias.

```c++
multiset<int> my_multi;

for (int i=0;i<5;i++){
	my_multi.insert(i);
	my_multi.insert(i);
	// podemos insertar cada elemento dos veces y se guardan
	// los dos, en un set el segundo insert no haria nada
}

// Ahora podemos usar count para saber cuantas veces se repite
// un elemento en el multiset
cout<<"Hay "<<my_multi.count(3)<<" elementos 3 en el multiset\n";

// Una de las diferencias mas importantes es que ahora .erase()
// borra todas las instancias del elemento, no solo una
my_multi.erase(3);
if (my_multi.find(3) == my_multi.end()){
	cout<<"Ya no hay ningun 3 en el multiset :(\n";
}
// Para borrar solo un elemento tenemos que usar un iterador
// al elemento que lo podemos obtener facilmente con find
my_multi.erase(my_multi.find(2));
// Ahora todavia queda un 2
```

De igual forma que todos los demás podemos iterar a través del multiset y los guarda de forma ordenada.

### Problemas

[UVa OJ 10226 - Hardwood Species](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=1167)

[UVa OJ 11136 - Hoax or what](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=2077)
                                   
