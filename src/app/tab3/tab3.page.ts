import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoadingController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: any;

  constructor(private loadingCtrl: LoadingController, private http: HttpClient, public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['../../login'], {relativeTo: this.route});
    }
    console.log(this.user)
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['../../login'], {relativeTo: this.route});
  }
}
