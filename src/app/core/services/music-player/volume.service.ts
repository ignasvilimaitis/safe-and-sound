import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// volume.service.ts
@Injectable({ providedIn: 'root' })
export class VolumeService {
  private volume = new BehaviorSubject<number>(25); 
  volume$ = this.volume.asObservable();

  setVolume(value: number) {
    this.volume.next(value);
  }
}