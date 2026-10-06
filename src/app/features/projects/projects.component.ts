import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  projects = this.projectsService.projects;

  flagshipProject = computed(() => 
    this.projects().find(p => p.id === 'bentian-erp-bridge') || this.projects()[0]
  );

  otherProjects = computed(() => 
    this.projects().filter(p => p.id !== 'bentian-erp-bridge')
  );
}
