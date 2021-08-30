---
title: Chars y Strings
lead: ''
date: 2020-10-06T08:48:45.000+00:00
images: []
weight: 201
menu:
  docs:
    parent: stl

---
### Chars

Los caracteres en C++ en realidad son guardados como números dentro del computador, estos números son interpretados como un carácter al ocupar el programa pero son números por debajo lo cual nos permite hacer algunos usos interesantes de estos.

La correspondencia entre el número y el carácter que representa está dada por el [código ASCII](https://en.cppreference.com/w/cpp/language/ascii), no es necesario que sepan de memoria la correspondencia entre números y símbolos, solo saber como funciona es suficiente. De hecho, si uno quisiera saber el valor de cualquier carácter se podría hacer con este pequeño código:
```
char c = 'c';
cout<<(int)c<<'\n';
```

Ahora, los detalles que más nos importan son el orden de los caracteres: podemos notar que los dígitos están ordenados de forma creciente, entonces si restamos un dígito con el carácter '0' podemos encontrar el valor del dígito ya que lo que vamos a tener es que un dígito x va a representado con un carácter igual a '0' + x. Un uso claro de esto puede ser que tengamos un vector de caracteres que representan los dígitos de un número y nosotros queremos conseguir el número, podemos hacerlo de la siguiente forma:
```
vector<char> digits;
int res = 0;
for (int i=0;i<digits.size();i++){
	res = res * 10;         // primero multiplicamos por 10
	res += digits[i] - '0'; // sumamos el dígito
}
```
Ocurre exactamente lo mismo con las letras minúsuculas y mayúsculas, con lo cual podemos obtener un cierto orden de las letras, lo cual es sumamente útil para contar la cantidad de letras que hay en un vector de caracteres con un código muy corto como el siguiente:
```
vector<char> chars;
vector<int> count(26,0); //en la posicion i del arreglo vamos
			//a poner cuantas veces esta el caracter
			//'a'+i en el vector, que es lo mismo
			//que la letra i+1 del alfabeto
for (int i=0;i<chars.size();i++){
	count[ chars[i] - 'a' ]++;
}
```
Una lista de funciones importantes que pueden ser útiles para programación competitiva sobre caracteres:

1. isalpha(c) nos permite saber si c es un caracter alfabético
2. isdigit(c) nos permite saber si c es un dígito
3. isupper(c) nos permite saber si c es una letra mayúsucula
4. islower(c) nos permite saber si c es una letra minúscula
5. tolower(c) cambia una letra mayúscula a minúscula (o no hace nada si no es mayúscula).
6. toupper(c) cambia una letra minúscula a minúscula (o no hace nada si no es minúscula).

### Strings

Los strings funcionan muy parecido a los vectores de caracteres, lo cual nos da todas las facilidades que tienen los vectores:

- Acceder a los distintos caracteres del string usando índices con s[i]
- Obtener el tamaño del string con s.size()
- Funciones como s.clear(), s.resize(n), s.assign(n,'a'), etc...

Pero al ser un tipo de estructura distinta tiene otras propiedades como:

- Al leer un string con cin se lee un grupo de carácteres hasta encontrar un espacio o un salto de línea.
- Se pueden concatenar dos strings con el símbolo +
- Una función útil de los strings es s.substr(i,n) que nos entrega el substring de s que parte en i y tiene tamaño n en un nuevo string.

Para dar un ejemplo vamos a hacer un pequeño programa que imprima todos los substrings de un string:

```
string s;
cin>>s;
for (int i=0;i<s.size();i++){ //punto de partida
	for (int j=i;j<s.size();j++){ //punto de termino
		cout<<s.substr(i,j-i+1)<<endl;
	}
}
```

### Problemas

[Codeforces 520A - Pangram](https://codeforces.com/problemset/problem/520/A)

[Codeforces 731A - Night at the Museum](https://codeforces.com/problemset/problem/731/A)
                                                                      