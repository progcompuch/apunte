---
title: Union Find
lead: ''
date: 2022-03-19T08:48:45.000+00:00
images: []
weight: 402
menu:
  docs:
    parent: estructuras

---

### Union Find

El Union Find es una estructura que guarda una lista de elementos como subconjuntos disjuntos y nos permite consultar en que conjunto está cada elemento y unir dos subconjuntos en tiempo constante (aproximadamente).

<center> <img class="invertible" src="../disjointsets.png" width="450"/> </center>

Para implementar esto cada subconjunto tiene un "representante". Inicialmente todos los elementos van a estar en su propio subconjunto solos y su representante va a ser él mismo.

```c++
// n representa la cantidad de elementos que tenemos
int n;
// Aquí guardaremos los representantes
vector<int> p(n);
// Aquí guardaremos su tamaño
vector<int> size(n,1);
// Aquí asignamos cada elemento como su propio representante
for (int i=0;i<n;i++){
    p[i] = i;
}
```

Ahora, para unir dos conjuntos tenemos que cambiar el representante de uno de los elementos para moverlo al otro conjunto.

```c++
void unir(int a,int b){
    int repa = representante(a);
    int repb = representante(b);
    // Si sus representantes fueran iguales ya están en el mismo conjunto
    // Si son distintos hay que unirlos
    if (repa != repb){
        // El nuevo representante va a ser el que ahora mismo es más grande
        if (size[repa] >= size[repb]){
            // Le sumamos el tamaño del otro conjunto
            size[repa] += size[repb];
            // El nuevo representante del conjunto de b va a ser a
            p[repb] = repa;
        } else {
            size[repb] += size[repa];
            p[repa] = repb;
        }
    }
}
```

¿Por qué usamos una función representante en vez de directamente acceder al conjunto ```p```? Porque cuando unimos más de dos conjuntos puede que mi representante tenga un representante distinto, esto se puede volver una cadena muy grande y la condición final para saber si estamos en el elemento final es que este elemento va a ser representante de sí mismo. Podemos hacer la función representante de la siguiente manera:

```c++
int representante(int i){
    if (p[i] == i){
        return i;
    } else {
        return representante(p[i]);
    }
}
```

Esto está bien, pero como dijimos antes, esta cadena se puede volver demasiado grande para esto podemos comprimir la cadena cada vez que nos pregunten por el representante de la siguiente forma.

```c++
int representante(int i){
    if (p[i] == i){
        return i;
    } else {
        p[i] = representante(p[i]);
        return p[i];
    }
}
```

Después de cada pregunta esto nos asegura que el representante va a ser el paso final y cada pregunta solo toma un paso.

Aquí dejaré una estructura completa para copiar y pegar.

```c++
struct ufset{
    vector<int> p,s;
    int n;
    ufset(int n):n(n){
        p.resize(n);
        for (int i=0;i<n;i++) p[i] = i;
        s.assign(n,1);
    }
    int findp(int i){return (p[i] == i)?i:p[i] = findp(p[i]);}
    void uni(int i,int j){
        int pi = findp(i), pj = findp(j);
        if (pi != pj){
            if (s[pi] >= s[pj]){
                p[pj] = pi;
                s[pi] += s[pj];
            } else {
                p[pi] = pj;
                s[pj] += s[pi];
            }
        }
    }
};
// Para construirlo de tamaño n se hace lo siguiente:
ufset myuf(n);
// Para unir dos sets
myuf.uni(a,b);
// Para consultar por un set
myuf.findp(a);
```
