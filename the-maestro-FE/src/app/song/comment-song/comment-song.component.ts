import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentSong } from 'src/app/model/commentSong';
import { UserDetail } from 'src/app/model/userDetail';
import { AuthService } from 'src/app/service/auth.service';
import { CommentSongService } from 'src/app/service/comment-song.service';
import { UserDetailService } from 'src/app/service/user-detail.service';

@Component({
  selector: 'app-comment-song',
  templateUrl: './comment-song.component.html',
  styleUrls: ['./comment-song.component.css']
})
export class CommentSongComponent implements OnInit {
  idSong : number = -1;
  listCommentSong : CommentSong[] = [];
  listCommentSongFull : CommentSong[] = [];
  currentUser : any;
  userDetail : UserDetail = {};
  userDetailOldComment : UserDetail | undefined;
  userDetails : UserDetail[] = [];
  avatar : any;
  commentSong : CommentSong = {};
  numberCommentShow = 5;
  constructor(private route: Router, private userDetailService : UserDetailService,private commentSongService : CommentSongService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    activatedRoute.paramMap.subscribe( async paramMap => {
      let _id = paramMap.get('id');
      if (_id != null) {
        this.idSong = parseInt(_id);
        await this.getListCommentSong();
      }
      
    })
  }
  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(async value => {
      this.currentUser = value;
      await this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(value1 => {
        this.userDetail = value1;
        this.avatar = this.userDetail.avatar;
      })
    })
  }
  getListUserDetailByUsername(username: any){
    return this.userDetailService.getUserDetailByUserName(username).toPromise();
  }
  getListCommentSong(){
    this.commentSongService.getListCommentSongBySongId(this.idSong).subscribe( async (list: CommentSong[]) => {
      this.listCommentSongFull = list;
      this.listCommentSong = this.listCommentSongFull.splice(0,this.numberCommentShow);
      for (let i = 0; i < this.numberCommentShow; i++) {

        // @ts-ignore
        this.userDetailOldComment = await this.getListUserDetailByUsername(this.listCommentSong[i].user.username);
        this.userDetails.push(this.userDetailOldComment);
      }
    });
  }

  postComment(){
    this.commentSongService.postCommentSong(this.idSong,this.currentUser.username,this.commentSong).subscribe(async () =>{
      this.getListCommentSong()
      this.commentSong.content = ''
    })
  }
  showMore(){
    this.numberCommentShow += 5;
    this.getListCommentSong();
  }
}
