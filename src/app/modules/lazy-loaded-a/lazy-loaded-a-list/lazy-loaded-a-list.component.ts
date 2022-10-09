import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-loaded-a-list',
  templateUrl: './lazy-loaded-a-list.component.html',
})
export class LazyLoadedAListComponent {

  public readonly list: string[] = [
    'A 1',
    'A 2',
    'A 3',
    'A 4',
    'A 5',
  ];
}
