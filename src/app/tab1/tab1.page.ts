import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  user: any;
  restaurants: any;
  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.authService.getUser()
    console.log(this.user)
    if (!this.user) {
      this.router.navigate(['../../login'], {relativeTo: this.route});
    }
    else {
      this.http.get(`http://localhost:8000/corkboard/users/${this.user.id}/restaurants`).subscribe((restaurants)=> {
        console.log(restaurants)
        this.restaurants = restaurants
        console.log(this.restaurants)
      })
    }
  }

  getStarColor(index: number, starNumber: number) {
    if (starNumber <= this.restaurants[index].user_rating) {
      return "yellow";
    }
    return "grey"
  }
  refresh() {
    this.http.get(`http://localhost:8000/corkboard/users/${this.user.id}/restaurants`).subscribe((restaurants)=> {
      console.log(restaurants)
      this.restaurants = restaurants
      console.log(this.restaurants)
    })
  }
}
