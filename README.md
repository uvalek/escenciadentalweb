# Escencia Dental — sitio web

Página web de una sola pantalla para la clínica. Su trabajo es que alguien que
busca en Google desde el celular llegue, confíe y mande WhatsApp.

Está hecha con HTML, CSS y JavaScript normales. **No hay que compilar ni instalar
nada.** Editas un archivo, lo guardas, lo subes y ya está en línea.

> ⚠️ **ESTE SITIO TODAVÍA NO ES DE ESCENCIA DENTAL.**
> Es una copia exacta del sitio de otra clínica, usada como base. Los textos,
> teléfonos, WhatsApp, correo, dirección, redes, logo y fotos siguen siendo los
> del sitio original. **No publicar en producción ni conectar a un dominio hasta
> haber reemplazado todos esos datos** (ver las secciones de abajo: los 19
> marcadores `DATO DE CONTACTO` en `index.html`, los marcadores `DOMINIO:` en
> `sitemap.xml` y `robots.txt`, y `site.webmanifest`).

---

## Cómo ver la página en tu computadora

Abre el archivo `index.html` con doble clic. Se abre en tu navegador y ves los
cambios que hiciste.

> Una advertencia: al abrirla con doble clic, el logo y los tipos de letra pueden
> no aparecer, porque el navegador busca las rutas desde la raíz del disco. **Eso
> no es un error de la página.** Una vez publicada en Vercel se ve bien. Si
> quieres verla exacta antes de publicar, abre la Terminal, escribe `cd `, arrastra
> la carpeta del sitio a la ventana, presiona Enter y luego pega esto:
>
> ```bash
> python3 -m http.server 8000
> ```
>
> Después abre `http://localhost:8000` en tu navegador. Para detenerlo, `Control + C`.

---

## Qué archivo es cada cosa

| Archivo | Qué contiene |
|---|---|
| `index.html` | **Todos los textos de la página.** Es el que vas a editar el 95 % de las veces |
| `css/styles.css` | Los colores, tamaños y espacios. Solo si quieres cambiar el aspecto |
| `js/main.js` | El menú del celular, el mapa y el carrusel de la portada |
| `img/` | Logos, iconos y la imagen que se ve al compartir por WhatsApp |
| `img/hero/` | Las 5 fotos de la portada, ya optimizadas. **No editar a mano** |
| `fonts/` | Los tipos de letra. No tocar |
| `vercel.json`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | Configuración. No tocar salvo lo que dice más abajo |

---

## Cambiar un teléfono, el correo o la dirección

Estos datos aparecen en **varios lugares** de la página. Si cambias uno solo, la
página queda inconsistente y Google se confunde.

Para no fallar, cada dato de contacto está marcado con un comentario. Abre
`index.html` en cualquier editor de texto y **busca con `Ctrl + F` (o `Cmd + F` en Mac):**

```
DATO DE CONTACTO
```

Hay **19 marcadores**. Te van a saltar a cada lugar donde hay un teléfono, correo,
WhatsApp, dirección o Facebook. **Cámbialos todos.** Son estos:

| Dato | En cuántos lugares de la página |
|---|---|
| WhatsApp (`wa.me/522221860390`) | 5 — encabezado, portada, llamado final, burbuja y barra del celular |
| Teléfono principal (`222 186 0390`) | 5 — urgencias, contacto, pie, llamado final y barra del celular |
| Segundo teléfono (`222 710 7383`) | 3 — urgencias, contacto y pie |
| Correo | 2 — contacto y pie |
| Facebook | 2 — contacto y pie |
| Dirección | 2 — contacto y pie |

**Además, todos esos datos aparecen otra vez en el bloque de Google al final del
archivo** (ver el aviso de más abajo). Ahí hay que cambiarlos también.

> En los teléfonos y el correo, el dato se escribe **dos veces en la misma línea**:
> una en el enlace y otra en el texto que ve la persona. Cambia las dos.

### Ojo con el formato de los teléfonos

Cada teléfono aparece de **dos formas distintas en la misma línea** y las dos
tienen que coincidir:

```html
<a href="tel:+522221860390">222 186 0390</a>
     ↑ así lo marca el celular      ↑ así lo lee la persona
```

