import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-queue', templateUrl: './queue.component.html', styleUrl: './queue.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class QueueComponent { protected readonly rows = [
    { asset: 'Lookbook-2048', preset: 'Warm skin', status: 'In progress', editor: 'Dev Poluru' },
    { asset: 'Product-9912', preset: 'Catalog flat', status: 'Queued', editor: 'Ananya Poluru' },
  ]; }
