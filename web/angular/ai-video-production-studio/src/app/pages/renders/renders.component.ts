import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-renders', templateUrl: './renders.component.html', styleUrl: './renders.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class RendersComponent { protected readonly rows = [
    { render: 'Launch-4K', project: 'Product launch', progress: '72%', operator: 'Rohan Poluru' },
    { render: 'Story-HD', project: 'Customer story', progress: 'Queued', operator: 'Meera Poluru' },
  ]; }
