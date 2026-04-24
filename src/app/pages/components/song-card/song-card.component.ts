import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Track } from '../../../shared/models/track.model';
import { PlayerService } from '../../../core/services/music-player/player.service';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../../core/services/database/database.service';

@Component({
  selector: 'app-song-card',
  imports: [TranslateModule, CommonModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  @Input() track: any

  onClick () {
    this.databaseService.updateLastPlayed(this.track.id);
    this.playerService.setTrack(this.track);
        console.log('Track set to :', this.track);
  }

  constructor(private playerService: PlayerService, private databaseService: DatabaseService) {
    
  }
}
