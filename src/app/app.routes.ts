import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  {
    path: 'notas-tecnicas',
    loadComponent: () => import('./features/notas/notas-list/notas-list.component').then(m => m.NotasListComponent)
  },
  {
    path: 'notas-tecnicas/:slug',
    loadComponent: () => import('./features/notas/notas-detail/notas-detail.component').then(m => m.NotasDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
