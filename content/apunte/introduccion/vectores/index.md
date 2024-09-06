---
title: "Vectores"
type: docs
menu:
    apunte:
        identifier: "apunte-introduccion-vectores"
        parent: "apunte-introduccion"
weight: 40 # El menú lateral ordena artículos por su peso
---
### Vectores

Hasta ahora solo podemos guardar una cantidad constante de variables y todas de forma manual, sin embargo, con frecuencia necesitaremos una cantidad de variables que depende del input o quizás simplemente tantas variables que nos sea inconveniente crearlas a mano. Vamos a ver como usar vectores.

Los vectores son una estructura que nos permite guardar una cantidad cualquiera de variables (tomando en cuenta el límite de memoria de la máquina). Se puede acceder, guardar y modificar las variables sin problema, también tenemos la posibilidad de agregar una variable al final del vector (cambiando el tamaño), lo único complicado es borrar una variable en medio del vector porque para esto se tienen que mover todas las variables que están en frente de este.

```c++

// Para crear un vector tenemos que poner su tipo entre < >
// Entre ( ) ponemos el tamaño y los valores iniciales
vector<int> nums(10 , 42);
// Aquí creamos un vector de 10 números que parten con valor 42 que se llama nums

// Los valores de este vector están indexados desde 0
// Podemos acceder a ellos con nums[0], nums[1]... nums[9]
// Con este for podemos imprimir todos los números
// En este caso 10 veces 42
for (int i=0;i<10;i++){
	cout<<nums[i]<<' ';
}
cout<<'\n';

// Con esta línea podemos cambiar el primer elemento a 5
nums[0] = 5;

// Con esta línea agregamos el elemento número 11 de valor 13
nums.push_back(13);

// Con esta línea podemos imprimir el tamaño que ahora es 11
cout<<nums.size()<<'\n';

// Con esta línea podemos cambiar el tamaño a 5
// Los elementos sobre este tamaño son eliminados
nums.resize(5);

// Con esta línea podemos cambiar el tamaño y los valores del arreglo
// Como si estuvieramos inicializándolo de nuevo
nums.assign(42,10);
// Ahora el arreglo tiene 42 veces el número 10

// Con esta línea podemos eliminar todos los valores del arreglo
// Queda con tamaño 0
nums.clear();

// Con esta línea podemos revisar si el vector está vacío
if (nums.empty()){
	cout<<"El arreglo está vacío\n";
}

```

Aquí hicimos un vector de números, pero cualquier tipo de variable puede estar en un vector: strings, doubles, etc..

### Tamaño dependiente del input

Con frecuencia en problemas veremos que nos dan un valor $n$ y luego nos dan $n$ números, un vector es ideal en estas situaciones.

```c++
int n;
cin>>n;

// Con esta línea creamos un vector de tamaño n
vector<int> a(n);

// Con este for leemos los n valores
for (int i=0;i<n;i++){
	cin>>a[i];
}

// En general, este for es muy utilizado para trabajar con estos vectores
// Por ejemplo, si queremos la suma
int suma = 0;
for (int i=0;i<n;i++){
	suma += a[i];
}
```

### Matrices

Podemos guardar vectores de vectores, conocidos como matrices.

<center> <img class="invertible" src="img/matrix.png" width="450"/> </center>

```c++
int n,m;
cin>>n>>m;

// Aquí creamos una matriz de tamaño n x m
vector< vector<int> > mat( n , vector<int>(m) );

// Aquí leemos todos los valores de la matriz
// Las filas representadas por i y las columnas por j
for (int i=0;i<n;i++){
	for (int j=0;j<m;j++){
		cin>>mat[i][j];
	}
}

// Podemos aplicar todas las funciones de vectores a estas matrices
// Su tamaño nos dirá cuantas filas tiene
cout<<mat.size()<<'\n';

// Si accedemos a alguna fila, nos entrega un vector que representa la fila
// Nuevamente podemos ver el tamaño, que ahora será m
cout<<mat[0].size()<<'\n';

// Para acceder al elemento tenemos que decir su fila y columna
// Aquí imprimimos el primer elemento
cout<<mat[0][0]<<'\n';

```

Esta idea se puede extender a más dimensiones, vectores de vectores de vectores y más, el único límite es la imaginación (y cuanto puedas escribir).
                                      