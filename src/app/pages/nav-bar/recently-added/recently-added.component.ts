import { Component } from '@angular/core';
import { SongGridCardComponent } from '../../components/song-grid-card/song-grid-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recently-added',
  imports: [TranslateModule, SongGridCardComponent],
  templateUrl: './recently-added.component.html',
  styleUrl: './recently-added.component.scss',
  standalone: true,
})
export class RecentlyAddedComponent {

}
