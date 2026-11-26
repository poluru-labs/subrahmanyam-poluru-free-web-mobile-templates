import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-profiles', templateUrl: './profiles.component.html', styleUrl: './profiles.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ProfilesComponent { protected readonly rows = [
    { profile: 'Ananya Poluru', completion: '92%', template: 'Executive', owner: 'Vikram Poluru' },
    { profile: 'Rohan Poluru', completion: '78%', template: 'Technical', owner: 'Meera Poluru' },
  ]; }
