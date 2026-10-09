import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { ServicesSectionComponent } from '../services-section/services-section.component';
import { ProjectsComponent } from '../projects/projects.component';
import { AboutComponent } from '../about/about.component';
import { FaqComponent } from '../faq/faq.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesSectionComponent,
    ProjectsComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
