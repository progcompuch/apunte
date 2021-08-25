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
Ocurre exactamente lo mismo con las letras minúsuculas y mayúsculas, con lo cual podemos obtener un cierto orden de las letras, lo cual es sumamente útil para contar la cantidad de letras por cada letra distinta que hay en un string con un código como el siguiente:
```
string s;
vector<int> count(26,0);
for (int i=0;i<s.size();i++){
	count[ s[i] - 'a' ]++;
}
```































