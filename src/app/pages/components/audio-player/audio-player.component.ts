import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlayerService } from '../../../core/services/music-player/player.service';
import { VolumeService } from '../../../core/services/music-player/volume.service';
import { Track } from '../../../shared/models/track.model';
import { NavigationBarComponent } from '../../home/navigation-bar/navigation-bar.component';



@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [TranslateModule, NavigationBarComponent],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent implements AfterViewInit {

  private currentTrack: Track | null = null;
  private isPlaying: boolean = false;

  @ViewChild('audioPlayer')
  audioPlayer!: ElementRef<HTMLAudioElement>;

  currentTime = 0;
  duration = 0;

  currentTimeText = '0:00';
  durationText = '0.00';

  private player!: HTMLAudioElement;

  constructor(private playerService: PlayerService, private volumeService : VolumeService) {
    this.playerService.currentTrack$.subscribe(track => {
      console.log('Received track in audio player component:', track);
      this.currentTrack = track;
    });
  }


  ngOnInit() {
    this.volumeService.volume$.subscribe(volume => {
      this.audioPlayer.nativeElement.volume = volume/100;
    })
    if (this.currentTrack == null) {
      this.currentTrack = {
        id: '',
        title: '',
        artist: '',
        path: '',
        duration: 0,
        addedAt: Date.now()
      };
    }
  }


  ngAfterViewInit() {
        this.player = this.audioPlayer.nativeElement;
    this.player.addEventListener('timeupdate', () => {
      const minutes = Math.floor(this.player.currentTime / 60);
      const seconds = Math.floor(this.player.currentTime % 60)
        .toString()
        .padStart(2, '0');

      this.currentTimeText = `${minutes}:${seconds}`;
      this.currentTime = this.player.currentTime;
      const slider = document.querySelector('.audio-slider') as HTMLElement;
      console.log('Current time:', this.currentTime, 'Duration:', this.duration);
      const fill = ((this.player.currentTime / (this.player.duration || 1)) * 100);
      slider?.style.setProperty('--fill', `${fill}%`);
    });

    this.player.addEventListener('play', () => {
      document.getElementById('play-button')?.setAttribute('src', 'assets/player-icons/pause.svg');
      this.isPlaying = true;
    });

    this.player.addEventListener('pause', () => {
      document.getElementById('play-button')?.setAttribute('src', 'assets/player-icons/play.svg');
      this.isPlaying = false;
    })

    this.player.addEventListener('loadedmetadata', () => {
      const minutes = Math.floor(this.player.duration / 60);
      const seconds = Math.floor(this.player.duration % 60)
      .toString()
      .padStart(2, '0');

      
      this.durationText = `${minutes}:${seconds}`;
      this.duration = this.player.duration;
    });
  }
  
  playMusic() {

    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  useSlider(event: any) {
    this.player.currentTime = event.target.value;
  }

  tenSecBack() {
    this.player.currentTime = Math.max(0, this.player.currentTime - 10);
  }

  tenSecForward() {
    this.player.currentTime = Math.min(this.player.duration, this.player.currentTime + 10);
  }
}