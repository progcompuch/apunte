---
title: "Compilación y editores de texto"
type: docs
menu:
    apunte:
        identifier: "apunte-introduccion_a_cpp-compilacion_y_editores"
        parent: "apunte-introduccion_a_cpp"
weight: 10 # El menú lateral ordena artículos por su peso
---
## Prerequisitos

Para este artículo, asumimos que posees conocimiento básico de uso de terminales. No
podemos cubrir eso acá, pues puede variar mucho dependiendo de tu sistema. Si no sabes
usar un terminal, ¡no te preocupes! Es más sencillo de lo que puede parecer al inicio.
Cualquier tutorial básico de internet te servirá para lo que usaremos.

## Compilación

Como C++ es un lenguaje compilado 
(al contrario que, por ejemplo, Python, que es interpretado),
necesitamos descargar un compilador para poder
crear un archivo ejecutable a partir de nuestro código fuente.

Para C++ existen dos compiladores notables: `g++`, de la GCC 
(_GNU Compiler Collection_) y `Clang`.
En programación competitiva siempre se usa `g++`, así que nos centraremos en este.

### Instalación de g++

#### GCC en Linux
Aunque varias distribuciones de Linux vienen con `GCC`, 
la instalación dependerá de tu gestor de paquetes:
* `apt`: La forma recomendada es instalar el paquete de desarrollo `build-essential`:
`sudo apt install build-essential`

  Nota: Si es tu primera vez instalando un paquete, debes correr `sudo apt update` primero.
  
* `pacman`: Directamente podemos instalar el paquete `gcc`:
`pacman -S gcc`
* `yum`: Parecido a `pacman`: `yum -y install gcc`

