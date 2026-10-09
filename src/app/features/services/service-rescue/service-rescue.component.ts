import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-service-rescue',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-rescue.component.html',
  styleUrl: './service-rescue.component.scss'
})
export class ServiceRescueComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Rescate Técnico de Integraciones ERP & Ecommerce Caídas | CristianJM',
      description: 'Intervención de emergencia y estabilización de conectores ERP (Factusol, desarrollos a medida) con WooCommerce y PrestaShop. Eliminación de bloqueos de base de datos (.laccdb), caídas por timeout 504 y pedidos perdidos.',
      keywords: 'Rescate integración ERP, Reparar conector Factusol, Error bloqueo laccdb, Sincronización WooCommerce caída, Fallo pedidos PrestaShop Factusol, Timeout conector ERP, Cristian Jiménez Martínez',
      canonicalUrl: 'https://cristianjm.com/servicios/rescate-optimizacion-erp'
    });
  }
}
