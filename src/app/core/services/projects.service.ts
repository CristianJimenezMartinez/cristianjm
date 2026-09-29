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
      id: 'bentian-bridge',
      number: '01',
      sector: 'ERP Middleware & SaaS',
      title: 'Bentian ERP Bridge',
      problem: 'Sincronización autónoma en tiempo real entre Factusol ERP y tiendas online.',
      description: 'Conector de escritorio Windows x64 con arquitectura Local-First, motor OLEDB de baja latencia y sincronización bidireccional de catálogo, stock, tarifas, pedidos y facturas sin exponer bases de datos a internet.',
      fullDescription: 'Infraestructura empresarial puente de alta resiliencia diseñada para Factusol, WooCommerce y PrestaShop. Incluye servicio de escritorio en segundo plano, portal SaaS multi-tenant con Stripe, deadman switch de monitorización y tolerancia offline de 30 días.',
      stack: ['TypeScript', 'Node.js SEA', 'OLEDB / Access', 'PostgreSQL', 'Stripe', 'Docker'],
      metrics: '<100ms latencia · Tolerancia Offline 30 días',
      liveUrl: 'https://bridge.cristianjm.com',
      badgeText: 'Producto Propio · SaaS en Producción'
    },
    {
      id: 'factusol-b2b-engine',
      number: '02',
      sector: 'Suministros Industriales & B2B',
      title: 'Suministros Rubio — Sincronizador ERP',
      problem: 'Automatización integral de catálogo masivo (+5.000 SKUs), tarifas mayoristas y pedidos web.',
      description: 'Despliegue en producción de sincronización desatendida entre base de datos Access/Factusol local y tienda web B2B. Reducción a 0 del picado manual de albaranes y actualización de existencias en segundos.',
      fullDescription: 'Arquitectura de canal privado con endpoints PHP en servidor MariaDB, inyección atómica de pedidos en F_PCL y actualización dinámica de stock disponible (DISSTO).',
      stack: ['Factusol OLEDB', 'PHP Bridge', 'MariaDB', 'Windows Service', 'TypeScript'],
      metrics: '100% Cero errores de stock · 0 picado manual',
      liveUrl: 'https://bridge.cristianjm.com',
      badgeText: 'Caso de Producción Real'
    },
    {
      id: 'veltiatrust',
      number: '03',
      sector: 'Infraestructura & Seguridad',
      title: 'VeltiaTrust',
      problem: 'Infraestructura de notarización y firma electrónica con arquitectura Zero-Storage.',
      description: 'API de alta seguridad para el sector Telco y legal. Verificación de identidad, notarización digital y firma eIDAS sin almacenar datos sensibles ni intermediarios.',
      fullDescription: 'Infraestructura de alta seguridad orientada al sector Telco y legal para procesos de verificación de identidad, notarización y firma según normativa eIDAS.',
      stack: ['Node.js', 'PostgreSQL', 'API-First', 'eIDAS', 'Zero-Storage'],
      metrics: '100% Cumplimiento eIDAS',
      liveUrl: 'https://veltiatrust.com',
      badgeText: 'Infraestructura Crítica'
    }
  ]);

  readonly services = signal<ServiceOffering[]>([
    {
      id: 'factusol-integration',
      icon: 'database',
      title: 'Integración Factusol ERP & Tiendas Web',
      tagline: 'Conecta tu Factusol con WooCommerce o PrestaShop en tiempo real.',
      description: 'Sincronización bidireccional automática de catálogo, existencias, tarifas, pedidos y facturas. Sin picar pedidos a mano, sin fallos de stock y con tolerancia a caídas de internet.',
      features: [
        'Sincronización bidireccional en tiempo real (<100ms)',
        'Arquitectura Local-First (Tolerancia Offline 30 días)',
        'Soporte Factusol multi-tarifa, familias y variantes',
        'Instalación sin abrir puertos ni exponer tu base de datos'
      ],
      setupPrice: 'Desde 199€/año',
      recurringPrice: 'Licenciamiento SaaS & Soporte técnico continuo',
      ctaLabel: 'Ver Bentian Bridge',
      popular: true
    },
    {
      id: 'web-saas',
      icon: 'layout',
      title: 'Software, APIs & Middleware a Medida',
      tagline: 'Automatiza procesos empresariales y conecta sistemas aislados.',
      description: 'Desarrollo de conectores Windows x64, servicios en segundo plano, paneles de control SaaS y APIs REST robustas para empresas con software de gestión local o en red.',
      features: [
        'Conectores de escritorio para Windows 10/11 y servidores',
        'APIs REST de alta velocidad con Node.js y PostgreSQL',
        'Integración con plataformas de pago (Stripe)',
        'Paneles web y dashboards administrativos en Angular'
      ],
      setupPrice: 'Desde 1.800€',
      recurringPrice: 'Mantenimiento & Hosting — desde 120€/mes',
      ctaLabel: 'Solicitar desarrollo'
    },
    {
      id: 'consulting',
      icon: 'code-2',
      title: 'Consultoría Técnica & Auditoría ERP',
      tagline: 'Optimización, rendimiento y resolución de bloqueos en Factusol.',
      description: 'Auditoría de bases de datos Access (.accdb), concurrencia OLEDB, solución de errores de sincronización, diseño de arquitecturas seguras y adaptación normativa.',
      features: [
        'Diagnóstico forense de bases de datos Factusol / Access',
        'Optimización de concurrencia y prevención de bloqueos',
        'Diseño de arquitectura de integración segura',
        'Sesiones 1 a 1 de asesoramiento técnico directo'
      ],
      setupPrice: '150€/h',
      recurringPrice: 'Retainer técnico mensual — desde 350€/mes',
      ctaLabel: 'Reservar consultoría'
    }
  ]);
}
