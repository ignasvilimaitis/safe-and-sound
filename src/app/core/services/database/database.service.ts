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
            console.log('Tracks fetched for sidebar-top:', tracks);
            this.tracksSubject.next(tracks);
            return tracks;
        } catch (err) {
            console.error('getTracks error:', err);
            return [];
        }
    }

    async getLatestTrack(number: number) {
        try {
            const tracks = await this.ipc.invoke('get-latest-track', number);
            console.log('Latest track fetched for recently-added:', tracks);
            return tracks;
        } catch (err) {
            console.error('getLatestTrack error:', err);
            return null;
        }
    }

    async updateLastPlayed(id: string) {
        try {
            const result = await this.ipc.invoke('update-last-played', id);
            return result;
        } catch (err) {
            console.error('updateLastPlayed error:', err);
            return null;
        }
    }

    async getRecentTracks(number: number) {
        try {
            const tracks = await this.ipc.invoke('get-recent-tracks', number);
            return tracks;
        }
        catch (err) {
            console.error('Retrieving recent tracks error:', err);
            return null;
        }
    }
}