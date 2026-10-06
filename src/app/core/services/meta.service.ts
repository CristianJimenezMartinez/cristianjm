import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  updateSeo(titleText: string, descriptionText: string, canonicalUrl?: string) {
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descriptionText });
    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descriptionText });

    if (canonicalUrl) {
      this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
      this.setCanonicalUrl(canonicalUrl);
    }
  }

  setCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  updateTags(tags: { title: string; description: string; keywords?: string; canonicalUrl?: string }) {
    this.updateSeo(tags.title, tags.description, tags.canonicalUrl);
    if (tags.keywords) {
      this.meta.updateTag({ name: 'keywords', content: tags.keywords });
    }
  }
}

