import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-trips', templateUrl: './trips.component.html', styleUrl: './trips.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class TripsComponent { protected readonly rows = [
    { trip: 'Austin summit', travelers: '6', depart: 'Nov 4', owner: 'Ananya Poluru' },
    { trip: 'Chicago onsite', travelers: '3', depart: 'Nov 8', owner: 'Rohan Poluru' },
  ]; }
