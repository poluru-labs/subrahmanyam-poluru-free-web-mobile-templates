import { Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about.page';
import { CheckinsPageComponent } from './pages/checkins.page';
import { ClassesPageComponent } from './pages/classes.page';
import { ContactPageComponent } from './pages/contact.page';
import { DashboardPageComponent } from './pages/dashboard.page';
import { DocsPageComponent } from './pages/docs.page';
import { MembersPageComponent } from './pages/members.page';
import { MembershipsPageComponent } from './pages/memberships.page';
import { TrainersPageComponent } from './pages/trainers.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardPageComponent },
  { path: 'members', component: MembersPageComponent },
  { path: 'trainers', component: TrainersPageComponent },
  { path: 'classes', component: ClassesPageComponent },
  { path: 'checkins', component: CheckinsPageComponent },
  { path: 'memberships', component: MembershipsPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'docs', component: DocsPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '**', redirectTo: '' }
];
