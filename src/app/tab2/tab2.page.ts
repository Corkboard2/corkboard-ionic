import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ratingsSubmitted = false;
  ratings: number[] = [0, 0, 0, 0 ,0];
  dishes = ['mexican_dish.jpeg', 'greek_dish.avif', 'pizza_dish.webp', 'salad_dish.webp', 'sandwich_dish.webp']
  allRated = false;
  constructor() {
  }
  ngOnInit() {
  }
  rateDish(index: number, rating: number) {
    this.ratings[index] = rating;
    this.allRated = true;
    this.ratings.forEach((rating) => {
      if(rating == 0) {
        this.allRated = false;
      }
    });
    console.log(this.ratings)
  }
  getStarColor(index: number, starNumber: number) {
    if(starNumber <= this.ratings[index]) {
      return "yellow";
    }
    return "grey"
  }
  submitRatings() {
    this.ratingsSubmitted = true;
  }
}
