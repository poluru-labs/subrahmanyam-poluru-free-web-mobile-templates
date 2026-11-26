import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-delivery', templateUrl: './delivery.component.html', styleUrl: './delivery.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class DeliveryComponent { protected readonly rows = [
    { master: 'Launch read v3', format: 'WAV', takes: '6', delivered: 'Today' },
    { master: 'IVR hold', format: 'MP3', takes: '3', delivered: 'Pending' },
  ]; }
