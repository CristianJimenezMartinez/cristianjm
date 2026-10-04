import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';

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
      problem: 'Arquitecto y Desarrollador de Bentian ERP Bridge: Middleware y conector local-first en tiempo real para Factusol ERP y tiendas online (WooCommerce y PrestaShop).',
      description: 'Conector de escritorio Windows x64 desarrollado con Node.js/TypeScript y C#, arquitectura Local-First, motor OLEDB de ultra-baja latencia sobre Access (.accdb) y sincronización continua con WooCommerce REST API y PrestaShop.',
      fullDescription: 'Infraestructura empresarial puente de alta resiliencia diseñada para Factusol ERP, WooCommerce y PrestaShop. Incluye servicio de escritorio en segundo plano, portal SaaS, deadman switch de monitorización, tolerancia offline de 30 días y transacciones ACID sobre OLEDB.',
      stack: ['TypeScript', 'Node.js', 'C#', 'Factusol OLEDB', 'Access (.accdb)', 'WooCommerce REST API', 'PrestaShop', 'PostgreSQL', 'Docker'],
      metrics: '<100ms latencia · Tolerancia Offline 30 días',
      liveUrl: 'https://bridge.cristianjm.com/',
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
      stack: ['Factusol OLEDB', 'Access (.accdb)', 'PHP Bridge', 'MariaDB', 'Windows Service', 'TypeScript'],
      metrics: '100% Cero errores de stock · 0 picado manual',
      liveUrl: 'https://bridge.cristianjm.com/',
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
}
