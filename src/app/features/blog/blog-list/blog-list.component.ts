import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  contentService = inject(ContentService);
  metaService = inject(MetaService);

  ngOnInit(): void {
    this.metaService.updateTags({
      title: 'Blog & Artículos | CristianJM — Full Stack & Software Architect',
      description: 'Artículos sobre desarrollo de software, arquitectura en la nube, agentes de Inteligencia Artificial y escalabilidad SaaS.',
      keywords: 'Blog Desarrollo Web, Agentes IA, Arquitectura Software, Angular, Node.js'
    });

    this.contentService.loadIndex('blog').subscribe();
  }
}
