import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-channels', templateUrl: './channels.component.html', styleUrl: './channels.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ChannelsComponent { protected readonly rows = [
    { channel: 'LinkedIn', followers: '24k', eR: '5.1%', lead: 'Riya Poluru' },
    { channel: 'Instagram', followers: '18k', eR: '4.2%', lead: 'Meera Poluru' },
  ]; }
