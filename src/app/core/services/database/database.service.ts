import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private tracksSubject = new BehaviorSubject<any[]>([]);
    tracks$ = this.tracksSubject.asObservable();
    

    private get ipc() {
        return (window as any).require('electron').ipcRenderer;
    }

    async getTracks() {
        try {
            const tracks = await this.ipc.invoke('get-tracks');
            console.log('Tracks fetched:', tracks);
            this.tracksSubject.next(tracks);
            return tracks;
        } catch (err) {
            console.error('getTracks error:', err);
            return [];
        }
    }
}