#### GCC en macOS
Una forma simple de instalarlo es usando el gestor de paquetes Homebrew.
Si no lo tienes, puedes descargarlo en [su página web](https://brew.sh).
Una vez tengas Homebrew, en la 
terminal puedes ejecutar `brew install gcc`

#### GCC en Windows
Para Windows, hay tres alternativas notables para obtener la GCC:
  1. WSL: Si tienes Windows 10, puedes instalar el 
  [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) 
  para tener acceso a un ambiente de GNU/Linux.
  Para instalar WSL es necesario que tengas activada la virtualización, puedes checkear esto
  ejecutando `Get-ComputerInfo -property "HyperVRequirementVirtualizationFirmwareEnabled"`, si muestra `True`
  entonces sigue el tutorial, en caso contrario tendrías que activarla desde tu BIOS, si no
  se sientes con la confianza para hacerlo, puedes usar los otros métodos para instalar `g++`.
  En WSL lo más común es instalar Ubuntu, de ahí puedes seguir las instrucciones de Linux que están más arriba.
  1. MinGW (Minimalist GNU for Windows): Es una implementación de los 
  compiladores de la GCC para Windows. 
  Puedes descargarlo en [Sourceforge](https://sourceforge.net/projects/mingw/), 
  y la instalación es relativamente sencilla.
  1. Cygwin: Es una colección de herramientas (entre ellas GCC) para proporcionar un
  entorno tipo UNIX en Windows. Puedes descargarlo [en su sitio web](https://www.cygwin.com/).

#### Comprueba la instalación

Independiente de tu plataforma, una vez instalado puedes comprobar la instalación corriendo el comando `g++ --version` en tu terminal, lo que debería imprimir algo parecido a esto:
```
g++ (Ubuntu 9.3.0-17ubuntu1~20.04) 9.3.0
Copyright (C) 2019 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```
Probablemente te aparezca con algunos detalles (como la versión o el sistema) distintos, pero mientras no lance un error está bien. Si lanza un error, hiciste algo mal en la
instalación. En ese caso, puedes probar a reiniciar la terminal para asegurarte que se refresquen algunas variables de entorno.

### Uso de g++
Puedes usar `g++` directamente desde la terminal, o configurar tu editor de texto o IDE para
que ejecute los comandos automáticamente por ti. Sea cual sea la forma que uses, siempre
es bueno entender cómo usarlo desde la terminal.

La sintáxis que usaremos es:
```
g++ [flags] codigo-fuente.cpp
```
en donde las _flags_ son parámetros opcionales que podemos otorgarle a `g++`. Las que más
nos importan son:

  * `-std`: Permite especificarle a `g++` con qué versión de C++ compilar. Por ejemplo, si
  queremos compilar con C++14, podemos usar `g++ -std=c++14 programa.cpp`
  * `-o`: Podemos especificar la ruta del ejecutable que generará la compilación. Si queremos
  que se llame `programa.out`, podemos hacer `g++ -o programa.out programa.cpp`. Si no especificamos
  el parámetro `-o`, por defecto se llamará `a.out` (o `a.exe` si estás en Windows).
  * `-O2`: Con esta flag activamos la optimización de nivel 2, que es la que suelen usar
  los jueces al compilar nuestras soluciones. Es especialmente importante usarla si quieres
  medir el tiempo de tu programa, pues así se asemejará más al tiempo que el juez medirá.
  * Warnings: Hay un montón de flags que sirven para agregar _warnings_ al compilador,
  los cuales pueden ayudarte a encontrar errores. Es más que nada decisión personal, así
  que siéntete libre de usar las que te gusten. [Este blog en Codeforces](https://codeforces.com/blog/entry/15547)
  explica bien varias de esas flags, incluyendo algunas más rebuscadas.


## Editores de texto recomendados

Para programación competitiva puedes usar cualquier editor de texto o IDE que prefieras.
Sin embargo, los más usados son los que [están disponibles en los computadores que se usan
en la ICPC](https://icpc.global/worldfinals/programming-environment).

Cuando practiques individualmente puedes usar lo que quieras, pero si estás entrenando
en equipo para la ICPC nuestra recomendación es que las tres personas estén cómodas
con un mismo editor y que ese editor esté disponible en la ICPC.

### Geany

<img src="img/geany.png"/>

Geany es muy popular, fácil y eficiente de usar. Lo puedes descargar [en su sitio web](https://www.geany.org/),
o instalarlo desde tu gestor de paquetes favorito (sí, tiene tema oscuro).

Algunas personas han hecho videos en YouTube sobre su setup usando Geany:
* elsantodel90 hizo [un video de excelente calidad](https://www.youtube.com/watch?v=Du6cC5Dwapo) (en español) 
donde también habla de otras cosas como el sistema operativo que usa, bash y GCC.
* Errichto también usa Geany, e hizo [un video muy bueno](https://www.youtube.com/watch?v=ePZEkbbf3fc)
(en inglés, con subtítulos) donde explica su setup y en particular su configuración de Geany.

### Code::Blocks
<img src="img/codeblocks.png"></img>
Un editor cómodo, aunque un poco menos sencillo que Geany. Tiene la ventaja
de que para Windows el instalador trae la opción de instalarlo junto a MinGW, 
simplificando la instalación de GCC.  Disponible en su 
[sitio web](https://www.codeblocks.org/).

### Visual Studio Code
<img src="img/vscode.png"></img>
Un editor extremadamente personalizable y famoso de Microsoft. 
Puede resultar un poco más engorroso de configurar para programación 
competitiva en comparación a Geany o Code::Blocks, pero sigue 
siendo una muy buena opción. Puedes encontrarlo [en su sitio web oficial](https://code.visualstudio.com/).

### Vim
<img src="img/vim.png"></img>
Un editor clásico preferido por mucha gente fanática de su portabilidad,
sencillez y rapidez. Puede tener una curva de aprendizaje muy empinada, así que no
es muy recomendado para competencias grupales, a menos que las tres personas del
equipo <strike>estén perturbadas</strike> ocupen Vim.

### Sublime Text
<img src="img/sublimetext.png"></img>
Aunque no aparece en la [lista de las World Finals](https://icpc.global/worldfinals/programming-environment),
sí está disponible en varias otras competencias. Un editor sencillo, bonito y eficiente. Probablemente
lo único malo que tiene es que al contrario de los demás editores en este artículo,
[Sublime Text no es completamente gratis](https://www.sublimehq.com/store/text). Está en [su
sitio web](https://www.sublimetext.com/).

