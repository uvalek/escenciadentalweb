/* ==========================================================================
   Esencia Dental — Odontología Familiar
   --------------------------------------------------------------------------
   Siete cosas, nada más:
     1. Menú desplegable en móvil
     2. Altura real del encabezado (para que nunca tape el título)
     3. Mapa de Google que solo se carga si alguien lo pide
     4. Carrusel de fotos de la portada, sincronizado con las etiquetas
     5. Reseñas que rotan dentro de la tarjeta de calificación
     6. Elementos que aparecen al hacer scroll
     7. Números que cuentan hacia arriba

   La página funciona completa aunque este archivo no cargue: se queda la
   primera foto fija, los números salen con su valor final y nada queda
   invisible. Lo mismo si la persona activó "reducir movimiento".

   Para ajustar los tiempos, busca las tres constantes de aquí abajo.
   ========================================================================== */

(function () {
  'use strict';

  var SEGUNDOS_POR_FOTO   = 5;
  var SEGUNDOS_POR_RESENA = 5;
  var DURACION_CONTADOR   = 1400;  // milisegundos

  // ¿La persona pidió menos animación en su sistema? Entonces nada se mueve.
  var menosMovimiento = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Esta clase es la que activa TODAS las animaciones del CSS. Si no se pone,
  // la página se ve completa y quieta. Es la red de seguridad.
  if (!menosMovimiento) {
    document.documentElement.classList.add('js-anim');
  }

  /* ------------------------------------------------------------------------
     1. MENÚ MÓVIL
     ------------------------------------------------------------------------ */
  var toggle = document.querySelector('.site-header__toggle');
  var menu   = document.getElementById('menu-principal');

  if (toggle && menu) {
    var cerrarMenu = function () {
      menu.classList.remove('abierto');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    };

    toggle.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });

    // Al tocar un enlace del menú, se cierra
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { cerrarMenu(); }
    });

    // Escape cierra el menú y devuelve el foco al botón
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('abierto')) {
        cerrarMenu();
        toggle.focus();
      }
    });

    // Tocar fuera del menú lo cierra
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('abierto')) { return; }
      if (!e.target.closest('.site-header')) { cerrarMenu(); }
    });
  }


  /* ------------------------------------------------------------------------
     2. ALTURA REAL DEL ENCABEZADO
     El hero y el scroll de las anclas usan la variable --alto-header. Al
     medirla de verdad (en vez de dejar un número fijo), el título nunca
     queda tapado, cambie lo que cambie el tamaño de pantalla.
     ------------------------------------------------------------------------ */
  var header = document.getElementById('encabezado');

  function medirHeader() {
    if (!header) { return; }
    var alto = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--alto-header', Math.round(alto) + 'px');
  }

  medirHeader();
  window.addEventListener('resize', medirHeader, { passive: true });
  window.addEventListener('load', medirHeader);


  /* ------------------------------------------------------------------------
     3. MAPA DIFERIDO
     El mapa de Google pesa cerca de 700 KB. Cargarlo solo cuando alguien
     lo pide ahorra ese peso a la mayoría de las visitas.
     ------------------------------------------------------------------------ */
  var botonMapa = document.getElementById('ver-mapa');
  var cajaMapa  = document.getElementById('mapa');

  if (botonMapa && cajaMapa) {
    botonMapa.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://maps.google.com/maps?q=' +
        encodeURIComponent('19.065525,-98.3195008') +
        '&z=17&output=embed';
      iframe.title = 'Mapa de Esencia Dental — 15 Sur 502-B, San Pedro Cholula';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      cajaMapa.innerHTML = '';
      cajaMapa.appendChild(iframe);
    });
  }


  /* ------------------------------------------------------------------------
     4. CARRUSEL DE LA PORTADA
     Cada foto se empareja con su etiqueta por el atributo data-categoria.
     Se detiene solo cuando la pestaña no está a la vista, para no gastar
     batería del celular.
     ------------------------------------------------------------------------ */
  var fotos     = document.querySelectorAll('#hero-fotos .hero__foto');
  var etiquetas = document.querySelectorAll('#hero-etiquetas .tag');

  if (fotos.length > 1) {

    // Carga las 4 fotos restantes una vez que la página ya terminó, para no
    // competir con la primera imagen (que es la que mide Google).
    function cargarElResto() {
      fotos.forEach(function (foto) {
        var fuente = foto.querySelector('source');
        var img    = foto.querySelector('img');
        if (fuente && fuente.dataset.srcset) {
          fuente.srcset = fuente.dataset.srcset;
          delete fuente.dataset.srcset;
        }
        if (img && img.dataset.src) {
          img.srcset = img.dataset.srcset || '';
          img.src    = img.dataset.src;
          delete img.dataset.src;
        }
      });
    }

    if (document.readyState === 'complete') { cargarElResto(); }
    else { window.addEventListener('load', cargarElResto); }

    if (!menosMovimiento) {
      var actual = 0;
      var reloj  = null;

      function mostrar(indice) {
        fotos.forEach(function (f, i) { f.classList.toggle('is-activa', i === indice); });
        etiquetas.forEach(function (e, i) { e.classList.toggle('is-activa', i === indice); });
      }

      function avanzar() {
        actual = (actual + 1) % fotos.length;
        mostrar(actual);
      }

      function arrancar() {
        if (!reloj) { reloj = setInterval(avanzar, SEGUNDOS_POR_FOTO * 1000); }
      }
      function detener() {
        if (reloj) { clearInterval(reloj); reloj = null; }
      }

      // Pausa cuando la pestaña pasa a segundo plano
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { detener(); } else { arrancar(); }
      });

      arrancar();
    }
  }


  /* ------------------------------------------------------------------------
     5. RESEÑAS QUE ROTAN EN LA TARJETA DE CALIFICACIÓN
     Van con medio ciclo de desfase respecto a las fotos, para que las dos
     cosas no cambien en el mismo instante (se ve más tranquilo).
     ------------------------------------------------------------------------ */
  var miniResenas = document.querySelectorAll('#hero-resenas .mini-resena');

  if (miniResenas.length > 1 && !menosMovimiento) {
    var iResena = 0;
    var relojResenas = null;

    function siguienteResena() {
      iResena = (iResena + 1) % miniResenas.length;
      miniResenas.forEach(function (r, i) {
        r.classList.toggle('is-activa', i === iResena);
      });
    }

    function arrancarResenas() {
      if (!relojResenas) {
        relojResenas = setInterval(siguienteResena, SEGUNDOS_POR_RESENA * 1000);
      }
    }
    function detenerResenas() {
      if (relojResenas) { clearInterval(relojResenas); relojResenas = null; }
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { detenerResenas(); } else { arrancarResenas(); }
    });

    // Medio ciclo de desfase
    setTimeout(arrancarResenas, (SEGUNDOS_POR_RESENA * 1000) / 2);
  }


  /* ------------------------------------------------------------------------
     6. APARECER AL HACER SCROLL
     Los elementos con class="revelar" entran cuando asoman en pantalla.
     Se revelan una sola vez: nada desaparece al volver a subir.
     ------------------------------------------------------------------------ */
  var porRevelar = document.querySelectorAll('.revelar');

  if (porRevelar.length && !menosMovimiento && 'IntersectionObserver' in window) {

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        e.target.classList.add('visible');
        observador.unobserve(e.target);
      });
    }, {
      // Se dispara un poco antes de que el elemento toque el borde inferior
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.05
    });

    porRevelar.forEach(function (el) { observador.observe(el); });

    /* Red de seguridad -----------------------------------------------------
       Si alguien arrastra la barra de scroll de golpe o presiona la tecla Fin,
       la página puede saltar tanto que una sección nunca llegue a "asomar" en
       un fotograma. El observador no se entera y esa sección se quedaría
       invisible para siempre. Este barrido revela cualquier cosa que ya haya
       quedado por encima del borde inferior de la pantalla.                  */
    var barriendo = false;
    function barrer() {
      barriendo = false;
      var quedan = 0;
      porRevelar.forEach(function (el) {
        if (el.classList.contains('visible')) { return; }
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible');
          observador.unobserve(el);
        } else { quedan++; }
      });
      // Cuando ya no queda nada oculto, dejamos de escuchar
      if (!quedan) { window.removeEventListener('scroll', pedirBarrido); }
    }
    function pedirBarrido() {
      if (barriendo) { return; }
      barriendo = true;
      requestAnimationFrame(barrer);
    }

    window.addEventListener('scroll', pedirBarrido, { passive: true });
    window.addEventListener('resize', pedirBarrido, { passive: true });
    window.addEventListener('load', pedirBarrido);

  } else {
    // Sin IntersectionObserver, o con "reducir movimiento": todo visible ya
    porRevelar.forEach(function (el) { el.classList.add('visible'); });
  }


  /* ------------------------------------------------------------------------
     7. NÚMEROS QUE CUENTAN
     El valor final ya está escrito en el HTML, así que si esto no corre,
     el número sale correcto de todos modos.
     ------------------------------------------------------------------------ */
  var contadores = document.querySelectorAll('[data-contador]');

  if (contadores.length && !menosMovimiento && 'IntersectionObserver' in window) {

    function contar(el) {
      var destino   = parseFloat(el.dataset.contador);
      var decimales = parseInt(el.dataset.decimales || '0', 10);
      if (isNaN(destino)) { return; }

      var inicio = null;
      function paso(ahora) {
        if (inicio === null) { inicio = ahora; }
        var avance = Math.min((ahora - inicio) / DURACION_CONTADOR, 1);
        // Desacelera al final, se siente natural
        var suave = 1 - Math.pow(1 - avance, 3);
        el.textContent = (destino * suave).toFixed(decimales);
        if (avance < 1) { requestAnimationFrame(paso); }
        else { el.textContent = destino.toFixed(decimales); }
      }
      requestAnimationFrame(paso);
    }

    var obsContadores = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        contar(e.target);
        obsContadores.unobserve(e.target);
      });
    }, { threshold: 0.6 });

    contadores.forEach(function (el) { obsContadores.observe(el); });
  }

})();
