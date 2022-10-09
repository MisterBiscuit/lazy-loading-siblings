import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'lazy-loaded-a',
    loadChildren: () => import('./modules/lazy-loaded-a/lazy-loaded-a.module').then(m => m.LazyLoadedAModule),
  },
  {
    path: 'lazy-loaded-b',
    loadChildren: () => import('./modules/lazy-loaded-b/lazy-loaded-b.module').then(m => m.LazyLoadedBModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
