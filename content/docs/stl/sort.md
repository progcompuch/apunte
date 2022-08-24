---
title: Sort
lead: ''
date: 2022-3-28T08:48:45.000+00:00
images: []
weight: 203
menu:
  docs:
    parent: stl
---

## Ordenar

Con frecuencia en problemas de programación nos será de utilidad tener los elementos ordenados y si has visto antes el problema de ordenar un arreglo sabrás que se puede resolver con una complejidad de $O(nlogn)$, siendo $n$ el tamaño del arreglo, pero esto no es simple de programar. Por suerte, C++ tiene implementada la función `sort` que nos permite ordenar distintas estructuras con esta complejidad.

Para usar `sort` solo necesitamos entregar dos punteros a donde parte y termina el espacio, para un arreglo es:

```c++
int a[n];
sort(a,a+n);
```

Y el arreglo queda ordenado de menor a mayor.

Para un vector:

```c++
vector<int> a;
sort(a.begin(),a.end());
```

Y el vector queda ordenado.

Si tenemos un vector de pares los elementos quedan ordenados por el primer elemento y en caso de empate, por el segundo.

```c++
vector< pair<int,int> > a = { {1,3} , {2,1}, {1,2} , {3,0} };
sort(a.begin(),a.end());
for (int i=0;i <3 +1;i++){
    cout<<a[i].first<<' '<<a[i].second<<'\n';
}
// { {1,2} , {1,3}, {2,1} , {3,0} }
```

## Función de comparación

De repente necesitamos ordenar los datos de forma distinta que solo de menor a mayor, para esto a la función `sort` le podemos pasar un tercer parámetro opcional que tenga la función que se va a usar para hacer las comparaciones.

Si queremos ordenar de mayor a menor basta con pasarle la función `greater<type>()` de c++:

```c++
vector<int> a;
sort(a.begin(),a.end(),greater<int>());
```

Podemos definir nuestra propia función de la siguiente forma:

```c++
// devuelve true si a va antes b
bool mySort(pair<int,int> a, pair<int,int> b){
    if (a.first < b.first) return true;
    if (b.first < a.first) return false;
    return b.second < a.second;
}

...

vector< pair<int,int> > a;
sort(a.begin(),a.end(),mySort);
```

Con esto programamos una forma de ordenar los elementos de menor a mayor por el primer elemento y en caso de empate de mayor a menor por el segundo.