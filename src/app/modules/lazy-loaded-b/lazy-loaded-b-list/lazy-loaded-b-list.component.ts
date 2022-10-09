import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-loaded-b-list',
  templateUrl: './lazy-loaded-b-list.component.html',
})
export class LazyLoadedBListComponent {

  public readonly list: string[] = [
    'B One',
    'B Two',
    'B Three',
    'B Four',
    'B Five',
    'B Six',
  ];
}
