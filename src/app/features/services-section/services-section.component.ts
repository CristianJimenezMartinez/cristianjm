import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  private platformId = inject(PLATFORM_ID);

  selectPlan(planCode: string, event: Event) {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.dispatchEvent(new CustomEvent('select-contact-service', { detail: planCode }));
    const contactEl = document.getElementById('contacto');
    if (contactEl) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 72;
      const offsetPosition = Math.max(0, contactEl.getBoundingClientRect().top + window.scrollY - navbarHeight - 12);
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      history.pushState(null, '', '#contacto');
    }
  }
}
