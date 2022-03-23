---
title: Template
lead: ''
date: 2022-03-19T08:48:45.000+00:00
images: []
weight: 601
menu:
  docs:
    parent: anexos

---

## Template Base

El template básico para C++ que usamos en programación competitiva es el siguiente:

```c++
#include <bits/stdc++.h>
using namespace std;
int main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	
	// codigo aqui :D
	
	return 0;
}
```
No es necesario entender que hacen estas líneas, pero aquí hay una explicación mala:

La primera línea incluye todas las librerías estandar de C++ (iostream, vector, etc.)
para ahorrarnos tener que memorizar de donde viene cada función.

La segunda línea nos ahorra tener que escribir `std::` antes de cada cosa que usamos
de la librería estándar. Como en las competencias solo podemos usar la librería estándar
nunca va a ser necesario especificar de donde viene lo que usamos.

La cuarta línea hace que `cin` y `cout` sean casi tan rápidos como `scanf`
y `printf`. Recomendamos siempre `cin` y `cout` porque su formateo de input
y output es muy conveniente en comparación con la alternativa. No vale la pena la 
optimización de tiempo, en general no va a hacer que un problema pase de dar TLE a AC.
Cuidado que si se pone esta línea, **no se pueden mezclar `scanf` y `printf` (IO de C) con `cin` y `cout` (IO de C++)**.

## Multiples Casos de Prueba

Cuando te piden resolver el mismo problema, pero el input tiene varios casos de prueba
se puede usar:

```c++
#include <bits/stdc++.h>
using namespace std;

void solve() {
    // codigo aqui :D
}

int main() {
    ios_base::sync_with_stdio(0); cin.tie(0);
    
    int t; cin >> t;
    while (t--) solve();

    return 0;
}
```

Al hacerlo de esta forma, la función `solve` es llamada exactamente $t$ veces (la cantidad
de casos de prueba).




