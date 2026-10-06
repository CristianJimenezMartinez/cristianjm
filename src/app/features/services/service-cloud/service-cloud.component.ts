import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-service-cloud',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-cloud.component.html',
  styleUrl: './service-cloud.component.scss'
})
export class ServiceCloudComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Arquitectura Cloud & Desarrollo Full-Stack | CristianJM',
      description: 'Consultoría y desarrollo de arquitecturas cloud de alta disponibilidad: NestJS, Angular SSR, PostgreSQL, Go y Docker con despliegues atómicos CI/CD en producción.',
      keywords: 'Arquitectura Cloud, Consultor NestJS, Angular SSR, PostgreSQL, Microservicios, Docker, DevOps, Cristian Jiménez Martínez',
      canonicalUrl: 'https://cristianjm.com/servicios/arquitectura-cloud-fullstack'
    });
  }
}
