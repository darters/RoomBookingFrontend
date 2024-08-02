import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input() rating: number = 0;

  getStars(): number[] {
    let roundedRating: number = Math.round(this.rating * 2) / 2
    const stars: number[] = [];
    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
        stars.push(1);
      } else if (roundedRating >= i - 0.5) {
        stars.push(0.5);
      } else {
        stars.push(0);
      }
    }
    return stars;
  }
}
