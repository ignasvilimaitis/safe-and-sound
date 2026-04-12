import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
export class NavigationBarComponent implements AfterViewInit{
  public volumeValue!: number;
  @ViewChild('volumeSlider') sliderRef!: ElementRef<HTMLInputElement>;

  constructor(private volumeService: VolumeService, private trackUploadService: TrackUploadService) {
    this.volumeValue = this.volumeService.getVolume();
  }

  ngAfterViewInit() {
    this.sliderRef.nativeElement.style.setProperty('--fill', `${this.volumeValue}%`);
  }

  adjustSlider(input: HTMLInputElement) {
    const value = +input.value;
    this.volumeService.setVolume(value);
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider?.style.setProperty('--fill', `${value}%`);
  }

  importSong () {
    this.trackUploadService.uploadTracks();
  }
}
