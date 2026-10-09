import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-service-verifactu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-verifactu.component.html',
  styleUrl: './service-verifactu.component.scss'
})
export class ServiceVerifactuComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Auditoría VeriFactu y Adaptación RD 1007/2023 para ERPs | CristianJM',
      description: 'Auditoría técnica, certificación y adaptación de software de facturación a los requisitos de Veri*Factu (Ley Antifraude 11/2021 y Real Decreto 1007/2023). Encadenamiento SHA-256, códigos QR y remisión segura a la AEAT.',
      keywords: 'Auditoría VeriFactu, Reglamento Verifactu RD 1007/2023, Adaptar Factusol Verifactu, Ley 11/2021 antifraude, Hash SHA-256 facturas, Código QR factura AEAT, Software facturación homologado, Cristian Jiménez Martínez',
      canonicalUrl: 'https://cristianjm.com/servicios/auditoria-verifactu-facturacion'
    });
  }
}
