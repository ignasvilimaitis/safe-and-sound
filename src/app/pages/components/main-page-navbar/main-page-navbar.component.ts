import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-page-navbar',
  imports: [TranslateModule, RouterLink, RouterOutlet],
  templateUrl: './main-page-navbar.component.html',
  styleUrl: './main-page-navbar.component.scss',
  standalone: true,
})
export class MainPageNavbarComponent implements OnInit {

  constructor() { }

    ngOnInit(): void {
    console.log('MainageNavbarComponent INIT');
  }
}
