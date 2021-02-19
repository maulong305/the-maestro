import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { UserDetail } from '../model/userDetail';
import { AuthService } from '../service/auth.service';
import { UserDetailService } from '../service/user-detail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isUserLogin = false;
  currentUser: any;
  userDetail: UserDetail= {};
  username: any;
  editProfile = true;
  changePass = true;
  newPass: string | undefined;
  oldPass: string | undefined;
  checkPass : string | undefined ;
  checkPassMessage = true;
  changePassSuccess = true;
  oldPassMessage = true;
  customer: Customer = {};
  path = '';
  selectImg: any = null;
  title = 'uploadfile';
  imgSrc: any;

  constructor(private router: Router,
              private storage: AngularFireStorage, 
              private authService: AuthService,
              private userDetailService: UserDetailService,
              private activatedRouter: ActivatedRoute) {
                this.authService.currentUserSubject.subscribe(value => {
                  this.currentUser = value;
                  if(this.currentUser){
                    this.isUserLogin = true;
                  }
                })
               }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(value => {
        this.userDetail = value;
        this.imgSrc = this.userDetail.avatar;
      })
    })
  }
  showEditForm(){
    this.editProfile = false;
  }
  editSuccess(){
    this.customer.name = this.userDetail.name;
    this.customer.address = this.userDetail.address;
    this.customer.phoneNumber = this.userDetail.phoneNumber;
    this.customer.email = this.userDetail.email;
    this.userDetailService.editUserDetail(this.currentUser.username, this.customer).subscribe(() => {
      this.editProfile = true;
    })
  }
  cancelEdit(){
    this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(userDetail =>{
      this.userDetail = userDetail;
    })
    this.editProfile = true;
  }
  changePassword(){
    this.changePass = !this.changePass;
  }
  changePasswordSuccess(){
    console.log(JSON.parse(localStorage.getItem('password') as string))
    console.log((this.newPass + '').length);
    if (JSON.parse(localStorage.getItem('password') as string) == this.oldPass){
      this.oldPassMessage = true;
      if (this.newPass != undefined){
        if(this.checkPass == this.newPass && (this.newPass + '').length > 5){
          this.checkPassMessage = true;
          this.customer.password = this.newPass;
          this.userDetailService.editUserDetail(this.currentUser.username, this.customer).subscribe(() => {
            this.changePassSuccess = false;
          });
        }else {
          this.checkPassMessage = false;
        }
      }else {
        this.checkPassMessage = false;
      }
    }else {
      this.oldPassMessage = false;
    }
  }
  submit(){
    if (this.selectImg != null){
      const filePath = `avatar/${this.selectImg.name.split(',').slice(0, -1).join(',')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe( async url => {
            this.imgSrc = url;
            this.customer.avatar = url.toString();
            this.customer.name = this.userDetail.name;
            this.customer.address = this.userDetail.address;
            this.customer.phoneNumber = this.userDetail.phoneNumber;
            this.customer.email = this.userDetail.email;
            console.log(url.toString())
            await this.userDetailService.editUserDetail(this.currentUser.username,this.customer).toPromise();
          });
        })
      ).subscribe();
    }
  }
  showPreview(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectImg = event.target.files[0];
      this.submit();
      console.log(this.imgSrc)
    }else {
      this.imgSrc = '';
      this.selectImg = null;
    }
  }
  addSong(){
    this.router.navigate(["/songs/create/" + this.currentUser.username]);
  }
  listSong(){
    this.router.navigate(["/songs/" + this.currentUser.username]);
  }
  
}