- En `href="tel:..."` va **sin espacios y con +52 adelante**: `tel:+522221860390`
- En el texto visible va **como se lee**: `222 186 0390`

### Ojo con WhatsApp

El enlace de WhatsApp se ve así:

```
https://wa.me/522221860390?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20agendar%20una%20cita.
```

- `522221860390` es **52** (México) + los 10 dígitos, **sin espacios ni signos**.
- Lo que va después de `?text=` es el mensaje que aparece ya escrito cuando el
  paciente abre WhatsApp. Está codificado (`%20` es un espacio, `%2C` una coma).
  **Si quieres cambiar ese mensaje, dímelo y te lo codifico** — escribirlo a mano
  rompe el enlace.

### ¡Importante! Cambiarlo también en el bloque de Google

Al final de `index.html` hay un bloque grande que empieza con
`<script type="application/ld+json">`. Es la ficha que lee Google. **Si cambias un
teléfono, el correo o la dirección, cámbialos también ahí.**

Ese bloque es delicado: una coma de más o de menos y Google lo ignora completo.
Después de editarlo, pega el contenido en <https://validator.schema.org/> para
comprobar que sigue bien. Si te da miedo, avísame y lo hago yo.

---

## Cambiar textos de la página

Todos los textos están en `index.html`, separados por secciones con comentarios
grandes como este:

```html
<!-- ==========================================================================
     SERVICIOS
     ========================================================================== -->
```

**Lo que SÍ puedes cambiar:** el texto que está entre `>` y `<`.

```html
<h3 class="servicio__titulo">Odontología</h3>
                            ↑ esto sí ↑
```

**Lo que NO debes tocar:** todo lo que va dentro de `< >`, sobre todo `class="..."`.
Ahí están los estilos; si lo borras, esa parte pierde su formato.

**Acentos y símbolos.** Escríbelos normal (á, é, ñ, ü). Solo hay dos excepciones:
- Para el símbolo `&` escribe `&amp;`
- Si necesitas `<` o `>` como texto, escribe `&lt;` y `&gt;`

**Consejo:** guarda una copia del archivo antes de editar. Si algo se rompe,
vuelves atrás sin drama.

---

## Activar la sección de precios

La sección de precios **está hecha pero oculta**, porque los precios no estaban
confirmados. No se ve en la página publicada.

Para activarla, busca en `index.html` estas dos líneas y **bórralas**:

```html
<!-- INICIO OCULTO
```

```html
FIN OCULTO -->
```

Al borrar esas dos líneas, la sección aparece. Para volver a ocultarla, las pones
otra vez en el mismo lugar.

### Cambiar un precio

Cada renglón se ve así:

```html
<div class="precios__fila">
  <span class="precios__concepto">Limpieza dental</span>
  <span class="precios__monto">$400</span>
</div>
```

Cambia `Limpieza dental` y `$400` por lo que necesites.

### Agregar un tratamiento

Copia un bloque completo de `<div class="precios__fila">` hasta su `</div>`,
pégalo debajo del último y cambia el texto y el precio.

---

## Agregar el tercer especialista (odontología)

Falta esa tarjeta porque no teníamos el nombre. En `index.html`, busca
`ESPECIALISTAS` y verás dos bloques `<article class="especialista ...">`.
Copia uno completo, pégalo debajo y cambia tres cosas:

```html
<article class="especialista especialista--medica">
                            ↑ (1) déjalo como está para el color azul
  <div class="especialista__inicial" aria-hidden="true">E</div>
                                       (2) la inicial del nombre ↑
  <div class="especialista__cuerpo">
    <span class="especialista__etiqueta">Medicina general</span>
    <h3 class="especialista__nombre">Dr. Estanislao Robles V.</h3>
    <p class="especialista__texto">Atiende consulta médica y urgencias.</p>
                                    ↑ (3) nombre, especialidad y descripción
  </div>
</article>
```

Los colores disponibles son `especialista--medica` (azul) y
`especialista--nutricion` (verde).

**Sobre las fotos:** las tarjetas usan la inicial del nombre a propósito. No
pusimos fotos de banco porque poner la cara de un modelo debajo del nombre de un
médico real es engañoso. Cuando la clínica mande retratos de verdad, avísame y
las cambio.

---

## Las reseñas

