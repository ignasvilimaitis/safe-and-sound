import { Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TrackUploadService {
    private ipc = (window as any).require('electron').ipcRenderer;

    async uploadTracks() { 
        const tracks = await this.ipc.invoke('open-file-dialog');
        if (tracks.length) {
            await this.ipc.invoke('save-tracks', tracks);
        }
    }
}
