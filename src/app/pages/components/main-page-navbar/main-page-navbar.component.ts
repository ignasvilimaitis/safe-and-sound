import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { NavbarPillComponent } from '../navbar-pill/navbar-pill.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-main-page-navbar',
  imports: [TranslateModule, RouterLink, RouterOutlet, NavbarPillComponent, CommonModule],
  templateUrl: './main-page-navbar.component.html',
  styleUrl: './main-page-navbar.component.scss',
  standalone: true,
})
export class MainPageNavbarComponent implements OnInit {

  activePath: string = '/recently-added';

  navItems = [
    { label: 'Recently Added', path: '/recently-added' },
    { label: 'Playlists', path: '/playlists' },
    { label: 'Added Albums', path: '/added-albums' },
  ];

  constructor() { }

    ngOnInit(): void {
    console.log('MainPageNavbarComponent INIT');
    console.log('Current active path:', this.activePath);
  }

  onNavItemClicked(path: string) {
    console.log('Nav item clicked:', path);
    this.activePath = path;
  }
}
