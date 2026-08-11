import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {
  isVisible = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.scrollY || document.documentElement.scrollTop;
    this.isVisible.set(yOffset > 300);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
