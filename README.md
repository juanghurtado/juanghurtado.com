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
- Una sola columna de 38rem, sin menús ni barra lateral.
- RSS en `/feed.xml` y sitemap en `/sitemap.xml`.
