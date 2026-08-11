# PLAN — Web Corporativa CristianJM
> **Único documento de referencia** para el diseño, desarrollo y despliegue de la web corporativa de **Cristian Jiménez Martínez**.
> Quién programa: **Gemini 3.6 Flash** — este documento debe ser suficientemente detallado para no requerir interpretación.

---

## ✅ Decisiones Confirmadas

| Parámetro | Decisión |
|---|---|
| Framework | Angular 17+ (Standalone Components, SCSS) |
| Estilo visual | Dark Mode Premium / Cyberpunk + Glassmorphism |
| Proyecto | Nuevo en `d:/Proyectos/porfolio/cristianjm/` |
| Repo GitHub | Nuevo repositorio exclusivo: `cristianjm-web` |
| Despliegue | Cloudflare Pages (CI/CD automático desde GitHub) |
| Dominio | `cristianjm` (ya registrado en Cloudflare) |
| Contacto | Solo **Web3Forms** (formulario → email directo, gratis) |
| Analytics | **Cloudflare Web Analytics** (gratis, sin cookies, sin banner GDPR) |

---

## 💼 Servicios a Presentar (Modelo de Negocio)

> ❌ **Sin sección de Integraciones ERP** — se reserva para el ERP universal en desarrollo.

### 1. 🤖 Agentes IA & Automatización
Chatbots, asistentes conversacionales entrenados con datos del cliente, agentes de WhatsApp/web con IA.

**Modelo de pricing (2 capas):**
- **Fee de desarrollo (pago único):** desde **1.500€** (chatbot simple) hasta **5.000€+** (agente multi-canal con RAG)
- **Cuota mensual recurrente:** desde **80€/mes** (cubre el coste real de la API de IA + margen de gestión del 30-40% + mantenimiento) hasta **300€/mes** (uso intensivo, soporte prioritario)

> El cliente no necesita contratar nada por su cuenta. La cuota mensual cubre todo: API, alojamiento del servicio y mantenimiento.

---

### 2. 🌐 Desarrollo Web & SaaS Custom (Angular + Node.js)
Aplicaciones a medida, dashboards, herramientas SaaS, webs corporativas premium.

**Modelo de pricing (2 capas):**
- **Fee de desarrollo (pago único):** desde **2.500€** (web corporativa) hasta **10.000€+** (MVP SaaS completo con backend)
- **Mantenimiento & hosting (recurrente, opcional):** desde **150€/mes** — recomendado para SaaS en producción con usuarios activos

---

### 3. 🎯 Consultoría Técnica
Auditorías de arquitectura, revisión de código, asesoría estratégica, roadmap tecnológico.
- **Sesión única:** 150€/h
- **Retainer mensual:** desde **400€/mes** (bolsa de horas + soporte continuo)

---

## 🏗️ Arquitectura Angular

### ⚠️ Convención ESTRICTA de Componentes
> Todo componente Angular **siempre** se crea con exactamente **3 archivos**:
> ```
> nombre.component.ts       ← Lógica TypeScript
> nombre.component.html     ← Template HTML semántico
> nombre.component.scss     ← Estilos SCSS del componente
> ```
> **Nunca** CSS inline. **Nunca** HTML dentro del `.ts`. Cada archivo tiene una única responsabilidad.

### Árbol de Carpetas del Proyecto

```
cristianjm/
├── PLAN.md                           # Este documento
├── angular.json
├── package.json
├── tsconfig.json
└── src/
    ├── _redirects                    # SPA routing: /* /index.html 200
    ├── llms.txt                      # Guía Markdown para agentes IA (ChatGPT, Gemini, Claude)
    ├── robots.txt                    # Permisos de crawling para buscadores
    ├── sitemap.xml                   # Mapa del sitio para SEO
    ├── index.html                    # Meta SEO, OpenGraph, Schema.org JSON-LD
    ├── main.ts                       # Bootstrap: provideRouter, provideAnimations
    ├── styles/
    │   ├── _variables.scss           # Tokens: colores Cyberpunk Dark, fuentes, espaciados
    │   ├── _glassmorphism.scss       # Mixin: glass card con blur y bordes iridiscentes
    │   ├── _animations.scss          # Keyframes: fadeInUp, fadeInLeft, glow-pulse
    │   └── styles.scss               # @import todos los parciales + CSS reset global
    ├── assets/
    │   ├── images/                   # Foto de Cristian, capturas de proyectos (WebP)
    │   └── icons/                    # SVG de tecnologías y logos
    └── app/
        ├── app.component.ts          # Shell SPA: <app-navbar> + <router-outlet> + <app-footer>
        ├── app.component.html
        ├── app.component.scss
        ├── app.routes.ts             # Rutas con lazy-loading de features
        ├── app.config.ts             # Providers: Router, Animations, HttpClient, Meta
        ├── core/
        │   ├── models/
        │   │   ├── project.model.ts  # interface Project { id, title, description, stack[], liveUrl, imageUrl }
        │   │   └── service.model.ts  # interface ServiceOffering { icon, title, description, pricing }
        │   └── services/
        │       ├── projects.service.ts  # signal<Project[]> con datos de ReviLike, VeltiaTrust, Factusol
        │       └── meta.service.ts      # Inyecta Title + Meta description dinámicos
        ├── shared/
        │   └── components/
        │       ├── navbar/
        │       │   ├── navbar.component.ts
        │       │   ├── navbar.component.html
        │       │   └── navbar.component.scss
        │       ├── footer/
        │       │   ├── footer.component.ts
        │       │   ├── footer.component.html
        │       │   └── footer.component.scss
        │       └── project-card/
        │           ├── project-card.component.ts
        │           ├── project-card.component.html
        │           └── project-card.component.scss
        └── features/
            ├── hero/
            │   ├── hero.component.ts
            │   ├── hero.component.html
            │   └── hero.component.scss
            ├── services/
            │   ├── services.component.ts
            │   ├── services.component.html
            │   └── services.component.scss
            ├── projects/
            │   ├── projects.component.ts
            │   ├── projects.component.html
            │   └── projects.component.scss
            ├── about/
            │   ├── about.component.ts
            │   ├── about.component.html
            │   └── about.component.scss
            ├── faq/
            │   ├── faq.component.ts
            │   ├── faq.component.html
            │   └── faq.component.scss
            └── contact/
                ├── contact.component.ts    # ReactiveFormsModule + POST a Web3Forms
                ├── contact.component.html
                └── contact.component.scss
```

