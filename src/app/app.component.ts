import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { ServicesComponent } from './features/services/services.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { AboutComponent } from './features/about/about.component';
import { FaqComponent } from './features/faq/faq.component';
import { ContactComponent } from './features/contact/contact.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    ServicesComponent,
    ProjectsComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
    ScrollToTopComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CristianJM';
}