La sección muestra 3 reseñas **reales**, copiadas textualmente de la ficha de
Google el 11 de agosto de 2026. Las tres son de 5 estrellas (verificado una por
una, no supuesto):

| Paciente | Fecha | De qué habla |
|---|---|---|
| Sharon Michelle Avila Arrieta | Julio 2026 | Odontopediatría, un año de citas, precios accesibles |
| Mayra Almazan Reyes | Mayo 2026 | Ortodoncia en curso |
| Myriam Muñoz | Diciembre 2025 | Extracción sin dolor a un niño de 6 años, brackets, precio |

**No corrijas la redacción de las reseñas.** Están tal cual las escribieron los
pacientes, con sus mayúsculas y comas. Si las "arreglas", dejan de ser una cita
textual y cualquiera puede comparar con Google.

Las fechas son el mes al que equivale lo que Google muestra como "hace 3 meses",
"hace 8 meses", etc. Son aproximadas por unas semanas, igual que en Google.

### Cambiar cuáles se muestran

En la ficha de Google hay 44. Estas son las otras 5 que están publicadas, todas
de 5 estrellas, por si prefieres alguna:

- **Maria Dolores Solis Maxil** — "Buena atención hay vamos toda la familia. Hay me hicieron mi tratamiento de ortodoncia. Me quedo muy bien. Super recomendado!!!"
- **MIGUEL ESTEBAN LEDESMA HERRERA** — "Excelente lugar, los médicos muy profesionales. Excelente servicio. Todo el personal es muy amable"
- **angel garcia** — "Super contenta feliz con la atención de la dra fanny ella es genial en la atención, calidad de trabajo y limpieza"
- **Fabiola Mendez** — "Me encantó todo lo hacen bien y me encantó la verdad super recomendado no te dejan con la duda te saben explicar muy bien una sonrisa hermosa"
- **Anyii Garcia** — "La atencion es incleible buen trabajo excelente muy recomendables"

Para cambiar una, en `index.html` busca `RESEÑAS REALES` y sustituye el texto, el
nombre y la fecha de la tarjeta. Las 5 estrellas déjalas solo si la reseña
realmente es de 5.

> **Por qué las reseñas no están en el bloque de Google (JSON-LD):** marcar como
> datos estructurados reseñas copiadas de otra plataforma va contra las
> políticas de Google y puede penalizar. En la página se ven porque son
> contenido legítimo con su fuente; en el marcado no van. Es a propósito.

---

## Poner los horarios

Cuando la clínica los confirme, hay que cambiarlos en **dos lugares**:

**1. El texto visible.** Busca `HORARIOS` en `index.html` y cambia el párrafo.

**2. La ficha de Google.** En el bloque `application/ld+json` del final, agrega
esto justo antes de la línea que dice `"aggregateRating"`:

```json
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
```

Cambia los días y las horas por los reales. **Fíjate en la coma del final** — tiene
que estar. Si algo falla, mándamelo y lo reviso.

---

## El carrusel de la portada

La portada muestra **5 fotos que se alternan cada 5 segundos**. Cada foto enciende
su etiqueta correspondiente debajo de la tarjeta de reseñas:

| Foto | Etiqueta que se enciende |
|---|---|
| Paciente en el dentista | Odontología |
| Médico con estetoscopio | Medicina general |
| Terapia en la pierna | Fisioterapia |
| Nutrióloga en consultorio | Nutrición |
| Ambulancia | Urgencias 24/7 |

El emparejamiento se hace con el atributo `data-categoria`. La foto y su etiqueta
tienen que tener **exactamente el mismo valor**. Si cambias uno, cambia el otro.

Se detiene solo cuando la pestaña pasa a segundo plano, y no se mueve si la
persona tiene activado "reducir movimiento" en su sistema.

### Cambiar cada cuánto rotan

En `js/main.js`, la tercera línea de código:

```js
var SEGUNDOS_POR_FOTO = 5;
```

### Cambiar el orden

En `index.html`, busca `FOTOS DE PORTADA`. Reordena los bloques `<picture>` y
reordena **igual** las etiquetas de `hero-etiquetas`. **La primera foto es la que
se ve al cargar**, así que ahí va la especialidad más importante para el negocio
(hoy: odontología, porque "dentista en Cholula" es la búsqueda que más trae gente).

