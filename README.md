# 🌿 CristianJM (CJ) — Web Comercial & Portfolio V2

> **Plataforma web comercial y marca personal de Cristian Jiménez Martínez (CristianJM)**  
> Full Stack Developer & Software Architect especializado en Angular 18+, Node.js, Agentes IA y arquitecturas SaaS.

![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Design_System-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

---

## 🎯 1. Visión Comercial & Embudo de Conversión

La aplicación está diseñada como un **funnel de ventas B2B** de alta conversión que responde a las 3 preguntas clave de cualquier cliente empresarial:

1. **¿Qué puedes hacer por mi negocio?** (Hero + Servicios)
2. **¿Prueba de que sabes resolverlo?** (Casos de Éxito)
3. **¿Quién hay detrás y cómo te contacto?** (Sobre Mí + FAQ + Formulario)

```
[01. NAVBAR]     ──> Marca CJ, navegación limpia y CTA "Hablemos →"
[02. HERO]       ──> Promesa clara: "Automatizo procesos. Construyo software. Creo agentes IA."
[03. SERVICIOS]  ──> Catálogo comercial: Agentes IA, Software & SaaS, Consultoría (Precios "Desde")
[04. CASOS]      ──> Casos de éxito numerados (01, 02, 03) centrados en resultados reales
[05. SOBRE MÍ]   ──> Bio del ingeniero, stack técnico dominado y tarjeta de disponibilidad
[06. FAQ]        ──> Eliminación de objeciones (costes, entregas, mantenimiento)
[07. CONTACTO]   ──> Formulario reactivo serverless conectado a Web3Forms (hola@cristianjm.com)
[08. FOOTER]     ──> 4 columnas con enlaces, copyright e indicador de disponibilidad
```

---

## 🎨 2. Sistema de Diseño (CJ — Sage × Lime)

Basado en una estética ejecutiva oscura (*Obsidian Dark Mode*) con una paleta restringida de 5 colores protagonistas:

| Color | Hexadecimal | Función en la Interfaz |
|---|---|---|
| **Background** | `#090d0a` | Fondo base principal de la web |
| **Surface** | `#0d1410` | Secciones alternas y tarjetas sólidas |
| **Sage** | `#4ade80` | Color primario de marca (CTAs, botones, activo) |
| **Lime** | `#a3e635` | Acento eléctrico en H1 y métricas destacadas |
| **Forest** | `#16a34a` | Iconos vectoriales y acentos de profundidad |
| **Text** | `#f0fdf4` | Texto primario con tinte cálido verdoso |

### Principios de UI/UX:
- **Jerarquía Sólida vs. Glassmorphism**: El efecto *glassmorphism* se limita exclusivamente a la Navbar y al Terminal del Hero. Las demás tarjetas usan superficies sólidas (`solid-card`) en `#0d1410` para una profundidad limpia.
- **Folds de Pantalla Completa (100vh)**: En ordenadores (>992px), cada sección ocupa el alto total del navegador de forma centrada. En móviles, cambia fluidamente a `min-height: auto` con padding optimizado.
- **Botón Flotante "Volver Arriba"**: Aparece automáticamente al hacer scroll >300px con animación de entrada y desplazamiento suave (*smooth scroll*).

---

## 💼 3. Catálogo de Servicios & Modelo de Negocio

1. **🤖 Agentes IA & Automatización**
   - *Promesa*: "Automatiza lo que hoy consume horas."
   - *Inversión*: Desde **1.500€** (Desarrollo) | Operación & Mantenimiento desde **80€/mes**.

2. **⚡ Software & SaaS Custom**
   - *Promesa*: "Convierte una idea o proceso en producto."
   - *Inversión*: Desde **2.500€** (Desarrollo) | Mantenimiento & Hosting desde **150€/mes**.

3. **🧠 Consultoría Técnica & Arquitectura**
   - *Promesa*: "Cuando el problema necesita arquitectura, no más código."
   - *Inversión*: **150€/h** | Retainer técnico desde **400€/mes**.

---

## 🏆 4. Casos de Éxito (Proyectos)

- **`01 / AI & SaaS` · ReviLike.com**: Gestión automatizada de reseñas con IA conversacional (`+85% ahorro en tiempo de respuesta`).
- **`02 / LegalTech` · VeltiaTrust**: Infraestructura API para notarización y firma electrónica (`100% Cumplimiento eIDAS`).
- **`03 / ERP & Integrations` · Conector Factusol API REST**: Infraestructura REST x64 en tiempo real con WebSockets y Stripe (`<100ms latencia`).

---

## 📁 5. Estructura de Directorios

```
cristianjm/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/        # Interfaces TypeScript (project.model, service.model)
│   │   │   └── services/      # ProjectsService (Signals), MetaService (SEO)
│   │   ├── features/
│   │   │   ├── hero/          # HeroComponent (H1, Terminal interactivo, métricas)
│   │   │   ├── services/      # ServicesComponent (Tarjetas de precio y servicios)
│   │   │   ├── projects/      # ProjectsComponent (Grid de casos de éxito)
│   │   │   ├── about/         # AboutComponent (Bio, stack badges, profile card)
│   │   │   ├── faq/           # FaqComponent (Acordeón 01-04 minimalista)
│   │   │   └── contact/       # ContactComponent (Formulario reactivo Web3Forms)
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── navbar/        # NavbarComponent (Sticky glass, logo PNG 52px)
│   │   │   │   ├── footer/        # FooterComponent (4 columnas)
│   │   │   │   ├── project-card/  # ProjectCardComponent (Narrativa de negocio)
│   │   │   │   └── scroll-to-top/ # ScrollToTopComponent (Botón flotante ↑)
│   │   ├── styles/
│   │   │   ├── _variables.scss    # Paleta Sage×Lime y tokens
│   │   │   ├── _glassmorphism.scss# Mixins (glass-card, solid-card, gradient-text)
│   │   │   └── _animations.scss  # Animaciones CSS
│   │   ├── styles.scss            # Estilos globales y grid background
│   │   ├── index.html             # SEO Meta, OpenGraph, Favicons PNG/SVG
│   │   ├── llms.txt               # Documento para crawlers de IA (ChatGPT, Claude, Gemini)
│   │   ├── _redirects             # Reglas SPA Routing para Cloudflare Pages
│   │   ├── robots.txt & sitemap.xml
│   │   └── assets/                # CJ-logo-Sage-Forest-Lime.png y recursos visuales
├── angular.json                   # Configuración del CLI, assets y budgets de SCSS
└── README.md
```

---

## 🛠️ 6. Desarrollo Local & Comandos

### Servidor Local de Desarrollo:
```bash
npm run dev
# o directamente:
npx ng serve
```
Acceder a la aplicación en `http://localhost:4200/`.

### Compilación para Producción:
```bash
npx ng build
```
Genera la salida optimizada en `dist/cristian-jimenez/browser`.

---

## ☁️ 7. Despliegue en Cloudflare Pages & GitHub

### Configuración del Repositorio Git:
```bash
git init
git add .
git commit -m "feat: initial commit - CristianJM Commercial Website & Portfolio V2"
git branch -M main
git remote add origin https://github.com/CristianJimenezMartinez/cristianjm.git
git push -u origin main
```

### Configuración en Cloudflare Pages:
| Ajuste | Valor Exacto |
|---|---|
| **Build command** | `npx ng build` |
| **Build output directory** | `dist/cristian-jimenez/browser` |
| **Environment Variable** | `NODE_VERSION` = `18.20.0` |

---

## 👤 8. Autoría & Contacto

**Cristian Jiménez Martínez (CristianJM)**  
Full Stack Developer & Software Architect  

- 🌐 Website: [cristianjm.com](https://cristianjm.com)  
- ✉️ Email: [hola@cristianjm.com](mailto:hola@cristianjm.com)  
- 💼 LinkedIn: [linkedin.com/in/cristian-jimenez-martinez/](https://linkedin.com/in/cristian-jimenez-martinez/)  
- 🐙 GitHub: [github.com/CristianJimenezMartinez](https://github.com/CristianJimenezMartinez)  