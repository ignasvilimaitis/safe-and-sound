import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Track } from '../../../shared/models/track.model';
import { PlayerService } from '../../../core/services/music-player/player.service';

@Component({
  selector: 'app-song-card',
  imports: [TranslateModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {

  private track : Track = {
    path: "assets/icons/safeandsound.jpg",
    id: '1',
    title: 'Safe and Sound',
    artist: 'Midrift',
    album: 'Safe and Sound',
    duration: 240,
      addedAt: Date.now(),
      modifiedAt: Date.now()
  };

  onClick () {
    this.playerService.setTrack(this.track);
    console.log('Track set to:', this.track);
  }

  constructor(
    private playerService: PlayerService
  ) {

  }
}
