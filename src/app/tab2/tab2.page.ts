import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Geolocation} from "@capacitor/geolocation";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ratingsSubmitted = false;
  ratings: number[] = [0, 0, 0, 0, 0];
  dishes = ['mexican_dish.jpeg', 'greek_dish.avif', 'pizza_dish.webp', 'salad_dish.webp', 'sandwich_dish.webp']
  allRated = false;
  user: any;
  suggestions: any = null;
  current_suggestion: number = 0;

  constructor(public http: HttpClient, public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user)
    if (!this.user) {
      this.router.navigate(['../../login'], {relativeTo: this.route});
    }
  }

  rateDish(index: number, rating: number) {
    this.ratings[index] = rating;
    this.allRated = true;
    this.ratings.forEach((rating) => {
      if (rating == 0) {
        this.allRated = false;
      }
    });
    console.log(this.ratings)
  }

  getStarColor(index: number, starNumber: number) {
    if (starNumber <= this.ratings[index]) {
      return "yellow";
    }
    return "grey"
  }

  submitRatings() {
    this.user = this.authService.getUser();
    this.current_suggestion = 0;
    let json_ratings = {
      'first_dish': this.ratings[0],
      'second_dish': this.ratings[1],
      'third_dish': this.ratings[2],
      'fourth_dish': this.ratings[3],
      'fifth_dish': this.ratings[4],
    }
    this.http.patch(`http://localhost:8000/corkboard/users/${this.user.id}/`, json_ratings).subscribe((r) => {
      console.log(r);
      const location = Geolocation.getCurrentPosition();
      location.then((coordinates) => {
        this.http.get(`http://localhost:8000/corkboard/restaurants/latitude/${coordinates.coords.latitude}/longitude/${coordinates.coords.longitude}/username/${this.user.username}`)
          .subscribe((restaurants) => {
            this.ratingsSubmitted = true;
            console.log(restaurants);
            this.suggestions = restaurants;
        })
      }, (error) => {
        console.log(error);
      })
    })
  }

  nextSuggestion() {
    this.current_suggestion += 1;
  }

  submitNewRatings() {
    this.ratingsSubmitted = false;
  }
}
