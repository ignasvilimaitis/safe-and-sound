import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { APP_CONFIG } from './environments/environment';
import { CoreModule } from './app/core/core.module';
import { SharedModule } from './app/shared/shared.module';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import { PageNotFoundComponent } from './app/shared/components';
import { HomeComponent } from './app/home/home.component';
import { DetailComponent } from './app/detail/detail.component';
import { RecentlyAddedComponent } from './app/pages/main-screen-pages/recently-added/recently-added.component';
import { PlaylistsComponent } from './app/pages/main-screen-pages/playlists/playlists.component';
import { AddedAlbumsComponent } from './app/pages/main-screen-pages/added-albums/added-albums.component';

if (APP_CONFIG.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    provideRouter([
      {
        path: '',
        redirectTo: 'recently-added',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path:'recently-added',
        component: RecentlyAddedComponent
      },
      {
        path: 'playlists',
        component: PlaylistsComponent
      },
      {
        path: 'added-albums',
        component: AddedAlbumsComponent
      },
      {
        path: 'detail',
        component: DetailComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]),
    importProvidersFrom(
      CoreModule,
      SharedModule
    )
  ]
}).catch(err => console.error(err));
