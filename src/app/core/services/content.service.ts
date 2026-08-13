import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private http = inject(HttpClient);
  
  // State signals
  blogPosts = signal<ContentItem[]>([]);
  techNotes = signal<ContentItem[]>([]);

  // Load the index of a specific section (blog or notas)
  loadIndex(section: 'blog' | 'notas'): Observable<ContentItem[]> {
    const url = `/assets/content/${section}/index.json`;
    return this.http.get<ContentItem[]>(url).pipe(
      tap(data => {
        if (section === 'blog') {
          this.blogPosts.set(data);
        } else {
          this.techNotes.set(data);
        }
      }),
      catchError(err => {
        console.error(`Error loading ${section} index:`, err);
        return of([]);
      })
    );
  }

  // Get raw markdown content for a specific post
  getPostContent(section: 'blog' | 'notas', slug: string): Observable<string> {
    const url = `/assets/content/${section}/${slug}.md`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(err => {
        console.error(`Error loading markdown file ${url}:`, err);
        return of('# Error\nEl contenido no pudo ser cargado o no existe.');
      })
    );
  }

  // Get metadata for a specific post from the already loaded state
  getPostMeta(section: 'blog' | 'notas', slug: string): ContentItem | undefined {
    const items = section === 'blog' ? this.blogPosts() : this.techNotes();
    return items.find(item => item.slug === slug);
  }
}
