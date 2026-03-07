import { Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
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
export class AudioPlayerComponent {

  private currentTrack: Track | null = null;
  private isPlaying: boolean = false;

  @ViewChild('audioPlayer')
  audioPlayer!: ElementRef<HTMLAudioElement>;
  

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

