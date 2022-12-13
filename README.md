# Programación Competitiva UChile

Este repositorio contiene el código fuente para el sitio web del grupo organizado de Programación Competitiva de la Universidad de Chile.

Disponible en [este link](https://uchile.progcomp.cl) :)

## Cómo probar la página localmente

Para ver en vivo los cambios, basta con correr:

```
npm install
npm run start
```

## Secciones y artículos

Las páginas tipo wiki tienen secciones y artículos, donde las secciones pueden agrupar otras secciones
y artículos.

### Agregar una sección

Para agregar una sección, por ejemplo, a la página de apunte:
```
npm run create -- --kind section apunte/mi_seccion
```
Esto creará el directorio `content/apunte/mi_seccion` con un archivo `_index.md`. En ese archivo
se establecen metadatos de la sección, como el título que se muestra y su peso. Las secciones se ordenan
de arriba hacia abajo por sus pesos de forma creciente.

### Agregar un artículo
Para agregar un artículo a una sección:
```
npm run create -- --kind article apunte/mi_seccion/mi_articulo
```
Esto creará la siguiente estructura:
```
.
└── content/
    └── apunte/
        └── mi_seccion/
            └── mi_articulo/
                ├── img/
                └── index.md
```
En ella, `index.md` contiene metadatos del artículo y también el artículo en sí, en Markdown. La carpeta `img/` está
pensada para guardar las imagenes a usar en el artículo ahí de ser necesario.
