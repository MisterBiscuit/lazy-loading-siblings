import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { componentPath } from '../../shared/helpers';
import { LazyLoadedAListComponent } from './lazy-loaded-a-list/lazy-loaded-a-list.component';

const routes: Routes = [
  { ...componentPath('list', LazyLoadedAListComponent) },
];

@NgModule({
  declarations: [
    LazyLoadedAListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LazyLoadedAListComponent,
  ]
})
export class LazyLoadedAModule { }
