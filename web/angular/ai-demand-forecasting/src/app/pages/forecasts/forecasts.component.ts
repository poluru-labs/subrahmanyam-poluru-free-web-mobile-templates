import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-forecasts', templateUrl: './forecasts.component.html', styleUrl: './forecasts.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ForecastsComponent {
  protected readonly rows: Array<{ region: string; horizon: string; accuracy: string; owner: string }> = [
    { region: 'North America', horizon: '13w', accuracy: '92%', owner: 'Dev Poluru' },
    { region: 'EU', horizon: '13w', accuracy: '89%', owner: 'Ananya Poluru' },
  ];
}