> Ojo: solo la primera foto lleva `src` normal. Las otras cuatro llevan `data-src`
> y las carga el JavaScript después. Si mueves una foto al primer lugar, hay que
> cambiar sus `data-src`/`data-srcset` por `src`/`srcset` y ponerle
> `fetchpriority="high"`. **Eso mejor dímelo y lo hago yo**, es fácil de romper.

### Cambiar o agregar una foto

Las originales que me pasaste están guardadas en la carpeta **`fotos originales/`**,
al lado de `sitio/`. No se publican: pesaban 10 MB entre las cinco y habrían hecho
la página lentísima en celular. Las versiones que sí se usan están en
`sitio/img/hero/` y pesan **174 KB las cinco juntas**.

Para procesar una foto nueva, ponla en `fotos originales/` y ejecuta esto en la
Terminal desde la carpeta `sitio`:

```bash
python3 -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('../fotos originales/NOMBRE.jpg')).convert('RGB'); [im.resize((w, round(im.height*w/im.width)), Image.LANCZOS).save(f'img/hero/CATEGORIA-{w}.{e}', **k) for w in (900,1800) for e,k in (('webp',dict(quality=78,method=6)),('jpg',dict(quality=80,optimize=True,progressive=True)))]"
```

Cambia `NOMBRE.jpg` por el archivo y `CATEGORIA` por el nombre corto
(`odontologia`, `medicina`, `fisioterapia`, `nutricion` o `urgencias`).
Si es una categoría nueva, además hay que agregar el bloque en el HTML — dímelo.

### El encuadre en celular

En celular la foto se recorta a vertical, así que hay que decidir qué parte se
conserva. Eso está en `css/styles.css`, buscando `object-position`:

```css
.hero__foto[data-categoria="odontologia"]  img { object-position: 62% center; }
```

`50%` es el centro, `0%` la orilla izquierda, `100%` la derecha. Si al cambiar una
foto queda mal encuadrada en el celular, mueve ese porcentaje.

### Sobre el texto alternativo

Las 5 fotos llevan `alt=""` a propósito. Son decoración: lo que comunica las
especialidades son las etiquetas de texto, que sí las leen Google y los lectores
de pantalla. Si les pusiéramos descripción, un lector de pantalla leería las cinco
seguidas y sería ruido.

---

## Fotos reales de la clínica

Las 5 de la portada son de banco. Siguen siendo lo correcto para ilustrar cada
especialidad, pero **una foto real de la fachada y de la recepción convierte
mejor**, porque el paciente reconoce el lugar al que va a llegar. Vale la pena
insistirle al cliente: son gratis.

Cuando lleguen, se sustituyen con el mismo comando de arriba. Medidas útiles:

| Dónde | Proporción | Tamaño mínimo |
|---|---|---|
| Portada | 16:9 (horizontal) | 1600 × 900 px |
| Retratos de especialistas | 4:5 (vertical) | 800 × 1000 px |

---

## La imagen que se ve al compartir por WhatsApp

Es `img/og-image.jpg` (1200 × 630 px). Es la que aparece cuando alguien pega el
enlace del sitio en WhatsApp, Facebook o Messenger.

Si la cambias, **respeta esas medidas exactas** y avísame para actualizar las
etiquetas del `<head>`.

> WhatsApp y Facebook guardan esa imagen en caché. Si la cambias y sigues viendo
> la vieja, entra a <https://developers.facebook.com/tools/debug/>, pega la
> dirección del sitio y presiona "Scrape Again".

---

## Publicar en Vercel

### La primera vez

1. Sube esta carpeta a un repositorio en GitHub.
2. Entra a <https://vercel.com>, haz clic en **Add New → Project** e importa ese
   repositorio.
3. En **Framework Preset** elige **Other**. Deja vacíos "Build Command" y
   "Output Directory" — este sitio no se compila.
4. Clic en **Deploy**. En menos de un minuto tienes la dirección `.vercel.app`.

### Cada cambio después

Guardas el archivo, lo subes a GitHub, y Vercel publica solo. No hay más pasos.

### Cuando contrates un dominio propio

En Vercel: **Settings → Domains → Add**, escribe el dominio y sigue las
instrucciones para apuntar los DNS.

