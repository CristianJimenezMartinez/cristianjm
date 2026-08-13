import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ContentService, ContentItem } from '../../../core/services/content.service';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private metaService = inject(MetaService);

  postMeta = signal<ContentItem | undefined>(undefined);
  postContent = signal<string>('');

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.contentService.loadIndex('blog').subscribe(() => {
      const meta = this.contentService.getPostMeta('blog', slug);
      if (meta) {
        this.postMeta.set(meta);
        this.metaService.updateTags({
          title: `${meta.title} | CristianJM`,
          description: meta.description,
          keywords: meta.tags.join(', ')
        });
      }
    });

    this.contentService.getPostContent('blog', slug).subscribe(markdown => {
      this.postContent.set(markdown);
    });
  }
}
