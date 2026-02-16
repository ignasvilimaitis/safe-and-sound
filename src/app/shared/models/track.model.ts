export interface Track {
  id: string;

  path: string;     
  url?: string;        

  title: string;
  artist: string;
  album?: string;
  albumArtist?: string;

  duration: number;
  trackNo?: number;
  discNo?: number;
  year?: number;
  genre?: string;

  bitrate?: number;
  sampleRate?: number;

  artworkId?: string; 
  artworkUrl?: string;  

  addedAt: number;    
  modifiedAt: number;  
}
