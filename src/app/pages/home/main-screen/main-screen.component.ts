import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageNavbarComponent } from '../../components/main-page-navbar/main-page-navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-screen',
  imports: [TranslateModule, MainPageNavbarComponent, RouterOutlet, CommonModule],
  standalone: true,
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
})
export class MainScreenComponent {

}
