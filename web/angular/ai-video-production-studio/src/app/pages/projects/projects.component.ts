import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-projects', templateUrl: './projects.component.html', styleUrl: './projects.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ProjectsComponent { protected readonly rows = [
    { project: 'Product launch', stage: 'Edit', shots: '24', lead: 'Sana Poluru' },
    { project: 'Customer story', stage: 'Review', shots: '12', lead: 'Ananya Poluru' },
  ]; }
