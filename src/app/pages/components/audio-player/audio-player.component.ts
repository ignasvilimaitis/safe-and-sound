import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlayerService } from '../../../core/services/music-player/player.service';
import { Track } from '../../../shared/models/track.model';


@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent {

  private currentTrack = this.playerService.currentTrack$;


  constructor(private playerService: PlayerService) {

  }
}
