/* ==========================================================================
   DATOS DE PROYECTOS
   Cada proyecto incluye ya la estructura de caso de estudio (contexto,
   problema, objetivo, investigación, concepto, proceso, solución, resultado)
   aunque hoy solo se muestren los campos básicos en la retícula. Cuando se
   creen las páginas de caso de estudio, estos campos ya estarán listos.
   ========================================================================== */
const proyectos = [
  {
    id: "malbec-identidad",
    nombre: "Identidad visual para restaurante mediterráneo",
    categoria: "identidad-visual",
    categoriaLabel: "Identidad visual",
    anio: "2025",
    tamano: "grande",
    descripcion: "Sistema de marca completo para un restaurante de cocina mediterránea de proximidad.",
    imagen: "assets/identidad-visual-restaurante-mediterraneo.png",
    alt: "Aplicaciones de identidad visual para un restaurante mediterráneo",
    caseStudy: {
      contexto: "",
      problema: "",
      objetivo: "",
      investigacion: "",
      concepto: "",
      proceso: "",
      solucion: "",
      resultado: ""
    }
  },
  {
    id: "revista-independiente",
    nombre: "Diseño editorial para revista independiente",
    categoria: "editorial",
    categoriaLabel: "Editorial",
    anio: "2025",
    tamano: "pequena",
    descripcion: "Maquetación y sistema tipográfico para una publicación cultural trimestral.",
    imagen: "assets/diseno-editorial-revista.png",
    alt: "Páginas interiores de una revista independiente maquetada",
    caseStudy: { contexto: "", problema: "", objetivo: "", investigacion: "", concepto: "", proceso: "", solucion: "", resultado: "" }
  },
  {
    id: "branding-pequena-empresa",
    nombre: "Branding para pequeña empresa de servicios",
    categoria: "branding",
    categoriaLabel: "Branding",
    anio: "2026",
    tamano: "normal",
    descripcion: "Definición de tono de voz y sistema visual para una marca de servicios local.",
    imagen: "assets/branding-pequena-empresa.png",
    alt: "Manual de marca y aplicaciones de branding para una pequeña empresa",
    caseStudy: { contexto: "", problema: "", objetivo: "", investigacion: "", concepto: "", proceso: "", solucion: "", resultado: "" }
  },
  {
    id: "patrones-graficos-papeleria",
    nombre: "Diseño de patrones gráficos para papelería de marca",
    categoria: "patrones",
    categoriaLabel: "Diseño de patrones",
    anio: "2025",
    tamano: "normal",
    descripcion: "Creación de un patrón gráfico repetible, aplicado a distintas piezas de papelería de marca.",
    imagen: "assets/diseno-patrones-graficos.png",
    alt: "Patrón gráfico repetible aplicado a piezas de papelería de marca",
    caseStudy: { contexto: "", problema: "", objetivo: "", investigacion: "", concepto: "", proceso: "", solucion: "", resultado: "" }
  },
  {
    id: "web-estudio-arquitectura",
    nombre: "Diseño web para estudio de arquitectura",
    categoria: "diseno-web",
    categoriaLabel: "Diseño web",
    anio: "2026",
    tamano: "grande",
    descripcion: "Web sencilla y cuidada para mostrar el portfolio de un pequeño estudio de arquitectura.",
    imagen: "assets/diseno-web-estudio-arquitectura.png",
    alt: "Vista de escritorio de una web para un estudio de arquitectura",
    caseStudy: { contexto: "", problema: "", objetivo: "", investigacion: "", concepto: "", proceso: "", solucion: "", resultado: "" }
  },
  {
    id: "menu-restaurante-impresion",
    nombre: "Diseño de menú para restaurante",
    categoria: "impresion",
    categoriaLabel: "Diseño para impresión",
    anio: "2026",
    tamano: "pequena",
    descripcion: "Menú impreso a doble cara, coherente con la identidad visual del restaurante.",
    imagen: "assets/diseno-menu-restaurante.png",
    alt: "Menú impreso diseñado para un restaurante de cocina mediterránea",
    caseStudy: { contexto: "", problema: "", objetivo: "", investigacion: "", concepto: "", proceso: "", solucion: "", resultado: "" }
  }
];

/* ==========================================================================
   IMAGEN DEL HERO
   Mismo criterio que las imágenes del portfolio: si assets/hero.jpg todavía
   no existe, se muestra un placeholder visual en vez de un icono de imagen rota.
   ========================================================================== */
