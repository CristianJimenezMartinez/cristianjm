import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly techStack = [
    { name: 'Angular 18+', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend/Backend' },
    { name: 'Node.js & Express', category: 'Backend' },
    { name: 'PostgreSQL & SQL', category: 'Database' },
    { name: 'OpenAI API & RAG', category: 'AI' },
    { name: 'Stripe Payments', category: 'Integrations' },
    { name: 'Docker & Cloud', category: 'DevOps' },
    { name: 'Cloudflare Pages/Workers', category: 'Infrastructure' },
    { name: 'REST & WebSockets', category: 'Architecture' }
  ];
}
