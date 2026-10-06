import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { MetaService } from '../../core/services/meta.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);
  private metaService = inject(MetaService);

  project = signal<Project | null>(null);
  allProjects = this.projectsService.projects;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        const found = this.projectsService.getProjectBySlug(slug);
        if (found) {
          this.project.set(found);
          this.updateSeo(found);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  private updateSeo(project: Project): void {
    const title = `${project.title} — Caso de Estudio & Arquitectura | CristianJM`;
    const description = project.fullDescription || project.description;
    const canonicalUrl = `https://cristianjm.com/proyectos/${project.slug}`;
    this.metaService.updateTags({
      title,
      description,
      keywords: `${project.title}, ${project.sector}, ${project.stack.join(', ')}, Cristian Jiménez Martínez, Arquitecto de Software`,
      canonicalUrl
    });
  }

  getRelatedProjects(): Project[] {
    const current = this.project();
    if (!current) return [];
    return this.allProjects()
      .filter(p => p.id !== current.id)
      .slice(0, 3);
  }
}
