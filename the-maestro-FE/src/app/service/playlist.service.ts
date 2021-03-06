import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playlist } from '../model/playlist';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {}
  
  create(playlist: Playlist, username: String): Observable<Playlist> {
    return this.http.post<Playlist>(API_URL + `/playlists/create/${username}`, playlist);
  }
  getAllPlayList(username: String): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + `/playlists/list/${username}`);
  }
  gestLatest(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(API_URL + `/playlists/latest`);
  }
  addSongToPlaylist(idSong: number, idPlaylist: number): Observable<Playlist> {
    // @ts-ignore
    return this.http.post<Playlist>(API_URL + `/playlists/${idPlaylist}/songs/${idSong}`);
  }
  getTrackPlaylist(id: number): Observable<Track[]> {
    return this.http.get<Track[]>(API_URL + `/playlists/play/${id}`);
  }
  getPlayListById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(API_URL + `/playlists/${id}`);
  }
  
}
