import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishComponent {
  protected readonly rows: Array<{ course: string; launchDate: string; owner: string; status: string }> = [
    { course: 'Billing admin', launchDate: 'Nov 30', owner: 'Meera Poluru', status: 'Scheduled' },
    { course: 'Partner cert', launchDate: 'Dec 05', owner: 'Rohan Poluru', status: 'Pending' },
  ];
}
