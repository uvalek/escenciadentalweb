# Esencia Dental — sitio web

Página web de una sola pantalla para la clínica, en San Pedro Cholula, Puebla. Su
trabajo es que alguien que busca en Google desde el celular llegue, confíe y mande
WhatsApp.

Está hecha con HTML, CSS y JavaScript normales. **No hay que compilar ni instalar
nada.** Editas un archivo, lo guardas, lo subes y ya está en línea.

> ⚠️ **Lo único que todavía no es de Esencia Dental es la foto de la portada.**
> Es una foto de banco que venía en la plantilla. Los textos, los datos de
> contacto, los horarios, las reseñas, el logo y los colores ya son los reales.
> Ver *Pendientes* al final.

---

## Los datos de la clínica que usa el sitio

| Dato | Valor |
|---|---|
| Nombre | Esencia Dental — Odontología Familiar |
| Teléfono y WhatsApp | 222 327 3990 |
| Dirección | 15 Sur no. 502-B, C.P. 72764, San Pedro Cholula, Puebla |
| Coordenadas | 19.065525, -98.3195008 |
| Horarios | Lunes a jueves, 10:00–13:00 y 15:00–18:30. Viernes a domingo cerrado |
| Doctor | Dr. José Manuel Garibay Martín |
| Servicios | Odontología familiar e infantil |
| Facebook | [@esenciadentalfam](https://www.facebook.com/esenciadentalfam/) |
| Ficha de Google | 4.7 ★ con 52 reseñas ([ver](https://www.google.com/maps/place/?q=place_id:ChIJcUjuVt_Jz4URRidBGo3ldNI)) |

> **Ojo con el teléfono.** El cliente pasó el **222 126 1476**, pero en la ficha de
> Google está publicado el **222 327 3990**. El sitio usa el de Google, que es el
> que ve la gente que los busca. Si el bueno es el otro, hay que cambiarlo en el
> sitio **y** en la ficha de Google, porque tener dos números distintos publicados
> confunde a los pacientes y a Google.

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
| `img/esenciadentalogo.svg` | **El logo original tal como lo entregó el cliente.** No se toca: de ahí salen los demás |
| `img/hero/` | Las fotos de la portada, ya optimizadas. **No editar a mano** |
| `fonts/` | Los tipos de letra. No tocar |
| `vercel.json`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | Configuración. No tocar salvo lo que dice más abajo |

---

## Cambiar el teléfono, el WhatsApp o la dirección

Estos datos aparecen en **varios lugares** de la página. Si cambias uno solo, la
página queda inconsistente y Google se confunde.

Para no fallar, cada dato de contacto está marcado con un comentario. Abre
`index.html` en cualquier editor de texto y **busca con `Ctrl + F` (o `Cmd + F` en Mac):**

```
DATO DE CONTACTO
```

Hay **15 marcadores**. Te van a saltar a cada lugar donde hay un teléfono,
WhatsApp, dirección o Facebook. **Cámbialos todos.** Son estos:

| Dato | En cuántos lugares de la página |
|---|---|
| WhatsApp (`wa.me/522223273990`) | 6 — encabezado, portada, banda de horarios, llamado final, burbuja y barra del celular |
| Teléfono (`222 327 3990`) | 5 — banda de horarios, contacto, pie, llamado final y barra del celular |
| Facebook | 2 — contacto y pie |
| Dirección | 2 — contacto y pie |

**Además, todos esos datos aparecen otra vez en el bloque de Google al final del
archivo** (ver el aviso de más abajo). Ahí hay que cambiarlos también. La dirección
aparece una tercera vez en `js/main.js`, en las coordenadas del mapa.

> En el teléfono, el dato se escribe **dos veces en la misma línea**: una en el
> enlace y otra en el texto que ve la persona. Cambia las dos.

### Ojo con el formato del teléfono

Aparece de **dos formas distintas en la misma línea** y las dos tienen que
coincidir:

```html
<a href="tel:+522223273990">222 327 3990</a>
     ↑ así lo marca el celular     ↑ así lo lee la persona
```

- En `href="tel:..."` va **sin espacios y con +52 adelante**: `tel:+522223273990`
- En el texto visible va **como se lee**: `222 327 3990`

### Ojo con WhatsApp

El enlace de WhatsApp se ve así:

```
https://wa.me/522223273990?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20agendar%20una%20cita.
```

- `522223273990` es **52** (México) + los 10 dígitos, **sin espacios ni signos**.
- Lo que va después de `?text=` es el mensaje que aparece ya escrito cuando el
  paciente abre WhatsApp. Está codificado (`%20` es un espacio, `%2C` una coma).
  **Si quieres cambiar ese mensaje, dímelo y te lo codifico** — escribirlo a mano
  rompe el enlace.

### ¡Importante! Cambiarlo también en el bloque de Google

Al final de `index.html` hay un bloque grande que empieza con
`<script type="application/ld+json">`. Es la ficha que lee Google. **Si cambias el
teléfono, la dirección o los horarios, cámbialos también ahí.**

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
<h3 class="servicio__titulo">Odontología familiar</h3>
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

## Agregar la lista de tratamientos

Hoy la sección de Servicios tiene dos tarjetas —**Odontología familiar** y
**Odontología infantil**— con un párrafo cada una. A propósito **no lista
tratamientos**: la clínica todavía no confirmó cuáles hace, y publicar
"endodoncia" o "ortodoncia" sin confirmarlo es prometer algo que quizá no dan.

Cuando manden la lista, dentro de cada `<article class="servicio ...">` se cambia
el `<p class="servicio__texto">` por una lista como esta:

```html
<ul class="servicio__lista">
  <li><span class="servicio__vineta" aria-hidden="true">·</span>Limpieza dental</li>
  <li><span class="servicio__vineta" aria-hidden="true">·</span>Resinas</li>
</ul>
```

Y esos mismos tratamientos se agregan en el bloque de Google del final, en
`availableService`. Dímelo y lo hago de una sola vez en los dos lugares.

---

## Activar la sección de precios

La sección de precios **está hecha pero oculta**, porque los precios no están
confirmados. No se ve en la página publicada.

Para activarla, busca en `index.html` estas dos líneas y **bórralas**:

```html
<!-- INICIO OCULTO
```

```html
FIN OCULTO -->
```

Al borrar esas dos líneas, la sección aparece. Ojo: los montos que trae hoy son
`$000` de relleno — hay que cambiarlos antes de destapar la sección.

### Cambiar un precio

Cada renglón se ve así:

```html
<div class="precios__fila">
  <span class="precios__concepto">Limpieza dental</span>
  <span class="precios__monto">$000</span>
</div>
```

Cambia `Limpieza dental` y `$000` por lo que necesites.

### Agregar un tratamiento

Copia un bloque completo de `<div class="precios__fila">` hasta su `</div>`,
pégalo debajo del último y cambia el texto y el precio.

---

## Agregar otro dentista

Hoy hay una sola tarjeta, la del **Dr. José Manuel Garibay Martín**. Varias
reseñas hablan de "los doctores" en plural, así que puede que falte alguien.

En `index.html`, busca `ESPECIALISTAS`. Para agregar a otra persona, copia el
bloque `<article class="especialista ...">` completo, pégalo debajo y cambia tres
cosas:

```html
<article class="especialista especialista--medica">
                            ↑ (1) déjalo como está para el color azul
  <div class="especialista__inicial" aria-hidden="true">J</div>
                                       (2) la inicial del nombre ↑
  <div class="especialista__cuerpo">
    <span class="especialista__etiqueta">Odontología familiar e infantil</span>
    <h3 class="especialista__nombre">Dr. José Manuel Garibay Martín</h3>
    <p class="especialista__texto">Atiende la consulta de la clínica.</p>
                                    ↑ (3) nombre, especialidad y descripción
  </div>
</article>
```

**Y quita la clase `equipo__grid--uno`** del `<div>` que envuelve las tarjetas: esa
clase existe solo para que una tarjeta sola no se estire a todo el ancho. Con dos
o más, estorba.

**Sobre las fotos:** las tarjetas usan la inicial del nombre a propósito. No
pusimos fotos de banco porque poner la cara de un modelo debajo del nombre de un
profesional real es engañoso. Cuando la clínica mande retratos de verdad, avísame
y las cambio.

---

## Las reseñas

La sección muestra 3 reseñas **reales**, copiadas textualmente de la ficha de
Google el 12 de agosto de 2026. Las tres son de 5 estrellas (verificado una por
una, no supuesto):

| Paciente | De qué habla |
|---|---|
| Janeth Mejía Rangel | Años de conocerlos, profesionalismo, tiempo dedicado a cada tratamiento |
| Moni Sánchez | Los doctores explican el cómo y el porqué del tratamiento |
| Proveedor de México | Atención rápida, amabilidad, buena ubicación |

La reseña de Janeth termina en `…` porque en Google está cortada con un "Más" que
no se puede expandir sin iniciar sesión. Los puntos suspensivos marcan el corte,
que es lo honesto.

**No corrijas la redacción de las reseñas.** Están tal cual las escribieron los
pacientes, con sus mayúsculas y comas. Si las "arreglas", dejan de ser una cita
textual y cualquiera puede comparar con Google.

La calificación (**4.7**) y el número de reseñas (**52**) aparecen en tres lugares:
la tarjeta de la portada, la sección de reseñas y el bloque de Google del final.
Si el número cambia, cámbialo en los tres. La quinta estrella está pintada al 70 %
a propósito, para que refleje el 4.7 y no un 5 falso.

### Cambiar cuáles se muestran

En la ficha hay 52. Para cambiar una, en `index.html` busca `RESEÑAS REALES` y
sustituye el texto y el nombre de la tarjeta. Las 5 estrellas déjalas solo si la
reseña realmente es de 5. Si quieres que traiga más reseñas de la ficha, dímelo.

> **Por qué las reseñas no están en el bloque de Google (JSON-LD):** marcar como
> datos estructurados reseñas copiadas de otra plataforma va contra las
> políticas de Google y puede penalizar. En la página se ven porque son
> contenido legítimo con su fuente; en el marcado no van. Es a propósito.

---

## Los horarios

Los horarios reales están en **tres lugares** y los tres tienen que coincidir:

1. **La banda azul de horarios**, a media página (busca `HORARIOS` en `index.html`).
2. **La lista día por día** en la sección de contacto (busca `horario-lista`).
3. **El bloque de Google** del final, en `openingHoursSpecification`.

Hoy dicen: lunes a jueves de 10:00 a 13:00 y de 15:00 a 18:30; viernes, sábado y
domingo cerrado. En el bloque de Google eso se escribe en dos entradas, una por
cada rango del día:

```json
{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
  "opens": "10:00",
  "closes": "13:00"
}
```

Los días cerrados no se escriben: lo que no aparece, Google lo toma como cerrado.

---

## La portada

Hoy la portada tiene **una sola foto**. La plantilla traía cinco que se alternaban
cada 5 segundos, pero cuatro eran de servicios que Esencia Dental no da (medicina,
fisioterapia, nutrición y urgencias) y se quitaron.

**El carrusel se enciende solo en cuanto haya más de una foto.** No hay que tocar
el JavaScript.

### Agregar fotos y recuperar el carrusel

En `index.html`, busca `FOTO DE PORTADA`. Copia el bloque `<picture>` tantas veces
como fotos tengas. En todas menos la primera, cambia `src` y `srcset` por
`data-src` y `data-srcset`, y quítales `fetchpriority="high"` — así el JavaScript
las carga después y la portada aparece rápido.

Cada foto se empareja con su etiqueta por el atributo `data-categoria`: la foto y
su etiqueta tienen que tener **exactamente el mismo valor**. Y en las etiquetas,
deja `is-activa` solo en la primera (hoy las tres la tienen porque no rotan).

Si te suena a que se rompe fácil, mándame las fotos y lo hago yo.

### Cambiar cada cuánto rotan

En `js/main.js`, la tercera línea de código:

```js
var SEGUNDOS_POR_FOTO = 5;
```

### Procesar una foto nueva

Las fotos de la portada están optimizadas en dos tamaños y dos formatos. Para
procesar una nueva, ponla en una carpeta al lado del sitio y ejecuta esto en la
Terminal, desde la carpeta del sitio:

```bash
python3 -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('../fotos/NOMBRE.jpg')).convert('RGB'); [im.resize((w, round(im.height*w/im.width)), Image.LANCZOS).save(f'img/hero/CATEGORIA-{w}.{e}', **k) for w in (900,1800) for e,k in (('webp',dict(quality=78,method=6)),('jpg',dict(quality=80,optimize=True,progressive=True)))]"
```

Cambia `NOMBRE.jpg` por el archivo y `CATEGORIA` por el nombre corto que uses en
`data-categoria` (hoy: `odontologia`).

### El encuadre en celular

En celular la foto se recorta a vertical, así que hay que decidir qué parte se
conserva. Eso está en `css/styles.css`, buscando `object-position`:

```css
.hero__foto[data-categoria="odontologia"]  img { object-position: 62% center; }
```

`50%` es el centro, `0%` la orilla izquierda, `100%` la derecha. Si al cambiar una
foto queda mal encuadrada en el celular, mueve ese porcentaje.

### Sobre el texto alternativo

La foto lleva `alt=""` a propósito. Es decoración: lo que comunica los servicios
son las etiquetas de texto, que sí las leen Google y los lectores de pantalla.

---

## Los colores y el logo

### Los colores

Todos los colores viven en un solo lugar: `css/styles.css`, sección
**2. VARIABLES**, arriba del todo. Cambias ahí el valor y cambia toda la página.

La paleta ya es la de la marca: turquesa, azul claro, negro y blanco.

| Variable | Color | Dónde se ve |
|---|---|---|
| `--turquesa` | `#6BC2D4` | El turquesa del logo. Botón "Agenda una cita", icono de odontología familiar |
| `--azul-claro-marca` | `#B0DBEB` | El azul claro del logo. Enlaces sobre fondo negro |
| `--turquesa-osc` | `#0C7181` | Enlaces, iconos, banda de horarios. Ver el aviso de abajo |
| `--azul-oscuro` | `#0F1518` | El negro de la marca: todo el texto |
| `--azul-navy` | `#0B1013` | Fondo de la sección de reseñas y del pie |

> **Por qué hay dos turquesas.** El turquesa del logo es claro: sobre blanco
> casi no se lee (contraste 2:1, cuando el mínimo legal de accesibilidad es
> 4.5:1). Por eso el turquesa de marca se usa **como fondo, con letra negra
> encima**, y para texto turquesa sobre blanco se usa `--turquesa-osc`, que es
> el mismo color oscurecido hasta que se lee bien. Si cambias uno, revisa el
> otro. Todo el sitio pasó una revisión de contraste después del cambio.

El verde de los botones de WhatsApp **no es parte de la paleta**: es el verde
de WhatsApp y se deja a propósito, porque la gente reconoce el botón por el
color antes de leerlo.

Si cambias los colores, cámbialos también en:
- `<meta name="theme-color">` en el `<head>` de `index.html`
- `theme_color` y `background_color` en `site.webmanifest`
- Los dos `stroke="#0C7181"` de los iconos de dirección y horarios en `index.html`

Al final de `css/styles.css` hay una sección **17. AJUSTES DE ESENCIA DENTAL**
con todo lo que se agregó respecto a la plantilla original.

### El logo

El original del cliente es `img/esenciadentalogo.svg` y **no se toca**. De ahí
salen, con el script `gen-logos.py`, las cuatro versiones que usa el sitio:

| Archivo | Qué es | Dónde se usa |
|---|---|---|
| `img/logo.svg` | Horizontal (marca + nombre en línea), letra negra | Encabezado |
| `img/logo-blanco.svg` | El mismo, en blanco | Pie de página |
| `img/logo-vertical.svg` | El lockup original, apilado | No se usa en el sitio; queda por si hace falta |
| `favicon.svg` | Solo el diente | Pestaña del navegador |

**Por qué hay una versión horizontal.** El logo del cliente es vertical: el
diente arriba y el nombre abajo. En el encabezado del sitio caben 44 píxeles de
alto; con el logo vertical, "Esencia Dental" quedaría de 5 píxeles y no se
leería. La versión horizontal usa exactamente las mismas piezas del original,
solo acomodadas de lado.

> **Detalle técnico, por si algún día hay que retocarlo:** en el logo original
> las letras chicas de "Odontología Familiar" no están caladas — el hueco de
> cada "o" es una forma blanca encimada, no un agujero. Por eso la versión
> blanca pinta esos huecos del color del fondo del pie (`#0B1013`) en lugar de
> dejarlos transparentes. Si cambias el fondo del pie, hay que cambiarlos.

Los iconos (`favicon.svg`, `apple-touch-icon.png`, `img/icon-192.png`,
`img/icon-512.png`) son el diente sobre el negro de la marca.

---

## La imagen que se ve al compartir por WhatsApp

Es `img/og-image.jpg` (1200 × 630 px). Es la que aparece cuando alguien pega el
enlace del sitio en WhatsApp, Facebook o Messenger. Ya está hecha con la marca
de Esencia Dental: el logo sobre el negro de la marca, con la ciudad y la
calificación de Google.

Si la cambias, **respeta esas medidas exactas** y avísame para actualizar las
etiquetas del `<head>`.

> WhatsApp y Facebook guardan esa imagen en caché. Si la cambias y sigues viendo
> la vieja, entra a <https://developers.facebook.com/tools/debug/>, pega la
> dirección del sitio y presiona "Scrape Again".

---

## Publicar en Vercel

### La primera vez

1. El sitio ya está en GitHub: <https://github.com/uvalek/escenciadentalweb>
2. Entra a <https://vercel.com>, haz clic en **Add New → Project** e importa ese
   repositorio.
3. En **Framework Preset** elige **Other**. Deja vacíos "Build Command" y
   "Output Directory" — este sitio no se compila.
4. Clic en **Deploy**. En menos de un minuto tienes la dirección `.vercel.app`.

### Cada cambio después

Guardas el archivo, lo subes a GitHub, y Vercel publica solo. No hay más pasos.

### La dirección del sitio

El sitio trae puesta `https://esenciadental.vercel.app` como dirección provisional.
**En cuanto Vercel dé la real (o se contrate un dominio propio), hay que
cambiarla.** Busca `DOMINIO` en los archivos. Está en **9 lugares**:

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
ficha el 12 de agosto de 2026:

**1. La ficha NO tiene sitio web.** Dice "Agregar sitio web". En cuanto
publiquemos, hay que pegar la dirección ahí. Es gratis y es el enlace que más
tráfico va a traer. Es lo primero que hay que hacer.

**2. La categoría ya es "Dentista"**, que es la correcta. Nada que cambiar.

**3. La ficha está bien cuidada:** 4.7 con 52 reseñas y el propietario responde.
Eso es una base buena; conviene seguir pidiendo reseñas a los pacientes que salen
contentos.

**4. El teléfono de la ficha y el que dio el cliente no coinciden.** Hay que
resolverlo (ver el aviso del principio).

Después de eso:

5. **Dar de alta el sitio** en <https://search.google.com/search-console> y enviar
   el `sitemap.xml`.
6. **Poner el enlace del sitio** también en el Facebook de la clínica.
7. **Fotos reales** de la clínica (fachada, recepción, consultorio), en la ficha y
   en la web. Una foto del lugar real convierte mejor que cualquier foto de banco.

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

## Pendientes

| # | Qué falta | Por qué importa |
|---|---|---|
| 1 | **Resolver cuál es el teléfono bueno**: 222 327 3990 (Google) o 222 126 1476 (el que pasó el cliente) | Todo el sitio y toda la ficha apuntan a un número. Si es el equivocado, no llega nadie |
| 2 | Confirmar que ese número **tiene WhatsApp activo** | Es el botón principal de toda la página |
| 3 | **Foto de la portada** (fachada, recepción o consultorio) | La de hoy es de banco. Una foto del lugar real convierte mejor y es gratis |
| 4 | Lista real de tratamientos | Hoy solo dice "odontología familiar e infantil" |
| 5 | Precios, para activar esa sección | Está lista, solo oculta |
| 6 | ¿Hay más dentistas además del Dr. Garibay? | Varias reseñas hablan de "los doctores" en plural |
| 7 | Correo de contacto e Instagram | Hoy la sección de contacto solo tiene teléfono y Facebook |
| 8 | Confirmar que el Facebook `@esenciadentalfam` es el oficial | Está publicado en el sitio y en el marcado de Google |
| 9 | Aviso de privacidad | Si más adelante se agrega un formulario, es obligatorio |
