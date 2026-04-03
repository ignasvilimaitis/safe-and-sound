import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';
import { DatabaseService } from '../../../core/services/database/database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-top',
  imports: [TranslateModule, SongCardComponent, CommonModule],
  templateUrl: './sidebar-top.component.html',
  styleUrl: './sidebar-top.component.scss',
  standalone: true
})
export class SidebarTopComponent implements OnInit{
  tracks$ = this.databaseService.tracks$;

  constructor(private databaseService: DatabaseService) {}

  async ngOnInit() {
    await this.databaseService.getTracks();
    console.log('Tracks in sidebar-top:', this.tracks$);
    };
  }

