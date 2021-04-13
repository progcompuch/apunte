---
title : "Intro a la Ingeniería Reversa"
lead: ""
date: 2020-10-06T08:48:45+00:00
draft: false
images: []
menu:
  docs:
    parent: "reversa"
weight: 010
---

## Motivación

En computación, la ingeniería reversa (reverse engineering o _reversing_) se refiere al proceso de analizar
un ejecutable, código binario o bytecode, para entender su comportamiento interno.
Para hacer esto, se suele convertir el código de bajo nivel de entrada en algo de nivel un poco más alto,
como Assembler o C. De esta forma, se vuelve mucho más fácil de entender, aunque aún puede requerir un
trabajo mental considerable hacerlo.

Los challenges de reversing suelen tener uno de estos dos objetivos (o a veces ambos):
1. Identificar los pasos de algún proceso que puede ser vulnerado, como la interacción con una API o el uso
de ciertos módulos o librerías.

2. Encontrar un secreto escondido dentro del ejecutable, como una contraseña que puede estar obfuscada o
encriptada.

Las aplicaciones de esto son bastante directas: poder revisar y entender programas y ejecutables sin tener
acceso al código fuente. Esto es bastante común, particularmente si se dedican a analizar aplicaciones móviles.

Los desarrolladores suelen asumir que, una vez compilado y empaquetado, el código se vuelve totalmente
ilegible e imposible de entender. Este puede ser un error crítico, pues el código de las aplicaciones es
totalmente público al cliente, y **todo programa puede ser reversado**.

## Assembler

Para poder realizar algunos de los ejercicios de este capítulo es necesario entender algo del lenguaje Assembler.
Esta es una manera de codificar instrucciones y datos a un muy bajo nivel (muy cercano al lenguaje de máquina).
El formato exacto del lenguaje varía dependiendo de la arquitectura de la CPU, las más típicas siendo `x86` y
`ARM`, pero tienen varios elementos en común.

Cada instrucción se compone de una operación básica (operaciones aritméticas, leer o escribir registros,
insertar o quitar elementos de la pila, etc) y 0 o más argumentos, los cuales pueden ser un valor fijo (número,
string, etc), un registro de la CPU, una dirección de memoria, entre otros. A continuación tenemos un ejemplo
de _Hello World_ en Assembler `x86`.

    ;Copyright (c) 1999 Konstantin Boldyshev <konst@linuxassembly.org>
    ;
    ;"hello, world" in assembly language for Linux
    ;
    ;to build an executable:
    ;       nasm -f elf hello.asm
    ;       ld -s -o hello hello.o

    section .text
    ; Export the entry point to the ELF linker or loader.  The conventional
    ; entry point is "_start". Use "ld -e foo" to override the default.
        global _start

    section .data
    msg db  'Hello, world!',0xa ;our dear string
    len equ $ - msg         ;length of our dear string

    section .text

    ; linker puts the entry point here:
    _start:

    ; Write the string to stdout:

        mov edx,len ;message length
        mov ecx,msg ;message to write
        mov ebx,1   ;file descriptor (stdout)
        mov eax,4   ;system call number (sys_write)
        int 0x80    ;call kernel

    ; Exit via the kernel:

        mov ebx,0   ;process' exit code
        mov eax,1   ;system call number (sys_exit)
        int 0x80    ;call kernel - this interrupt won't return

Pueden encontrar documentación y un tutorial sobre Assembler
[aquí](https://www.tutorialspoint.com/assembly_programming/index.htm).
