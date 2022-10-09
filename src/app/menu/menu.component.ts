import { Component } from '@angular/core';

interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent {

  public readonly links: ILink[] = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/lazy-loaded-a/list', label: 'A List' },
    { path: '/lazy-loaded-b/list', label: 'B List' },
  ];
}
