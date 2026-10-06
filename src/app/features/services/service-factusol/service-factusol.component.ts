import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-service-factusol',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-factusol.component.html',
  styleUrl: './service-factusol.component.scss'
})
export class ServiceFactusolComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Integración Factusol ERP con WooCommerce y PrestaShop | CristianJM',
      description: 'Consultoría especializada y desarrollo de conectores para Factusol ERP. Sincronización de catálogo, stock disponible DISSTO y pedidos en tiempo real con Bentian ERP Bridge.',
      keywords: 'Integración Factusol ERP, Conector Factusol WooCommerce, Sincronizar Factusol PrestaShop, Factusol OLEDB, Bentian ERP Bridge, Cristian Jiménez Martínez',
      canonicalUrl: 'https://cristianjm.com/servicios/integracion-erp-factusol'
    });
  }
}
