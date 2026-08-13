import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-notas-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notas-list.component.html',
  styleUrls: ['./notas-list.component.scss']
})
export class NotasListComponent implements OnInit {
  contentService = inject(ContentService);
  metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Notas Técnicas & Snippets | CristianJM',
      description: 'Colección de notas rápidas, configuraciones de servidor, snippets de código y soluciones de ingeniería.',
      keywords: 'Notas Técnicas, Snippets, Chuletas Programación, Angular, Node.js, Linux, Cloudflare'
    });

    this.contentService.loadIndex('notas').subscribe();
  }
}
