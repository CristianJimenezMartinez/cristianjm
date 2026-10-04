import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  isMenuOpen = signal<boolean>(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  scrollTo(fragment: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.closeMenu();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Scroll al inicio de la página si el fragmento está vacío o es 'inicio'
    if (!fragment || fragment === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', '/');
      return;
    }

    const element = document.getElementById(fragment);
    if (element) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navbarHeight - 12);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      history.pushState(null, '', `#${fragment}`);
    } else {
      // Fallback si el usuario no se encontrara en la ruta base
      this.router.navigate(['/'], { fragment }).then(() => {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 72;
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = Math.max(0, elementPosition - navbarHeight - 12);
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 150);
      });
    }
  }
}
