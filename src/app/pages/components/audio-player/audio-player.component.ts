import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlayerService } from '../../../core/services/music-player/player.service';
import { Track } from '../../../shared/models/track.model';



@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [TranslateModule],
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

  ngAfterViewInit() {
    const player = this.audioPlayer.nativeElement;
    
    player.addEventListener('timeupdate', () => {
      const minutes = Math.floor(player.currentTime / 60);
      const seconds = Math.floor(player.currentTime % 60)
        .toString()
        .padStart(2, '0');

      this.currentTimeText = `${minutes}:${seconds}`;
      this.currentTime = player.currentTime;
    });

    player.addEventListener('loadedmetadata', () => {
      const minutes = Math.floor(player.duration / 60);
      const seconds = Math.floor(player.duration % 60)
      .toString()
      .padStart(2, '0');

      this.durationText = `${minutes}:${seconds}`;
      this.duration = player.duration;
});
  }
  

  playMusic() {
    const player = this.audioPlayer.nativeElement;
    if (this.isPlaying == true) {
          player.pause();
          document.getElementById('play-button')?.setAttribute('src', 'assets/player-icons/play.svg');
          this.isPlaying = false;
    } else {
          player.play();
          this.isPlaying = true;
          document.getElementById('play-button')?.setAttribute('src', 'assets/player-icons/pause.svg');
    }
    
  }

  constructor(private playerService: PlayerService) {
    this.playerService.currentTrack$.subscribe(track => {
      this.currentTrack = track;
    });
  }

  }

