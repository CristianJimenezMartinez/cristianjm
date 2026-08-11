// Updated service data — commercial copy + pricing language
import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';
import { ServiceOffering } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  readonly projects = signal<Project[]>([
    {
      id: 'revilike',
      number: '01',
      sector: 'AI & SaaS',
      title: 'ReviLike.com',
      problem: 'Automatización inteligente de reseñas para negocios con presencia online.',
      description: 'Plataforma SaaS que automatiza la respuesta a reseñas de Google mediante IA conversacional con respuestas personalizadas y empáticas a escala.',
      fullDescription: 'Plataforma SaaS diseñada para empresas y restaurantes que automatiza la respuesta a reseñas de Google y plataformas clave utilizando modelos de OpenAI optimizados.',
      stack: ['Angular', 'OpenAI API', 'Serverless', 'TypeScript', 'Node.js'],
      metrics: '+85% ahorro en tiempo de respuesta',
      liveUrl: 'https://revilike.com',
      badgeText: 'SaaS en producción'
    },
    {
      id: 'veltiatrust',
      number: '02',
      sector: 'LegalTech',
      title: 'VeltiaTrust',
      problem: 'Infraestructura de notarización y firma electrónica con arquitectura Zero-Storage.',
      description: 'API de alta seguridad para el sector Telco y legal. Verificación de identidad, notarización digital y firma eIDAS sin almacenar datos sensibles.',
      fullDescription: 'Infraestructura de alta seguridad orientada al sector Telco y legal para procesos de verificación de identidad, notarización y firma según normativa eIDAS.',
      stack: ['Node.js', 'PostgreSQL', 'API-First', 'eIDAS', 'Zero-Storage'],
      metrics: '100% Cumplimiento eIDAS',
      badgeText: 'Infraestructura LegalTech'
    },
    {
      id: 'factusol-api',
      number: '03',
      sector: 'ERP & Integrations',
      title: 'Factusol API REST',
      problem: 'Infraestructura REST para conectar ERP, pagos y sistemas empresariales.',
      description: 'Conector x64 que moderniza software ERP tradicional exponiendo endpoints REST, sincronización en tiempo real con WebSockets e integración directa con Stripe.',
      fullDescription: 'Potente conector x64 que moderniza software ERP tradicional exponiendo endpoints REST protegidos, sincronización en tiempo real con WebSockets e integración directa con Stripe.',
      stack: ['Node.js', 'PostgreSQL', 'Stripe', 'WebSockets', 'REST API'],
      metrics: '<100ms procesamiento API',
      badgeText: 'Integración ERP'
    }
  ]);

  readonly services = signal<ServiceOffering[]>([
    {
      id: 'ia-agents',
      icon: 'bot',
      title: 'Agentes IA & Automatización',
      tagline: 'Automatiza lo que hoy consume horas.',
      description: 'Agentes conectados a tus datos, documentos, CRM, web y canales de atención. Diseñados para reducir costes operativos desde el primer día.',
      features: [
        'Modelos entrenados con tus datos (RAG)',
        'Integración en Web y WhatsApp Business',
        'Disponibilidad 24/7 en tiempo real',
        'Monitorización y ajuste continuo'
      ],
      setupPrice: 'Desde 1.500€',
      recurringPrice: 'Operación & Mantenimiento — desde 80€/mes',
      ctaLabel: 'Diseñar mi agente',
      popular: true
    },
    {
      id: 'web-saas',
      icon: 'layout',
      title: 'Software & SaaS',
      tagline: 'Convierte una idea o proceso en producto.',
      description: 'Aplicaciones web, plataformas SaaS y APIs empresariales construidas de extremo a extremo con Angular 18+, Node.js y arquitectura escalable.',
      features: [
        'Arquitectura escalable Angular 18+ / Node.js',
        'Diseño premium y Core Web Vitals optimizados',
        'Backend robusto con PostgreSQL',
        'Integración con APIs y servicios externos'
      ],
      setupPrice: 'Desde 2.500€',
      recurringPrice: 'Mantenimiento & Hosting — desde 150€/mes',
      ctaLabel: 'Construir mi producto'
    },
    {
      id: 'consulting',
      icon: 'code-2',
      title: 'Consultoría Técnica',
      tagline: 'Cuando el problema necesita arquitectura, no más código.',
      description: 'Auditoría, arquitectura, rendimiento, IA, cloud y estrategia técnica para pymes y startups que necesitan avanzar con decisiones sólidas.',
      features: [
        'Auditoría de arquitectura de software',
        'Estrategia de adopción de IA',
        'Optimización de rendimiento y cloud',
        'Sesiones 1 a 1 de mentoría técnica'
      ],
      setupPrice: '150€/h',
      recurringPrice: 'Retainer técnico — desde 400€/mes',
      ctaLabel: 'Reservar consultoría'
    }
  ]);
}
