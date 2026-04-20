import { Component } from '@angular/core';
import { Track } from '../../../shared/models/track.model';

@Component({
  selector: 'app-song-grid-card',
  imports: [],
  templateUrl: './song-grid-card.component.html',
  styleUrl: './song-grid-card.component.scss',
  standalone: true,
})
export class SongGridCardComponent {
 track: Track = {
  id: '',
  title: 'Unknown Title',
  artist: 'Unknown Artist',
  album: 'Unknown Album',
  duration: 0,
  path: '',
  addedAt: 0,
  };
}
