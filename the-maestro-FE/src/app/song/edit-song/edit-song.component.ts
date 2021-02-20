import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Song } from 'src/app/model/song';
import { UserDetail } from 'src/app/model/userDetail';
import { AuthService } from 'src/app/service/auth.service';
import { SongService } from 'src/app/service/song.service';
import { UserDetailService } from 'src/app/service/user-detail.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  /**
   * ID of the Song
   */
  id: number = -1;
  /**
   * The current selected Song
   */
  song: Song = {};
  currentUser: any;
  editSuccess = false;
  selectImg: any = null;
  username: any;
  userdetail: UserDetail = {};

  constructor(private storage: AngularFireStorage, 
              private authService: AuthService, 
              private songService: SongService, 
              private activatedRoute: ActivatedRoute, 
              private  route: Router,
              private userDetailService : UserDetailService) { 
                this.authService.currentUserSubject.subscribe(value => {
                  this.currentUser = value;
                });
              }

  ngOnInit(): void {
    this.editSuccess = false;
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      // 1 - check null
      // 2 - parseInt
      let _id = paramMap.get('id')
      if (_id != null) {
        this.id = parseInt(_id)
      } else {
        throw new Error("No ID in params")
      }
      this.songService.getSongById(this.id).subscribe(song => {
        this.song = song;
      });
    });
  }
  editSong(){
      this.songService.editSong(this.currentUser.username, this.id, this.song).subscribe(() => {
      this.editSuccess = true;
    })
  }
  cancel() {
    this.route.navigate(['/songs/' + this.currentUser.username]);
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectImg = event.target.files[0];
      this.submit();
    } else {
      this.selectImg = null;
    }
  }
  submit() { // Tai anh len firebase, lua duong dan vao db.
    const filePath = `${this.song.name}/${this.selectImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => { // Lay duong dan tren anh
          this.song.avatar = url;
        });
      })
    ).subscribe();
  }

}
