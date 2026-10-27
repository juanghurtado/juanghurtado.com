# juanghurtado.com

Blog personal de **Juan G. Hurtado**, construido con Jekyll y publicado con
GitHub Pages. Diseño minimalista centrado en la tipografía e inspirado en
[stephango.com](https://stephango.com/).

## Requisitos

- Ruby 3.x
- Bundler

## Desarrollo local

```sh
bundle install
bundle exec jekyll serve
```

El sitio queda disponible en <http://localhost:4000>. Jekyll recarga los
cambios automáticamente.

También puedes usar el script, que detecta Ruby 3.x, instala las dependencias
si faltan y arranca con recarga en vivo:

```sh
./scripts/dev.sh
```

## Escribir un post

Crea un archivo en `_posts/` con este nombre:

```
_posts/AAAA-MM-DD-titulo-del-post.md
```

Y este front matter:

```yaml
---
title: Título del post
date: 2026-10-25 10:00:00 +0100
description: Una frase que resuma el texto.
tags:
  - diseño
  - desarrollo
---
```

El cuerpo se escribe en Markdown (kramdown + GFM). El título, la fecha y el
tiempo de lectura se generan solos. `description` es opcional, pero se usa en
la portada, en el `meta description` y en las tarjetas sociales.

El nombre del archivo importa: la fecha del nombre debe coincidir con la del
front matter. El resto del nombre se convierte en la URL. Por ejemplo,
`2026-10-25-hola-mundo.md` se publica en `/hola-mundo/`.

## Imágenes en los posts

Guarda las imágenes en `assets/images/` y referéncialas desde la raíz:

```md
![Descripción](/assets/images/foto.jpg)
```

El estilo base las muestra como bloque, con el ancho máximo de la columna,
4px de radio y márgenes.

### Tamaño y posición

```md
![Pequeña](/assets/images/foto.jpg){: .small .center}
![Mediana](/assets/images/foto.jpg){: .medium}
![Ancha](/assets/images/foto.jpg){: .wide}
![A sangre](/assets/images/foto.jpg){: .full}
```

| Clase | Efecto |
| --- | --- |
| `small` | 50% del ancho de la columna |
| `medium` | 75% del ancho |
| `wide` | Hasta 64rem, rompiendo la columna |
| `full` | Borde a borde de la ventana |
| `center` | Centrada |
| `left` / `right` | Flotada a izquierda o derecha |
| `outline` | Borde sutil |
| `square` | Sin esquinas redondeadas |
| `pixelated` | Sin suavizado, para pixel art |
| `invert` | Invierte la imagen en modo oscuro |
| `multiply` | Mezcla con el fondo (y `screen` en oscuro) |
| `clear` | Corta un flotado |

`left` y `right` se desactivan en móvil. Para cortar un flotado, añade
`<div class="clear"></div>` después del bloque.

### Pies de foto

La opción recomendada es el include, que genera un `<figure>` accesible con
`loading="lazy"` y un pie que sí acepta Markdown:

```liquid
{% include figure.html
   src="/assets/images/foto.jpg"
   alt="Descripción"
   caption="Pie de foto con *énfasis* y [enlace](/)."
   class="wide"
   img_class="outline"
   width="1600"
   height="900" %}
```

- `class`: `small`, `medium`, `wide`, `full`, `center`, `left` o `right`.
- `img_class`: `outline`, `square`, `pixelated`, `invert` o `multiply`.
- `caption`: texto o Markdown.
- `loading`: `lazy` por defecto; usa `loading="eager"` para la primera imagen.
- `width` y `height`: dimensiones intrínsecas para reservar espacio; el tamaño visible lo decide `class`.
- `href`: opcional, envuelve la imagen en un enlace.
- `srcset` y `sizes`: opcionales, si preparas variantes responsive.

También puedes escribir el HTML directamente:

```html
<figure class="wide" markdown="1">
  ![Descripción](/assets/images/foto.jpg)
  <figcaption>Pie con <em>HTML</em>.</figcaption>
</figure>
```

Kramdown no parsea Markdown dentro de `<figcaption>`; usa HTML o el include.
Si usas un `<figure>` manual, puedes poner la clase de tamaño en la imagen
(`![...](...){: .wide}`) y la figura se adapta automáticamente; también puedes
ponerla en el propio `<figure>`.

### Galería

```html
<div class="gallery" markdown="1">
  ![A](/assets/images/a.jpg)
  ![B](/assets/images/b.jpg)
  ![C](/assets/images/c.jpg)
</div>
```

Se muestran como miniaturas cuadradas en cuadrícula y una sola columna en
móvil.

### Atributos sueltos

```md
![Foto](/assets/images/foto.jpg){: loading="lazy" decoding="async"}
```

No uses `width="..."` para cambiar el tamaño visible: el CSS global fuerza
`width: auto`. Usa una clase o `style="max-width: 420px"`.

## Estructura

```
_config.yml            Configuración del sitio
_posts/                Entradas del blog en Markdown
_layouts/              Plantillas (default, post, page)
_includes/             Fragmentos reutilizables
_data/meses.yml        Nombres de los meses en español
assets/css/style.css   Todo el diseño
assets/js/site.js      Tema claro/oscuro y anclas
index.html             Portada
acerca.md              Página «Acerca»
.github/workflows/     Publicación automática en gh-pages
feed.xml               Generado por jekyll-feed
```

## Publicación

El sitio se publica en **GitHub Pages** desde la rama `gh-pages`. Un workflow
de GitHub Actions compila `master` con Jekyll y sube el resultado:

1. Haces commit y push a `master`.
2. `.github/workflows/deploy.yml` compila el sitio.
3. El resultado se publica en `gh-pages`.
4. GitHub Pages sirve `gh-pages` en <https://www.juanghurtado.com>.

```sh
git add .
git commit -m "Añade un post"
git push origin master
```

## Detalles de diseño

- Paleta [Flexoki](https://stephango.com/flexoki) (MIT), de Steph Ango.
- Tipografía del sistema: cero peticiones a fuentes externas.
- Modo claro y oscuro con preferencia guardada. Atajo de teclado: `D`.
- Avatar pixel-art en SVG, usado como logo y favicon.
- Una sola columna de 50rem, sin menús ni barra lateral.
- RSS en `/feed.xml` y sitemap en `/sitemap.xml`.
