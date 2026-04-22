import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
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

  activePath: string = '/recently-added'; // default active path

  navItems = [
    { label: 'Recently Added', path: '/recently-added' },
    { label: 'Playlists', path: '/playlists' },
    { label: 'Added Albums', path: '/added-albums' },
  ];

  constructor(private router: Router) { }

    ngOnInit(): void {
    console.log('MainPageNavbarComponent INIT');
    console.log('Current active path:', this.activePath);
  }

  onClicked(path: string) {
    this.activePath = path;
    console.log('New active path:', path);
    this.router.navigate([path]);

  }
}
