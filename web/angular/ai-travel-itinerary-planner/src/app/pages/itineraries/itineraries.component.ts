import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-itineraries', templateUrl: './itineraries.component.html', styleUrl: './itineraries.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ItinerariesComponent { protected readonly rows = [
    { leg: 'Flight out', trip: 'Austin summit', status: 'Booked', coordinator: 'Ananya Poluru' },
    { leg: 'Hotel block', trip: 'Chicago onsite', status: 'Pending', coordinator: 'Meera Poluru' },
  ]; }
