import { Component } from '@angular/core';

@Component({
  selector: 'do-pages',
  template: `
    <do-common-layout>
      <router-outlet></router-outlet>
    </do-common-layout>
  `,
})
export class PagesComponent {
}
