import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing-component/landing-component';

export const routes: Routes = [
{
    path: '',
    component: LandingComponent,
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-component/home-component').then(m => m.HomeComponent),
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/projects-component/projects-component').then(m => m.ProjectsComponent),
  },
  {
    path: 'info',
    loadComponent: () =>
      import('./pages/info-component/info-component').then(m => m.InfoComponent),
  }
];