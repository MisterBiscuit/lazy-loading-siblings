import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { componentPath } from '../../shared/helpers';
import { LazyLoadedAModule } from '../lazy-loaded-a/lazy-loaded-a.module';
import { LazyLoadedBListComponent } from './lazy-loaded-b-list/lazy-loaded-b-list.component';

const routes: Routes = [
  { ...componentPath('list', LazyLoadedBListComponent) },
];

@NgModule({
  declarations: [
    LazyLoadedBListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LazyLoadedAModule,
  ]
})
export class LazyLoadedBModule { }
