import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'proyectos/:slug',
    loadComponent: () => import('./features/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
  },
  {
    path: 'sobre-mi',
    loadComponent: () => import('./features/about-page/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'servicios/integracion-erp-factusol',
    loadComponent: () => import('./features/services/service-factusol/service-factusol.component').then(m => m.ServiceFactusolComponent)
  },
  {
    path: 'servicios/arquitectura-cloud-fullstack',
    loadComponent: () => import('./features/services/service-cloud/service-cloud.component').then(m => m.ServiceCloudComponent)
  },
  {
    path: 'servicios',
    redirectTo: 'servicios/integracion-erp-factusol',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
