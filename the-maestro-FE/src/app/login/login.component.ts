import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../model/user';
import { UserToken } from '../model/user-token';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: UserToken | undefined;
  isLogged = false;
  isLogginFailed = false;
  errorMessage = '';
  user: User = {
    username: '',
    password: '',
  };
  returnUrl = "";
  url = '/profile/' + this.user.username;

  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
      this.authService.currentUser.subscribe(value => {
        this.currentUser = value
      })
     }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }
  login(){
    this.authService.login(this.user.username, this.user.password)
    .pipe(first())
    .subscribe(data => {
      this.router.navigate(['/songs/']);
      this.isLogged = true;
      this.isLogginFailed = false;
    }, err => {
      this.isLogginFailed = true;
      this.errorMessage = err.error.errorMessage;
    });
  }

}
