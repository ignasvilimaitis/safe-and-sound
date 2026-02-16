import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';

@Component({
  selector: 'app-sidebar-bottom',
  imports: [TranslateModule, AudioPlayerComponent],
  templateUrl: './sidebar-bottom.component.html',
  styleUrl: './sidebar-bottom.component.scss',
  standalone: true
})
export class SidebarBottomComponent {

}
