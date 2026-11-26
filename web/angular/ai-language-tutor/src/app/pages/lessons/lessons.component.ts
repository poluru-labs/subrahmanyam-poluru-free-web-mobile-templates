import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-lessons', templateUrl: './lessons.component.html', styleUrl: './lessons.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class LessonsComponent { protected readonly rows = [
    { lesson: 'Past tense drill', level: 'B1', duration: '45m', tutor: 'Mira Poluru' },
    { lesson: 'Business email', level: 'B2', duration: '60m', tutor: 'Ananya Poluru' },
  ]; }
