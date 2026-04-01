import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private get ipc() {
        return (window as any).require('electron').ipcRenderer;
    }

    async getTracks() {
        try {
            const tracks = await this.ipc.invoke('get-tracks');
            console.log('Tracks fetched:', tracks);
            return tracks;
        } catch (err) {
            console.error('getTracks error:', err);
            return [];
        }
    }
}