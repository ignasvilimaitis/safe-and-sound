import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VolumeService } from '../../../core/services/music-player/volume.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  constructor(private volumeService: VolumeService) {}

  readValue(input: HTMLInputElement) {
    const value = +input.value;
    this.volumeService.setVolume(value);

  }

  importSong () {
    
  }
}
