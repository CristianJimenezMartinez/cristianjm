import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  readonly projects = signal<Project[]>([
    {
      id: 'bentian-erp-bridge',
      number: '01',
      slug: 'bentian-erp-bridge',
      sector: 'ERP Middleware & Local-First SaaS',
      title: 'Bentian ERP Bridge',
      tagline: 'Middleware y conector local-first en tiempo real para Factusol ERP y tiendas online (WooCommerce y PrestaShop).',
      badgeText: 'Producto Propio · SaaS en Producción',
      role: 'Fundador, Arquitecto de Software & Desarrollador Principal',
      year: '2025 – 2026',
      liveUrl: 'https://bridge.cristianjm.com/',
      metrics: '<100ms latencia OLEDB · Tolerancia Offline 30 días · 100% Cero puertos abiertos',
      metricsList: [
        { label: 'Latencia OLEDB', value: '< 100 ms' },
        { label: 'Tolerancia Offline', value: '30 Días' },
        { label: 'Seguridad Perimetral', value: '0 Puertos Abiertos' },
        { label: 'Criptografía', value: 'Ed25519 (RFC 8032)' }
      ],
      problem: 'Las pymes y distribuidores que gestionan su facturación y almacén en Factusol sufren roturas continuas de existencias entre tienda física y web, picado manual de albaranes y bloqueos concurrentes de archivo (.ldb/.laccdb) al intentar conectar Access a internet.',
      challenge: 'Exponer o consultar una base de datos Microsoft Access (.accdb) compartida en red local sin bloquear a los usuarios administrativos que facturan en la oficina, garantizando la inalterabilidad requerida por la Ley Antifraude y el reglamento Veri*Factu.',
      solution: 'Arquitectura Local-First con agente residente Windows x64 en Node.js/TypeScript y C# nativo. Implementa un motor OLEDB de lectura no bloqueante (Share Deny None), una cola SQLite (WAL) Store-and-Forward que custodia pedidos ante cortes de fibra y una sincronización punto a punto con WooCommerce REST API y PrestaShop cifrada con TLS 1.3.',
      description: 'Conector de escritorio Windows x64 desarrollado con Node.js/TypeScript y C#, arquitectura Local-First, motor OLEDB de ultra-baja latencia sobre Access (.accdb) y sincronización continua con WooCommerce REST API y PrestaShop.',
      fullDescription: 'Bentian ERP Bridge es una infraestructura empresarial puente de alta resiliencia diseñada para Factusol ERP, WooCommerce y PrestaShop. Incluye servicio de escritorio en segundo plano, portal SaaS, cola SQLite offline, deadman switch de monitorización, tolerancia a caídas de red y transacciones atómicas sobre OLEDB.',
      pillars: [
        {
          icon: 'database',
          title: 'Motor OLEDB Concurrente',
          description: 'Lectura compartida directa y no bloqueante sobre bases de datos Access (.accdb) de Factusol en red LAN/SMB/NAS sin colisiones con los usuarios de facturación.'
        },
        {
          icon: 'shield-check',
          title: 'Store-and-Forward (30 Días)',
          description: 'Cola transaccional en SQLite local (modo WAL). Los pedidos web permanecen retenidos y protegidos aunque el PC esté apagado o se corte la fibra, inyectándose al reiniciar.'
        },
        {
          icon: 'refresh-cw',
          title: 'Sincronización Bidireccional',
          description: 'Cálculo de Stock Disponible real (DISSTO = ACTSTO - RESCLI - PENENT), actualización de tarifas 1 a 5 e inyección atómica de pedidos en F_PCL y F_LPC con serie contable.'
        },
        {
          icon: 'lock',
          title: 'Zero-Exposure & Veri*Factu',
          description: 'Conexión punto a punto mediante HTTPS saliente sin abrir puertos en el router, firmas asimétricas Ed25519 y delegación legal en el motor certificado de Factusol.'
        }
      ],
      keyFeatures: [
        'Lectura OLEDB de alta velocidad sobre Microsoft Access (.accdb) versiones 2018 a 2026.',
        'Prevención de sobreventas mediante cálculo de stock disponible dinámico (DISSTO).',
        'Inyección atómica de pedidos web con desglose contable de bases, IVA y recargo de equivalencia.',
        'Soporte nativo para High-Performance Order Storage (HPOS) en WooCommerce y PrestaShop.',
        'Catálogo de 22 reglas de resolución de incidencias con deep-linking directo en la GUI del agente.',
        'Selector nativo de Windows (OpenFileDialog) en hilo STA y ventana desacoplada en modo Microsoft Edge App.',
        'Sistema de actualización silenciosa atómica (UpdateSwapper) con verificación anti-TOCTOU y rollback.'
      ],
      architectureDetails: [
        'Agente local en Node.js 22 LTS empaquetado como binario x64 de Windows.',
        'Conector Factusol OLEDB desacoplado con llamadas COM/OLEDB sobre Microsoft Access Database Engine.',
        'Buffer local transaccional SQLite con modo WAL para tolerancia absoluta a fallos de alimentación.',
        'API Central en NestJS con PostgreSQL multi-tenant y distribución de releases seguras en Hetzner Cloud.'
      ],
      stack: ['TypeScript', 'Node.js', 'C#', 'Factusol OLEDB', 'Access (.accdb)', 'SQLite (WAL)', 'WooCommerce REST API', 'PrestaShop', 'PostgreSQL', 'Docker', 'Ed25519']
    },
    {
      id: 'suministros-rubio',
      number: '02',
      slug: 'suministros-rubio',
      sector: 'Suministros Industriales & B2B',
      title: 'Suministros Rubio — Sincronizador ERP',
      tagline: 'Automatización integral de catálogo mayorista (+5.000 SKUs), tarifas multiescalón y pedidos web en producción real.',
      badgeText: 'Caso de Producción Real',
      role: 'Arquitecto de Solución e Integrador de Sistemas',
      year: '2024 – 2026',
      liveUrl: 'https://bridge.cristianjm.com/casos-de-exito/suministros-rubio/',
      externalUrl: 'https://www.suministrosrubio.com/',
      metrics: '+5.000 SKUs sincronizados · 0 picado manual · 100% Cero errores de stock',
      metricsList: [
        { label: 'Catálogo Sincronizado', value: '+5.000 SKUs' },
        { label: 'Picado Manual', value: '0 Albaranes' },
        { label: 'Tiempo de Despacho', value: '< 1 Segundo' },
        { label: 'Precisión de Stock', value: '100% Exacto' }
      ],
      problem: 'Suministros Rubio, referente en distribución de suministros industriales, ferretería y maquinaria técnica, gestionaba más de 5.000 referencias con constantes fluctuaciones de precios y stock. El volcado manual de pedidos web demoraba horas diarias y provocaba roturas de inventario.',
      challenge: 'Unificar la base de datos de Factusol ubicada en la red local de la empresa con una tienda web a medida en hosting Plesk, manteniendo actualizadas las existencias reales y registrando los pedidos online al instante.',
      solution: 'Despliegue en producción de un conector automatizado basado en Bentian ERP Bridge, enlazando Factusol con un endpoint PHP privado con tokens HMAC. Detección automática de altas y modificaciones de artículos, volcado de tarifas mayoristas e inyección desatendida de pedidos en las tablas maestras F_PCL y F_LPC.',
      description: 'Despliegue en producción de sincronización desatendida entre Factusol local y tienda web B2B. Reducción al 100% del picado manual de pedidos y actualización de existencias en segundos.',
      fullDescription: 'Canal privado de sincronización ERP para ferretería técnica industrial. Incluye inyección atómica de pedidos en F_PCL, cálculo de existencias netas y control de recargo de equivalencia para clientes profesionales.',
      pillars: [
        {
          icon: 'layers',
          title: '+5.000 Artículos Sincronizados',
          description: 'Mapeo continuo de familias, descripciones técnicas, unidades de embalaje y estado comercial desde Factusol hacia la tienda web.'
        },
        {
          icon: 'trending-up',
          title: 'Tarifas Mayoristas Dinámicas',
          description: 'Sincronización desglosada de tarifas de precios 1 a 5, permitiendo mostrar condiciones especiales según el tipo de cliente B2B o particular.'
        },
        {
          icon: 'check-circle',
          title: 'Cero Picado Manual de Pedidos',
          description: 'Cada compra web genera automáticamente el pedido en la Serie 1 de Factusol con sus líneas, bases imponibles e impuestos perfectamente cuadrados.'
        },
        {
          icon: 'shield',
          title: 'Persistencia y Anti-Wiping',
          description: 'Preservación blindada de rutas de red locales en %APPDATA% ante caídas de la infraestructura del servidor de almacén.'
        }
      ],
      keyFeatures: [
        'Sincronización en segundo plano de más de 5.000 artículos industriales y herramientas.',
        'Mapeo de existencias disponibles (DISSTO) descontando reservas pendientes de entrega.',
        'Inyección de pedidos web en F_PCL con asignación de ficha de cliente online.',
        'Gestión fiscal de IVA general (21%), reducido y Recargo de Equivalencia (5,2%).',
        'Tolerancia a microcortes de red LAN en la nave industrial sin pérdida de registros.'
      ],
      architectureDetails: [
        'Conector Windows en ejecución local como servicio desatendido.',
        'Driver OLEDB ACE.OLEDB.12/16 para lectura atómica de Access (.accdb).',
        'Canal HTTPS seguro hacia el endpoint del servidor Plesk con autenticación por token seguro.',
        'Base de datos web en MariaDB con índices optimizados para catálogo de alto volumen.'
      ],
      stack: ['Factusol OLEDB', 'Access (.accdb)', 'PHP Bridge', 'MariaDB', 'Plesk', 'Windows Service', 'TypeScript']
    },
    {
      id: 'praedium-fundus',
      number: '03',
      slug: 'praedium-fundus',
      sector: 'Banca de Inversión Inmobiliaria & Activos Adjudicados',
      title: 'Praedium Fundus',
      tagline: 'Plataforma de activos inmobiliarios adjudicados, deuda bancaria NPL y suelo finalista en Alicante y Elche.',
      badgeText: 'Plataforma en Producción',
      role: 'Arquitecto Frontend & Consultor de Plataforma',
      year: '2025 – 2026',
      liveUrl: 'https://praediumfundus.es/',
      metrics: 'Angular 21 SSG · Descuentos 30%-60% sobre tasación ECO · Club Off-Market',
      metricsList: [
        { label: 'Versión Angular', value: 'Angular 21 SSG' },
        { label: 'Descuento Medio', value: '30% – 60%' },
        { label: 'Especialización', value: 'Alicante / Elche' },
        { label: 'Tiempo de Carga', value: '< 250 ms' }
      ],
      problem: 'El acceso a adjudicaciones judiciales bancarias, carteras de deuda con garantía hipotecaria (NPLs) y suelo industrial en la Comunidad Valenciana está dominado por procesos lentos y poca transparencia técnica para inversores privados.',
      challenge: 'Diseñar una plataforma de alta gama que combine velocidad de carga instantánea (SSG), posicionamiento en buscadores para activos singulares y un embudo de captación seguro para family offices e inversores cualificados.',
      solution: 'Plataforma desarrollada en Angular 21 con generación estática (SSG/Prerender), tipografía editorial de lujo (Playfair Display + Inter) y paleta esmeralda/oro. Estructurada en 5 áreas de negocio: activos bancarios adjudicados, suelo residencial finalista, naves logísticas en corredores A-7/A-31, proindivisos y Club de Inversores Privados.',
      description: 'Plataforma web de activos inmobiliarios adjudicados, deuda bancaria NPL y suelo finalista en Alicante y Elche desarrollada con Angular 21 SSG y diseño editorial de lujo.',
      fullDescription: 'Plataforma de inversión inmobiliaria y brokerage de activos singulares. Incluye catálogo estructurado de oportunidades bancarias, suelo terciario en corredores estratégicos, resolución patrimonial de herencias y área de inversores.',
      pillars: [
        {
          icon: 'home',
          title: 'Activos Adjudicados y Subastas',
          description: 'Gestión directa de expedientes de deuda hipotecaria y adjudicaciones judiciales de entidades financieras con importantes márgenes.'
        },
        {
          icon: 'map-pin',
          title: 'Suelo Residencial y Logístico',
          description: 'Promoción finalista y naves industriales en las arterias logísticas clave de Alicante, Elche Parque Empresarial y la Vega Baja.'
        },
        {
          icon: 'users',
          title: 'Club de Inversores Off-Market',
          description: 'Canal prioritario de acceso a lotes confidenciales y carteras bancarias con descuentos del 30% al 60% sobre tasación oficial ECO.'
        },
        {
          icon: 'file-text',
          title: 'Gestión Patrimonial y Proindivisos',
          description: 'Resolución de herencias complejas, liquidación amistosa de proindivisos y pactos de socios para desbloquear suelo paralizado.'
        }
      ],
      keyFeatures: [
        'Arquitectura Angular 21 con Server-Side Generation / Prerenderizado instantáneo.',
        'Embudos de cualificación de capacidad inversora orientados a family offices.',
        'Diseño corporativo de alta gama adaptado al sector de banca privada e inversión.',
        'Estructura de metadatos Schema.org (RealEstateAgent, OfferCatalog) para posicionamiento.',
        'Alojamiento optimizado con CDN global y entrega estática con latencias subsegundo.'
      ],
      architectureDetails: [
        'Frontend en Angular 21 Standalone Components con sistema de compilación @angular/build.',
        'Prerenderizado de rutas estáticas a ficheros HTML listos para rastreo por Googlebot.',
        'CSS modular con diseño adaptativo y paleta cromática sobria esmeralda/oro.',
        'Despliegue distribuido en Cloudflare Pages con caché perimetral mundial.'
      ],
      stack: ['Angular 21', 'TypeScript', 'SSG / Prerender', 'Tailwind CSS', 'Schema.org', 'Cloudflare Pages']
    },
    {
      id: 'organi-soto',
      number: '04',
      slug: 'organi-soto',
      sector: 'Inteligencia Documental & LegalTech Fiscal',
      title: 'OrganiSoto — Motor Contable Autónomo con IA',
      tagline: 'Servicio nativo en Go para digitalización masiva, corte inteligente de fajos y auditoría fiscal con Gemini Flash Vision.',
      badgeText: 'Ingeniería de Sistemas · Go & IA',
      role: 'Arquitecto de Sistemas & Desarrollador Backend Go',
      year: '2026',
      liveUrl: 'https://gruposoto.es/',
      metrics: '4 seg/factura (vs 3 min manual) · -70% tiempo contable · 100% Aritmética AEAT',
      metricsList: [
        { label: 'Tiempo por Factura', value: '4 Segundos' },
        { label: 'Ahorro Operativo', value: '-70% Tiempo' },
        { label: 'Validación Fiscal', value: '100% Art. 97 LIVA' },
        { label: 'Arquitectura', value: 'Go Puro (CGO=0)' }
      ],
      problem: 'En asesorías fiscales y departamentos contables, el picado manual de facturas y tiques durante los cierres de trimestre colapsa a los equipos (3 minutos por factura). Además, las fotocopiadoras multifunción fallan al enviar escaneos por el bloqueo de SMBv1/v2 en Windows.',
      challenge: 'Construir un software desatendido en el servidor local de la asesoría que reciba escaneos masivos de fotocopiadoras antiguas, separe automáticamente los documentos mezclados y extraiga los datos contables con precisión matemática de la AEAT.',
      solution: 'Servicio nativo de Windows programado en Go puro (CGO_ENABLED=0), con mini-servidor FTP embebido en puerto 21 para escaneo directo, corte inteligente de fajos (ADF) con Google Gemini Flash Vision y validación estricta de la Ley del IVA (Art. 97 LIVA). Incluye helper de bypass de Sesión 0 para automatizar Microsoft Outlook y exportadores a A3 (SUENLACE.DAT), Contasol y Sage 50.',
      description: 'Servicio nativo en Go para digitalización, corte inteligente de fajos y auditoría fiscal con Gemini Flash Vision.',
      fullDescription: 'Motor empresarial de contabilidad autónoma para despachos profesionales (CNAE 6920). Procesa fajos escaneados, extrae campos fiscales con IA multimodal, valida la aritmética AEAT y genera asientos contables en segundos.',
      pillars: [
        {
          icon: 'server',
          title: 'Servidor FTP Embebido en Go',
          description: 'Resuelve el bloqueo de SMBv1/v2 en Windows permitiendo a fotocopiadoras Canon, Ricoh y Brother escanear directamente por FTP en puerto 21.'
        },
        {
          icon: 'scissors',
          title: 'Corte Inteligente ADF con IA',
          description: 'Gemini Flash Vision analiza visualmente fajos multipágina, detecta los saltos entre facturas y fragmenta el PDF en documentos independientes.'
        },
        {
          icon: 'check-square',
          title: 'Auditoría Fiscal Art. 97 LIVA',
          description: 'Comprobación matemática (Base + IVA - IRPF = Total). Detecta tiques simplificados sin NIF y desactiva el IVA deducible en Modelo 303.'
        },
        {
          icon: 'external-link',
          title: 'Bypass Sesión 0 para Outlook',
          description: 'Esquema URI personalizado que permite al servicio de Windows abrir borradores de Outlook en la pantalla del usuario sin bloqueos de sesión.'
        }
      ],
      keyFeatures: [
        'Binario único compilado en Go sin dependencias externas ni runtime pesado.',
        'Modo Ráfaga de validación por teclado que despacha facturas en menos de 4 segundos.',
        'Exportación nativa de asientos a Wolters Kluwer A3 (SUENLACE.DAT), Contasol y Sage 50.',
        'Medición de consumo y facturación de documentos firmada con HMAC-SHA256.',
        'Túnel efímero Cloudflare Zero Trust para soporte asistido remoto con 0 MB en reposo.',
        'Watchdog OTA con comprobación SHA-256 y rollback automático a versión anterior si falla el healthcheck.'
      ],
      architectureDetails: [
        'Servicio de Windows programado en Go estándar (`golang.org/x/sys/windows`).',
        'Integración REST multimodal con Gemini API para procesamiento visual de alta velocidad.',
        'Persistencia local en base de datos transaccional con índices de consulta por trimestre.',
        'Helper interactivo C#/Go en espacio de usuario para integración de escritorio con Microsoft Office.'
      ],
      stack: ['Go (Golang)', 'Windows Service API', 'Google Gemini Vision', 'FTP Protocol', 'AES-256', 'A3 / Contasol', 'HMAC-SHA256']
    },
    {
      id: 'sototime',
      number: '05',
      slug: 'sototime',
      sector: 'LegalTech & Registro Laboral Criptográfico',
      title: 'SotoTime — Control Horario Inmutable y Veri*Factu',
      tagline: 'Plataforma SaaS multi-tenant para cumplimiento estricto del registro laboral con ledger criptográfico y firma electrónica FNMT.',
      badgeText: 'SaaS B2B Multi-Tenant',
      role: 'Arquitecto Cloud & Desarrollador Full-Stack',
      year: '2025 – 2026',
      liveUrl: 'https://time.gruposoto.es/',
      metrics: 'Art. 34.9 y 36 ET · Ledger SHA-256 encadenado · Certificados FNMT AES-256-GCM',
      metricsList: [
        { label: 'Marco Legal', value: 'Art. 34.9 ET' },
        { label: 'Inmutabilidad', value: 'Ledger SHA-256' },
        { label: 'Certificados', value: 'FNMT (AES-256-GCM)' },
        { label: 'Normalización', value: 'RFC 8785 JSON' }
      ],
      problem: 'Las sanciones de la Inspección de Trabajo (ITSS) por alteración de fichajes son severas. Las soluciones convencionales utilizan bases de datos editables sin trazabilidad criptográfica, generando inseguridad jurídica ante auditorías laborales.',
      challenge: 'Crear una plataforma multi-tenant que garantice la inmutabilidad matemática absoluta de cada fichaje, calcule automáticamente horas nocturnas (Art. 36 ET) y permita fichar en tablets de centros de trabajo sin contraseñas engorrosas.',
      solution: 'SaaS desarrollado con NestJS 11, Prisma v7 y PostgreSQL, con frontend en Angular PWA y modo Quiosco táctil. Cada marcaje se encadena en un ledger criptográfico inmutable mediante hashes SHA-256 normalizados bajo RFC 8785 (estilo blockchain / Veri*Factu). Incorpora custodia de certificados FNMT-RCM cifrados con AES-256-GCM para la firma desatendida de actas oficiales mensuales en PDF.',
      description: 'Plataforma SaaS multi-tenant para control horario con ledger criptográfico y firma electrónica de actas oficiales.',
      fullDescription: 'Sistema integral de registro laboral conforme al Art. 34.9 del Estatuto de los Trabajadores y Criterio 101/2019 de la ITSS. Incluye bolsa de horas, cálculo de nocturnidad, modo quiosco tablet con PIN/RFID y ledger verificable.',
      pillars: [
        {
          icon: 'link-2',
          title: 'Ledger Criptográfico SHA-256',
          description: 'Cada evento de fichaje incluye número de secuencia, hash anterior y hash actual normalizado con RFC 8785, impidiendo cualquier manipulación retroactiva.'
        },
        {
          icon: 'moon',
          title: 'Cómputo Automático Nocturno',
          description: 'Clasificación precisa de horas entre las 22:00 y las 06:00 según el Art. 36 ET, pausas computables y balance dinámico de bolsa de horas.'
        },
        {
          icon: 'tablet',
          title: 'Modo Quiosco Tablet (Kiosk)',
          description: 'Terminal de fichaje para recepción o taller con soporte de PIN de 4 dígitos o lectura de tarjetas de proximidad RFID mediante KioskToken seguro.'
        },
        {
          icon: 'file-check',
          title: 'Custodia FNMT Cifrada (AES-GCM)',
          description: 'Firma digital de actas mensuales de inspección con certificados FNMT-RCM de empresa almacenados cifrados con AES-256-GCM.'
        }
      ],
      keyFeatures: [
        'Encadenamiento matemático de eventos de fichaje con inmutabilidad probatoria.',
        'PWA móvil para empleados con geolocalización lícita (Art. 90 LOPDGDD).',
        'Gestión de ausencias, vacaciones y bajas IT protegiendo datos médicos (RD 1060/2022).',
        'Circuito de corrección "No-Blame" para olvidos de marcaje con aprobación de RRHH.',
        'Generación de informes oficiales en PDF listos para remitir a la Inspección de Trabajo.'
      ],
      architectureDetails: [
        'Backend NestJS 11 modular con DTOs validados bajo Zero-Trust.',
        'Prisma ORM v7 sobre PostgreSQL 16 con índices compuestos de auditoría.',
        'Frontend Angular PWA con arquitectura atómica reactiva sobre Angular Signals.',
        'Pasarela de cobro de suscripciones multi-tenant con Stripe Connect.'
      ],
      stack: ['NestJS 11', 'Prisma v7', 'PostgreSQL', 'Angular PWA', 'RFC 8785', 'SHA-256 Chained', 'AES-256-GCM', 'Stripe Connect']
    },
    {
      id: 'grupo-soto-holding',
      number: '06',
      slug: 'grupo-soto-holding',
      sector: 'Arquitectura Cloud & DevOps Empresarial',
      title: 'Grupo Soto — Infraestructura Cloud & Monorepo',
      tagline: 'Diseño y despliegue del ecosistema tecnológico central: VPS IONOS, Nginx Hardened, PM2, NestJS y Angular SSR.',
      badgeText: 'Infraestructura Central en Producción',
      role: 'Arquitecto Cloud & DevOps',
      year: '2025 – 2026',
      liveUrl: 'https://gruposoto.es/',
      metrics: '99.9% Uptime · Nginx Hardened · Zero-Downtime CI/CD en VPS 4 GB RAM',
      metricsList: [
        { label: 'Disponibilidad', value: '99.9% Uptime' },
        { label: 'Ahorro Servidores', value: '-70% Costes' },
        { label: 'Seguridad Nginx', value: 'TLS 1.3 + HSTS' },
        { label: 'Sanitización SEO', value: '410 Gone Legacy' }
      ],
      problem: 'Un holding multisectorial (transporte, reciclaje, automoción, cerramientos y bienestar) operaba con webs dispersas, hosting compartido de WordPress lento y altos costes fijos.',
      challenge: 'Consolidar todas las plataformas bajo un único servidor VPS económico de 4 GB de RAM de IONOS, evitando que compilaciones pesadas provoquen caídas por Out-Of-Memory (OOM) y purgando el SEO residual de WordPress.',
      solution: 'Arquitectura en capas de alto rendimiento: Nginx Hardened como proxy inverso con TLS 1.3, rate limiting y reglas 410 Gone para purgar URLs viejas; PM2 para orquestación de procesos; NestJS 11 y PostgreSQL 16 en backend; y Angular Workspace Monorepo con Server-Side Rendering (SSR). La compilación se delegó a runners de GitHub Actions (16 GB RAM), asegurando despliegues atómicos sin caídas con rsync.',
      description: 'Diseño y despliegue del ecosistema tecnológico central: VPS IONOS, Nginx, PM2, NestJS y Angular SSR.',
      fullDescription: 'Infraestructura cloud integral y gobernanza técnica para Grupo Soto. Unifica la presencia digital del holding, el backend transaccional y la persistencia de datos bajo estándares de alta seguridad.',
      pillars: [
        {
          icon: 'shield',
          title: 'Nginx Hardened & SEO 410',
          description: 'Cifrado TLS 1.3, HSTS estricto, protección DDoS y reglas nativas 410 Gone que eliminan del índice de Google rutas residuales de WordPress.'
        },
        {
          icon: 'cpu',
          title: 'Pipeline CI/CD con Compilación Externa',
          description: 'La compilación pesada de Angular SSR y NestJS corre en GitHub Actions (16 GB RAM), protegiendo la memoria del VPS de producción.'
        },
        {
          icon: 'server',
          title: 'Orquestación de Procesos PM2',
          description: 'Supervisión en modo cluster de aplicaciones Node.js con auto-reinicio suave ante consumos superiores a 1 GB y rotación de logs.'
        },
        {
          icon: 'database',
          title: 'PostgreSQL 16 Multi-Schema',
          description: 'Motor relacional confinado en interfaz local con esquemas modulares en Prisma v7 y directivas de seguridad Least Privilege.'
        }
      ],
      keyFeatures: [
        'Despliegue unificado de 4 portales web y 3 microservicios en un único VPS.',
        'Compresión dinámica Gzip/Brotli y cabeceras de seguridad HTTP completas.',
        'Angular Workspace Monorepo con librería compartida (`shared-lib`) para tipos y componentes.',
        'Zero-Downtime Reload mediante scripts automatizados en integración continua.',
        'Monitoreo centralizado de salud de servicios en `/api/v1/health`.'
      ],
      architectureDetails: [
        'Servidor VPS en IONOS corriendo Ubuntu 24.04 LTS y Node.js 22 LTS.',
        'Proxy Inverso Nginx 1.24 con Certbot SSL para renovación automatizada de certificados.',
        'Base de datos PostgreSQL 16 con usuario restringido y copias de seguridad con pg_dump.',
        'Workflows de GitHub Actions configurados con secrets SSH y despliegue idempotente.'
      ],
      stack: ['Ubuntu 24.04 LTS', 'Nginx Hardened', 'PM2 Cluster', 'NestJS 11', 'Prisma v7', 'PostgreSQL 16', 'Angular SSR', 'GitHub Actions']
    },
    {
      id: 'serenity-wellness',
      number: '07',
      slug: 'serenity-wellness',
      sector: 'Salud, Pilates Boutique & Omnicanalidad',
      title: 'Serenity Wellness Center',
      tagline: 'Ecosistema omnicanal de reservas en tiempo real, app móvil nativa y TPV físico para centro boutique de Pilates.',
      badgeText: 'Web SSR + App Android Google Play',
      role: 'Arquitecto de Software & Desarrollador Full-Stack',
      year: '2025 – 2026',
      liveUrl: 'https://serenitywellnesscenter.es/',
      metrics: 'Aforo 7 camas Reformer · App Android Nativa · TPV Mostrador con Arqueo Ciego',
      metricsList: [
        { label: 'Control de Aforo', value: '7 Camas Nominales' },
        { label: 'Omnicanalidad', value: 'Web + Android + TPV' },
        { label: 'Conciliación Caja', value: 'Arqueo Ciego Z' },
        { label: 'Pasarela Pagos', value: 'Stripe SDK v22' }
      ],
      problem: 'Un estudio boutique de Pilates Reformer con aforo estricto de 7 camas exclusivas sufría sobreventas, cancelaciones desordenadas por WhatsApp y descuadres frecuentes en el dinero en efectivo de recepción.',
      challenge: 'Construir una solución omnicanal (web para captación SEO, app móvil nativa en Google Play para socios y TPV de mostrador para recepción) con conciliación matemática estricta de cobros.',
      solution: 'Ecosistema desarrollado con Angular SSR para web pública, empaquetado nativo Android con Capacitor 8.5 para Google Play, backend en NestJS y Stripe. Cuenta con motor de reservas nominal por cama (1 a 7), venta de bonos con caducidad, mostrador TPV físico e impresión térmica, y arqueo de caja ciego ("Cierre Z") que exige contar el dinero físico sin conocer el saldo teórico para evitar descuadres.',
      description: 'Ecosistema omnicanal de reservas en tiempo real, app móvil nativa y TPV físico para centro boutique de Pilates.',
      fullDescription: 'Plataforma para SERENITY PILATES GROUP SL. Integra portal web de alta conversión, app nativa Android, TPV de mostrador y facturación desatendida con Stripe.',
      pillars: [
        {
          icon: 'calendar',
          title: 'Reserva Nominal por Cama Reformer',
          description: 'Asignación visual de cama (1 a 7) e instructor en tiempo real con política de cancelación automática y devolución de sesión.'
        },
        {
          icon: 'smartphone',
          title: 'App Android Nativa en Google Play',
          description: 'Publicada en Google Play con Capacitor 8.5 (`es.serenitywellnesscenter.app`) con acceso al portal de facturación de Stripe.'
        },
        {
          icon: 'shopping-cart',
          title: 'Mostrador TPV Físico en Recepción',
          description: 'Cobro rápido de bonos y productos boutique con desglose de métodos (efectivo, tarjeta, Bizum) e impresión térmica estándar de 80 mm.'
        },
        {
          icon: 'lock',
          title: 'Arqueo de Caja Ciego ("Cierre Z")',
          description: 'El personal cuenta el efectivo físico sin conocer la previsión del sistema, auditando automáticamente cualquier descuadre contable.'
        }
      ],
      keyFeatures: [
        'Reserva online 24/7 con selección de máquina y control automático de aforo.',
        'Integración oficial de Stripe Checkout y Customer Billing Portal para descargas de facturas.',
        'CRM de alumnos con ficha de patologías, historial de asistencia y saldo de bonos.',
        'Sistema de diseño propio Lujo Boutique 2026 con paleta verde bosque y oro champagne.',
        'Webhooks de Stripe validados mediante verificación de firma criptográfica HMAC en raw body.'
      ],
      architectureDetails: [
        'Frontend Angular 17 Standalone Components con SSR y nuevo control flow (@if, @for).',
        'Capa móvil multiplataforma desarrollada con Capacitor 8.5 para Android.',
        'Backend NestJS con módulos desacoplados y Prisma ORM sobre PostgreSQL.',
        'Despliegue bajo PM2 en VPS con proxy Nginx y certificado SSL Let\'s Encrypt.'
      ],
      stack: ['Angular 17 SSR', 'Capacitor 8.5 (Android)', 'NestJS 11', 'Prisma v7', 'PostgreSQL', 'Stripe SDK v22', 'Google Play']
    },
    {
      id: 'poseidon-flow',
      number: '08',
      slug: 'poseidon-flow',
      sector: 'Automoción, Detailing & IoT Operativo',
      title: 'PoseidonFlow — Automatización de Lavaderos y CTI',
      tagline: 'Plataforma de gestión de pistas de lavado, WebSockets bidireccionales y telefonía CTI a coste cero.',
      badgeText: 'Tiempo Real · WebSockets & Angular 21',
      role: 'Arquitecto de Solución & Desarrollador Full-Stack',
      year: '2026',
      liveUrl: 'https://lavaderos.gruposoto.es/',
      metrics: 'CTI 0 €/mes · <200ms detección de llamada · Balanceo de colas multi-centro',
      metricsList: [
        { label: 'Coste CTI Mensual', value: '0 € / Mes' },
        { label: 'Latencia Pantalla', value: '< 200 ms' },
        { label: 'Versión Angular', value: 'Angular 21 Signals' },
        { label: 'Sincronización', value: 'WebSockets Bidireccionales' }
      ],
      problem: 'Una red de centros de lavado y detailing (Alcantarilla y Molina) sufría saturación en una sede mientras la otra tenía boxes libres. Además, los operarios en pista no podían atender el teléfono con las manos mojadas y las centralitas CTI de operadoras eran prohibitivas.',
      challenge: 'Conectar las llamadas entrantes a los móviles de las sedes con las pantallas táctiles del mostrador en menos de 200 ms sin incurrir en cuotas telefónicas mensuales, permitiendo desviar vehículos de una sede a otra.',
      solution: 'Desarrollo en la versión de vanguardia Angular 21 (Signals) y NestJS con WebSockets (Socket.io). Creación de un sistema de telefonía CTI a coste cero: terminales Android envían webhooks HTTP en el instante en que suena el teléfono; el backend localiza al cliente y emite un evento WebSocket hacia la sala de la sede específica, abriendo un modal con nombre, vehículo, matrícula y notas VIP antes de descolgar.',
      description: 'Plataforma de gestión de pistas de lavado, WebSockets bidireccionales y telefonía CTI a coste cero.',
      fullDescription: 'Sistema operativo para centros de lavado del automóvil. Integra CTI telefónico a coste cero, control de turnos en pista kanban, balanceo de carga inter-sedes y cobro TPV segregado por serie fiscal.',
      pillars: [
        {
          icon: 'phone-incoming',
          title: 'CTI Telefónico a Coste Cero',
          description: 'Webhooks HTTP desde móviles Android hacia NestJS. La pantalla del mostrador se ilumina con la ficha del cliente en <200 ms antes de atender.'
        },
        {
          icon: 'zap',
          title: 'WebSockets con Salas Segmentadas',
          description: 'Las llamadas a la sede de Alcantarilla solo suenan en las pantallas de Alcantarilla, disponiendo la gerencia de una vista global en vivo.'
        },
        {
          icon: 'shuffle',
          title: 'Balanceo de Carga Inter-Sedes',
          description: 'Si una sede se colapsa con 4 vehículos en espera, el encargado puede reasignar el ticket a la otra sede con un solo clic.'
        },
        {
          icon: 'columns',
          title: 'Tablero Operativo de Pistas',
          description: 'Seguimiento kanban del lavado (Pendiente, En Proceso, Listo, Entregado) con código QR para que el cliente consulte el estado desde su móvil.'
        }
      ],
      keyFeatures: [
        'Popup de llamada entrante con expediente del cliente, matrícula y notas VIP.',
        'Emisión de tickets de resguardo en PDF térmico con código QR de seguimiento.',
        'Cobro en mostrador segregado por serie fiscal según la sede física.',
        'Sintetizador acústico de aviso en mostrador mediante Web Audio API.',
        'Base de datos desacoplada en PostgreSQL lista para escalar a nuevas franquicias.'
      ],
      architectureDetails: [
        'Frontend desarrollado con Angular 21 y cliente Socket.io para reactividad pura.',
        'Backend NestJS 11 con gateway WebSocket (`@nestjs/websockets`) y validación JWT.',
        'PostgreSQL administrado mediante Prisma v7 con esquemas relacionales optimizados.',
        'Integración de telefonía móvil mediante automatización de webhooks en terminales Android.'
      ],
      stack: ['Angular 21', 'TypeScript', 'NestJS 11', 'WebSockets / Socket.io', 'PostgreSQL', 'Android Webhooks', 'PDFKit']
    },
    {
      id: 'nova-ventanas',
      number: '09',
      slug: 'nova-ventanas',
      sector: 'Eficiencia Energética & Construcción Passivhaus',
      title: 'Nova Ventanas y Puertas',
      tagline: 'Showroom interactivo de carpintería técnica en PVC/Aluminio y cálculo de subvenciones Next Generation EU.',
      badgeText: 'Showroom Digital & Cotizador NextGen',
      role: 'Arquitecto Frontend & Diseñador de Producto',
      year: '2025 – 2026',
      liveUrl: 'https://novaventanasypuertas.com/',
      metrics: 'Passivhaus Uw=0.72 W/m²K · Atenuación -48dB · Cotizador Express WhatsApp',
      metricsList: [
        { label: 'Aislamiento Térmico', value: 'Uw = 0.72 W/m²K' },
        { label: 'Aislamiento Acústico', value: 'Hasta -48 dB' },
        { label: 'Subvenciones', value: 'NextGen EU 40-60%' },
        { label: 'Velocidad Carga', value: '< 350 ms TTFB' }
      ],
      problem: 'La venta de cerramientos de altas prestaciones sufre por presupuestos lentos, tecnicismos confusos sobre transmitancias ($U_w$) y el desconocimiento de los propietarios sobre cómo solicitar las ayudas europeas NextGen (hasta 40-60% de subvención).',
      challenge: 'Construir un showroom digital premium que eduque al cliente sobre el estándar Passivhaus y convierta visitantes en prospectos comerciales cualificados en caliente.',
      solution: 'Plataforma desarrollada en Angular 17 Standalone con Angular Signals nativos y sistema de diseño propio con modo claro/oscuro. Incorpora un cotizador express guiado en 3 pasos que calcula estimaciones técnicas y genera un enlace pre-formateado hacia WhatsApp Business API para cerrar la cita de medición sin esperas.',
      description: 'Showroom interactivo de carpintería técnica en PVC/Aluminio y cálculo de subvenciones Next Generation EU.',
      fullDescription: 'Showroom digital de carpintería técnica de altas prestaciones. Incluye vitrina de cerramientos Passivhaus, comparador visual de aislamiento, cotizador en 3 pasos y asesoría NextGen EU.',
      pillars: [
        {
          icon: 'sliders',
          title: 'Cotizador Express en 3 Pasos',
          description: 'Asistente interactivo guiado (Tipo -> Material/Medidas -> Ubicación) que pre-calcula el ahorro y conecta al cliente directo por WhatsApp.'
        },
        {
          icon: 'sun',
          title: 'Eficiencia Passivhaus Certificada',
          description: 'Perfiles técnicos con coeficiente de transmitancia de hasta Uw = 0.72 W/m²K y atenuación acústica certificada de -48 dB.'
        },
        {
          icon: 'award',
          title: 'Simulador Next Generation EU',
          description: 'Explicación clara de las ayudas a fondo perdido y deducciones de IRPF con servicio de tramitación "llave en mano".'
        },
        {
          icon: 'eye',
          title: 'Showroom con Modo Claro / Oscuro',
          description: 'Experiencia visual inmersiva con selector de tema reactivo mediante Angular Signals y tipografía arquitectónica limpia.'
        }
      ],
      keyFeatures: [
        'Catálogo de perfiles en PVC Passivhaus (Nova Thermo y Passiv) y Aluminio RPT Minimal.',
        'Generador dinámico de mensajes a WhatsApp Business API para cierre comercial instantáneo.',
        'Muestrario de acabados arquitectónicos y texturas (Gris Antracita RAL 7016, Roble, Nogal).',
        'Casos reales documentados en urbanizaciones de referencia (Altorreal, Gran Vía de Murcia).',
        'Rendimiento web ultra-optimizado con cero saltos de maquetación (Zero CLS).'
      ],
      architectureDetails: [
        'Frontend Angular 17 con componentes Standalone y Signals síncronos.',
        'Estilos en SCSS modular con cumplimiento estricto de presupuestos de peso (<6 kB/componente).',
        'Despliegue estático sobre servidor web Nginx con compresión Gzip y HTTP/2.',
        'Integración con WhatsApp Web y WhatsApp Business para lead generation.'
      ],
      stack: ['Angular 17', 'Angular Signals', 'SCSS Tokens', 'Nginx 1.24', 'WhatsApp Business API', 'Lucide Icons']
    },
    {
      id: 'grupo-soto-automovil',
      number: '10',
      slug: 'grupo-soto-automovil',
      sector: 'Distribución B2B & Movilidad Comercial',
      title: 'Grupo Soto — División del Automóvil B2B',
      tagline: 'Plataforma de comercio electrónico B2B y CRM de movilidad para comerciales en ruta con numeración atómica.',
      badgeText: 'Portal B2B & CRM Comercial',
      role: 'Arquitecto Full-Stack & Desarrollador Principal',
      year: '2025 – 2026',
      liveUrl: 'https://gruposotodivisiondelautomovil.es/',
      metrics: '182 referencias industriales · 0 colisiones en pedidos concurrentes · DeepSeek AI',
      metricsList: [
        { label: 'Referencias B2B', value: '182 Productos' },
        { label: 'Colisiones Pedidos', value: '0 Errores' },
        { label: 'Generación IA', value: 'DeepSeek API' },
        { label: 'Arquitectura', value: 'Angular SSR + NestJS' }
      ],
      problem: 'Los comerciales en ruta que visitaban talleres mecánicos sufrían colisiones al numerar pedidos si cerraban ventas a la vez, y perdían los productos de la cesta si debían registrar un taller nuevo antes de pagar.',
      challenge: 'Crear una plataforma dual que sirva como tienda online para clientes y como CRM de ventas en ruta para agentes comerciales, garantizando numeración correlativa legal sin fallos concurrentes.',
      solution: 'Plataforma B2B desarrollada con Angular 17 SSR, NestJS 11 y PostgreSQL. Utiliza transacciones atómicas aisladas en Prisma para emitir series de pedidos por comercial (`PED-2026-C01-0001`) sin saltos ni duplicados. Permite el alta in-situ de clientes en el carrito e integra la API de DeepSeek para redactar fichas técnicas de químicos y fijación industrial.',
      description: 'Plataforma de comercio electrónico B2B y CRM de movilidad para comerciales en ruta con numeración atómica.',
      fullDescription: 'Ecosistema comercial B2B para automoción y talleres mecánicos. Unifica catálogo industrial con precios mayoristas, CRM de ruta, numeración legal de pedidos y generación técnica con IA.',
      pillars: [
        {
          icon: 'hash',
          title: 'Numeración Atómica Transaccional',
          description: 'Uso de Prisma.$transaction para generar series correlativas por comercial sin duplicados ni condiciones de carrera.'
        },
        {
          icon: 'user-plus',
          title: 'Alta "In Situ" en Cesta B2B',
          description: 'El agente comercial puede registrar un nuevo taller cliente directamente desde el carrito sin perder los productos seleccionados.'
        },
        {
          icon: 'sparkles',
          title: 'Fichas Asistidas con DeepSeek AI',
          description: 'Generación técnica y clasificación automatizada de productos químicos, lubricantes y consumibles mediante IA.'
        },
        {
          icon: 'truck',
          title: 'Gestión Logística y Seguimiento',
          description: 'Seguimiento de expediciones con GLS y SEUR, proformas automáticas y barra de envío gratuito dinámico.'
        }
      ],
      keyFeatures: [
        'Catálogo dual: precios de venta para talleres vs. costes y márgenes protegidos para agentes.',
        'Plantillas de reposición periódica para compras recurrentes de consumibles de taller.',
        'Conversión y optimización masiva de imágenes de producto a formato WebP con Sharp.',
        'Importación y exportación de tarifas de precios en Excel mediante ExcelJS.',
        'Panel de administración con métricas de ventas por comercial y zona geográfica.'
      ],
      architectureDetails: [
        'Frontend Angular 17 con Server-Side Rendering para posicionamiento en Google.',
        'Backend NestJS 11 estructurado por dominios de negocio con Prisma v7 y PostgreSQL 16.',
        'Módulo de seguridad con Passport JWT, Throttler contra abusos y cabeceras Helmet.',
        'Alojamiento en VPS IONOS orquestado con PM2 y proxy inverso Nginx.'
      ],
      stack: ['Angular 17 SSR', 'NestJS 11', 'Prisma v7', 'PostgreSQL 16', 'DeepSeek AI API', 'ExcelJS', 'Sharp']
    },
    {
      id: 'veltiatrust',
      number: '11',
      slug: 'veltiatrust',
      sector: 'Infraestructura & Seguridad eIDAS',
      title: 'VeltiaTrust',
      tagline: 'Infraestructura de notarización y firma electrónica con arquitectura Zero-Storage orientada al sector legal y telco.',
      badgeText: 'Infraestructura Crítica',
      role: 'Arquitecto de Seguridad & Backend',
      year: '2024 – 2025',
      liveUrl: 'https://veltiatrust.com/',
      metrics: '100% Cumplimiento eIDAS · Arquitectura Zero-Storage',
      metricsList: [
        { label: 'Normativa', value: 'Reglamento eIDAS' },
        { label: 'Privacidad', value: 'Zero-Storage' },
        { label: 'Integridad', value: 'Sellado Criptográfico' },
        { label: 'Diseño', value: 'API-First' }
      ],
      problem: 'Los procesos de verificación de identidad digital y firma de contratos suelen obligar a transferir información confidencial a proveedores intermediarios que almacenan copias en servidores ajenos.',
      challenge: 'Construir una API de firma y notarización electrónica que cumpla con los más altos estándares europeos eIDAS sin persistir datos privados ni documentación de los usuarios.',
      solution: 'Infraestructura API-First desarrollada con Node.js y PostgreSQL fundamentada en el principio Zero-Storage: el sistema emite sellados criptográficos y evidencias verificables sin retener la información de los intervinientes.',
      description: 'API de alta seguridad orientada al sector Telco y legal para procesos de verificación de identidad, notarización digital y firma según normativa eIDAS.',
      fullDescription: 'Infraestructura de certificación digital y firma eIDAS con sellado de tiempo cualificado y arquitectura Zero-Storage para máxima privacidad corporativa.',
      pillars: [
        {
          icon: 'shield-check',
          title: 'Arquitectura Zero-Storage',
          description: 'Cero persistencia de documentos privados: la verificación se realiza en memoria y se sella criptográficamente.'
        },
        {
          icon: 'file-text',
          title: 'Conformidad eIDAS Europea',
          description: 'Emisión de sellados temporales y firmas cualificadas con plena validez probatoria en tribunales de la UE.'
        },
        {
          icon: 'lock',
          title: 'Canales API Seguros',
          description: 'Integración sencilla mediante webhooks autenticados y tokens criptográficos para aplicaciones de terceros.'
        },
        {
          icon: 'server',
          title: 'Alta Disponibilidad Telco',
          description: 'Diseño preparado para soportar picos de validaciones de contratos y altas de operadores de telecomunicaciones.'
        }
      ],
      keyFeatures: [
        'Notarización digital de evidencias con hash criptográfico inmutable.',
        'Verificación de firma electrónica cualificada conforme al estándar eIDAS.',
        'Diseño API-First para integración ágil en backends empresariales.',
        'Cero exposición de datos sensibles a terceros intermediarios.'
      ],
      architectureDetails: [
        'Arquitectura distribuida en Node.js con endpoints RESTful seguros.',
        'Persistencia de metadatos y sellados en PostgreSQL con integridad referencial.',
        'Algoritmos de cifrado asimétrico y sellado temporal criptográfico.'
      ],
      stack: ['Node.js', 'PostgreSQL', 'API-First', 'eIDAS', 'Zero-Storage']
    }
  ]);

  getProjectBySlug(slug: string): Project | undefined {
    return this.projects().find(p => p.slug === slug || p.id === slug);
  }

  getAllProjects(): Project[] {
    return this.projects();
  }
}
