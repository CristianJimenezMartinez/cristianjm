import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Sobre Mí — Cristian Jiménez Martínez | Arquitecto de Software & Consultor ERP',
      description: 'Conoce la trayectoria, principios de ingeniería y experiencia de Cristian Jiménez Martínez en arquitecturas de alta resiliencia, Bentian ERP Bridge, Node.js, C#, Go y Angular.',
      keywords: 'Cristian Jiménez Martínez, CristianJM, Arquitecto de Software, Bentian ERP Bridge, Factusol ERP, Angular, NestJS, Go, PostgreSQL, Consultor Cloud',
      canonicalUrl: 'https://cristianjm.com/sobre-mi'
    });
  }
}
