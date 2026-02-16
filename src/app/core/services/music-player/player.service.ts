import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Track } from "../../../shared/models/track.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerService { 
    private currentTrack = new BehaviorSubject<Track | null>(null);
    currentTrack$ = this.currentTrack.asObservable();

    setTrack(track: Track) {
        this.currentTrack.next(track);
    }
}
