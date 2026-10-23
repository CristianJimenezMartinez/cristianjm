import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-service-cybersecurity',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-cybersecurity.component.html',
  styleUrl: './service-cybersecurity.component.scss'
})
export class ServiceCybersecurityComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Mantenimiento Web, Ciberseguridad Node.js/PHP & DevSecOps para Empresas | CristianJM',
      description: 'Servicio mensual de ingeniería gestionada, parcheo de vulnerabilidades CVE en Node.js y PHP, despliegues CI/CD en GitHub privado, copias de seguridad cifradas y soporte B2B.',
      keywords: 'Mantenimiento web empresas, Ciberseguridad Node.js, Seguridad PHP, Parcheo vulnerabilidades CVE, DevSecOps España, Soporte técnico Node.js Angular PHP, Despliegues GitHub Actions, Servidor gestionado empresas, Cristian Jiménez Martínez',
      canonicalUrl: 'https://cristianjm.com/servicios/mantenimiento-web-ciberseguridad-empresas/'
    });
  }
}
