import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from '../model/song';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private httpClient: HttpClient) { }
  createSong(song: Song, username: string): Observable<Song>{
    return this.httpClient.post<Song>(API_URL + `/songs/create/${username}`, song)
  }
  listSong(): Observable<Song[]>{
    return this.httpClient.get<Song[]>(API_URL +`/songs/`)
  }
  getSongById(id: number): Observable<Song>{
    return this.httpClient.get<Song>(API_URL + `/songs/${id}`)
  }
}
