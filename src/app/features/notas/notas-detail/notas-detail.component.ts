import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ContentService, ContentItem } from '../../../core/services/content.service';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-notas-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownModule],
  templateUrl: './notas-detail.component.html',
  styleUrls: ['./notas-detail.component.scss']
})
export class NotasDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private metaService = inject(MetaService);

  notaMeta = signal<ContentItem | undefined>(undefined);
  notaContent = signal<string>('');

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.contentService.loadIndex('notas').subscribe(() => {
      const meta = this.contentService.getPostMeta('notas', slug);
      if (meta) {
        this.notaMeta.set(meta);
        this.metaService.updateTags({
          title: `${meta.title} | Nota Técnica — CristianJM`,
          description: meta.description,
          keywords: meta.tags.join(', ')
        });
      }
    });

    this.contentService.getPostContent('notas', slug).subscribe(markdown => {
      this.notaContent.set(markdown);
    });
  }
}
