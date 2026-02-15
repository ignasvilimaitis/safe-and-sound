import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarTopComponent } from '../pages/home/sidebar-top/sidebar-top.component';
import { SidebarBottomComponent } from '../pages/home/sidebar-bottom/sidebar-bottom.component';
import { MainScreenComponent } from '../pages/home/main-screen/main-screen.component';
import { NavigationBarComponent } from '../pages/home/navigation-bar/navigation-bar.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [RouterLink,
      TranslateModule,
      MainScreenComponent,
      SidebarTopComponent,
      SidebarBottomComponent,
      NavigationBarComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

}
