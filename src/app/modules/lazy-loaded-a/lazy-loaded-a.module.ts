import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadedAListComponent } from './lazy-loaded-a-list/lazy-loaded-a-list.component';

const routes: Routes = [
  { path: 'list', component: LazyLoadedAListComponent },
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
