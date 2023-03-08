import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.css']
})
export class LoginPage {
  userFound = true;
  username = "";
  first_name = "";
  last_name = "";
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  login() {
    if(this.authService.login(this.username) == null) {
      this.userFound = false;
    }
    else {
      this.router.navigate(['../tabs'], {relativeTo: this.route});
    }
  }
  create_account() {
    // this.http.post...
    this.router.navigate(['../tabs'], {relativeTo: this.route});
  }
}
