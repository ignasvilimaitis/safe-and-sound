import { Component, inject } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainScreenComponent} from './pages/home/main-screen/main-screen.component';
import { SidebarBottomComponent } from './pages/home/sidebar-bottom/sidebar-bottom.component';
import { SidebarTopComponent } from './pages/home/sidebar-top/sidebar-top.component';
import { MainPageNavbarComponent } from './pages/components/main-page-navbar/main-page-navbar.component';
import { NavigationBarComponent } from './pages/home/navigation-bar/navigation-bar.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HomeComponent, RouterOutlet, MainScreenComponent,
       SidebarBottomComponent, SidebarTopComponent, MainPageNavbarComponent, NavigationBarComponent]
})
export class AppComponent {
  private electronService = inject(ElectronService);
  private translate = inject(TranslateService);

  constructor() {
    const electronService = this.electronService;

    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
}
