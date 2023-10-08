import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  selectGender(gender: string) {
    // Navega a la página de productos con el género seleccionado
    this.router.navigate(['/productos', gender]);
  }
}
