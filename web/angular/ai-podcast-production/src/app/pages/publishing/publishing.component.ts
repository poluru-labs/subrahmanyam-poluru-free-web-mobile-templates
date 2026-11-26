import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-publishing', templateUrl: './publishing.component.html', styleUrl: './publishing.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class PublishingComponent { protected readonly rows = [
    { release: 'Ep. 47', platform: 'RSS + Spotify', when: 'Oct 26', status: 'Scheduled' },
    { release: 'Bonus clip', platform: 'Social', when: 'Oct 27', status: 'Draft' },
  ]; }
