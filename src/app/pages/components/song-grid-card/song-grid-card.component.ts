import { Component, Input } from '@angular/core';
import { PlayerService } from '../../../core/services/music-player/player.service';

@Component({
  selector: 'app-song-grid-card',
  imports: [],
  templateUrl: './song-grid-card.component.html',
  styleUrl: './song-grid-card.component.scss',
  standalone: true,
})
export class SongGridCardComponent {
  @Input() track: any

  constructor(private playerService: PlayerService) {
    if (this.track == null) {
      this.track = {
        id: '1',
        title: 'Sample Track',
        artist: 'Sample Artist',
        album: 'Sample Album',
        artworkUrl: 'https://via.placeholder.com/150',
        path: '',
        duration: 0,
        addedAt: Date.now(),
      }
  }
  }

  playTrack() {
    console.log('Playing track:', this.track);
    this.playerService.setTrack(this.track);
  }

}