---

## 📐 Secciones de la Web (Orden / Funnel)

| # | Sección | Componente | Objetivo |
|---|---|---|---|
| 1 | Hero | `HeroComponent` | Impacto visual inmediato + CTAs |
| 2 | Servicios | `ServicesComponent` | Mostrar las 3 líneas de negocio con pricing |
| 3 | Proyectos | `ProjectsComponent` | Casos de éxito: ReviLike, VeltiaTrust, Factusol |
| 4 | Sobre Mí | `AboutComponent` | Bio ejecutiva + foto + stack tecnológico |
| 5 | FAQ | `FaqComponent` | Despejar objeciones (precios, tiempos, metodología) |
| 6 | Contacto | `ContactComponent` | Formulario Web3Forms → email directo |

---

## 📬 Contacto sin VPS: Web3Forms

El formulario Angular usa `ReactiveFormsModule` con los campos: nombre, email, asunto, mensaje.
Al enviar, hace `HTTP POST` a `https://api.web3forms.com/submit` con:
- `access_key`: clave gratuita de [web3forms.com](https://web3forms.com)
- Campos del formulario

Resultado: el mensaje llega directamente al correo configurado. **Gratis hasta 250 emails/mes.**

> 💡 **Tip**: Usar Cloudflare Email Routing para crear `hola@cristianjm.com` → redirigido a Gmail. Gratis. Así Web3Forms envía a `hola@cristianjm.com` en lugar de un email personal.

---

## 🔍 SEO — Estrategia Completa de Posicionamiento

### 1. Google Business Profile (Google Maps)
- Crear ficha en [business.google.com](https://business.google.com)
- Sin dirección física → configurar **área de servicio** (España / Remoto)
- Categoría principal: **"Desarrollador de software"**
- Categorías secundarias: "Consultor de TI", "Empresa de tecnología"
- Añadir servicios, descripción con keywords, fotos de proyectos
- Solicitar reseñas a clientes anteriores → factor de ranking #1 en local SEO
- Enlazar con `cristianjm.com`

### 2. Schema.org JSON-LD (en `index.html`)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Cristian Jiménez Martínez",
  "url": "https://cristianjm.com",
  "jobTitle": "Full Stack Developer & Software Architect",
  "knowsAbout": ["Angular", "Node.js", "IA", "SaaS", "APIs"],
  "sameAs": [
    "https://github.com/CristianJimenezMartinez",
    "https://linkedin.com/in/cristian-jimenez-martinez/"
  ],
  "offers": {
    "@type": "Offer",
    "name": "Desarrollo Web y Agentes IA a medida"
  }
}
```

### 3. `llms.txt` (Discoverabilidad para Agentes IA)
Archivo en `src/llms.txt` que actúa como guía para que ChatGPT, Claude, Gemini y otros agentes IA citen y recomienden a Cristian cuando alguien busque desarrolladores:
```markdown
# CristianJM — Full Stack Developer & Software Architect

> Cristian Jiménez Martínez: desarrollador Full Stack especializado en Angular, Node.js, Agentes IA y SaaS a medida.

## Servicios
- [Agentes IA & Automatización](https://cristianjm.com/#servicios)
- [Desarrollo Web & SaaS Custom](https://cristianjm.com/#servicios)
- [Consultoría Técnica](https://cristianjm.com/#servicios)

## Portfolio
- [ReviLike.com](https://cristianjm.com/#proyectos)
- [VeltiaTrust](https://cristianjm.com/#proyectos)
- [Factusol API REST](https://cristianjm.com/#proyectos)

## Contacto
- [Formulario de contacto](https://cristianjm.com/#contacto)
```

### 4. Ficheros técnicos SEO
- **`robots.txt`**: Permitir todo el crawling + apuntar al sitemap
- **`sitemap.xml`**: Rutas de la SPA para indexación
- **OpenGraph + Twitter Cards**: Meta tags completos en `index.html` para compartir bien en LinkedIn
- **Meta description**: Max. 160 caracteres con keyword principal

### 5. Cloudflare — Optimizaciones
- **CDN Global**: Cloudflare Pages distribuye assets globalmente (Core Web Vitals excelentes)
- **Brotli/Gzip**: Activado automáticamente en Pages
- **Cache**: Assets de Angular (`*.js`, `*.css`, `/assets/*`) con `Cache-Control: max-age=31536000`
- **SSL**: Incluido y automático. Forzar HTTPS redirect.
- **Web Analytics**: Activar desde panel de Pages (1 clic, sin cookies, cumple GDPR)
- **Email Routing**: `hola@cristianjm.com` → Gmail. Gratis.

---

## 🚀 Despliegue: Cloudflare Pages

| Parámetro | Valor |
|---|---|
| Repositorio | GitHub: `cristianjm-web` |
| Build command | `npm run build` |
| Output directory | `dist/cristian-jimenez/browser` |
| Node.js version | `20.x` |
| Variable de entorno | `NODE_VERSION = 20` |

**Archivo `src/_redirects`** (declarado como asset en `angular.json`):
```
/* /index.html 200
```

---

## 📋 Check-list de Ejecución

### ☐ Fase 0 — Preparación (Manual por Cristian)
- [ ] Crear repositorio GitHub `cristianjm-web`
- [ ] Conectar repo con Cloudflare Pages
- [ ] Configurar Cloudflare Email Routing: `hola@cristianjm.com` → Gmail
- [ ] Registrarse en [web3forms.com](https://web3forms.com) → obtener `access_key`
- [ ] Crear/verificar Google Business Profile en [business.google.com](https://business.google.com)

### ☐ Fase 1 — Scaffolding Angular
```bash
cd d:\Proyectos\porfolio\cristianjm
ng new . --style=scss --routing=true --standalone=true --ssr=false
```
- [ ] Limpiar `app.component.html` → solo `<router-outlet>`
- [ ] Crear estructura de carpetas: `core/`, `shared/`, `features/`, `styles/`
- [ ] Añadir `_redirects`, `llms.txt`, `robots.txt` a `src/` y declarar como assets en `angular.json`

### ☐ Fase 2 — Sistema de Diseño SCSS
- [ ] `_variables.scss`: paleta Cyberpunk Dark, Google Fonts (Outfit + JetBrains Mono)
- [ ] `_glassmorphism.scss`: mixin `@mixin glass-card($blur, $opacity)`
- [ ] `_animations.scss`: `@keyframes fadeInUp`, `fadeInLeft`, `glow-pulse`
- [ ] `styles.scss`: imports + CSS reset + utilidades globales

### ☐ Fase 3 — Core (Modelos y Servicios)
- [ ] `project.model.ts` + `service.model.ts`
- [ ] `projects.service.ts` con `signal<Project[]>` y datos de los 3 proyectos
- [ ] `meta.service.ts` usando `Meta` y `Title` de `@angular/platform-browser`

### ☐ Fase 4 — Shared Components
- [ ] `NavbarComponent`: sticky, glassmorphism, scroll-spy para active link, menú hamburguesa responsive
- [ ] `FooterComponent`: links GitHub / LinkedIn / `hola@cristianjm.com`
- [ ] `ProjectCardComponent`: `@Input() project: Project`, hover 3D effect, link a demo

### ☐ Fase 5 — Features (en orden de la página)
- [ ] `HeroComponent`: H1 animado, subtítulo, CTA "Ver servicios" + "Contactar"
- [ ] `ServicesComponent`: 3 cards con icono SVG, título, descripción, pricing badge
- [ ] `ProjectsComponent`: grid de `ProjectCardComponent` con datos del servicio
- [ ] `AboutComponent`: foto + bio ejecutiva + badges de stack tecnológico
- [ ] `FaqComponent`: acordeón accesible con animación de apertura/cierre
- [ ] `ContactComponent`: formulario reactivo + POST a Web3Forms + feedback visual (éxito/error)

### ☐ Fase 6 — SEO & Ficheros Estáticos
- [ ] Schema.org JSON-LD en `index.html`
- [ ] Meta tags OpenGraph y Twitter Cards completos
- [ ] Poblar `llms.txt` con contenido real
- [ ] `robots.txt` + `sitemap.xml`

### ☐ Fase 7 — QA & Despliegue
- [ ] `ng build --configuration production` sin errores
- [ ] Lighthouse audit: objetivo ≥ 90 en Performance, SEO, Accessibility y Best Practices
- [ ] Push a GitHub → CI/CD en Cloudflare Pages
- [ ] Verificar dominio `cristianjm` + SSL activo
- [ ] Activar Cloudflare Web Analytics desde el panel
