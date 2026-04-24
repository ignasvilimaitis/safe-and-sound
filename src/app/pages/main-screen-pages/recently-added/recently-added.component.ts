import { Component } from '@angular/core';
import { SongGridCardComponent } from '../../components/song-grid-card/song-grid-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatabaseService } from '../../../core/services/database/database.service';
import { CommonModule } from '@angular/common';
import { Track } from '../../../shared/models/track.model';

@Component({
  selector: 'app-recently-added',
  imports: [TranslateModule, SongGridCardComponent, CommonModule],
  templateUrl: './recently-added.component.html',
  styleUrl: './recently-added.component.scss',
  standalone: true,
})
export class RecentlyAddedComponent {
  tracks: Track[] = [];
  constructor(private databaseService: DatabaseService) {
    var receivedTracks = this.databaseService.getLatestTrack(8);
    receivedTracks.then((tracks) => {
      this.tracks = tracks;
      console.log('Received tracks:', tracks);
      console.log('Tracks in component:', this.tracks);
    }
  )
  }
}
