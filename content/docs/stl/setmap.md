---
title: Sets, maps y multisets
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 203
menu:
  docs:
    parent: stl

---
## Set

Quizás te suene una estructura llamada "árbol de búsqueda binaria", sin entrar en detalles de su implementación esta estructura guarda un conjunto de números de forma ordenada y permite insertar, buscar y eliminar elementos con una complejidad de *O( log(n) )*. Ahora, la parte complicada de esto es la implementación pero C++ tiene la estructura set que está implementada como uno de estos árboles lo cual nos da todos los beneficios en términos de complejidad sin tener que implementar todo desde cero, pero usar esta estructura es bastante distinto a usar un vector así que es necesario aprender a usarla.

```
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

```
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

auto large_it = my_set.end();
large_it--;
cout<<"El mayor elemento del set es "<<(*large_it)<<'\n';
// Para obtener el mayor elemento no basta con ver end
// ya que end es el final pero esta vacío, hay que retroceder
// una posición para encontrar el último elemento
```

### Detalles importantes:

- Es importante tener muy claro que la complejidad de las operaciones en el set son *O( log(n) )*, no constantes.
- Hacer ```it++``` y ```it--``` no es lo mismo que sumar y restar, C++ usa estos operadores para avanzar por el set, no se le puede sumar números a estos iteradores, cosas como ```it+=1``` no funcionan, no deberían compilar.
                 