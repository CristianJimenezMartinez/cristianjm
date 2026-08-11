# 🌿 CristianJM (CJ) — Web Comercial & Portfolio V2

![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Design_System-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

Plataforma web comercial y marca personal de **Cristian Jiménez Martínez (CristianJM)**, Full Stack Developer & Software Architect. Diseñada para la captación de clientes B2B, venta de servicios de desarrollo de software, agentes de Inteligencia Artificial y consultoría técnica.

---

## 🎯 Visión Comercial & Embudo de Conversión

La web está estructurada como un **funnel de ventas B2B** de alta conversión que responde a las 3 preguntas clave de cualquier cliente de empresa:

1. **¿Qué puedes hacer por mi negocio?** (Hero + Servicios)
2. **¿Prueba de que sabes resolverlo?** (Casos de Éxito)
3. **¿Quién hay detrás y cómo te contacto?** (Sobre Mí + FAQ + Formulario)

```
[01. NAVBAR]     ──> Marca CJ, navegación directa y CTA "Hablemos →"
[02. HERO]       ──> Promesa clara: "Automatizo procesos. Construyo software. Creo agentes IA."
[03. SERVICIOS]  ──> Catálogo comercial: Agentes IA, Software & SaaS, Consultoría (con precios "Desde")
[04. CASOS]      ──> Casos de éxito numerados (01, 02, 03) centrados en problemas resueltos
[05. SOBRE MÍ]   ──> Bio del ingeniero, stack técnico dominado y tarjeta de disponibilidad
[06. FAQ]        ──> Eliminación de objeciones (costes, entregas, mantenimiento)
[07. CONTACTO]   ──> Formulario reactivo serverless conectado a Web3Forms (hola@cristianjm.com)
[08. FOOTER]     ──> 4 columnas con enlaces, copyright e indicador de disponibilidad
```

---

## 🎨 Sistema de Diseño (CJ — Sage × Lime)

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

## 📁 Estructura del Código

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

## 💼 Catálogo de Servicios & Modelo de Negocio

1. **🤖 Agentes IA & Automatización**
   - *Copy*: "Automatiza lo que hoy consume horas."
   - *Precio*: Desde **1.500€** (Desarrollo) | Operación & Mantenimiento desde **80€/mes**.
2. **⚡ Software & SaaS Custom**
   - *Copy*: "Convierte una idea o proceso en producto."
   - *Precio*: Desde **2.500€** (Desarrollo) | Mantenimiento & Hosting desde **150€/mes**.
3. **🧠 Consultoría Técnica & Arquitectura**
   - *Copy*: "Cuando el problema necesita arquitectura, no más código."
   - *Precio*: **150€/h** | Retainer técnico desde **400€/mes**.

---

## 🏆 Casos de Éxito (Proyectos)

- **`01 / AI & SaaS` · ReviLike.com**: Gestión automatizada de reseñas con IA conversacional (`+85% ahorro en tiempo de respuesta`).
- **`02 / LegalTech` · VeltiaTrust**: Infraestructura API para notarización y firma electrónica (`100% Cumplimiento eIDAS`).
- **`03 / ERP & Integrations` · Conector Factusol API REST**: Infraestructura REST x64 en tiempo real con WebSockets y Stripe (`<100ms latencia`).

---

## 🚀 Desarrollo, GitHub & Despliegue en Cloudflare Pages

### ⚙️ Requisitos Previos:
- Node.js 18+
- npm 9+
- Cuenta en GitHub ([github.com](https://github.com))
- Cuenta en Cloudflare con el dominio `cristianjm.com` añadido ([dash.cloudflare.com](https://dash.cloudflare.com))

---

### 📦 Paso 1: Creación del Repositorio en GitHub

1. Entra en tu cuenta de GitHub y crea un nuevo repositorio público:
   - **Nombre del Repositorio**: `cristianjm`
   - **Descripción**: `Web Comercial & Portfolio V2 — Full Stack Developer & Software Architect (Angular 18+, Node.js, IA)`
   - **Visibilidad**: Public
   - *Desmarca "Initialize this repository with a README"* (ya tenemos uno local).

2. En tu terminal local (dentro de la carpeta `d:\Proyectos\porfolio\cristianjm`), ejecuta los siguientes comandos:

```bash
# 1. Inicializar repositorio git local
git init

# 2. Añadir todos los archivos
git add .

# 3. Primer commit oficial
git commit -m "feat: initial commit - CristianJM Commercial Website & Portfolio V2"

# 4. Renombrar rama a main
git branch -M main

# 5. Enlazar con tu repositorio de GitHub
git remote add origin https://github.com/CristianJimenezMartinez/cristianjm.git

# 6. Subir código a GitHub
git push -u origin main
```

---

### ☁️ Paso 2: Configuración del Proyecto en Cloudflare Pages

1. Inicia sesión en el panel de Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com).
2. En el menú lateral izquierdo, ve a **Workers & Pages**.
3. Haz clic en el botón **Create application** y selecciona la pestaña **Pages**.
4. Elige **Connect to Git** y selecciona tu cuenta de GitHub.
5. Selecciona el repositorio **`cristianjm`** y haz clic en **Begin setup**.
6. **Configuración de Build (Build Settings)**:

| Parámetro | Valor Exacto |
|---|---|
| **Project name** | `cristianjm` |
| **Production branch** | `main` |
| **Framework preset** | `Angular` |
| **Build command** | `npx ng build` (o `npm run build`) |
| **Build output directory** | `dist/cristian-jimenez/browser` |

7. Haz clic en **Save and Deploy**. Cloudflare descargará el código de GitHub, compilará la aplicación y la publicará en pocos segundos.

---

### 🌐 Paso 3: Asignación del Dominio Personalizado (`cristianjm.com`)

1. Dentro de tu proyecto en Cloudflare Pages (`cristianjm`), ve a la pestaña **Custom domains**.
2. Haz clic en **Set up a custom domain**.
3. Introduce tu dominio: `cristianjm.com` y haz clic en **Continue**.
4. Cloudflare detectará automáticamente tus DNS y creará el registro CNAME necesario. Haz clic en **Activate domain**.
5. *(Opcional)* Repite el proceso para añadir `www.cristianjm.com`.

---

### 🔄 Funcionamiento del Enrutamiento SPA (Sin errores 404)

Durante el build (`npx ng build`), Angular copia automáticamente el archivo `src/_redirects` al directorio final `dist/cristian-jimenez/browser/_redirects`.

Contenido de `src/_redirects`:
```
/* /index.html 200
```
Esta regla le indica a Cloudflare Pages que redireccione cualquier ruta o recarga directamente a `index.html` con estado 200, garantizando un funcionamiento SPA fluido sin pantallas de error 404.

---

## 👤 Autor
**Cristian Jiménez Martínez (CristianJM)**  
Full Stack Developer & Software Architect  
- Email: [hola@cristianjm.com](mailto:hola@cristianjm.com)  
- Website: [cristianjm.com](https://cristianjm.com)  
- LinkedIn: [linkedin.com/in/cristian-jimenez-martinez/](https://linkedin.com/in/cristian-jimenez-martinez/)  
- GitHub: [github.com/CristianJimenezMartinez](https://github.com/CristianJimenezMartinez)

