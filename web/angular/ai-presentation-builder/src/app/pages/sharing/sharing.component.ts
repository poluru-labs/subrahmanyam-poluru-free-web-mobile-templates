import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-sharing', templateUrl: './sharing.component.html', styleUrl: './sharing.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class SharingComponent { protected readonly rows = [
    { link: '/d/q4-rm', deck: 'Q4 roadmap', views: '84', expires: 'Nov 12' },
    { link: '/d/kickoff', deck: 'Customer kickoff', views: '22', expires: 'Nov 8' },
  ]; }
