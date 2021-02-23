import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentSong } from '../model/commentSong';
import { AuthService } from './auth.service';
const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class CommentSongService {
  currentUser : any;
  constructor(private authService : AuthService,private http: HttpClient) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if(this.currentUser){
      }
    })
  }

  getListCommentSongBySongId(songId : number): Observable<CommentSong[]>{
    return this.http.get<CommentSong[]>(API_URL + `/commentSong/${songId}`)
  }
  postCommentSong(songId : number,username: string, commentSong : CommentSong):Observable<CommentSong>{
    return this.http.post<CommentSong>(API_URL + `/commentSong/${songId}/${username}`,commentSong)
  }
}