function initHeroImagen() {
  const heroImg = document.getElementById("heroImg");
  const heroFrame = document.getElementById("heroFigureFrame");
  if (!heroImg || !heroFrame) return;

  heroImg.addEventListener("error", () => {
    heroFrame.classList.add("img-missing");
    heroFrame.setAttribute("data-placeholder-label", "Sustituir por: hero.jpg");
  }, { once: true });
}

/* ==========================================================================
   RENDER DEL PORTFOLIO
   ========================================================================== */
const portfolioGrid = document.getElementById("portfolioGrid");

function renderProyectos() {
  portfolioGrid.innerHTML = proyectos.map(p => `
    <article class="proyecto reveal" data-categoria="${p.categoria}" data-size="${p.tamano}">
      <div class="proyecto-imagen">
        <img
          src="${p.imagen}"
          alt="${p.alt}"
          width="640"
          height="800"
          loading="lazy"
          decoding="async"
          data-placeholder-label="Sustituir por: ${p.imagen.split('/').pop()}"
        >
      </div>
      <div class="proyecto-info">
        <div>
          <h3>${p.nombre}</h3>
          <span class="proyecto-categoria">${p.categoriaLabel}</span>
        </div>
        <span class="proyecto-anio">${p.anio}</span>
      </div>
      <p class="proyecto-desc">${p.descripcion}</p>
    </article>
  `).join("");

  // Placeholder visual mientras las imágenes reales no existen todavía
  portfolioGrid.querySelectorAll(".proyecto-imagen img").forEach(img => {
    img.addEventListener("error", () => {
      const wrapper = img.closest(".proyecto-imagen");
      wrapper.classList.add("img-missing");
      wrapper.setAttribute("data-placeholder-label", img.dataset.placeholderLabel);
    }, { once: true });
  });

  initReveal();
}

/* ==========================================================================
   FILTROS DEL PORTFOLIO
   ========================================================================== */
const filtroBtns = document.querySelectorAll(".filtro-btn");

filtroBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filtroBtns.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filtro = btn.dataset.filtro;
    document.querySelectorAll(".proyecto").forEach(proyecto => {
      const coincide = filtro === "todos" || proyecto.dataset.categoria === filtro;
      proyecto.classList.toggle("is-hidden", !coincide);
    });
  });
});

/* ==========================================================================
   MENÚ MÓVIL
   ========================================================================== */
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const abierto = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!abierto));
  navToggle.setAttribute("aria-label", abierto ? "Abrir menú" : "Cerrar menú");
  siteNav.classList.toggle("is-open");
});

siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    siteNav.classList.remove("is-open");
  });
});

/* ==========================================================================
   SCROLL REVEAL (respeta prefers-reduced-motion)
   ========================================================================== */
const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
  const elementos = document.querySelectorAll(".reveal:not(.is-visible)");

  if (prefiereMenosMovimiento) {
    elementos.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach(el => observer.observe(el));
}

/* ==========================================================================
   FORMULARIO DE CONTACTO
   Preparado para conectarse a un servicio externo (Formspree, backend
   propio, etc.). Sustituir el bloque marcado más abajo por la llamada real.
   ========================================================================== */
const contactoForm = document.getElementById("contactoForm");
const formStatus = document.getElementById("formStatus");

contactoForm.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  if (!contactoForm.checkValidity()) {
    formStatus.textContent =
      "Revisa los campos obligatorios antes de enviar.";
    return;
  }

  const datos = new FormData(contactoForm);

  formStatus.textContent = "Enviando mensaje...";

  try {
    const respuesta = await fetch(
      "https://formspree.io/f/myeyznav",
      {
        method: "POST",
        body: datos,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (respuesta.ok) {

      formStatus.textContent =
        "Gracias. Tu mensaje se ha enviado correctamente.";
      contactoForm.reset();
    } else {
      formStatus.textContent =
        "Ha ocurrido un error. Inténtalo de nuevo.";
    }
  } catch (error) {
    formStatus.textContent =
      "No se pudo enviar el mensaje. Comprueba tu conexión e inténtalo de nuevo.";
  }
});

/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */
document.getElementById("anioActual").textContent = new Date().getFullYear();
initHeroImagen();
renderProyectos();
initReveal();
