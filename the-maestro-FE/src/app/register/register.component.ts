import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { User } from '../model/user';
import { UserDetailService } from '../service/user-detail.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateName = true;
  validateUserName = true;
  validatePassword = true;
  validateEmail = true;
  validatePhoneNumber = true;

  listUser: User[] = [];
  listUserName: string[] = [];

  customer: Customer = {};

  constructor(private userDetailService: UserDetailService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    if ((this.customer.name + '').length > 0 && this.customer.name != undefined) {
      this.validateName = true;
      if ((this.customer.userName + '').length > 5 && this.customer.userName != undefined) {
        for (let i = 0; i < this.listUser.length; i++) {
          if (this.customer.userName == this.listUser[i].username) {
            this.validateUserName = false;
            break;
          } else {
            this.validateUserName = true;
          }
        }
        if (this.validateUserName) {
          if ((this.customer.password + '').length > 5 && this.customer.password != undefined) {
            this.validatePassword = true;
            if (((this.customer.phoneNumber + '').length > 8 && (this.customer.phoneNumber + '').length < 12) && this.customer.phoneNumber != undefined) {
              this.validatePhoneNumber = true
              this.userDetailService.createNewCustomer(this.customer)
                .subscribe(() => {
                  this.router.navigate(["/login"]);
                })
            }else{
              this.validatePhoneNumber = false;
            }
          }else{
            this.validatePassword = false;
          }
        }
      }else{
        this.validateUserName = false;
      }
    }else{
      this.validateUserName = false
    }
  }


}
