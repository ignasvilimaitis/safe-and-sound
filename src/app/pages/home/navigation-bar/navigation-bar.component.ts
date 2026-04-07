import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VolumeService } from '../../../core/services/music-player/volume.service';
import { TrackUploadService } from '../../../core/services/music-player/trackupload.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  constructor(private volumeService: VolumeService, private trackUploadService: TrackUploadService) {
    const volume = this.volumeService.volume$;
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider?.style.setProperty('--fill', `${volume}%`);
  }

  adjustSlider(input: HTMLInputElement) {
    const value = +input.value;
    console.log(value);
    this.volumeService.setVolume(value);
      const volumeSlider = document.getElementById('volumeSlider');
      volumeSlider?.style.setProperty('--fill', `${value}%`);
  }

  importSong () {
    this.trackUploadService.uploadTracks();
  }
}
