import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  projects = this.projectsService.projects;
}
