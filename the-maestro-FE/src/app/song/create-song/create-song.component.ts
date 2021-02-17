import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/model/song';
import { SongService } from 'src/app/service/song.service';
import {finalize} from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  song: Song = {};
  selectedImage: any = null;
  selectedFile: any = null;
  createSuccess = false;
  username: any;
  currentUser: any;

  constructor(private activatedRoute: ActivatedRoute,
     private songService: SongService, 
     private router: Router,
     private authService: AuthService,
     private readonly storage: AngularFireStorage,) {
      this.authService.currentUserSubject.subscribe(value => {
        this.currentUser = value;
      })
      }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username)
    })
  }
  createSong(){
    return this.songService.createSong(this.song, this.currentUser.username).subscribe(value => {
      this.song = value;
    })
  }
  submit(){ // Tai anh len firebase, lua duong dan vao db.
    console.log(this.song.name)
    const filePath = `${this.song.name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => { // Lay duong dan tren anh
          this.song.avatar = url;
          await this.submitFile();
          this.createSuccess = false;
        });
      })
    ).subscribe();
  }
  submitFile(){ // Tai file nhac len firebase, lua duong dan vao db.
    const filePathFile = `${this.song.name}/${this.selectedFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePathFile);
    this.storage.upload(filePathFile, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => { // Lay duong dan tren file
          this.song.file = url;
          await this.createSong();
          this.createSuccess = true;
        });
      })
    ).subscribe();
  }
  // tslint:disable-next-line:typedef
  showPreview(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }
  }
  showPreviewFile(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

}
