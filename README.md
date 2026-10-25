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

No hace falta compilar ni subir `_site` a mano. El dominio personalizado se
define en el archivo `CNAME` (`www.juanghurtado.com`).

La versión anterior del sitio (la tarjeta de visita) se conserva en la rama
`legacy-cv`.

### Alternativa: build nativo de Pages

Si prefieres que GitHub Pages compile el sitio directamente, sin Actions:

1. Ve a **Settings → Pages**.
2. En *Build and deployment*, elige **Deploy from a branch**.
3. Selecciona la rama `master` y la carpeta `/ (root)`.
4. Borra `.github/workflows/deploy.yml` y la rama `gh-pages`.

Con esa configuración, cada push a `master` reconstruye el sitio con el Jekyll
integrado de GitHub Pages.

## DNS y dominio

El dominio está en IONOS y el sitio en GitHub Pages. Para que funcionen tanto
`juanghurtado.com` como `www.juanghurtado.com` con HTTPS, los registros DNS
deben ser exactamente estos:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
| `CNAME` | `www` | `juanghurtado.github.io.` |

No debe quedar ningún otro registro `A`, `AAAA`, `ALIAS` o `ANAME` en `@`
(por ejemplo, una redirección del registrador). Un registro extra en el dominio
raíz impide que GitHub emita el certificado para `juanghurtado.com`.

Con el dominio personalizado configurado como `www.juanghurtado.com`, GitHub
Pages redirige automáticamente `juanghurtado.com` a `www.juanghurtado.com`.

Si después de cambiar el DNS el certificado sigue cubriendo solo `www`, entra
en **Settings → Pages**, pulsa **Remove** junto al dominio personalizado y
vuelve a guardar `www.juanghurtado.com`. Eso fuerza a GitHub a emitir un
certificado nuevo que incluya el dominio raíz y el subdominio.

## Detalles de diseño

- Paleta [Flexoki](https://stephango.com/flexoki) (MIT), de Steph Ango.
- Tipografía del sistema: cero peticiones a fuentes externas.
- Modo claro y oscuro con preferencia guardada. Atajo de teclado: `D`.
- Una sola columna de 38rem, sin menús ni barra lateral.
- RSS en `/feed.xml` y sitemap en `/sitemap.xml`.
