import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-projects', templateUrl: './projects.component.html', styleUrl: './projects.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ProjectsComponent {
  protected readonly rows: Array<{ project: string; client: string; phase: string; lead: string }> = [
    { project: 'Loft refresh', client: 'Poluru demo', phase: 'Selections', lead: 'Mira Poluru' },
    { project: 'Office suite', client: 'North Co', phase: 'Install', lead: 'Ananya Poluru' },
  ];
}
