import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-song-card',
  imports: [TranslateModule],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss',
})
export class SongCardComponent {
  imgSize = 100;
  artist = 'Midrift • ';
  img = 'assets/icons/safeandsound.jpg';
  text = 'Safe and Sound';
  album = 'Safe and Sound';


}
