import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';

@Component({
  selector: 'app-sidebar-top',
  imports: [TranslateModule, SongCardComponent],
  templateUrl: './sidebar-top.component.html',
  styleUrl: './sidebar-top.component.scss',
  standalone: true
})
export class SidebarTopComponent {

  onClick() {
    
  }

}
