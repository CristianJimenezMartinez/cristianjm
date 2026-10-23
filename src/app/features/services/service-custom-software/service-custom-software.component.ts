import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-service-custom-software',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-custom-software.component.html',
  styleUrl: './service-custom-software.component.scss'
})
export class ServiceCustomSoftwareComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Desarrollo de Software a Medida, IA & Automatización Empresarial | CristianJM',
      description: 'Ingeniería de software a medida para empresas: automatización documental con Inteligencia Artificial, servicios nativos Windows en Go y C#, portales B2B, apps Android y TPV.',
      keywords: 'Desarrollo software a medida empresas, Automatización con Inteligencia Artificial, Servicios Windows Go C#, Desarrollo portales B2B CRM, Digitalización facturas IA, Apps Android Capacitor TPV, Cristian Jiménez Martínez',
      canonicalUrl: 'https://cristianjm.com/servicios/desarrollo-software-medida-ia-automatizacion/'
    });
  }
}
