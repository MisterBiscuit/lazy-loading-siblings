import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <p>Not found</p>
    <a routerLink="/dashboard">Dashboard</a>
  `,
})
export class NotFoundComponent {
}
