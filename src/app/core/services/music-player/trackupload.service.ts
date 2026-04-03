import { Injectable} from "@angular/core";
import { DatabaseService } from "../database/database.service";

@Injectable({
    providedIn: 'root'
})
export class TrackUploadService {
    constructor(private databaseService: DatabaseService) {}
    private ipc = (window as any).require('electron').ipcRenderer;

    async uploadTracks() { 
        const tracks = await this.ipc.invoke('open-file-dialog');
        if (tracks.length) {
            await this.ipc.invoke('save-tracks', tracks);
            await this.databaseService.getTracks(); // Refresh the tracks in the service after saving to the database
        }
    }
}