Después hay que cambiar la dirección en el sitio. Busca `DOMINIO` en los archivos
y cambia `https://clinica-especialidades-cholula.vercel.app` por el nuevo dominio.
Está en **9 lugares**:

| Archivo | Cuántas veces |
|---|---|
| `index.html` — etiquetas del `<head>` | 3 |
| `index.html` — bloque de Google al final | 4 |
| `robots.txt` | 1 |
| `sitemap.xml` | 1 |

Avísame y lo hago yo en un minuto — es el tipo de cambio donde un error pasa
desapercibido y tumba el SEO.

---

## Después de publicar: lo que sí mueve la aguja

Para "dentista en Cholula", **Google Maps decide más que el sitio web.** Revisé la
ficha el 11 de agosto de 2026 y encontré tres cosas que valen más que cualquier
ajuste a la página:

**1. La ficha NO tiene sitio web.** Dice "Agregar sitio web". En cuanto publiquemos,
hay que pegar la dirección ahí. Es gratis y es el enlace que más tráfico va a traer.

**2. La categoría principal en Google es "Médico de urgencias", no "Dentista".**
Eso explica mucho: cuando alguien busca "dentista en Cholula", Google prioriza los
negocios cuya categoría principal es Dentista. Los cinco competidores que Google
muestra al lado de la ficha están todos categorizados como "Dentista":

| Competidor | Calificación |
|---|---|
| Dental Room Cholula | 4.9 (41 reseñas) |
| Smile Consultorio Dental CY | 4.9 (16) |
| Artedental | 5.0 (5) |
| Consultorio dental Beauty Dent | 4.7 (7) |
| Clínica Dental Mat | 4.7 (13) |

Como la mayoría de las reseñas hablan de odontología, ortodoncia y odontopediatría,
tiene sentido cambiar la categoría principal a **Dentista** y dejar "Médico de
urgencias" como categoría secundaria. Eso lo decide la clínica, pero es la palanca
más grande que vi.

**3. La ficha no tiene horarios publicados.** Google lo penaliza y los pacientes lo
buscan. En cuanto los tengas, van en la ficha y en la página.

Después de eso:

4. **Dar de alta el sitio** en <https://search.google.com/search-console> y enviar
   el `sitemap.xml`.
5. **Poner el enlace del sitio** también en el Facebook de la clínica.
6. **Fotos reales** de la clínica, en la ficha y en la web.
7. **Seguir respondiendo las reseñas** — ya lo hacen bien, todas las que revisé
   tienen respuesta del propietario.

---

## Cosas que NO debes tocar

- El bloque `<script type="application/ld+json">` del final, salvo lo que explica
  este README.
- Las etiquetas `<meta property="og:...">` del `<head>`.
- Cualquier `class="..."`.
- La carpeta `fonts/`.
- El archivo `vercel.json`.

Si necesitas cambiar algo de esa lista, dime qué quieres lograr y lo hago.

---

## Pendientes con la clínica

| # | Qué falta | Por qué importa |
|---|---|---|
| 1 | **Confirmar que el 222 186 0390 tiene WhatsApp activo** | Todo el sitio apunta ahí. Es lo más urgente |
| 2 | Horarios de atención por día | Google los usa y los pacientes los buscan |
| 3 | Fotos reales (fachada, recepción, equipo) | Las de la portada son de banco; una foto del lugar real convierte mejor |
| 4 | **Cambiar la categoría principal de la ficha a "Dentista"** | Hoy es "Médico de urgencias". Es la palanca más grande para "dentista en Cholula" |
| 5 | **Poner la dirección del sitio en la ficha de Google** | La ficha no tiene sitio web. Gratis, y es de donde va a venir el tráfico |
| 6 | Confirmar los 4 precios para activar esa sección | Está lista, solo oculta |
| 7 | **¿La odontóloga es la "Dra. Fanny" de las reseñas?** | Dos pacientes la nombran y coincide con el correo de contacto. Casi seguro, pero no publico el nombre de una profesional de salud por deducción |
| 8 | Apellido de la Nutrióloga María Elena | Completa su tarjeta |
| 9 | Aviso de privacidad | Si más adelante se agrega un formulario, es obligatorio |
| 10 | Validar tres frases: urgencias **a domicilio**, cobertura de **zona conurbada**, y "confirmamos horario" | Están escritas como hechos y no venían en el brief original |
