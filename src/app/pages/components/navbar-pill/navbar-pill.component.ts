import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-pill',
  imports: [],
  templateUrl: './navbar-pill.component.html',
  styleUrl: './navbar-pill.component.scss',
})
export class NavbarPillComponent {
  @Input() label: string = '';
  @Input() path: string = '';
  @Input() isActive = false;

  constructor(private router: Router) {}


  navigate() {
    this.router.navigate([this.path]);
  }
}
