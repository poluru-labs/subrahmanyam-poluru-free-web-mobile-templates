import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent {
  protected readonly rows: Array<{ team: string; agents: string; openLoad: string; lead: string }> = [
    { team: 'Tier 1', agents: '12', openLoad: '94', lead: 'Tara Poluru' },
    { team: 'Tier 2', agents: '6', openLoad: '41', lead: 'Ananya Poluru' },
  ];
}
