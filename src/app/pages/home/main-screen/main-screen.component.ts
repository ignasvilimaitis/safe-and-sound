import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageNavbarComponent } from '../../components/main-page-navbar/main-page-navbar.component';

@Component({
  selector: 'app-main-screen',
  imports: [TranslateModule, MainPageNavbarComponent],
  standalone: true,
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
})
export class MainScreenComponent {

}
