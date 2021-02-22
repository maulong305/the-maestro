import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
