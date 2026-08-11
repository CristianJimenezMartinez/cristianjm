import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateSeo(titleText: string, descriptionText: string) {
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descriptionText });
    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descriptionText });
  }
}
