---
title: "Classic, yet Complicated"
description: "Writeup del problema Classic, yet Complicated"
date: 2020-10-06T08:49:55+00:00
draft: false
---

# Classic, yet complicated.

Este es un problema sacado de Hack The Box, es de los inactivos. Fue diseñado por "P3t4".

Tenemos un solo archivo, que tiene dentro

`alp gwcsepul gtavaf, nlv prgpbpsu mb h jcpbyvdlq, ipltga rv glniypfa we ekl 16xs nsjhlcb. px td o lccjdstslpahzn fptspf xstlxzi te iosj ezv sc xcns ttsoic lzlvrmhaw ez sjqijsa xsp rwhr. tq vxspf sciov, alp wsphvcv pr ess rwxpqlvp nwlvvc dyi dswbhvo ef htqtafvyw hqzfbpg, ezutewwm zcep xzmyr o scio ry tscoos rd woi pyqnmgelvr vpm . qbctnl xsp akbflowllmspwt nlwlpcg, lccjdstslpahzn fptspfo oip qvx dfgysgelipp ec bfvbxlrnj ojocjvpw, ld akfv ekhr zys hskehy my eva dclluxpih yoe mh yiacsoseehk fj l gebxwh sieesn we ekl iynfudktru. xsp yam zd woi qwoc.
`

El título puede ser una pista, así que probamos en CyberChef primero con algunas codificaciones básicas. No es ROT13, así que probemos con Vigenere.

https://www.dcode.fr/cifrado-vigenere encuentra la llave rápidamente, HELLOWORLD. El mismo texto dice "the key is the flag.", por lo que nuestra flag es HTB{HELLOWORLD}